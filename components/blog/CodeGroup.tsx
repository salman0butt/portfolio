'use client';

import { useEffect, useId, useMemo, useState } from 'react';

type CodeExample = { language: string; code: string };

const LANGUAGE_LABELS: Record<string, string> = {
  ts: 'TypeScript', typescript: 'TypeScript',
  js: 'JavaScript', javascript: 'JavaScript',
  py: 'Python', python: 'Python',
};
const STORAGE_KEY = 'portfolio-blog-code-language';
const EVENT_NAME = 'portfolio-blog-code-language-change';

function canonicalLanguage(language: string) {
  const value = language.toLowerCase();
  if (value === 'typescript') return 'ts';
  if (value === 'javascript') return 'js';
  if (value === 'python') return 'py';
  return value;
}

export default function CodeGroup({ examples }: { examples: CodeExample[] }) {
  const groupId = useId();
  const normalized = useMemo(() => examples.map((example) => ({ ...example, language: canonicalLanguage(example.language) })), [examples]);
  const [activeLanguage, setActiveLanguage] = useState(normalized[0]?.language ?? '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && normalized.some((example) => example.language === saved)) setActiveLanguage(saved);

    const syncLanguage = (event: Event) => {
      const language = (event as CustomEvent<string>).detail;
      if (normalized.some((example) => example.language === language)) setActiveLanguage(language);
    };

    window.addEventListener(EVENT_NAME, syncLanguage);
    return () => window.removeEventListener(EVENT_NAME, syncLanguage);
  }, [normalized]);

  const active = normalized.find((example) => example.language === activeLanguage) ?? normalized[0];
  if (!active) return null;

  const selectLanguage = (language: string) => {
    setActiveLanguage(language);
    window.localStorage.setItem(STORAGE_KEY, language);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: language }));
  };

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % normalized.length;
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + normalized.length) % normalized.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = normalized.length - 1;

    const nextLanguage = normalized[nextIndex].language;
    selectLanguage(nextLanguage);
    document.getElementById(`${groupId}-tab-${nextLanguage}`)?.focus();
  };

  const copy = async () => {
    await navigator.clipboard.writeText(active.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="my-7 min-w-0 max-w-full overflow-hidden rounded-xl border border-gray-800 bg-gray-950 sm:rounded-2xl">
      <div className="flex min-w-0 flex-col gap-2 border-b border-white/10 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="flex max-w-full gap-1 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0" role="tablist" aria-label="Code language">
          {normalized.map((example, index) => {
            const selected = example.language === active.language;
            return (
              <button
                id={`${groupId}-tab-${example.language}`}
                key={example.language}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${groupId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectLanguage(example.language)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${selected ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/30' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
              >
                {LANGUAGE_LABELS[example.language] ?? example.language}
              </button>
            );
          })}
        </div>
        <button type="button" onClick={copy} className="self-end rounded-md px-2 py-1 text-xs font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:self-auto">{copied ? 'Copied' : 'Copy'}</button>
      </div>
      <div id={`${groupId}-panel`} role="tabpanel" aria-labelledby={`${groupId}-tab-${active.language}`}>
        <pre className="max-w-full overflow-x-auto p-4 text-[13px] leading-6 text-gray-100 sm:p-5 sm:text-sm"><code data-language={active.language}>{active.code}</code></pre>
      </div>
    </div>
  );
}

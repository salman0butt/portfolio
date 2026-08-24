'use client';

import { useId, useMemo, useState, useSyncExternalStore } from 'react';
import SyntaxHighlightedCode from '@/components/blog/SyntaxHighlightedCode';

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

function subscribeToLanguagePreference(callback: () => void) {
  const notify = () => callback();
  window.addEventListener(EVENT_NAME, notify);
  window.addEventListener('storage', notify);
  return () => {
    window.removeEventListener(EVENT_NAME, notify);
    window.removeEventListener('storage', notify);
  };
}

function getLanguagePreference() {
  return window.localStorage.getItem(STORAGE_KEY) ?? '';
}

function getServerLanguagePreference() {
  return '';
}

export default function CodeGroup({ examples }: { examples: CodeExample[] }) {
  const groupId = useId();
  const normalized = useMemo(() => examples.map((example) => ({ ...example, language: canonicalLanguage(example.language) })), [examples]);
  const preferredLanguage = useSyncExternalStore(subscribeToLanguagePreference, getLanguagePreference, getServerLanguagePreference);
  const [copied, setCopied] = useState(false);

  const active = normalized.find((example) => example.language === preferredLanguage) ?? normalized[0];
  if (!active) return null;

  const selectLanguage = (language: string) => {
    window.localStorage.setItem(STORAGE_KEY, language);
    window.dispatchEvent(new Event(EVENT_NAME));
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
    <div className="my-7 min-w-0 max-w-full overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] shadow-[0_18px_50px_rgba(0,0,0,0.16)] sm:rounded-2xl">
      <div className="border-b border-[#30363d] bg-[#161b22] px-3 py-2.5 sm:px-4">
        <div className="mb-2 flex items-center justify-between gap-3 sm:mb-0">
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <button
            type="button"
            onClick={copy}
            className="shrink-0 rounded-md border border-transparent px-2 py-1 text-xs font-medium text-[#c9d1d9] transition-colors hover:border-[#30363d] hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:hidden"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <div className="flex min-w-0 items-center justify-between gap-3">
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
                  className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${selected ? 'bg-[#0d1117] text-[#e6edf3] ring-1 ring-inset ring-[#30363d]' : 'text-[#8b949e] hover:bg-white/[0.06] hover:text-white'}`}
                >
                  {LANGUAGE_LABELS[example.language] ?? example.language}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={copy}
            className="hidden shrink-0 rounded-md border border-transparent px-2 py-1 text-xs font-medium text-[#c9d1d9] transition-colors hover:border-[#30363d] hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:block"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      <div id={`${groupId}-panel`} role="tabpanel" aria-labelledby={`${groupId}-tab-${active.language}`}>
        <SyntaxHighlightedCode code={active.code} language={active.language} />
      </div>
    </div>
  );
}

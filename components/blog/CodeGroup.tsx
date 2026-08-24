'use client';

import { useEffect, useMemo, useState } from 'react';

type CodeExample = {
  language: string;
  code: string;
};

const LANGUAGE_LABELS: Record<string, string> = {
  ts: 'TypeScript',
  typescript: 'TypeScript',
  js: 'JavaScript',
  javascript: 'JavaScript',
  py: 'Python',
  python: 'Python',
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
  const normalized = useMemo(
    () => examples.map((example) => ({ ...example, language: canonicalLanguage(example.language) })),
    [examples],
  );
  const [activeLanguage, setActiveLanguage] = useState(normalized[0]?.language ?? '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && normalized.some((example) => example.language === saved)) {
      setActiveLanguage(saved);
    }

    const syncLanguage = (event: Event) => {
      const language = (event as CustomEvent<string>).detail;
      if (normalized.some((example) => example.language === language)) {
        setActiveLanguage(language);
      }
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

  const copy = async () => {
    await navigator.clipboard.writeText(active.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="my-7 overflow-hidden rounded-2xl border border-gray-800 bg-gray-950">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-3 py-2.5">
        <div className="flex flex-wrap gap-1" role="tablist" aria-label="Code language">
          {normalized.map((example) => {
            const selected = example.language === active.language;
            return (
              <button
                key={example.language}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => selectLanguage(example.language)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  selected
                    ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/30'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {LANGUAGE_LABELS[example.language] ?? example.language}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={copy}
          className="rounded-md px-2 py-1 text-xs font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-6 text-gray-100">
        <code data-language={active.language}>{active.code}</code>
      </pre>
    </div>
  );
}

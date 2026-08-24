'use client';

import { useState } from 'react';
import SyntaxHighlightedCode from '@/components/blog/SyntaxHighlightedCode';

const LANGUAGE_LABELS: Record<string, string> = {
  ts: 'TypeScript',
  typescript: 'TypeScript',
  tsx: 'TSX',
  js: 'JavaScript',
  javascript: 'JavaScript',
  jsx: 'JSX',
  py: 'Python',
  python: 'Python',
  json: 'JSON',
  bash: 'Bash',
  shell: 'Shell',
  sql: 'SQL',
  css: 'CSS',
  html: 'HTML',
  text: 'Text',
};

export default function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const normalizedLanguage = language?.toLowerCase() || 'code';
  const languageLabel = LANGUAGE_LABELS[normalizedLanguage] ?? normalizedLanguage;

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="my-7 min-w-0 max-w-full overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] shadow-[0_18px_50px_rgba(0,0,0,0.16)] sm:rounded-2xl">
      <div className="flex items-center justify-between gap-3 border-b border-[#30363d] bg-[#161b22] px-3 py-2.5 text-xs sm:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="truncate font-medium text-[#8b949e]">{languageLabel}</span>
        </div>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-md border border-transparent px-2 py-1 font-medium text-[#c9d1d9] transition-colors hover:border-[#30363d] hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlightedCode code={code} language={language} />
    </div>
  );
}

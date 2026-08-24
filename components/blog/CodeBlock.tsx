'use client';

import { useState } from 'react';

export default function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="my-7 min-w-0 max-w-full overflow-hidden rounded-xl border border-gray-800 bg-gray-950 sm:rounded-2xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2.5 text-xs text-gray-400 sm:px-4">
        <span className="truncate">{language || 'code'}</span>
        <button type="button" onClick={copy} className="shrink-0 rounded-md px-2 py-1 font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">{copied ? 'Copied' : 'Copy'}</button>
      </div>
      <pre className="max-w-full overflow-x-auto p-4 text-[13px] leading-6 text-gray-100 sm:p-5 sm:text-sm"><code data-language={language || undefined}>{code}</code></pre>
    </div>
  );
}

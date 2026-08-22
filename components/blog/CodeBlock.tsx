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
    <div className="my-7 overflow-hidden rounded-2xl border border-gray-800 bg-gray-950">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-xs text-gray-400">
        <span>{language || 'code'}</span>
        <button type="button" onClick={copy} className="rounded-md px-2 py-1 font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white">{copied ? 'Copied' : 'Copy'}</button>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-6 text-gray-100"><code data-language={language || undefined}>{code}</code></pre>
    </div>
  );
}

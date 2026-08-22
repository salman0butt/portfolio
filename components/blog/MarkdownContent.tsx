import type { ReactNode } from 'react';

function safeHref(href: string) {
  return /^(https?:\/\/|\/)/i.test(href) ? href : '#';
}

function renderInline(text: string): ReactNode[] {
  const tokenPattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(tokenPattern).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-semibold text-gray-950 dark:text-white">{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index} className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.9em] text-emerald-700 dark:bg-gray-800 dark:text-emerald-300">{part.slice(1, -1)}</code>;
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const href = safeHref(linkMatch[2]);
      const external = href.startsWith('http');
      return (
        <a
          key={index}
          href={href}
          {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
          className="font-medium text-emerald-600 underline decoration-emerald-500/30 underline-offset-4 hover:decoration-emerald-500 dark:text-emerald-400"
        >
          {linkMatch[1]}
        </a>
      );
    }

    return part;
  });
}

function isSpecialLine(line: string) {
  return /^(#{1,3}\s|>\s|[-*]\s|\d+\.\s|```)/.test(line);
}

export default function MarkdownContent({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const language = line.slice(3).trim();
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith('```')) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(
        <pre key={`code-${index}`} className="my-7 overflow-x-auto rounded-2xl border border-gray-800 bg-gray-950 p-5 text-sm leading-6 text-gray-100">
          <code data-language={language || undefined}>{code.join('\n')}</code>
        </pre>,
      );
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const classes = 'font-[family-name:var(--font-space-grotesk)] font-semibold tracking-tight text-gray-950 dark:text-white';
      if (level === 1) blocks.push(<h2 key={`h-${index}`} className={`mt-10 mb-4 text-3xl ${classes}`}>{renderInline(text)}</h2>);
      if (level === 2) blocks.push(<h2 key={`h-${index}`} className={`mt-10 mb-4 text-2xl ${classes}`}>{renderInline(text)}</h2>);
      if (level === 3) blocks.push(<h3 key={`h-${index}`} className={`mt-8 mb-3 text-xl ${classes}`}>{renderInline(text)}</h3>);
      index += 1;
      continue;
    }

    if (/^>\s/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^>\s/.test(lines[index])) {
        quote.push(lines[index].replace(/^>\s?/, ''));
        index += 1;
      }
      blocks.push(
        <blockquote key={`quote-${index}`} className="my-7 border-l-4 border-emerald-500 bg-emerald-50/70 px-5 py-4 italic text-gray-700 dark:bg-emerald-500/5 dark:text-gray-300">
          {renderInline(quote.join(' '))}
        </blockquote>,
      );
      continue;
    }

    if (/^[-*]\s/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s/.test(lines[index])) {
        items.push(lines[index].replace(/^[-*]\s+/, ''));
        index += 1;
      }
      blocks.push(
        <ul key={`ul-${index}`} className="my-5 list-disc space-y-2 pl-6 text-gray-700 marker:text-emerald-500 dark:text-gray-300">
          {items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s/.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\.\s+/, ''));
        index += 1;
      }
      blocks.push(
        <ol key={`ol-${index}`} className="my-5 list-decimal space-y-2 pl-6 text-gray-700 marker:font-semibold marker:text-emerald-600 dark:text-gray-300">
          {items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}
        </ol>,
      );
      continue;
    }

    const paragraph: string[] = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !isSpecialLine(lines[index])) {
      paragraph.push(lines[index].trim());
      index += 1;
    }

    blocks.push(
      <p key={`p-${index}`} className="my-5 text-[1.05rem] leading-8 text-gray-700 dark:text-gray-300">
        {renderInline(paragraph.join(' '))}
      </p>,
    );
  }

  return <div>{blocks}</div>;
}

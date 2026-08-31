/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import CodeBlock from '@/components/blog/CodeBlock';
import CodeGroup from '@/components/blog/CodeGroup';

function safeHref(href: string) {
  return /^(https?:\/\/|\/)/i.test(href) ? href : '#';
}

function safeMediaSrc(src: string) {
  return /^(https?:\/\/|\/)/i.test(src) ? src : '';
}

export function headingId(text: string) {
  return text
    .replace(/\*\*|`/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
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

type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
};

type DiagramAdjacency = Map<string, DiagramEdge[]>;

function MobileDiagramNode({ node, adjacency, path }: { node: string; adjacency: DiagramAdjacency; path: Set<string> }) {
  const outgoing = adjacency.get(node) ?? [];
  const hasChildren = outgoing.length > 0;
  const nextPath = new Set(path);
  nextPath.add(node);

  return (
    <div className="min-w-0">
      <div
        className={`min-w-0 rounded-xl border px-3.5 py-3 text-sm font-semibold leading-5 ${
          hasChildren
            ? 'border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white'
            : 'border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-100'
        }`}
      >
        {node}
      </div>

      {outgoing.length > 0 && (
        <div className="ml-3 mt-2 space-y-2.5 border-l border-gray-200 pl-3 dark:border-white/10">
          {outgoing.map((edge, edgeIndex) => (
            <div key={`${edge.from}-${edge.to}-${edgeIndex}`} className="min-w-0">
              <div className="mb-1.5 flex min-w-0 items-center gap-2 text-[11px] font-medium leading-4 text-gray-500 dark:text-gray-400">
                <span className="h-px w-3 shrink-0 bg-gray-300 dark:bg-gray-700" aria-hidden="true" />
                <span className="min-w-0 break-words">{edge.label || 'flows to'}</span>
              </div>
              {nextPath.has(edge.to) ? (
                <div className="rounded-lg border border-dashed border-gray-300 px-3 py-2 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">{edge.to} · already shown</div>
              ) : (
                <MobileDiagramNode node={edge.to} adjacency={adjacency} path={nextPath} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DiagramBlock({ source }: { source: string }) {
  const rawLines = source.split('\n').map((line) => line.trim()).filter(Boolean);
  const titleLine = rawLines.find((line) => /^title\s*:/i.test(line));
  const title = titleLine?.replace(/^title\s*:/i, '').trim() || 'Architecture flow';

  const edges: DiagramEdge[] = rawLines
    .filter((line) => line !== titleLine)
    .flatMap((line) => {
      const match = line.match(/^(.+?)\s*(?:-->|->)\s*(.+?)(?:\s*\|\s*(.+))?$/);
      if (!match) return [];
      return [{ from: match[1].trim(), to: match[2].trim(), label: match[3]?.trim() }];
    });

  if (edges.length === 0) {
    return <CodeBlock code={source} language="text" />;
  }

  const adjacency: DiagramAdjacency = new Map();
  const incoming = new Set(edges.map((edge) => edge.to));

  for (const edge of edges) {
    const outgoing = adjacency.get(edge.from) ?? [];
    outgoing.push(edge);
    adjacency.set(edge.from, outgoing);
  }

  const roots = Array.from(new Set(edges.map((edge) => edge.from))).filter((node) => !incoming.has(node));
  const mobileRoots = roots.length > 0 ? roots : [edges[0].from];

  return (
    <figure data-diagram-title={title} className="my-8 min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/80 dark:border-white/10 dark:bg-white/[0.025]">
      <figcaption className="border-b border-gray-200 px-4 py-4 text-sm font-semibold text-gray-950 sm:px-5 dark:border-white/10 dark:text-white">{title}</figcaption>

      <div data-diagram-view="mobile" className="space-y-4 p-3.5 sm:hidden">
        {mobileRoots.map((root) => (
          <MobileDiagramNode key={root} node={root} adjacency={adjacency} path={new Set()} />
        ))}
      </div>

      <div data-diagram-view="desktop" className="hidden space-y-3 p-5 sm:block">
        {edges.map((edge, edgeIndex) => (
          <div key={`${edge.from}-${edge.to}-${edgeIndex}`} className="grid items-center gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white">{edge.from}</div>
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
              {edge.label && <span className="max-w-28 text-center">{edge.label}</span>}
              <ArrowRight size={17} aria-hidden="true" />
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-100">{edge.to}</div>
          </div>
        ))}
      </div>
    </figure>
  );
}

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function isTableDivider(line: string) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function isSpecialLine(line: string) {
  return /^(#{1,3}\s|>\s|[-*]\s|\d+\.\s|```|:::|!\[|\|)/.test(line);
}

function readFencedCode(lines: string[], startIndex: number) {
  const language = lines[startIndex].slice(3).trim().toLowerCase();
  const code: string[] = [];
  let index = startIndex + 1;

  while (index < lines.length && !lines[index].startsWith('```')) {
    code.push(lines[index]);
    index += 1;
  }

  return {
    language,
    code: code.join('\n'),
    nextIndex: index < lines.length ? index + 1 : index,
  };
}

function isTypeScript(language: string) {
  return language === 'ts' || language === 'typescript';
}

function isPython(language: string) {
  return language === 'py' || language === 'python';
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

    if (line.trim() === ':::code-group') {
      const examples: Array<{ language: string; code: string }> = [];
      index += 1;

      while (index < lines.length && lines[index].trim() !== ':::') {
        if (!lines[index].trim()) {
          index += 1;
          continue;
        }

        if (lines[index].startsWith('```')) {
          const language = lines[index].slice(3).trim().toLowerCase();
          const code: string[] = [];
          index += 1;

          while (index < lines.length && !lines[index].startsWith('```')) {
            code.push(lines[index]);
            index += 1;
          }

          if (index < lines.length) index += 1;
          if (language && code.length > 0) examples.push({ language, code: code.join('\n') });
          continue;
        }

        index += 1;
      }

      if (index < lines.length && lines[index].trim() === ':::') index += 1;
      if (examples.length > 0) blocks.push(<CodeGroup key={`code-group-${index}`} examples={examples} />);
      continue;
    }

    if (line.startsWith('```')) {
      const firstBlock = readFencedCode(lines, index);
      index = firstBlock.nextIndex;

      if (isTypeScript(firstBlock.language) && lines[index]?.startsWith('```')) {
        const secondBlock = readFencedCode(lines, index);
        if (isPython(secondBlock.language)) {
          index = secondBlock.nextIndex;
          blocks.push(
            <CodeGroup
              key={`code-group-${index}`}
              examples={[
                { language: firstBlock.language, code: firstBlock.code },
                { language: secondBlock.language, code: secondBlock.code },
              ]}
            />,
          );
          continue;
        }
      }

      blocks.push(
        firstBlock.language === 'diagram' || firstBlock.language === 'architecture'
          ? <DiagramBlock key={`diagram-${index}`} source={firstBlock.code} />
          : <CodeBlock key={`code-${index}`} code={firstBlock.code} language={firstBlock.language || undefined} />,
      );
      continue;
    }

    const imageMatch = line.match(/^!\[([^\]]*)\]\((\S+?)(?:\s+["']([^"']+)["'])?\)$/);
    if (imageMatch) {
      const src = safeMediaSrc(imageMatch[2]);
      const alt = imageMatch[1] || 'Article illustration';
      const caption = imageMatch[3];

      if (src) {
        blocks.push(
          <figure key={`image-${index}`} className="my-8 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-gray-900">
            <img src={src} alt={alt} loading="lazy" className="h-auto w-full object-cover" />
            {caption && <figcaption className="border-t border-gray-200 px-4 py-3 text-center text-sm text-gray-500 dark:border-white/10 dark:text-gray-400">{caption}</figcaption>}
          </figure>,
        );
      }

      index += 1;
      continue;
    }

    if (line.includes('|') && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
      const headers = splitTableRow(line);
      index += 2;
      const rows: string[][] = [];

      while (index < lines.length && lines[index].trim() && lines[index].includes('|')) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }

      blocks.push(
        <div key={`table-${index}`} className="my-8 overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/10">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-gray-50 dark:bg-white/[0.04]">
              <tr>{headers.map((header, cellIndex) => <th key={cellIndex} className="border-b border-gray-200 px-4 py-3 font-semibold text-gray-950 dark:border-white/10 dark:text-white">{renderInline(header)}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-white dark:bg-transparent">
                  {headers.map((_, cellIndex) => <td key={cellIndex} className="px-4 py-3 align-top leading-6 text-gray-700 dark:text-gray-300">{renderInline(row[cellIndex] ?? '')}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const id = headingId(text);
      const classes = 'scroll-mt-24 font-[family-name:var(--font-space-grotesk)] font-semibold tracking-tight text-gray-950 dark:text-white';

      if (level <= 2) blocks.push(<h2 id={id} key={`h-${index}`} className={`mb-4 mt-10 text-2xl ${classes}`}>{renderInline(text)}</h2>);
      if (level === 3) blocks.push(<h3 id={id} key={`h-${index}`} className={`mb-3 mt-8 text-xl ${classes}`}>{renderInline(text)}</h3>);
      index += 1;
      continue;
    }

    if (/^>\s/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^>\s/.test(lines[index])) {
        quote.push(lines[index].replace(/^>\s?/, ''));
        index += 1;
      }

      blocks.push(<blockquote key={`quote-${index}`} className="my-7 rounded-r-xl border-l-4 border-emerald-500 bg-emerald-50/70 px-5 py-4 text-gray-700 dark:bg-emerald-500/5 dark:text-gray-300">{renderInline(quote.join(' '))}</blockquote>);
      continue;
    }

    if (/^[-*]\s/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s/.test(lines[index])) {
        items.push(lines[index].replace(/^[-*]\s+/, ''));
        index += 1;
      }

      blocks.push(<ul key={`ul-${index}`} className="my-5 list-disc space-y-2 pl-6 text-gray-700 marker:text-emerald-500 dark:text-gray-300">{items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}</ul>);
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s/.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\.\s+/, ''));
        index += 1;
      }

      blocks.push(<ol key={`ol-${index}`} className="my-5 list-decimal space-y-2 pl-6 text-gray-700 marker:font-semibold marker:text-emerald-600 dark:text-gray-300">{items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}</ol>);
      continue;
    }

    const paragraph: string[] = [line.trim()];
    index += 1;

    while (index < lines.length && lines[index].trim() && !isSpecialLine(lines[index])) {
      if (index + 1 < lines.length && lines[index].includes('|') && isTableDivider(lines[index + 1])) break;
      paragraph.push(lines[index].trim());
      index += 1;
    }

    blocks.push(<p key={`p-${index}`} className="my-5 text-[1.05rem] leading-8 text-gray-700 dark:text-gray-300">{renderInline(paragraph.join(' '))}</p>);
  }

  return <div>{blocks}</div>;
}

import type { ReactNode } from 'react';

type TokenKind = 'comment' | 'string' | 'number' | 'keyword' | 'type' | 'function' | 'constant' | 'identifier' | 'plain';

type Token = {
  value: string;
  kind: TokenKind;
};

const COLORS: Record<TokenKind, string> = {
  comment: '#6A9955',
  string: '#CE9178',
  number: '#B5CEA8',
  keyword: '#C586C0',
  type: '#4EC9B0',
  function: '#DCDCAA',
  constant: '#569CD6',
  identifier: '#9CDCFE',
  plain: '#D4D4D4',
};

const JAVASCRIPT_KEYWORDS = new Set([
  'as', 'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete',
  'do', 'else', 'export', 'extends', 'finally', 'for', 'from', 'function', 'get', 'if', 'implements', 'import', 'in',
  'instanceof', 'interface', 'keyof', 'let', 'new', 'of', 'private', 'protected', 'public', 'readonly', 'return', 'set',
  'static', 'super', 'switch', 'throw', 'try', 'type', 'typeof', 'var', 'void', 'while', 'with', 'yield', 'satisfies',
]);

const PYTHON_KEYWORDS = new Set([
  'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally',
  'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return',
  'try', 'while', 'with', 'yield',
]);

const SQL_KEYWORDS = new Set([
  'add', 'alter', 'and', 'as', 'asc', 'begin', 'between', 'by', 'case', 'create', 'delete', 'desc', 'distinct', 'drop',
  'else', 'end', 'exists', 'from', 'full', 'group', 'having', 'in', 'index', 'inner', 'insert', 'into', 'is', 'join',
  'left', 'like', 'limit', 'not', 'null', 'offset', 'on', 'or', 'order', 'outer', 'primary', 'references', 'returning',
  'right', 'select', 'set', 'table', 'then', 'union', 'unique', 'update', 'values', 'when', 'where', 'with',
]);

const BASH_KEYWORDS = new Set([
  'case', 'do', 'done', 'elif', 'else', 'esac', 'fi', 'for', 'function', 'if', 'in', 'select', 'then', 'time', 'until',
  'while',
]);

const CONSTANTS = new Set([
  'false', 'null', 'true', 'undefined', 'nan', 'infinity', 'none', 'False', 'None', 'True',
]);

const BUILTIN_TYPES = new Set([
  'Array', 'BigInt', 'Boolean', 'Date', 'Error', 'Map', 'Number', 'Object', 'Promise', 'Record', 'RegExp', 'Set', 'String',
  'Symbol', 'any', 'bigint', 'boolean', 'never', 'number', 'object', 'string', 'unknown', 'void', 'dict', 'float', 'int',
  'list', 'str', 'tuple', 'bool',
]);

function normalizeLanguage(language?: string) {
  const value = (language || '').toLowerCase();
  if (value === 'typescript' || value === 'tsx') return 'ts';
  if (value === 'javascript' || value === 'jsx') return 'js';
  if (value === 'python') return 'py';
  if (value === 'shell' || value === 'sh' || value === 'zsh') return 'bash';
  if (value === 'postgres' || value === 'postgresql') return 'sql';
  return value;
}

function keywordsFor(language: string) {
  if (language === 'ts' || language === 'js') return JAVASCRIPT_KEYWORDS;
  if (language === 'py') return PYTHON_KEYWORDS;
  if (language === 'sql') return SQL_KEYWORDS;
  if (language === 'bash') return BASH_KEYWORDS;
  return new Set<string>();
}

function isCommentStart(line: string, index: number, language: string) {
  const rest = line.slice(index);
  if ((language === 'ts' || language === 'js' || language === 'json' || language === 'css') && rest.startsWith('//')) return true;
  if ((language === 'py' || language === 'bash' || language === 'yaml' || language === 'yml') && rest.startsWith('#')) return true;
  if (language === 'sql' && rest.startsWith('--')) return true;
  return rest.startsWith('/*');
}

function readString(line: string, start: number) {
  const quote = line[start];
  let index = start + 1;

  while (index < line.length) {
    if (line[index] === '\\') {
      index += 2;
      continue;
    }
    if (line[index] === quote) {
      index += 1;
      break;
    }
    index += 1;
  }

  return index;
}

function tokenizeLine(line: string, language: string): Token[] {
  const tokens: Token[] = [];
  const keywords = keywordsFor(language);
  let index = 0;

  while (index < line.length) {
    const char = line[index];

    if (/\s/.test(char)) {
      let end = index + 1;
      while (end < line.length && /\s/.test(line[end])) end += 1;
      tokens.push({ value: line.slice(index, end), kind: 'plain' });
      index = end;
      continue;
    }

    if (isCommentStart(line, index, language)) {
      const blockCommentEnd = line.startsWith('/*', index) ? line.indexOf('*/', index + 2) : -1;
      const end = blockCommentEnd >= 0 ? blockCommentEnd + 2 : line.length;
      tokens.push({ value: line.slice(index, end), kind: 'comment' });
      index = end;
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      const end = readString(line, index);
      tokens.push({ value: line.slice(index, end), kind: 'string' });
      index = end;
      continue;
    }

    if (/\d/.test(char)) {
      let end = index + 1;
      while (end < line.length && /[\d._xXa-fA-F]/.test(line[end])) end += 1;
      tokens.push({ value: line.slice(index, end), kind: 'number' });
      index = end;
      continue;
    }

    if (/[A-Za-z_$]/.test(char)) {
      let end = index + 1;
      while (end < line.length && /[\w$]/.test(line[end])) end += 1;
      const value = line.slice(index, end);
      const lower = value.toLowerCase();
      let lookahead = end;
      while (lookahead < line.length && /\s/.test(line[lookahead])) lookahead += 1;

      let kind: TokenKind = 'identifier';
      if (keywords.has(language === 'sql' ? lower : value)) kind = 'keyword';
      else if (CONSTANTS.has(value) || CONSTANTS.has(lower)) kind = 'constant';
      else if (BUILTIN_TYPES.has(value) || /^[A-Z][A-Za-z0-9_$]*$/.test(value)) kind = 'type';
      else if (line[lookahead] === '(') kind = 'function';
      else if (language === 'json' && line[lookahead] === ':') kind = 'identifier';

      tokens.push({ value, kind });
      index = end;
      continue;
    }

    tokens.push({ value: char, kind: 'plain' });
    index += 1;
  }

  return tokens;
}

function renderTokens(line: string, language: string, lineIndex: number): ReactNode {
  if (!line) return '\u200b';

  return tokenizeLine(line, language).map((token, tokenIndex) => (
    <span key={`${lineIndex}-${tokenIndex}`} style={{ color: COLORS[token.kind] }}>
      {token.value}
    </span>
  ));
}

export default function SyntaxHighlightedCode({ code, language }: { code: string; language?: string }) {
  const normalizedLanguage = normalizeLanguage(language);
  const lines = code.replace(/\r\n/g, '\n').split('\n');

  return (
    <div className="max-w-full overflow-x-auto bg-[#0d1117]">
      <pre className="min-w-max p-4 font-mono text-[13px] leading-6 [tab-size:2] sm:p-5 sm:text-sm">
        <code data-language={normalizedLanguage || undefined}>
          {lines.map((line, lineIndex) => (
            <span key={lineIndex} className="flex min-h-6">
              <span aria-hidden="true" className="mr-4 w-8 shrink-0 select-none text-right text-[#6e7681]">
                {lineIndex + 1}
              </span>
              <span className="pr-5">{renderTokens(line, normalizedLanguage, lineIndex)}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

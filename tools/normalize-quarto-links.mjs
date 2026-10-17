import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Normalize only trusted, generated anchor URLs belonging to this portfolio.
 * Quarto sources use full URLs to avoid its project-relative link rewriting.
 * Canonical/link/meta tags, external URLs and script/style contents stay intact.
 * This is an integration adapter, not an HTML sanitizer.
 */
export function normalizePortfolioAnchors(html, origin = 'https://isaac-daroch.github.io') {
  const chunks = html.split(/(<(?:script|style|textarea)\b[^>]*>[\s\S]*?<\/(?:script|style|textarea)\s*>)/gi);
  return chunks.map((chunk, index) => index % 2 ? chunk : chunk.replace(
    /<a\b[^>]*>/gi,
    tag => tag.replace(/\bhref\s*=\s*(["'])(.*?)\1/i, (attribute, quote, href) => {
      if (!href.startsWith(origin + '/')) return attribute;
      const url = new URL(href);
      if (url.origin !== origin) return attribute;
      return `href=${quote}${url.pathname}${url.search}${url.hash}${quote}`;
    }),
  )).join('');
}

export function normalizeNotebookLinks(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) normalizeNotebookLinks(path);
    else if (entry.isFile() && entry.name.endsWith('.html')) {
      const before = readFileSync(path, 'utf8');
      const after = normalizePortfolioAnchors(before);
      if (after !== before) writeFileSync(path, after);
    }
  }
}

import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizePortfolioAnchors } from '../tools/normalize-quarto-links.mjs';
const origin = 'https://isaac-daroch.github.io';

test('cross-site anchors resolve from the portfolio root', () => {
  assert.equal(normalizePortfolioAnchors(`<a class="back" href="${origin}/publications/">Papers</a>`), '<a class="back" href="/publications/">Papers</a>');
  assert.equal(normalizePortfolioAnchors(`<a href='${origin}/#agent-lab'>Lab</a>`), "<a href='/#agent-lab'>Lab</a>");
});

test('canonical metadata and external domains are untouched', () => {
  const html = `<link rel="canonical" href="${origin}/research/">\n<a href="${origin}.example.org/publications/">External</a>`;
  assert.equal(normalizePortfolioAnchors(html), html);
});

test('script, style and textarea contents are untouched', () => {
  const html = `<script>const template='<a href="${origin}/">';</script><textarea><a href="${origin}/"></textarea>`;
  assert.equal(normalizePortfolioAnchors(html), html);
});

test('relative notebook links are untouched and normalization is idempotent', () => {
  const html = `<a href="notes/two-maps.html">Concepts</a><a href="${origin}/examples/baseline-v2.json">Example</a>`;
  const result = normalizePortfolioAnchors(html);
  assert.ok(result.includes('href="notes/two-maps.html"'));
  assert.ok(result.includes('href="/examples/baseline-v2.json"'));
  assert.equal(normalizePortfolioAnchors(result), result);
});

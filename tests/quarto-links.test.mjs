import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizePortfolioAnchors, normalizeSharedAssets,placeNotebookChrome } from '../tools/normalize-quarto-links.mjs';
const origin = 'https://isaac-daroch.github.io';
test('Generated notebook chrome sits outside main and skip target precedes article',()=>{
 const input='<body><main><!--portfolio-chrome-start--><header>Navigation</header><div id="notebook-content-start" tabindex="-1"></div><!--portfolio-chrome-end--><h1>Article</h1><!--portfolio-footer-start--><footer>Contact</footer><!--portfolio-footer-end--></main></body>';
 const output=placeNotebookChrome(input);assert.ok(output.startsWith('<body><header>'));assert.ok(output.includes('<main><div id="notebook-content-start"'));assert.ok(output.endsWith('</main><footer>Contact</footer></body>'));assert.equal(placeNotebookChrome(output),output);
});

test('shared includes use portfolio-root assets without changing other URLs or script contents',()=>{
 const input=`<link rel="stylesheet" href="${origin}/assets/paletas.css"><script src="${origin}/assets/preferences-runtime.mjs"></script><link rel="canonical" href="${origin}/assets/other.css"><script>const x="${origin}/assets/paletas.css";</script>`;
 const output=normalizeSharedAssets(input);
 assert.ok(output.includes('href="/assets/paletas.css"'));assert.ok(output.includes('src="/assets/preferences-runtime.mjs"'));
 assert.ok(output.includes(`href="${origin}/assets/other.css"`));assert.ok(output.includes(`const x="${origin}/assets/paletas.css"`));assert.equal(normalizeSharedAssets(output),output);
});

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

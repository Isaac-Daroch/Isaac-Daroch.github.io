import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
test('VIS source tokens exactly match all 24 palettes in the supplied Annex A',()=>{
 const source=read('docs/a11y/source-specification.txt'),palettes=JSON.parse(read('tokens/paletas-grafito.json'));
 const expected=Object.fromEntries([...source.matchAll(/^## `((?:editorial|high|soft)\|[^`]+)`\s*\n([\s\S]*?)(?=\n## |\n# Anexo B)/gm)].map(match=>[match[1],Object.fromEntries([...match[2].matchAll(/\| `--([a-z-]+)` \| `(#\w{6})` \|/g)].map(row=>[row[1],row[2]]))]));
 assert.equal(Object.keys(expected).length,24);assert.deepEqual(palettes,expected);
});
test('QA coverage preserves 77 requirement IDs, 55 criteria and all 42 full case procedures',()=>{
 assert.equal([...read('docs/a11y/requirements.md').matchAll(/^\| [A-Z]+-\d+ \|/gm)].length,77);
 assert.equal([...read('docs/a11y/wcag-matrix.md').matchAll(/^\| \d\.\d\.\d+ \|/gm)].length,55);
 assert.equal([...read('pruebas/PLAN_DE_PRUEBAS.md').matchAll(/^## T\d+\./gm)].length,42);
 assert.equal([...read('docs/a11y/acceptance-cases.md').matchAll(/^\| T\d+ \|/gm)].length,42);
});

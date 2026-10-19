import test from 'node:test';import assert from 'node:assert/strict';
import {q,UI,LOCALES} from '../site/public/assets/i18n.mjs';
import {CONTENT,PAPER,localize} from '../site/src/data/content.mjs';
import {STUDIO} from '../site/src/data/studio.mjs';
import {MINIMAL} from '../site/src/data/minimal.mjs';
import {PAPERS,VIDEOS,READING_TITLES} from '../site/src/data/library.mjs';
import {CV_UI,CV_ENTRIES} from '../site/src/data/cv.mjs';
import {COURSES} from '../site/src/data/courses.mjs';
import {NOTES} from '../site/src/data/notes.mjs';
import {isEnabled} from '../site/src/data/modules.mjs';
import {renderChrome,renderTools,renderFooter} from '../site/src/data/chrome.mjs';

export const CATALOG={CONTENT,PAPER,STUDIO,MINIMAL,READING_TITLES,PAPERS,VIDEOS,CV_UI,CV_ENTRIES,COURSES,NOTES};
test('Translation constructors reject absent, blank or unsupported language values',()=>{assert.throws(()=>q('one','dos','drei'));assert.throws(()=>q('one','dos','drei',' '));assert.throws(()=>localize({en:'one',es:'dos'},'es'));assert.throws(()=>localize(q('one','dos','drei','vier'),'fr'));});
test('Every localized entry has complete nonempty text in all four languages',()=>{let count=0;function walk(value){if(!value||typeof value!=='object')return;if(LOCALES.some(l=>Object.hasOwn(value,l))&&!Array.isArray(value)){assert.deepEqual(Object.keys(value).sort(),[...LOCALES].sort());for(const l of LOCALES){assert.equal(typeof value[l],'string');assert.ok(value[l].trim());assert.doesNotMatch(value[l],/undefined|\bTODO\b|\uFFFD/);}count++;}else for(const v of Object.values(value))walk(v);}walk(CATALOG);assert.ok(count>=350);for(const lang of LOCALES)assert.deepEqual(Object.keys(UI[lang]),Object.keys(UI.en));});
test('Every research record has translated reader titles without rewriting the source title',()=>{for(const p of PAPERS){assert.ok(p.title);for(const l of LOCALES)assert.ok(READING_TITLES[p.id][l]);}assert.ok(READING_TITLES['daroch2026-governed']);assert.equal(PAPERS.find(p=>p.id==='lstm1997').title,'Long Short-Term Memory');});
test('Research module is removed from all shared navigation and footers',()=>{assert.equal(isEnabled('investigation'),false);for(const lang of LOCALES){assert.doesNotMatch(renderChrome(lang,'','Home')+renderFooter(lang),/href="\/(?:es\/|de\/|nl\/)?investigation\//);}});
test('Compact accessibility and audio start collapsed and retain locale-specific number labels',()=>{for(const l of LOCALES){const html=renderTools(l);assert.match(html,/id="accessibility-controls"/);assert.doesNotMatch(html,/<details[^>]+\bopen(?:[\s=>])/);assert.match(html,new RegExp(l==='en'?'0\\.75 ×':'0,75 ×'));assert.ok(html.includes(UI[l].accessibility));assert.ok(html.includes(UI[l].audioShort));}});

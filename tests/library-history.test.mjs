import test from 'node:test';import assert from 'node:assert/strict';
import {PAPERS} from '../site/src/data/library.mjs';
import {RECENT_IDS,TIMELINE_IDS} from '../site/src/data/library-field.mjs';
import {MINIMAL} from '../site/src/data/minimal.mjs';
import {localize} from '../site/src/data/content.mjs';
import {isEnabled} from '../site/src/data/modules.mjs';
test('Timeline references resolve uniquely and run chronologically from recurrent memory to modular agent memory',()=>{assert.equal(new Set(TIMELINE_IDS).size,9);const years=TIMELINE_IDS.map(id=>PAPERS.find(p=>p.id===id)?.year);assert.deepEqual(years,[...years].sort((a,b)=>a-b));assert.equal(years[0],1997);assert.equal(years.at(-1),2026);});
test('Recent selection has primary sources and distinguishes journal, preprint, position and survey',()=>{assert.equal(RECENT_IDS.length,4);const statuses=RECENT_IDS.map(id=>{const p=PAPERS.find(p=>p.id===id);assert.ok(p.year>=2025&&p.year<=2026);assert.ok(p.source.startsWith('https://'));return p.status;});assert.deepEqual(new Set(statuses),new Set(['paper','preprint','position','survey']));});
test('Repository and engineering showcases are disabled and essential content is localized',()=>{assert.equal(isEnabled('projects'),false);assert.equal(isEnabled('engineering'),false);for(const lang of ['en','es','de','nl']){const m=localize(MINIMAL,lang);assert.ok(m.menu&&m.own&&m.recent&&m.history);assert.equal(Object.keys(m.cards).length,6);assert.ok(m.homeLead.length<150);}});

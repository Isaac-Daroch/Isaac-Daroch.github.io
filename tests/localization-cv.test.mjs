import test from 'node:test';import assert from 'node:assert/strict';
import {UI,LOCALES,PUBLIC_PATHS,href,localeOf,logicalPath} from '../site/public/assets/i18n.mjs';
import {CONTENT,localize} from '../site/src/data/content.mjs';
import {NOTES} from '../site/src/data/notes.mjs';
import {CV_ENTRIES,CV_UI} from '../site/src/data/cv.mjs';
import {moduleSettings,isEnabled} from '../site/src/data/modules.mjs';
import {validateModuleActivation} from '../tools/module-contracts.mjs';
test('Four complete dictionaries and meaningful localized page and notebook content',()=>{
 for(const locale of LOCALES){assert.deepEqual(Object.keys(UI[locale]),Object.keys(UI.en));assert.ok(Object.values(UI[locale]).every(v=>typeof v==='string'&&v.trim()));
  for(const collection of [CONTENT,NOTES])for(const record of Object.values(collection)){const page=localize(record,locale);assert.ok(page.title?.length>6&&page.lead?.length>30);for(const section of page.sections){assert.ok(section.h?.length>4);assert.ok(section.p.every(p=>p.length>20));}}
  for(const path of PUBLIC_PATHS){assert.equal(localeOf(href(locale,path)),locale);assert.equal(logicalPath(href(locale,path)),path);}
 }
});
test('CV credentials are deduplicated, sourced declarations with no fabricated links',()=>{
 assert.equal(CV_ENTRIES.length,18);assert.equal(new Set(CV_ENTRIES.map(e=>e.id)).size,18);const ids=CV_ENTRIES.map(e=>e.credentialId).filter(Boolean);assert.equal(new Set(ids).size,ids.length);
 for(const entry of CV_ENTRIES){assert.ok(entry.institution&&entry.date);for(const locale of LOCALES)assert.ok(entry.title[locale]);assert.equal(entry.credentialUrl,undefined);}
 assert.equal(CV_ENTRIES.find(e=>e.id==='doctorate').ongoing,true);for(const locale of LOCALES)assert.ok(localize(CV_UI,locale).evidence);
});
test('Empty editorial modules are disabled while available qualifications are enabled',()=>{
 for(const route of ['events','news','media'])assert.equal(isEnabled(route),false);for(const module of ['degrees','certifications','scholarships'])assert.equal(moduleSettings[module].enabled,true);
});
test('An enabled editorial module needs real records and four translations',()=>{
 const settings={events:{enabled:true},news:{enabled:false},media:{enabled:false}};assert.throws(()=>validateModuleActivation(settings,{events:[]}));
 const item={id:'synthetic-test',title:'Isolated test record',translations:{}};assert.throws(()=>validateModuleActivation(settings,{events:[item]}));
 for(const locale of LOCALES)item.translations[locale]={title:'Synthetic test',description:'Isolated structural fixture, not public content.'};assert.equal(validateModuleActivation(settings,{events:[item]}),true);
});

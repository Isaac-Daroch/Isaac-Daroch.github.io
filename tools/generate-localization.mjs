import {isEnabled} from '../site/src/data/modules.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';import {join} from 'node:path';
import {LOCALES,PUBLIC_PATHS,UI,href} from '../site/public/assets/i18n.mjs';
import {renderChrome,renderFooter} from '../site/src/data/chrome.mjs';
import {NOTES} from '../site/src/data/notes.mjs';
import {localize} from '../site/src/data/content.mjs';
export function generateLocalization(root){
 const headers=join(root,'research/headers');mkdirSync(headers,{recursive:true});
 const origin='https://isaac-daroch.github.io';
 const absolute=html=>html.replace(/href="\//g,'href="'+origin+'/');
 const marked=(name,html)=>`<!--portfolio-${name}-start-->${absolute(html)}<!--portfolio-${name}-end-->`;
 writeFileSync(join(headers,'index.html'),marked('chrome',renderChrome('en','research',UI.en.notebook,{notebook:true})));
 writeFileSync(join(headers,'footer.html'),marked('footer',renderFooter('en')));
 for(const [id,note] of Object.entries(NOTES))writeFileSync(join(headers,id+'.html'),marked('chrome',renderChrome('en','research/notes/'+id+'.html',note.title.en,{notebook:true})));
 const note=localize(NOTES['self-model'],'en');
 writeFileSync(join(root,'research/notes/self-model.qmd'),`---\ntitle: ${JSON.stringify(note.title)}\ndescription: ${JSON.stringify(note.lead)}\ninclude-before-body: headers/self-model.html\n---\n\n`+note.sections.map(section=>'## '+section.h+'\n\n'+section.p.join('\n\n')).join('\n\n')+'\n\n[Agent observatory](https://isaac-daroch.github.io/self-model/)\n');
 for(const locale of LOCALES.filter(l=>l!=='en')){
  const directory=join(root,'site/public',locale,'research');mkdirSync(directory,{recursive:true});
  const items=Object.entries(NOTES).flatMap(([id,data])=>{const note=localize(data,locale);return note.sections.map((section,i)=>({href:href(locale,'research/notes/'+id+'.html')+'#note-section-'+i,title:note.title,section:section.h,text:section.p.join(' ')}));});
  writeFileSync(join(directory,'search.json'),JSON.stringify(items));
 }
 const paths=LOCALES.flatMap(locale=>PUBLIC_PATHS.filter(isEnabled).map(path=>href(locale,path)));
 writeFileSync(join(root,'site/public/sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(path=>`<url><loc>${origin}${path}</loc></url>`).join('')+'</urlset>');
}

import fs from 'node:fs/promises';import path from 'node:path';import {pathToFileURL} from 'node:url';
export async function generateVisual(root){
 const data=JSON.parse(await fs.readFile(path.join(root,'tokens/paletas-grafito.json'),'utf8'));
 if(Object.keys(data.palettes).length!==24)throw Error('Expected exactly 24 canonical palettes');
 const props=k=>data.tokens.map((name,i)=>`--${name}:${data.palettes[k][i]};`).join('');
 let css='/* Generated from tokens/paletas-grafito.json. Do not edit. */\n:root{'+props('editorial|editorial|light')+'color-scheme:light;}\n';
 css+='@media(prefers-color-scheme:dark){:root:not([data-theme]){'+props('editorial|editorial|dark')+'color-scheme:dark;}}\n';
 for(const [contrast,appearance] of [['more','high'],['less','soft']]){css+=`@media(prefers-contrast:${contrast}){:root:not([data-theme]){${props(appearance+'|editorial|light')}}}\n`;css+=`@media(prefers-contrast:${contrast}) and (prefers-color-scheme:dark){:root:not([data-theme]){${props(appearance+'|editorial|dark')}}}\n`;}
 for(const [key,colors]of Object.entries(data.palettes)){if(colors.length!==11||colors.some(c=>!/^#[0-9A-F]{6}$/.test(c)))throw Error('Invalid palette '+key);const [appearance,color,theme]=key.split('|');css+=`:root[data-appearance="${appearance}"][data-color-profile="${color}"][data-theme="${theme}"]{${props(key)}color-scheme:${theme};}\n`;}
 const out=path.join(root,'site/public/ui');await fs.mkdir(out,{recursive:true});await fs.writeFile(path.join(out,'tokens.css'),css);
 for(const file of ['domain.mjs','browser.mjs'])await fs.copyFile(path.join(root,'site/src/modules/preferences',file),path.join(out,file));
 await fs.copyFile(path.join(root,'site/src/styles/global.css'),path.join(out,'editorial.css'));
 // Small early initializer is generated from the SAME pure contract, not a separately maintained preference resolver.
 const domain=(await fs.readFile(path.join(root,'site/src/modules/preferences/domain.mjs'),'utf8')).replaceAll('export ','');
 const early=`(()=>{${domain}\ntry{let raw;try{raw=JSON.parse(localStorage.getItem(KEY));}catch{}const p=resolvePreferences(raw,{dark:matchMedia('(prefers-color-scheme:dark)').matches,contrast:matchMedia('(prefers-contrast:more)').matches?'more':matchMedia('(prefers-contrast:less)').matches?'less':'none',reduceMotion:matchMedia('(prefers-reduced-motion:reduce)').matches,saveData:!!navigator.connection?.saveData});const h=document.documentElement;h.dataset.theme=p.theme;h.dataset.appearance=p.appearance;h.dataset.colorProfile=p.colorProfile;h.dataset.reading=String(p.readingMode);h.dataset.font=p.font;h.dataset.spacing=p.spacing;h.dataset.motion=p.motion;h.dataset.dataMode=p.dataMode;h.style.setProperty('--text-scale',String(p.scale));}catch{}})();`;
 await fs.writeFile(path.join(out,'early.js'),early);
 return {palettes:24,source:'tokens/paletas-grafito.json',assets:['tokens.css','editorial.css','early.js','domain.mjs','browser.mjs']};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)console.log(await generateVisual(path.resolve('.')));

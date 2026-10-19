import {KEY,LEGACY_KEY,DEFAULTS,ALLOWED,validate,parse,migrate,resolve,choosePreset,selectedPreset} from './preferences-core.mjs';
import {UI,localeOf} from './i18n.mjs';
import {initReadingTools} from './reading-tools.mjs';
const root=document.documentElement,t=UI[localeOf(location.pathname)];
const media={dark:'(prefers-color-scheme: dark)',more:'(prefers-contrast: more)',less:'(prefers-contrast: less)',reduced:'(prefers-reduced-motion: reduce)',forced:'(forced-colors: active)'};
const queries=Object.fromEntries(Object.entries(media).map(([k,q])=>[k,matchMedia(q)]));
const local=()=>localStorage,tab=()=>sessionStorage;
const read=(store,key)=>{try{return store().getItem(key);}catch{return null;}};
let state={...DEFAULTS};const raw=read(local,KEY)??read(tab,KEY);
if(raw!==null)state=parse(raw);else{const legacy=read(local,LEGACY_KEY);if(legacy!==null)try{state=migrate(JSON.parse(legacy));try{localStorage.setItem(KEY,JSON.stringify(state));localStorage.removeItem(LEGACY_KEY);}catch{try{sessionStorage.setItem(KEY,JSON.stringify(state));}catch{}}}catch{}}
function system(){return {dark:queries.dark.matches,contrast:queries.more.matches?'more':queries.less.matches?'less':'none',reduced:queries.reduced.matches,forcedColors:queries.forced.matches,saveData:navigator.connection?.saveData===true};}
function status(text){const output=document.getElementById('preferences-status')||document.getElementById('site-status');if(output)output.textContent=text;}
function apply(){const effective=resolve(state,system());Object.assign(root.dataset,{theme:effective.theme,appearance:effective.appearance,colorProfile:effective.colorProfile,reading:String(effective.readingMode),font:effective.font,spacing:effective.spacing,motion:effective.reduced?'reduced':'standard',dataMode:effective.lowData?'low':'standard',scale:String(effective.scale),forcedColors:String(effective.forcedColors),focusMode:String(effective.focusMode),guidedReading:String(effective.guidedReading)});root.style.setProperty('--reading-scale',String(effective.scale));
 for(const control of document.querySelectorAll('[data-preference]')){const key=control.dataset.preference;if(!Object.hasOwn(ALLOWED,key))continue;if(control.type==='checkbox')control.checked=state[key];else control.value=String(state[key]);}
 const preset=document.getElementById('visual-preset');if(preset)preset.value=selectedPreset(state);
 const forced=document.getElementById('forced-colors-note');if(forced)forced.hidden=!effective.forcedColors;
 for(const bar of document.querySelectorAll('.guided-tools'))bar.hidden=!effective.guidedReading;
 window.dispatchEvent(new CustomEvent('site:preferences',{detail:{...effective}}));
}
function save(){let persistent=true,session=true;try{localStorage.setItem(KEY,JSON.stringify(state));try{sessionStorage.removeItem(KEY);}catch{}}catch{persistent=false;try{sessionStorage.setItem(KEY,JSON.stringify(state));}catch{session=false;}}status(persistent?t.saved:t.notSaved+(session?'':t.memoryOnly));}
function bind(){
 for(const control of document.querySelectorAll('[data-preference]')){control.disabled=false;control.addEventListener('change',()=>{const key=control.dataset.preference;if(!Object.hasOwn(ALLOWED,key))return;let value=control.type==='checkbox'?control.checked:control.value;if(key==='scale')value=Number(value);state=validate({...state,[key]:value});apply();save();});}
 const preset=document.getElementById('visual-preset');if(preset){preset.disabled=false;preset.addEventListener('change',()=>{state=choosePreset(state,preset.value);apply();save();});}
 const reset=document.getElementById('reset-preferences');if(reset){reset.disabled=false;reset.addEventListener('click',()=>{state={...DEFAULTS};let cleared=true;for(const store of [local,tab])for(const key of [KEY,LEGACY_KEY])try{store().removeItem(key);}catch{cleared=false;}apply();status(cleared?t.resetDone:t.resetFailed);});}
 for(const disclosure of document.querySelectorAll('.menu-disclosure,.language-picker,.audio-panel,.access-disclosure'))disclosure.addEventListener('keydown',event=>{if(event.key==='Escape'&&disclosure.open){disclosure.open=false;disclosure.querySelector('summary').focus();}});
 for(const button of document.querySelectorAll('.code-copy-button')){button.setAttribute('aria-label',t.copyCode);button.removeAttribute('title');button.textContent=t.copyCode;const output=document.createElement('p');output.setAttribute('role','status');button.after(output);button.addEventListener('click',async event=>{event.stopImmediatePropagation();const code=button.closest('.code-copy-outer-scaffold')?.querySelector('code');if(!code)return;try{await navigator.clipboard.writeText(code.textContent);output.textContent=t.copied;}catch{output.textContent=t.copyFail;}},true);}
 for(const button of document.querySelectorAll('[data-copy-target]')){button.disabled=false;button.addEventListener('click',async()=>{const source=document.getElementById(button.dataset.copyTarget),output=document.getElementById(button.dataset.copyStatus);if(!source||!output)return;try{await navigator.clipboard.writeText(source.textContent);output.textContent=t.copied;}catch{output.textContent=t.copyFail;}});}
 initReadingTools();apply();
}
apply();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
for(const query of Object.values(queries))query.addEventListener('change',apply);
window.addEventListener('storage',event=>{if(event.key===KEY||event.key===null){state=event.key===KEY&&event.newValue?parse(event.newValue):{...DEFAULTS};apply();}});
window.addEventListener('pageshow',event=>{if(event.persisted){const raw=read(local,KEY)??read(tab,KEY);state=raw===null?{...DEFAULTS}:parse(raw);}apply();});

import {KEY,LEGACY_KEY,DEFAULTS,validatePreferences,migratePreferences,resolvePreferences} from './domain.mjs';
const es=()=>document.documentElement.lang.startsWith('es');
const queries={dark:matchMedia('(prefers-color-scheme: dark)'),more:matchMedia('(prefers-contrast: more)'),less:matchMedia('(prefers-contrast: less)'),motion:matchMedia('(prefers-reduced-motion: reduce)'),forced:matchMedia('(forced-colors: active)')};
let state={...DEFAULTS},canRead=true;
const environment=()=>({dark:queries.dark.matches,contrast:queries.more.matches?'more':queries.less.matches?'less':'none',reduceMotion:queries.motion.matches,forcedColors:queries.forced.matches,saveData:!!navigator.connection?.saveData});
function read(){try{const value=localStorage.getItem(KEY);if(value!==null){try{return validatePreferences(JSON.parse(value));}catch{return {...DEFAULTS};}}const legacy=localStorage.getItem(LEGACY_KEY);if(legacy!==null){try{const migrated=migratePreferences(JSON.parse(legacy));localStorage.setItem(KEY,JSON.stringify(migrated));localStorage.removeItem(LEGACY_KEY);return migrated;}catch{return {...DEFAULTS};}}return {...DEFAULTS};}catch{canRead=false;return {...DEFAULTS};}}
function announce(message){const status=document.querySelector('[data-preference-status]');if(status)status.textContent=message;}
function reflect(){
 const effective=resolvePreferences(state,environment()),html=document.documentElement;
 html.dataset.theme=effective.theme;html.dataset.appearance=effective.appearance;html.dataset.colorProfile=effective.colorProfile;html.dataset.motion=effective.motion;html.dataset.reading=String(effective.readingMode);html.dataset.font=effective.font;html.dataset.spacing=effective.spacing;html.dataset.dataMode=effective.dataMode;html.style.setProperty('--text-scale',String(effective.scale));
 for(const el of document.querySelectorAll('[data-preference]')){const key=el.dataset.preference;if(!(key in state))continue;if(el instanceof HTMLInputElement&&el.type==='checkbox')el.checked=state[key];else if(el instanceof HTMLSelectElement)el.value=String(state[key]);el.disabled=false;}
 for(const el of document.querySelectorAll('[data-preferences-reset]'))el.disabled=false;
 for(const notice of document.querySelectorAll('[data-forced-notice]'))notice.hidden=!effective.forcedColors;
 window.dispatchEvent(new CustomEvent('isaac:preferences',{detail:{...effective}}));
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));announce(es()?'Preferencias guardadas en este navegador.':'Preferences saved in this browser.');}catch{announce(es()?'El cambio se aplicó; este navegador no permite guardarlo.':'The change was applied; this browser cannot save it.');}}
state=read();reflect();
function ready(){reflect();for(const form of document.querySelectorAll('[data-preferences-form]'))form.addEventListener('submit',event=>event.preventDefault());document.addEventListener('change',event=>{const el=event.target;if(!(el instanceof HTMLElement)||!el.hasAttribute('data-preference'))return;const key=el.dataset.preference;const value=el instanceof HTMLInputElement&&el.type==='checkbox'?el.checked:key==='scale'?Number(el.value):el.value;state=validatePreferences({...state,[key]:value});reflect();save();});document.addEventListener('click',event=>{if(!event.target.closest?.('[data-preferences-reset]'))return;state={...DEFAULTS};let removed=true;try{localStorage.removeItem(KEY);localStorage.removeItem(LEGACY_KEY);}catch{removed=false;}reflect();announce(es()?(removed?'Preferencias restablecidas.':'Preferencias restablecidas para esta sesión; no se pudo limpiar el almacenamiento.'):(removed?'Preferences reset.':'Preferences reset for this session; storage could not be cleared.'));});if(!canRead)announce(es()?'Este navegador no permite leer preferencias guardadas; los cambios funcionan durante esta sesión.':'Saved preferences cannot be read; changes still work during this session.');}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
for(const q of Object.values(queries))q.addEventListener('change',reflect);
navigator.connection?.addEventListener?.('change',reflect);
window.addEventListener('storage',event=>{if(event.key!==KEY&&event.key!==null)return;try{state=event.newValue===null?{...DEFAULTS}:validatePreferences(JSON.parse(event.newValue));}catch{state={...DEFAULTS};}reflect();});
window.addEventListener('pageshow',event=>{if(event.persisted&&canRead)state=read();reflect();});

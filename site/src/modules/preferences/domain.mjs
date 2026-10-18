/** Shared, pure preference contract. No DOM, storage or diagnostic inference. */
export const KEY = 'isaac-visual-preferences-v2';
export const LEGACY_KEY = 'isaac-grafito-visual-v1';
export const DEFAULTS = Object.freeze({version:2,theme:'system',appearance:'system',colorProfile:'editorial',scale:1,readingMode:false,font:'editorial',spacing:'normal',motion:'reduce',dataMode:'system'});
export const ALLOWED = Object.freeze({theme:['system','light','dark'],appearance:['system','editorial','high','soft'],colorProfile:['editorial','redgreen','tritan','mono'],scale:[1,1.125,1.25,1.5,2],font:['editorial','system'],spacing:['normal','comfortable'],motion:['system','reduce'],dataMode:['system','standard','low']});
export function validatePreferences(raw){
  const result={...DEFAULTS};
  if(!raw||typeof raw!=='object'||Array.isArray(raw)||raw.version!==2)return result;
  for(const [key,values] of Object.entries(ALLOWED))if(Object.hasOwn(raw,key)&&values.includes(raw[key]))result[key]=raw[key];
  if(typeof raw.readingMode==='boolean')result.readingMode=raw.readingMode;
  return result;
}
export function migratePreferences(raw){
  if(!raw||typeof raw!=='object'||Array.isArray(raw))return {...DEFAULTS};
  return validatePreferences({...raw,version:2,colorProfile:raw.color,scale:Number(raw.scale),readingMode:raw.reading,motion:raw.motion===true?'reduce':raw.motion===false?'system':'reduce'});
}
export function resolvePreferences(raw,system={}){
  const p=validatePreferences(raw);
  return {...p,theme:p.theme==='system'?(system.dark?'dark':'light'):p.theme,appearance:p.appearance==='system'?(system.contrast==='more'?'high':system.contrast==='less'?'soft':'editorial'):p.appearance,motion:p.motion==='reduce'||system.reduceMotion?'reduce':'standard',dataMode:p.dataMode==='low'||(p.dataMode==='system'&&system.saveData)?'low':'standard',forcedColors:!!system.forcedColors};
}
export function paletteKey(effective){return `${effective.appearance}|${effective.colorProfile}|${effective.theme}`;}

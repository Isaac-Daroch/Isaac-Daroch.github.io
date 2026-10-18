import { LabError, IMPLEMENTATION_ID, MAP_ID, STRATEGIES, POLICIES } from '../domain/world.mjs';
export const MAX_EPISODE_BYTES=1048576, MAX_DEPTH=16, MAX_NODES=50000, MAX_COMMANDS=1001;
export function canonical(value){if(Array.isArray(value))return '['+value.map(canonical).join(',')+']';if(value&&typeof value==='object')return '{'+Object.keys(value).sort().map(k=>JSON.stringify(k)+':'+canonical(value[k])).join(',')+'}';return JSON.stringify(value);}
export function parseEpisode(input){
 if(typeof input!=='string')throw new LabError('INPUT_INVALID','Read an episode as UTF-8 JSON text.');if(new TextEncoder().encode(input).length>MAX_EPISODE_BYTES)throw new LabError('RESOURCE_LIMIT','Episode exceeds 1 MiB.');
 let depth=0,inString=false,escape=false;
 for(const ch of input){if(inString){if(escape)escape=false;else if(ch==='\\')escape=true;else if(ch==='"')inString=false;}else if(ch==='"')inString=true;else if(ch==='{'||ch==='['){if(++depth>MAX_DEPTH)throw new LabError('RESOURCE_LIMIT','JSON nesting limit exceeded.');}else if(ch==='}'||ch===']')depth--;}
 let e;try{e=JSON.parse(input);}catch{throw new LabError('INPUT_INVALID','The file is not valid JSON.');}
 const pending=[e];let count=0;while(pending.length){const v=pending.pop();if(++count>MAX_NODES)throw new LabError('RESOURCE_LIMIT','Too many JSON values.');if(typeof v==='string'&&v.length>4096)throw new LabError('RESOURCE_LIMIT','String exceeds the contract limit.');if(v&&typeof v==='object'){for(const [k,x]of Object.entries(v)){if(['__proto__','prototype','constructor'].includes(k))throw new LabError('INPUT_INVALID','Unsafe object key.');pending.push(x);}}}
 const exact=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
 if(!exact(e,['schema','implementationId','mapId','config','initial','commands','result'])||e.schema!=='isaac-gridworld-v2'||e.implementationId!==IMPLEMENTATION_ID||e.mapId!==MAP_ID)throw new LabError('SCHEMA_UNSUPPORTED','Unsupported episode, implementation or map. Legacy v1 is a snapshot, not a replay.');
 if(!exact(e.config,['strategy','policy'])||!STRATEGIES.includes(e.config.strategy)||!POLICIES.includes(e.config.policy))throw new LabError('INPUT_INVALID','Invalid episode configuration.');
 if(!Array.isArray(e.commands)||e.commands.length>MAX_COMMANDS)throw new LabError('RESOURCE_LIMIT','Invalid command count.');
 for(const c of e.commands)if(!exact(c,['action'])||!['step','change-environment'].includes(c.action))throw new LabError('INPUT_INVALID','Command is not permitted.');
 if(!e.initial||!e.result||typeof e.initial!=='object'||typeof e.result!=='object')throw new LabError('INPUT_INVALID','Initial and result objects are required.');
 return e;
}

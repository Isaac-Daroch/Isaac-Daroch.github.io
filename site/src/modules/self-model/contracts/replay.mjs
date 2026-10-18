import {SelfModelSession,IMPLEMENTATION,MAX_COMMANDS,configuration} from '../application/session.mjs';
export const MAX_BYTES=1048576;
export function replayEpisode(text){
 if(typeof text!=='string'||new TextEncoder().encode(text).length>MAX_BYTES)throw new Error('FILE_TOO_LARGE');
 let data;try{data=JSON.parse(text);}catch{throw new Error('JSON_INVALID');}
 function depth(value,n=0){if(n>16)throw new Error('DEPTH_LIMIT');if(value&&typeof value==='object'){if(Object.keys(value).some(k=>['__proto__','constructor','prototype'].includes(k)))throw new Error('KEY_INVALID');for(const v of Object.values(value))depth(v,n+1);}}
 depth(data);
 if(!data||Object.keys(data).sort().join(',')!=='commands,config,implementationId,result,schema'||data.schema!=='isaac-self-model-episode-v1'||data.implementationId!==IMPLEMENTATION)throw new Error('SCHEMA_UNSUPPORTED');
 configuration(data.config);if(!Array.isArray(data.commands)||data.commands.length>MAX_COMMANDS)throw new Error('COMMAND_LIMIT');
 const instance=new SelfModelSession(data.config);for(const command of data.commands)instance.command(command);
 if(JSON.stringify(instance.snapshot())!==JSON.stringify(data.result))throw new Error('RESULT_MISMATCH');
 return {instance,snapshot:instance.snapshot(),verifiedCommands:data.commands.length,scope:'Consistency only; authorship and scientific validity are not established.'};
}

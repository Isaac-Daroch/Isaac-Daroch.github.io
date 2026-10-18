import {fitSelfModel,retain} from '../domain/model.mjs';
import {evaluate} from '../domain/policy.mjs';
import {execute,randomAt} from '../domain/environment.mjs';
export const IMPLEMENTATION='self-model-observatory-2.0.0';
export const MAX_COMMANDS=512;
const clone=x=>JSON.parse(JSON.stringify(x));
const bounded=(x,min,max)=>typeof x==='number'&&Number.isFinite(x)&&x>=min&&x<=max;
export function configuration(input={}){
 if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!['seed','budget','memoryPolicy'].includes(k)))throw new Error('CONFIG_INVALID');
 const config={seed:input.seed??17,budget:input.budget??12,memoryPolicy:input.memoryPolicy??'selective'};
 if(!Number.isInteger(config.seed)||!bounded(config.seed,1,2147483647)||!Number.isInteger(config.budget)||!bounded(config.budget,3,32)||!['selective','recent','reservoir'].includes(config.memoryPolicy))throw new Error('CONFIG_INVALID');
 return config;
}
export class SelfModelSession {
 #config;#agent;#commands;#events;#tick;#experience;
 constructor(input={}){this.#config=configuration(input);this.#agent={internal:{energy:.85,fatigue:.15},situation:{difficulty:.45},request:'none',memory:[],selfModel:fitSelfModel([])};this.#commands=[];this.#events=[];this.#tick=0;this.#experience=0;}
 #record(command){if(this.#commands.length>=MAX_COMMANDS)throw new Error('RESOURCE_LIMIT');this.#commands.push(clone(command));}
 command(command){
  if(!command||typeof command!=='object'||Array.isArray(command)||typeof command.type!=='string')throw new Error('COMMAND_INVALID');
  const exact=keys=>Object.keys(command).every(k=>keys.includes(k))&&keys.every(k=>Object.hasOwn(command,k));
  if(command.type==='internal'){
   if(!exact(['type','energy','fatigue'])||!bounded(command.energy,0,1)||!bounded(command.fatigue,0,1))throw new Error('INTERNAL_INVALID');
   this.#record(command);this.#agent.internal={energy:command.energy,fatigue:command.fatigue};this.#events.push({type:'intervention',kind:'internal',tick:this.#tick});
  }else if(command.type==='situation'){
   if(!exact(['type','difficulty'])||!bounded(command.difficulty,.05,.95))throw new Error('SITUATION_INVALID');
   this.#record(command);this.#agent.situation={difficulty:command.difficulty};this.#events.push({type:'intervention',kind:'situation',tick:this.#tick});
  }else if(command.type==='request'){
   if(!exact(['type','task'])||!['none','precision','analysis'].includes(command.task))throw new Error('REQUEST_INVALID');
   this.#record(command);this.#agent.request=command.task;this.#events.push({type:'intervention',kind:'request',tick:this.#tick});
  }else if(command.type==='forget'){
   if(!exact(['type','id'])||!Number.isInteger(command.id)||!this.#agent.memory.some(m=>m.id===command.id))throw new Error('MEMORY_INVALID');
   this.#record(command);this.#agent.memory=this.#agent.memory.filter(m=>m.id!==command.id);this.#agent.selfModel=fitSelfModel(this.#agent.memory);this.#events.push({type:'intervention',kind:'forget-and-refit',id:command.id,tick:this.#tick});
  }else if(command.type==='step'){
   if(!exact(['type']))throw new Error('COMMAND_INVALID');
   const decision=evaluate(this.#agent),selected=decision.selected;if(!selected)throw new Error('NO_ACTION');
   this.#record(command);const before=clone(this.#agent.internal);this.#tick++;
   const result=execute(selected,this.#agent,this.#config.seed,this.#tick);let retention=null;
   if(result.outcome!==null){
    const episode={id:++this.#experience,tick:this.#tick,task:selected.task,energy:before.energy,fatigue:before.fatigue,difficulty:this.#agent.situation.difficulty,outcome:result.outcome,predicted:selected.prediction.probability};
    const r=retain(this.#agent.memory,episode,this.#config.budget,this.#config.memoryPolicy,randomAt(this.#config.seed,this.#tick,90));this.#agent.memory=r.memory;retention=r.decision;this.#agent.selfModel=fitSelfModel(this.#agent.memory);
   }
   this.#agent.internal=result.internal;
   this.#events.push({type:'decision',tick:this.#tick,action:selected.action,origin:selected.origin,terms:selected.terms,total:selected.total,prediction:selected.prediction,outcome:result.outcome,before,after:clone(result.internal),retention});
  }else throw new Error('COMMAND_INVALID');
  return this.snapshot();
 }
 step(){return this.command({type:'step'});}
 run(count=20){if(!Number.isInteger(count)||count<1||count>100)throw new Error('COUNT_INVALID');if(this.#commands.length+count>MAX_COMMANDS)throw new Error('RESOURCE_LIMIT');for(let i=0;i<count;i++)this.step();return this.snapshot();}
 snapshot(){return clone({implementationId:IMPLEMENTATION,config:this.#config,tick:this.#tick,experienceCount:this.#experience,internal:this.#agent.internal,situation:this.#agent.situation,request:this.#agent.request,memory:this.#agent.memory,selfModel:this.#agent.selfModel,decision:evaluate(this.#agent),events:this.#events,commandCount:this.#commands.length});}
 inspectCounterfactuals(){return clone({scope:'Current decision only; no training, latent dynamics or history changed.',full:evaluate(this.#agent),withoutSelf:evaluate(this.#agent,{withoutSelf:true}),withoutIntrinsic:evaluate(this.#agent,{withoutIntrinsic:true}),recovered:evaluate({...this.#agent,internal:{energy:1,fatigue:0}})});}
 export(){return clone({schema:'isaac-self-model-episode-v1',implementationId:IMPLEMENTATION,config:this.#config,commands:this.#commands,result:this.snapshot()});}
}

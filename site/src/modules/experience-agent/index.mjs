/** Bounded educational neural agent. All learning data come from retained memory.
 * Simulator dynamics and selection/retention rules are explicit designed mechanisms.
 * No DOM, timers, network, privileged environment probabilities or pretrained weights.
 */
import {retain} from '../self-model/domain/model.mjs';
import {execute} from '../self-model/domain/environment.mjs';
export const IMPLEMENTATION='experience-self-mlp-1.0.1';
export const MAX_COMMANDS=512,MAX_BYTES=1048576;
const clone=x=>JSON.parse(JSON.stringify(x));
const bound=x=>typeof x==='number'&&Number.isFinite(x)&&x>=0&&x<=1;
// Fixed arithmetic avoids engine-specific transcendental approximations being
// amplified by repeated gradient updates. Replay retains exact result checks.
const powers=[];for(let value=5.684341886080802e-14,i=0;i<89;i++,value*=2)powers.push(value);
export function portableExp(value){const x=Math.max(-30,Math.min(30,value)),k=Math.round(x/.6931471805599453),r=x-k*.6931471805599453;let term=1,sum=1;for(let n=1;n<=16;n++){term*=r/n;sum+=term;}return sum*powers[k+44];}
const sigmoid=x=>1/(1+portableExp(-x));
const tanh=x=>{const e=portableExp(2*Math.max(-15,Math.min(15,x)));return(e-1)/(e+1);};
const features=c=>[c.task==='precision'?1:-1,2*c.energy-1,2*c.fatigue-1,2*c.difficulty-1];
const dot=(a,b)=>a.reduce((sum,v,i)=>sum+v*b[i],0);
function forward(model,context){const x=features(context),a=model.w1.map((w,i)=>tanh(dot(w,x)+model.b1[i])),b=model.w2.map((w,i)=>tanh(dot(w,a)+model.b2[i]));return {x,a,b,p:sigmoid(dot(model.w3,b)+model.b3)};}
export function fitNeural(memory){
 let initial=0x19a017;const weight=()=>{initial=(Math.imul(initial,1664525)+1013904223)>>>0;return(initial/4294967296-.5)*.5;};
 const model={kind:'retained-memory-mlp-v1',layers:[4,8,6,1],w1:Array.from({length:8},()=>Array.from({length:4},weight)),b1:Array(8).fill(0),w2:Array.from({length:6},()=>Array.from({length:8},weight)),b2:Array(6).fill(0),w3:Array.from({length:6},weight),b3:0,examples:memory.length,epochs:memory.length?180:0};
 if(!memory.length)return model;
 for(let epoch=0;epoch<model.epochs;epoch++){
  const g={w1:model.w1.map(row=>row.map(v=>.003*v)),b1:Array(8).fill(0),w2:model.w2.map(row=>row.map(v=>.003*v)),b2:Array(6).fill(0),w3:model.w3.map(v=>.003*v),b3:0};
  for(const item of memory){const {x,a,b,p}=forward(model,item),e=(p-item.outcome)/memory.length,d2=b.map((v,j)=>e*model.w3[j]*(1-v*v)),d1=a.map((v,i)=>d2.reduce((sum,d,j)=>sum+d*model.w2[j][i],0)*(1-v*v));
   for(let j=0;j<6;j++){g.w3[j]+=e*b[j];g.b2[j]+=d2[j];for(let i=0;i<8;i++)g.w2[j][i]+=d2[j]*a[i];}
   g.b3+=e;for(let i=0;i<8;i++){g.b1[i]+=d1[i];for(let k=0;k<4;k++)g.w1[i][k]+=d1[i]*x[k];}
  }
  for(const field of ['w1','w2'])for(let i=0;i<model[field].length;i++)for(let j=0;j<model[field][i].length;j++)model[field][i][j]-=.35*g[field][i][j];
  for(const field of ['b1','b2','w3'])for(let i=0;i<model[field].length;i++)model[field][i]-=.35*g[field][i];model.b3-=.35*g.b3;
 }
 return model;
}
export function predict(model,memory,context){
 const probability=memory.length?forward(model,context).p:.5;
 const support=memory.reduce((sum,m)=>sum+(m.task===context.task?portableExp(-4*((m.energy-context.energy)**2+(m.fatigue-context.fatigue)**2+(m.difficulty-context.difficulty)**2)):0),0);
 return {probability,uncertainty:1/Math.sqrt(1+support),support};
}
export function evaluate(agent,{withoutSelf=false,withoutIntrinsic=false}={}){
 const {energy,fatigue}=agent.internal,influence=withoutSelf?0:agent.selfInfluence,alternatives=[];
 for(const task of ['precision','analysis'])for(const kind of ['work','probe']){
  const learned=predict(agent.model,agent.memory,{task,energy,fatigue,difficulty:agent.difficulty});
  const prediction={...learned,probability:.5+influence*(learned.probability-.5)},probe=kind==='probe',cost=probe?.07:.18;
  const terms={external:agent.request===task&&!probe?2.2*prediction.probability:0,learning:withoutIntrinsic?0:(probe?1.05:.25)*learned.uncertainty,capability:probe?0:.45*influence*prediction.probability,risk:-(probe?.12:.85)*(1-prediction.probability)*(1+fatigue),bodilyCost:-cost*(1.3+1.5*fatigue+2*(1-energy))};
  alternatives.push({action:kind+'-'+task,task,kind,cost,allowed:energy>=cost,total:Object.values(terms).reduce((a,b)=>a+b,0),terms,prediction,learnedProbability:learned.probability});
 }
 const need=(1-energy)*1.55+fatigue*1.1;
 alternatives.push({action:'recover',task:null,kind:'recover',cost:0,allowed:energy<.999||fatigue>.001,total:need-.35,terms:{internalNeed:need,opportunityCost:-.35},prediction:null});
 const selected=alternatives.filter(a=>a.allowed).sort((a,b)=>b.total-a.total||a.action.localeCompare(b.action))[0];
 return {selected,alternatives,modelUsed:influence>0,influence};
}
function config(input={}){if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!['seed','budget'].includes(k)))throw new Error('CONFIG_INVALID');const result={seed:input.seed??17,budget:input.budget??12};if(!Number.isInteger(result.seed)||result.seed<1||result.seed>2147483647||!Number.isInteger(result.budget)||result.budget<3||result.budget>32)throw new Error('CONFIG_INVALID');return result;}
export class ExperienceAgent{
 #config;#state;#commands=[];#events=[];#tick=0;#experience=0;
 constructor(input={}){this.#config=config(input);this.#state={internal:{energy:.85,fatigue:.15},difficulty:.45,request:'none',selfInfluence:1,memory:[],model:fitNeural([])};}
 command(command){
  if(this.#commands.length>=MAX_COMMANDS)throw new Error('COMMAND_LIMIT');
  if(!command||typeof command!=='object'||Array.isArray(command))throw new Error('COMMAND_INVALID');
  const exact=keys=>Object.keys(command).sort().join(',')===[...keys].sort().join(',');
  if(command.type==='situation'){
   if(!exact(['type','energy','fatigue','difficulty','request','selfInfluence'])||![command.energy,command.fatigue,command.difficulty,command.selfInfluence].every(bound)||!['none','precision','analysis'].includes(command.request))throw new Error('STATE_INVALID');
   this.#state.internal={energy:command.energy,fatigue:command.fatigue};this.#state.difficulty=command.difficulty;this.#state.request=command.request;this.#state.selfInfluence=command.selfInfluence;
   this.#events.push({type:'intervention',tick:this.#tick});
  }else if(command.type==='forget'){
   if(!exact(['type','id'])||!Number.isInteger(command.id)||!this.#state.memory.some(e=>e.id===command.id))throw new Error('MEMORY_INVALID');
   this.#state.memory=this.#state.memory.filter(e=>e.id!==command.id);this.#state.model=fitNeural(this.#state.memory);this.#events.push({type:'forget',id:command.id,tick:this.#tick});
  }else if(command.type==='step'){
   if(!exact(['type']))throw new Error('COMMAND_INVALID');
   const selected=evaluate(this.#state).selected,before=clone(this.#state.internal);this.#tick++;
   const result=execute(selected,{internal:this.#state.internal,situation:{difficulty:this.#state.difficulty}},this.#config.seed,this.#tick);let retention=null;
   if(result.outcome!==null){const episode={id:++this.#experience,tick:this.#tick,task:selected.task,energy:before.energy,fatigue:before.fatigue,difficulty:this.#state.difficulty,outcome:result.outcome,predicted:selected.prediction.probability};const r=retain(this.#state.memory,episode,this.#config.budget,'selective',0);this.#state.memory=r.memory;retention=r.decision;this.#state.model=fitNeural(this.#state.memory);}
   this.#state.internal=result.internal;this.#events.push({type:'decision',tick:this.#tick,action:selected.action,total:selected.total,terms:selected.terms,prediction:selected.prediction,outcome:result.outcome,retention,before,after:clone(result.internal)});
  }else throw new Error('COMMAND_INVALID');
  this.#commands.push(clone(command));return this.snapshot();
 }
 step(){return this.command({type:'step'});}
 run(count=12){if(!Number.isInteger(count)||count<1||count>100||this.#commands.length+count>MAX_COMMANDS)throw new Error('COMMAND_LIMIT');for(let i=0;i<count;i++)this.step();return this.snapshot();}
 snapshot(){return clone({implementationId:IMPLEMENTATION,config:this.#config,tick:this.#tick,experienceCount:this.#experience,...this.#state,decision:evaluate(this.#state),events:this.#events,commandCount:this.#commands.length});}
 compare(){return clone({actual:evaluate(this.#state),withoutSelf:evaluate(this.#state,{withoutSelf:true}),withoutIntrinsic:evaluate(this.#state,{withoutIntrinsic:true})});}
 export(){return clone({schema:'isaac-experience-agent-v1',implementationId:IMPLEMENTATION,config:this.#config,commands:this.#commands,result:this.snapshot()});}
}
export function replay(text){
 if(typeof text!=='string'||new TextEncoder().encode(text).length>MAX_BYTES)throw new Error('FILE_TOO_LARGE');let data;try{data=JSON.parse(text);}catch{throw new Error('JSON_INVALID');}
 function depth(value,n=0){if(n>16)throw new Error('DEPTH_LIMIT');if(value&&typeof value==='object'){if(Object.keys(value).some(k=>['__proto__','constructor','prototype'].includes(k)))throw new Error('KEY_INVALID');for(const v of Object.values(value))depth(v,n+1);}}
 depth(data);if(!data||Object.keys(data).sort().join(',')!=='commands,config,implementationId,result,schema'||data.schema!=='isaac-experience-agent-v1'||data.implementationId!==IMPLEMENTATION)throw new Error('SCHEMA_UNSUPPORTED');
 if(!Array.isArray(data.commands)||data.commands.length>MAX_COMMANDS)throw new Error('COMMAND_LIMIT');const instance=new ExperienceAgent(data.config);for(const command of data.commands)instance.command(command);
 if(JSON.stringify(instance.snapshot())!==JSON.stringify(data.result))throw new Error('RESULT_MISMATCH');return {snapshot:instance.snapshot(),verifiedCommands:data.commands.length};
}

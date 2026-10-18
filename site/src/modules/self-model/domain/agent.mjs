/** Functional self-model demonstrator, not a consciousness test.
 * Domain knows only observations of past outcomes, current internal state and task offers.
 * The hidden outcome generator is supplied by the application through a narrow port.
 */
export const MODEL_ID='self-model-observatory-2.0.0-rc.1';
export const MEMORY_LIMIT=8, MAX_STEPS=240;
export const ACTIONS=Object.freeze(['precision','discovery','calibrate-precision','calibrate-discovery','recover']);
export const MODES=Object.freeze(['selective','recent','random']);
export const clip=(n,low=0,high=1)=>Math.min(high,Math.max(low,n));
export const copy=value=>JSON.parse(JSON.stringify(value));
export function checkNumber(value,min,max,name){if(typeof value!=='number'||!Number.isFinite(value)||value<min||value>max)throw new Error(`INPUT_INVALID:${name}`);return value;}
export function randomAt(seed,...labels){let h=(seed>>>0)^2166136261;for(const c of labels.join('|')){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}h^=h>>>16;return (h>>>0)/4294967296;}
export function contextOf(energy){return energy<.45?'depleted':'available';}
export function emptySelf(){return Object.fromEntries(['precision','discovery'].flatMap(task=>['depleted','available'].map(context=>[`${task}:${context}`,{alpha:2,beta:2,count:0}])));}
export function createAgent({seed=41,memoryPolicy='selective',selfMode='learned'}={}){
 checkNumber(seed,1,2147483647,'seed');if(!Number.isInteger(seed)||!MODES.includes(memoryPolicy)||!['learned','prior'].includes(selfMode))throw new Error('INPUT_INVALID:configuration');
 return {modelId:MODEL_ID,seed,memoryPolicy,selfMode,step:0,energy:.72,fatigue:.12,request:'none',difficulty:.45,self:emptySelf(),memory:[],archive:[],decisions:[],metrics:{attempts:0,successes:0,internallySelected:0,predictionLoss:0,retained:0,replaced:0},lastRetention:null};
}
/** Posterior uses only retained outcome evidence. No true ability is available here. */
export function rebuildSelf(memory){const model=emptySelf();for(const e of memory){const p=model[`${e.task}:${e.context}`];if(!p)throw new Error('INPUT_INVALID:memory context');const weight=.5+.5*clip(e.usefulness);p.alpha+=weight*e.success;p.beta+=weight*(1-e.success);p.count++;}return model;}
export function estimate(agent,task,energy=agent.energy){
 const context=contextOf(energy),p=agent.selfMode==='prior'?emptySelf()[`${task}:${context}`]:agent.self[`${task}:${context}`];
 const mean=p.alpha/(p.alpha+p.beta),variance=p.alpha*p.beta/((p.alpha+p.beta)**2*(p.alpha+p.beta+1));
 return {context,mean,uncertainty:Math.sqrt(variance),count:p.count};
}
export function candidates(agent){
 const fatigue=agent.fatigue,energy=agent.energy,need=clip((.72-energy)/.72),rows=[];
 for(const action of ACTIONS){
  if(action==='recover'){const components={request:0,competence:0,information:0,homeostasis:need*2.15+fatigue*.4,cost:.14};rows.push({action,task:null,origin:'internal-maintenance',prediction:null,memories:[],components,total:components.homeostasis-components.cost});continue;}
  const task=action.includes('precision')?'precision':'discovery',calibration=action.startsWith('calibrate'),p=estimate(agent,task),memories=agent.selfMode==='prior'?[]:agent.memory.filter(e=>e.task===task&&e.context===p.context).map(e=>e.id);
  // A designed, inspectable decision rule. Learned beliefs influence values; these coefficients are not learned policy parameters.
  const components={request:agent.request===task&&!calibration?.72:0,competence:calibration?.08:(p.mean*(1-agent.difficulty*.36))*.62,information:p.uncertainty*(calibration?2.9:1.35),homeostasis:0,cost:(calibration?.14:.23)*(1+need*2.3+fatigue)+agent.difficulty*.12};
  rows.push({action,task,origin:agent.request===task&&!calibration?'external-request':'internal-exploration',prediction:p,memories,components,total:components.request+components.competence+components.information+components.homeostasis-components.cost});
 }
 return rows.sort((a,b)=>b.total-a.total||ACTIONS.indexOf(a.action)-ACTIONS.indexOf(b.action));
}
export function choose(agent){if(agent.step>=MAX_STEPS)throw new Error('RESOURCE_LIMIT:episode');const rows=candidates(agent);return {selected:rows[0],alternatives:rows,step:agent.step+1};}
/** Select with current information only. Future test contexts are never passed to retention. */
export function retain(agent,episode){
 for(const e of agent.memory){if(e.task===episode.task&&e.context===episode.context){const oldLoss=(.5-episode.success)**2,episodeLoss=(e.success-episode.success)**2;e.usefulness=clip(e.usefulness*.85+.15*clip(.5+oldLoss-episodeLoss));}}
 const pool=[...agent.memory,episode];let discarded=null;
 const salience=e=>.48*e.surprise+.28*e.usefulness+.16/(1+pool.filter(x=>x.id!==e.id&&x.task===e.task&&x.context===e.context&&x.success===e.success).length)+.08/(1+agent.step-e.step);
 if(pool.length>MEMORY_LIMIT){let index=0;if(agent.memoryPolicy==='random')index=Math.floor(randomAt(agent.seed,'retention',agent.step)*pool.length);else if(agent.memoryPolicy==='selective'){index=pool.reduce((best,e,i)=>salience(e)<salience(pool[best])?i:best,0);}discarded=pool.splice(index,1)[0];agent.metrics.replaced++;}
 agent.memory=pool;agent.self=rebuildSelf(pool);const kept=pool.some(e=>e.id===episode.id);if(kept)agent.metrics.retained++;
 agent.lastRetention={episode:episode.id,kept,discarded:discarded?.id??null,policy:agent.memoryPolicy,scores:pool.map(e=>({id:e.id,score:salience(e)})),reason:agent.memoryPolicy==='selective'?'Adaptive heuristic: surprise, predictive usefulness, diversity and recency; not a trained retention policy.':agent.memoryPolicy==='recent'?'Keep the most recent episodes under the same memory limit.':'Seeded random replacement under the same memory limit.'};
}
export function acceptObservation(agent,decision,observation){
 const next=copy(agent),a=decision.selected;next.step++;next.decisions.push(copy(decision));if(a.origin!=='external-request')next.metrics.internallySelected++;
 if(a.action==='recover'){next.energy=clip(next.energy+.28);next.fatigue=clip(next.fatigue-.23);next.lastRetention=null;return next;}
 if(!observation||![0,1].includes(observation.success)||Object.keys(observation).some(k=>k!=='success'))throw new Error('INPUT_INVALID:observation');
 const e={id:`e${next.step}`,step:next.step,task:a.task,context:contextOf(next.energy),energy:next.energy,fatigue:next.fatigue,difficulty:next.difficulty,action:a.action,success:observation.success,predicted:a.prediction.mean,surprise:Math.abs(observation.success-a.prediction.mean),usefulness:.5};
 next.metrics.attempts++;next.metrics.successes+=e.success;next.metrics.predictionLoss+=(e.predicted-e.success)**2;next.archive.push(copy(e));retain(next,e);next.energy=clip(next.energy-(a.action.startsWith('calibrate')?.11:.2));next.fatigue=clip(next.fatigue+.08);return next;
}
export function interveneAgent(agent,changes){const next=copy(agent);if(!changes||typeof changes!=='object'||Array.isArray(changes))throw Error('INPUT_INVALID:intervention');for(const [k,v]of Object.entries(changes)){if(k==='energy'||k==='fatigue'||k==='difficulty')next[k]=checkNumber(v,0,1,k);else if(k==='request'&&['none','precision','discovery'].includes(v))next[k]=v;else throw Error('INPUT_INVALID:intervention field');}return next;}
export function withoutRetrievableMemory(agent){const next=copy(agent);next.memory=[];return next;}
export function forgetAndReconstruct(agent,episodeId){const next=copy(agent);next.memory=next.memory.filter(e=>e.id!==episodeId);next.self=rebuildSelf(next.memory);return next;}

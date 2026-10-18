/** SM-02/03. Predictive self-model fitted ONLY to retained experiences.
 * Learning: regularized logistic regression. Retention: explicit surprise/coverage heuristic,
 * not a neural retention policy. All observations are bounded before reaching this module.
 */
export const sigmoid=z=>1/(1+Math.exp(-Math.max(-30,Math.min(30,z))));
export const features=({task,energy,fatigue,difficulty})=>[1,task==='precision'?1:-1,2*energy-1,2*fatigue-1,2*difficulty-1];
const dot=(a,b)=>a.reduce((n,x,i)=>n+x*b[i],0);
export function fitSelfModel(memory){
 const weights=[0,0,0,0,0];
 if(memory.length)for(let iteration=0;iteration<100;iteration++){
  const gradient=weights.map(w=>0.04*w);
  for(const episode of memory){const x=features(episode),error=sigmoid(dot(weights,x))-episode.outcome;for(let i=0;i<5;i++)gradient[i]+=error*x[i]/memory.length;}
  for(let i=0;i<5;i++)weights[i]-=0.3*gradient[i];
 }
 return {kind:'retained-memory-logistic-v1',weights,examples:memory.length,iterations:memory.length?100:0};
}
export function estimate(model,memory,context){
 const x=features(context),probability=sigmoid(dot(model.weights,x));
 const support=memory.reduce((sum,m)=>sum+(m.task===context.task?Math.exp(-4*((m.energy-context.energy)**2+(m.fatigue-context.fatigue)**2+(m.difficulty-context.difficulty)**2)):0),0);
 // A bounded epistemic proxy, not a calibrated confidence interval.
 return {probability,uncertainty:1/Math.sqrt(1+support),support};
}
const distance=(a,b)=>(a.task!==b.task?1:0)+(a.energy-b.energy)**2+(a.fatigue-b.fatigue)**2+(a.difficulty-b.difficulty)**2;
export function retain(memory,episode,budget,policy,randomValue){
 const pool=[...memory,episode];
 if(pool.length<=budget)return {memory:pool,decision:{kept:true,removed:null,reason:'space-available',scores:[]}};
 let removed;
 const scored=pool.map((m,i)=>{const novelty=Math.min(...pool.filter((_,j)=>j!==i).map(x=>distance(m,x)));const contradiction=Math.abs(m.predicted-m.outcome);return {id:m.id,score:contradiction+0.3*novelty+0.02*i/pool.length,contradiction,novelty};});
 if(policy==='recent')removed=0;
 else if(policy==='reservoir'){
  const candidate=Math.floor(randomValue*episode.id);
  removed=candidate<budget?candidate:pool.length-1;
 }else{
  // Fresh strong contradictions are protected for at least this retention step.
  const protectedNew=Math.abs(episode.predicted-episode.outcome)>.55;
  const candidates=scored.map((s,i)=>({...s,index:i})).filter(s=>!(protectedNew&&s.index===pool.length-1));
  candidates.sort((a,b)=>a.score-b.score||a.id-b.id);removed=candidates[0].index;
 }
 const id=pool[removed].id;
 return {memory:pool.filter((_,i)=>i!==removed),decision:{kept:id!==episode.id,removed:id,reason:policy==='selective'?'surprise-and-coverage':policy,scores:scored}};
}

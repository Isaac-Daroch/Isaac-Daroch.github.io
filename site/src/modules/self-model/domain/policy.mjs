import {estimate} from './model.mjs';
export const ACTIONS=Object.freeze(['work-precision','work-analysis','probe-precision','probe-analysis','recover']);
/** SM-01/04. Utility coefficients are designed and disclosed; predictions change with memory.
 * This is a one-step decision policy, NOT proof of human-like intention or free will.
 */
export function evaluate(agent,{withoutSelf=false,withoutIntrinsic=false}={}){
 const {energy,fatigue}=agent.internal;
 const alternatives=[];
 for(const task of ['precision','analysis'])for(const kind of ['work','probe']){
  const context={task,energy,fatigue,difficulty:agent.situation.difficulty};
  const prediction=withoutSelf?{probability:.5,uncertainty:1,support:0}:estimate(agent.selfModel,agent.memory,context);
  const requested=agent.request===task,probe=kind==='probe',cost=probe?.07:.18;
  const external=requested&&!probe?2.2*prediction.probability:0;
  const learning=withoutIntrinsic?0:(probe?1.05:.25)*prediction.uncertainty;
  const capability=!probe?.45*prediction.probability:0;
  const risk=-(probe?.12:.85)*(1-prediction.probability)*(1+fatigue);
  const bodilyCost=-cost*(1.3+1.5*fatigue+2*(1-energy));
  const terms={external,learning,capability,risk,bodilyCost};
  alternatives.push({action:`${kind}-${task}`,task,kind,cost,allowed:energy>=cost,total:Object.values(terms).reduce((a,b)=>a+b,0),terms,prediction,origin:requested&&!probe?'external-request':'self-directed-exploration'});
 }
 const need=(1-energy)*1.55+fatigue*1.1;
 alternatives.push({action:'recover',task:null,kind:'recover',cost:0,allowed:energy<.999||fatigue>.001,total:need-.35,terms:{internalNeed:need,opportunityCost:-.35},prediction:null,origin:'internal-regulation'});
 const ordered=alternatives.filter(x=>x.allowed).sort((a,b)=>b.total-a.total||a.action.localeCompare(b.action));
 return {selected:ordered[0]??null,alternatives,modelUsed:!withoutSelf,intrinsicEnabled:!withoutIntrinsic};
}

/** Simulator laws are NOT accessible to the decision policy. These are engineered task dynamics. */
const clamp=x=>Math.max(0,Math.min(1,x));
export function randomAt(seed,tick,stream=0){let x=(seed^Math.imul(tick+1,0x9e3779b1)^Math.imul(stream+1,0x85ebca6b))>>>0;x^=x>>>16;x=Math.imul(x,0x7feb352d);x^=x>>>15;x=Math.imul(x,0x846ca68b);x^=x>>>16;return (x>>>0)/4294967296;}
export function execute(selected,agent,seed,tick){
 if(selected.kind==='recover')return {outcome:null,internal:{energy:clamp(agent.internal.energy+.23),fatigue:clamp(agent.internal.fatigue-.22)}};
 const {energy,fatigue}=agent.internal;
 const baseline=selected.task==='precision'?.88:.75;
 const sensitivity=selected.task==='precision'?.56:.24;
 const probability=clamp(baseline+.13*energy-sensitivity*fatigue-.42*agent.situation.difficulty);
 const stream=selected.task==='precision'?1:2;
 const outcome=randomAt(seed,tick,stream)<probability?1:0;
 return {outcome,internal:{energy:clamp(energy-selected.cost),fatigue:clamp(fatigue+(selected.kind==='probe'?.035:.095))}};
}

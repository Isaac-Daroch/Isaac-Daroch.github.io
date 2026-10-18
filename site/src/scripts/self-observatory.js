import {SelfModelSession} from '../modules/self-model/index.mjs';
const host=document.getElementById('self-observatory');
if(host){
 let session=new SelfModelSession();
 const get=id=>host.querySelector('#'+id);
 const number=n=>Number(n).toFixed(3);
 function render(message){
  const state=session.snapshot();
  get('self-metrics').replaceChildren();
  for(const [name,value] of [['Decisions',state.tick],['Energy',number(state.internal.energy)],['Fatigue',number(state.internal.fatigue)],['Retained experiences',state.memory.length]]){
   const item=document.createElement('div'),term=document.createElement('dt'),definition=document.createElement('dd');
   term.textContent=name;definition.textContent=String(value);item.append(term,definition);get('self-metrics').append(item);
  }
  get('self-alternatives').replaceChildren();
  for(const alternative of state.decision.alternatives){
   const row=document.createElement('tr');
   for(const [index,value] of [alternative.action,alternative.origin,Object.entries(alternative.terms).map(([key,val])=>key+': '+number(val)).join('; '),number(alternative.total)].entries()){
    const cell=document.createElement(index===0?'th':'td');if(index===0)cell.scope='row';cell.textContent=value;row.append(cell);
   }
   get('self-alternatives').append(row);
  }
  get('self-state').textContent=JSON.stringify({memory:state.memory,selfModel:state.selfModel},null,2);
  get('self-request').value=state.request;get('self-status').textContent=message;
  get('self-step').disabled=state.commandCount>=512;get('self-request').disabled=state.commandCount>=512;
 }
 function act(action){try{action();render('Current decision: '+session.snapshot().decision.selected.action+'.');}catch{get('self-status').textContent='The simulation reached its bounded command limit. Reset to begin a new session.';}}
 get('self-step').addEventListener('click',()=>act(()=>session.step()));
 get('self-request').addEventListener('change',event=>act(()=>session.command({type:'request',task:event.target.value})));
 get('self-reset').addEventListener('click',()=>{session=new SelfModelSession();render('Observatory reset.');});
 for(const control of host.querySelectorAll('button,select'))control.disabled=false;
 get('self-startup').hidden=true;render('Ready. Choose One decision to inspect a step.');host.dataset.ready='true';
}

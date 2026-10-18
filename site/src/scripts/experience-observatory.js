import {initObservatoryStudio} from './observatory-studio.js';
import {ExperienceAgent,predict,replay,MAX_BYTES} from '../modules/experience-agent/index.mjs';
import {UI,localeOf,actionKey} from '../../public/assets/i18n.mjs';
const root=document.getElementById('self-observatory');
if(root){
 const locale=localeOf(location.pathname),t=UI[locale],$=id=>root.querySelector('#'+id),format=new Intl.NumberFormat(locale,{maximumFractionDigits:3}),percent=new Intl.NumberFormat(locale,{style:'percent',maximumFractionDigits:1});
 let session=new ExperienceAgent(),importRevision=0;
 const el=(tag,text,cls)=>{const element=document.createElement(tag);if(text!==undefined)element.textContent=String(text);if(cls)element.className=cls;return element;};
 const name=action=>t[actionKey(action)];
 const studio=initObservatoryStudio(root,{snapshot:()=>session.snapshot(),export:()=>session.export(),step:()=>act(()=>session.step()),command:command=>act(()=>session.command(command))});
 function draw(message){
  const state=session.snapshot();
  $('self-metrics').replaceChildren();
  for(const [label,value] of [[t.step,state.tick],[t.energy,percent.format(state.internal.energy)],[t.fatigue,percent.format(state.internal.fatigue)],[t.memory,`${state.memory.length} / ${state.config.budget}`]]){const item=el('div');item.append(el('dt',label),el('dd',value));$('self-metrics').append(item);}
  for(const key of ['energy','fatigue'])$('self-'+key).value=String(Math.round(state.internal[key]*100));
  for(const key of ['difficulty','selfInfluence'])$('self-'+key).value=String(Math.round(state[key]*100));$('self-request').value=state.request;
  $('self-predictions').replaceChildren();
  for(const task of ['precision','analysis']){const prediction=predict(state.model,state.memory,{task,...state.internal,difficulty:state.difficulty}),item=el('div','', 'prediction-item');item.append(el('h4',t[task]));const label=el('label',t.learned+' · '+percent.format(prediction.probability)),meter=el('meter');meter.min=0;meter.max=1;meter.value=prediction.probability;label.append(meter);item.append(label,el('p',`${t.uncertainty}: ${format.format(prediction.uncertainty)}`));$('self-predictions').append(item);}
  $('self-alternatives').replaceChildren();
  for(const alternative of [...state.decision.alternatives].sort((a,b)=>b.total-a.total)){
   const selected=alternative.action===state.decision.selected.action,card=el('article','', 'alternative-row');card.dataset.selected=String(selected);
   const head=el('div','', 'alternative-head');head.append(el('h4',name(alternative.action)),el('strong',format.format(alternative.total),'utility-value'));
   if(selected)head.append(el('span',t.selected,'badge'));if(!alternative.allowed)head.append(el('span',t.notAllowed,'badge'));
   const details=el('details'),summary=el('summary',t.score),list=el('dl','', 'utility-terms');for(const [key,value] of Object.entries(alternative.terms)){const item=el('div');const bar=el('span','', 'utility-bar');bar.style.width=Math.min(100,Math.abs(value)/2.5*100)+'%';bar.dataset.sign=value<0?'negative':'positive';bar.setAttribute('aria-hidden','true');item.append(el('dt',t[key]),el('dd',format.format(value)),bar);list.append(item);}details.append(summary,list);card.append(head,details);$('self-alternatives').append(card);
  }
  $('self-comparison').replaceChildren();for(const [key,comparison] of Object.entries(session.compare())){const item=el('div','', 'comparison-card');item.append(el('h4',t[key]),el('p',name(comparison.selected.action)),el('small',`${t.score}: ${format.format(comparison.selected.total)}`));$('self-comparison').append(item);}
  $('self-memory').replaceChildren();if(!state.memory.length)$('self-memory').append(el('li',t.emptyMemory));
  for(const memory of [...state.memory].reverse()){const item=el('li'),head=el('strong',`#${memory.id} · ${t[memory.task]} · ${memory.outcome?t.success:t.failure}`);const info=el('p',`${t.energy}: ${percent.format(memory.energy)} · ${t.fatigue}: ${percent.format(memory.fatigue)} · ${t.difficulty}: ${percent.format(memory.difficulty)}`);const button=el('button',`${t.forget} #${memory.id}`);button.dataset.noSpeech='';button.addEventListener('click',()=>{session.command({type:'forget',id:memory.id});draw(t.memory+': '+session.snapshot().memory.length);const heading=$('memory-heading');heading.tabIndex=-1;heading.focus();});item.append(head,info,button);$('self-memory').append(item);}
  $('self-journal').replaceChildren();for(const event of [...state.events].filter(e=>e.type==='decision').reverse()){const item=el('li');item.append(el('strong',`${t.step} ${event.tick} · ${name(event.action)}`),el('p',event.outcome===null?t.recovery:event.outcome?t.success:t.failure));if(event.retention)item.append(el('small',`${t.memory}: ${event.retention.kept?'✓':'−'} · ${t.score}: ${format.format(event.total)}`));$('self-journal').append(item);}
  root.querySelectorAll('[aria-invalid]').forEach(input=>{input.removeAttribute('aria-invalid');input.removeAttribute('aria-describedby');});$('self-input-error').textContent='';
  $('self-status').textContent=message;studio.render(state);
  const limited=state.commandCount>=512;for(const id of ['self-step','self-run','self-apply'])$(id).disabled=limited;
 }
 function act(operation){try{operation();draw(name(session.snapshot().decision.selected.action));}catch{$('self-status').textContent=t.agentLimit;}}
 $('self-step').addEventListener('click',()=>act(()=>session.step()));$('self-run').addEventListener('click',()=>act(()=>session.run(Math.min(12,512-session.snapshot().commandCount))));
 $('self-reset').addEventListener('click',()=>{studio.pause();session=new ExperienceAgent();draw(t.agentReady);});
 $('self-state-form').addEventListener('submit',event=>{event.preventDefault();const values={};let invalid=null;for(const key of ['energy','fatigue','difficulty','selfInfluence']){const input=$('self-'+key),value=input.value.trim()===''?NaN:Number(input.value);if(!Number.isFinite(value)||value<0||value>100){input.setAttribute('aria-invalid','true');input.setAttribute('aria-describedby','self-input-error');invalid??=input;}else{input.removeAttribute('aria-invalid');input.removeAttribute('aria-describedby');values[key]=value/100;}}
  $('self-input-error').textContent=invalid?t.invalidState:'';if(invalid){invalid.focus();return;}act(()=>session.command({type:'situation',...values,request:$('self-request').value}));
 });
 $('self-export').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(session.export(),null,2)],{type:'application/json'}));const anchor=el('a');anchor.href=url;anchor.download='isaac-experience-agent-v1.json';document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 $('self-import').addEventListener('change',async()=>{const revision=++importRevision;try{const file=$('self-import').files?.[0];if(!file)return;if(file.size>MAX_BYTES)throw new Error('FILE_TOO_LARGE');const text=await file.text();if(revision!==importRevision)return;replay(text);$('self-import-status').textContent=t.verified;}catch{if(revision===importRevision)$('self-import-status').textContent=t.rejected;}});
 root.querySelectorAll('button,input,select').forEach(control=>control.disabled=false);$('self-startup').hidden=true;draw(t.agentReady);root.dataset.ready='true';
}

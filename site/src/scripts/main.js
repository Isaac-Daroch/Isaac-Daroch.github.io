import {initMotion} from './motion.js';
initMotion();
// Preferences are initialized by the same public module in Astro and Quarto.
const disclosure=document.querySelector('#mobile-navigation');
if(disclosure)document.addEventListener('keydown',event=>{if(event.key==='Escape'&&disclosure.open){disclosure.open=false;disclosure.querySelector('summary').focus();}});
if(document.querySelector('#agent-lab'))import('../modules/agent-lab/adapters/browser/laboratory.js').then(m=>m.mountLaboratory()).catch(error=>{console.error('Laboratory initialization failed.',error);const notice=document.querySelector('#lab-startup');if(notice)notice.hidden=false;});
for(const button of document.querySelectorAll('[data-copy-target]')){button.disabled=false;button.addEventListener('click',async()=>{const target=document.getElementById(button.dataset.copyTarget),output=document.getElementById(button.dataset.copyStatus);if(!target||!output)return;try{await navigator.clipboard.writeText(target.textContent);output.textContent=document.documentElement.lang==='es'?'Contenido copiado.':'Content copied.';}catch{output.textContent=document.documentElement.lang==='es'?'No se pudo copiar automáticamente. Selecciona el texto visible y cópialo manualmente.':'Automatic copy failed. Select the visible text and copy it manually.';}});}

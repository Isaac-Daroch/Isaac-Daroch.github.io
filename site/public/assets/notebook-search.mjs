import {UI,localeOf,href} from './i18n.mjs';
const locale=localeOf(location.pathname),t=UI[locale];
/** Progressive enhancement for the existing Quarto full-text index. */
const form=document.querySelector('[data-notebook-search]');
if(form){
 const field=form.querySelector('input'),status=document.getElementById('notebook-search-status'),results=document.getElementById('notebook-search-results');
 let index=null,revision=0;
 async function search(updateUrl=false){
  const current=++revision,query=field.value.trim();results.replaceChildren();
  if(updateUrl){const url=new URL(location.href);if(query)url.searchParams.set('query',query);else url.searchParams.delete('query');history.pushState(null,'',url);}
  if(!query){status.textContent=t.searchIdle;return;}
  status.textContent=t.searchLoading;
  try{
   if(index===null){const response=await fetch(href(locale,'research')+'search.json');if(!response.ok)throw new Error('INDEX_UNAVAILABLE');const data=await response.json();if(!Array.isArray(data))throw new Error('INDEX_INVALID');index=data.filter(item=>typeof item.title==='string'&&typeof item.text==='string'&&typeof item.href==='string');}
   if(current!==revision)return;
   const matches=index.filter(item=>(item.title+' '+item.text).toLocaleLowerCase(locale).includes(query.toLocaleLowerCase(locale)));
   for(const item of matches){const url=new URL(item.href,location.origin+href(locale,'research'));if(url.origin!==location.origin||!url.pathname.startsWith(href(locale,'research')))continue;const li=document.createElement('li'),a=document.createElement('a'),p=document.createElement('p');a.href=url.pathname+url.hash;a.textContent=item.title;p.textContent=item.text.slice(0,230)+(item.text.length>230?'…':'');li.append(a,p);results.append(li);}
   status.textContent=results.children.length?`${results.children.length} ${t.searchFound}.`:t.searchEmpty;
  }catch{if(current===revision)status.textContent=t.searchFail;}
 }
 form.querySelectorAll('button,input').forEach(el=>el.disabled=false);
 form.addEventListener('submit',event=>{event.preventDefault();search(true);});
 form.querySelector('[data-clear-search]').addEventListener('click',()=>{field.value='';search(true);});
 window.addEventListener('popstate',()=>{field.value=new URL(location.href).searchParams.get('query')||'';search();});
 field.value=new URL(location.href).searchParams.get('query')||'';if(field.value)search();
}

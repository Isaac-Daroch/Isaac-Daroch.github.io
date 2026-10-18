const cv=document.querySelector('[data-cv]');
if(cv){
 const filter=cv.querySelector('#cv-filter'),query=cv.querySelector('#cv-query'),status=cv.querySelector('#cv-status'),entries=[...cv.querySelectorAll('[data-cv-entry]')];
 const normal=value=>value.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLocaleLowerCase(document.documentElement.lang);
 const update=()=>{const term=normal(query.value.trim());let count=0;for(const entry of entries){entry.hidden=(filter.value!=='all'&&entry.dataset.category!==filter.value)||!normal(entry.textContent).includes(term);if(!entry.hidden)count++;}status.textContent=count?`${count} ${cv.dataset.countLabel}`:cv.dataset.emptyLabel;};
 filter.disabled=false;query.disabled=false;filter.addEventListener('change',update);query.addEventListener('input',update);
 const reveal=()=>{const id=decodeURIComponent(location.hash.slice(1));if(!id.startsWith('cv-'))return;const target=entries.find(e=>e.id===id);if(!target)return;filter.value='all';query.value='';update();target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.scrollIntoView({block:'start',behavior:'instant'});};
 window.addEventListener('hashchange',reveal);if(location.hash)reveal();
 const print=cv.querySelector('[data-cv-print]');print.disabled=false;print.addEventListener('click',()=>window.print());
}

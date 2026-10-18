/** Compatibility adapter for the retained BFS experiment; one effective policy only. */
export const isReduced=()=>document.documentElement.dataset.motion!=='standard';
let initialized=false;
export function initMotion(){if(initialized)return;initialized=true;const notify=()=>window.dispatchEvent(new CustomEvent('site:motion',{detail:{reduced:isReduced()}}));window.addEventListener('site:preferences',notify);notify();}

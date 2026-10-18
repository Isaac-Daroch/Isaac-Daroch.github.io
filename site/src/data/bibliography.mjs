/** Same plain-text citation for downloads and the selectable HTML fallback. */
export function formatBibliography(items){
 const safe=value=>String(value||'').replace(/[{}\r\n]/g,' ');
 return items.filter(p=>p.status!=='draft').map(p=>`@article{${p.id},
  author = {${p.authors.map(a=>'{'+safe(a)+'}').join(' and ')}},
  title = {${safe(p.title)}},
  journal = {${safe(p.journal)}},
  year = {${p.year}},
  volume = {${safe(p.volume)}},
  number = {${safe(p.number)}},
  pages = {${safe(p.articleNumber)}},
  doi = {${p.doi}},
  url = {${p.evidenceUrl}}
}`).join('\n\n')+'\n';
}

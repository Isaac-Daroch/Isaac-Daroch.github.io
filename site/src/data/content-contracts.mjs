/** Structural checks are publication gates, not human scientific or media review. */
const text=(value,label)=>{if(typeof value!=='string'||!value.trim()||/\bTODO\b/.test(value))throw new Error('Missing or placeholder '+label);};
const url=(value,label)=>{if(typeof value!=='string'||!value.startsWith('https://')||new URL(value).hash==='#')throw new Error('Invalid '+label);};
const date=(value,label)=>{if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value)||Number.isNaN(Date.parse(value))||new Date(value).toISOString().slice(0,10)!==value)throw new Error('Invalid '+label);};
export function validatePublished(items){
 for(const item of items.filter(p=>p.status!=='draft')){
  for(const key of ['language','summary','provenance'])text(item[key],key);
  if(!['en','es'].includes(item.language)||!['preprint','submitted','accepted','published','unconfirmed'].includes(item.publicationStatus))throw new Error('Invalid publication language or status');
  if(item.publicationStatus!=='unconfirmed')date(item.verifiedAt,'publication verification');
  if(item.codeUrl!==null)url(item.codeUrl,'code URL');
 }
 return items;
}
export function validateEditorial(catalog){
 for(const type of ['events','news','media']){
  if(!Array.isArray(catalog[type]))throw new Error('Missing archive '+type);
  const ids=new Set();
  for(const item of catalog[type]){
   if(item.status==='draft')continue;
   for(const key of ['id','title','language'])text(item[key],key);
   if(ids.has(item.id))throw new Error('Duplicate '+type+' ID');ids.add(item.id);
   url(item.sourceUrl,'source');date(item.verifiedAt,'source verification');
   if(type==='events'){for(const key of ['place','role','description'])text(item[key],key);date(item.startsAt,'event start');date(item.endsAt,'event end');if(item.endsAt<item.startsAt)throw new Error('Event end precedes start');}
   if(type==='news'){for(const key of ['summary','commentary'])text(item[key],key);for(const key of ['eventDate','publishedAt'])date(item[key],key);}
   if(type==='media'){for(const key of ['context','transcriptUrl','kind'])text(item[key],key);if(item.reviewStatus!=='human-reviewed')throw new Error('Media alternatives require human review');if(!['audio','silent-video','video','live'].includes(item.kind))throw new Error('Invalid media kind');if(['video','live'].includes(item.kind)&&!item.captionsUrl)throw new Error('Missing captions');if(item.kind==='video'&&!item.descriptionUrl&&!item.narrationCoverageReview)throw new Error('Missing visual-description review');}
  }
 }
 return catalog;
}

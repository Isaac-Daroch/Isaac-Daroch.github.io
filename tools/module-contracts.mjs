import {LOCALES} from '../site/public/assets/i18n.mjs';
export function validateModuleActivation(settings,catalog){
 for(const key of ['events','news','media']){
  if(typeof settings[key]?.enabled!=='boolean')throw new Error('Missing module switch: '+key);
  if(!settings[key].enabled)continue;
  const records=catalog[key]?.filter(item=>item.status!=='draft');if(!records?.length)throw new Error('Enabled module has no publishable material: '+key);
  const fields=['title','description',...(key==='news'?['summary','commentary']:[])];
  for(const record of records)for(const locale of LOCALES){
   for(const field of fields)if(typeof record.translations?.[locale]?.[field]!=='string'||!record.translations[locale][field].trim())throw new Error(`Missing ${key}/${record.id}/${locale}/${field}`);
   if(key==='media'){
    const alternatives=['transcriptUrl',...(['video','live'].includes(record.kind)?['captionsUrl']:[]),...(record.descriptionUrl?['descriptionUrl']:[])];
    for(const field of alternatives){const value=record.translations[locale][field];if(typeof value!=='string'||!(/^https:\/\//.test(value)||/^\/(?!\/)[^\s]*$/.test(value))||value.split('/').includes('..'))throw new Error(`Missing or unsafe ${key}/${record.id}/${locale}/${field}`);}
   }
  }
 }
 return true;
}

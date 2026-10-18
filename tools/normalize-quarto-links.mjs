import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import {renderChrome} from '../site/src/data/chrome.mjs';
import {NOTES} from '../site/src/data/notes.mjs';
import {UI} from '../site/public/assets/i18n.mjs';

/**
 * Normalize only trusted, generated anchor URLs belonging to this portfolio.
 * Quarto sources use full URLs to avoid its project-relative link rewriting.
 * Canonical/link/meta tags, external URLs and script/style contents stay intact.
 * This is an integration adapter, not an HTML sanitizer.
 */
export function normalizePortfolioAnchors(html, origin = 'https://isaac-daroch.github.io') {
  const chunks = html.split(/(<(?:script|style|textarea)\b[^>]*>[\s\S]*?<\/(?:script|style|textarea)\s*>)/gi);
  return chunks.map((chunk, index) => index % 2 ? chunk : chunk.replace(
    /<a\b[^>]*>/gi,
    tag => tag.replace(/\bhref\s*=\s*(["'])(.*?)\1/i, (attribute, quote, href) => {
      if (!href.startsWith(origin + '/')) return attribute;
      const url = new URL(href);
      if (url.origin !== origin) return attribute;
      return `href=${quote}${url.pathname}${url.search}${url.hash}${quote}`;
    }),
  )).join('');
}

export function normalizeNotebookLinks(directory,prefix='') {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) normalizeNotebookLinks(path,prefix+entry.name+'/');
    else if (entry.isFile() && entry.name.endsWith('.html')) {
      const before = readFileSync(path, 'utf8');
      const relative=prefix+entry.name,id=relative.startsWith('notes/')?entry.name.replace(/\.html$/,''):null;
      const logical=relative==='index.html'?'research':'research/'+relative;
      const title=id&&NOTES[id]?NOTES[id].title.en:UI.en.notebook;
      const chrome=renderChrome('en',logical,title,{notebook:true});
      const after = normalizeSharedAssets(normalizePortfolioAnchors(placeNotebookChrome(before,{chrome})));
      if (after !== before) writeFileSync(path, after);
    }
  }
}

/** Quarto puts body includes inside main. Move our marked, generated chrome to body landmarks. */
export function placeNotebookChrome(html,replacement={}){
 const extract=name=>{const pattern=new RegExp(`<!--portfolio-${name}-start-->([\\s\\S]*?)<!--portfolio-${name}-end-->`,'g');const matches=[...html.matchAll(pattern)];if(!matches.length)return null;if(matches.length!==1)throw new Error('Duplicate notebook chrome: '+name);html=html.replace(pattern,'');return matches[0][1];};
 const original=extract('chrome'),chrome=original===null?null:replacement.chrome??original,footer=extract('footer');
 if(chrome!==null){if(!/<body\b/i.test(html)||!/<main\b/i.test(html))throw new Error('Notebook body/main missing');const target='<div id="notebook-content-start" tabindex="-1"></div>';const cleaned=chrome.replace(/<div id="notebook-content-start" tabindex="-1"><\/div>/,'');html=html.replace(/<body\b[^>]*>/i,tag=>tag+cleaned);html=html.replace(/<main\b[^>]*>/i,tag=>tag+target);}
 if(footer!==null)html=html.replace(/<\/body>/i,footer+'</body>');
 return html;
}

/** Only these shared assets belong to the portfolio root, never the notebook root. */
export function normalizeSharedAssets(html) {
  const allowed=['paletas.css','editorial.css','preferences-runtime.mjs','notebook-search.mjs'];
  return html.replace(/<(?:link|script)\b[^>]*>/gi,tag=>tag.replace(
    /\b(href|src)=(['"])https:\/\/isaac-daroch\.github\.io\/assets\/([^'"/]+)\2/g,
    (attribute,name,quote,file)=>allowed.includes(file)?`${name}=${quote}/assets/${file}${quote}`:attribute,
  ));
}

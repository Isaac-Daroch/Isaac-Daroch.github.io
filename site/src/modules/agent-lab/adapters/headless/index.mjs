import {createEpisode} from '../../index.mjs';
/** Alternative driving adapter: reproduces commands without a browser. */
export function executeCommands(commands,config={}){const session=createEpisode(config);for(const command of commands){const result=command==='step'?session.step():command==='change-environment'?session.intervene():null;if(!result?.ok)throw new Error(result?.error.message||'Unknown headless command.');}return session.snapshot();}

import path from 'node:path';import fs from 'node:fs/promises';import {spawnSync} from 'node:child_process';import {fileURLToPath} from 'node:url';import {generateVisual} from './generate-visual.mjs';
const root=path.resolve(fileURLToPath(new URL('..',import.meta.url)));
await generateVisual(root);
const win=process.platform==='win32';const result=spawnSync(win?'cmd.exe':'npm',win?['/d','/s','/c','npm run build']:['run','build'],{cwd:path.join(root,'site'),stdio:'inherit',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'}});
if(result.status!==0)throw Error('The existing project build failed; candidate not accepted.');
console.log('V2 candidate prepared with the existing build chain. Production was not modified.');

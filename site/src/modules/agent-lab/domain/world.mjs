/** D2 / M-03. Deterministic educational domain. No browser, network or build dependencies. */
export const COLS = 16, ROWS = 10;
export const START = Object.freeze({x:2,y:5}), GOAL = Object.freeze({x:13,y:5});
export const IMPLEMENTATION_ID = 'gridworld-d2-1.1.0';
export const MAP_ID = 'corridor-16x10-d2';
export const STRATEGIES = Object.freeze(['bfs-east','bfs-north']);
export const POLICIES = Object.freeze(['revisable','frozen']);
export const MAX_TICKS = 1000;
export const key = (x,y) => `${x},${y}`;
export class LabError extends Error { constructor(code,message){ super(message); this.name='LabError'; this.code=code; } }
export function assertPoint(p){ if(!p||!Number.isInteger(p.x)||!Number.isInteger(p.y)||p.x<0||p.x>=COLS||p.y<0||p.y>=ROWS) throw new LabError('INPUT_INVALID','Coordinates must be integers inside the 16 × 10 grid.'); }
export function parseKey(value){ if(typeof value!=='string'||!/^(0|[1-9]\d*),(0|[1-9]\d*)$/.test(value))throw new LabError('INPUT_INVALID','Invalid cell key.'); const [x,y]=value.split(',').map(Number);assertPoint({x,y});return {x,y}; }
export function initialWalls(){
  // Explicit D2 fixture, reconstructed from the documented corridor experiment; not an opaque old ZIP hash.
  const walls=new Set();
  for(let x=0;x<COLS;x++){walls.add(key(x,0));walls.add(key(x,ROWS-1));}
  for(let y=0;y<ROWS;y++){walls.add(key(0,y));walls.add(key(COLS-1,y));}
  for(let y=1;y<=7;y++)if(y!==5)walls.add(key(8,y));
  return walls;
}
export function neighbors(p,strategy='bfs-east'){assertPoint(p);if(!STRATEGIES.includes(strategy))throw new LabError('INPUT_INVALID','Unknown BFS order.');let steps=[[1,0],[0,1],[-1,0],[0,-1]];if(strategy==='bfs-north')steps=steps.slice().reverse();return steps.map(([dx,dy])=>({x:p.x+dx,y:p.y+dy})).filter(q=>q.x>=0&&q.x<COLS&&q.y>=0&&q.y<ROWS);}
export function planRoute(start,goal,walls,strategy='bfs-east'){
  try{
    assertPoint(start);assertPoint(goal);if(!(walls instanceof Set))throw new LabError('INPUT_INVALID','Walls must be a Set.');for(const k of walls)parseKey(k);if(!STRATEGIES.includes(strategy))throw new LabError('INPUT_INVALID','Unknown BFS order.');
    if(walls.has(key(start.x,start.y))||walls.has(key(goal.x,goal.y)))return {status:'unreachable',path:[]};
    if(start.x===goal.x&&start.y===goal.y)return {status:'already-at-goal',path:[]};
    const queue=[{...start}],parents=new Map([[key(start.x,start.y),null]]);let head=0;
    while(head<queue.length){const p=queue[head++];for(const q of neighbors(p,strategy)){const k=key(q.x,q.y);if(walls.has(k)||parents.has(k))continue;parents.set(k,key(p.x,p.y));if(q.x===goal.x&&q.y===goal.y){const path=[];for(let v=k;parents.get(v)!==null;v=parents.get(v))path.push(parseKey(v));return {status:'found',path:path.reverse()};}queue.push(q);}}
    return {status:'unreachable',path:[]};
  }catch(error){return {status:'invalid',path:[],error:{code:'INPUT_INVALID',message:error.message}};}
}
export function configOf(options={}){if(!options||typeof options!=='object'||Array.isArray(options)||Object.keys(options).some(k=>!['strategy','policy'].includes(k)))throw new LabError('INPUT_INVALID','Unknown episode configuration.');const config={strategy:options.strategy??'bfs-east',policy:options.policy??'revisable'};if(!STRATEGIES.includes(config.strategy)||!POLICIES.includes(config.policy))throw new LabError('INPUT_INVALID','Unsupported policy or strategy.');return Object.freeze(config);}
export class World {
  #config;#agent;#true;#model;#observed;#visited;#path;#events;#commands;#metrics;#phase;#changed;#message;#updated;
  constructor(config={}){this.#config=configOf(config);this.reset();}
  reset(){this.#agent={...START};this.#true=initialWalls();this.#model=initialWalls();this.#observed=new Set();this.#visited=new Set([key(START.x,START.y)]);this.#path=[];this.#events=[];this.#commands=[];this.#metrics={actions:0,ticks:0,mismatches:0,cellRevisions:0,distinctObservedCells:0,preventedMoves:0,goalReached:false};this.#phase='ready';this.#changed=false;this.#updated=[];this.#plan();this.#record('reset','A supplied prior map is ready. No learning algorithm is trained.');return this.snapshot();}
  #plan(){this.#path=planRoute(this.#agent,GOAL,this.#model,this.#config.strategy).path;}
  #record(type,message){this.#message=message;this.#events.push({tick:this.#metrics.ticks,type,message,agent:{...this.#agent},actions:this.#metrics.actions,mismatches:this.#metrics.mismatches,revisions:this.#metrics.cellRevisions});}
  #terminal(){return ['goal','blocked','limit'].includes(this.#phase);}
  intervene(){if(this.#changed||this.#agent.x>=8||this.#terminal())return {ok:false,error:{code:'INTERVENTION_NOT_ALLOWED',message:'Change is allowed once, before the agent reaches x = 8 and before termination.'},snapshot:this.snapshot()};this.#true.add('8,5');this.#true.delete('8,7');this.#changed=true;this.#commands.push({action:'change-environment'});this.#record('operator-change','The world closes (8,5) and opens (8,7). The internal model has not been informed.');return {ok:true,snapshot:this.snapshot()};}
  step(){
    if(this.#terminal())return {ok:false,error:{code:'EPISODE_TERMINAL',message:'Episode finished. Reset to start again.'},snapshot:this.snapshot()};
    if(this.#metrics.ticks>=MAX_TICKS)return {ok:false,error:{code:'RESOURCE_LIMIT',message:'Tick limit reached.'},snapshot:this.snapshot()};
    this.#commands.push({action:'step'});this.#metrics.ticks++;this.#updated=[];
    let mismatches=0;
    for(const p of [this.#agent,...neighbors(this.#agent)]){const k=key(p.x,p.y);this.#observed.add(k);if(this.#true.has(k)!==this.#model.has(k)){mismatches++;if(this.#config.policy==='revisable'){if(this.#true.has(k))this.#model.add(k);else this.#model.delete(k);this.#updated.push(k);this.#metrics.cellRevisions++;}}}
    this.#metrics.mismatches+=mismatches;this.#metrics.distinctObservedCells=this.#observed.size;this.#plan();
    if(this.#updated.length){this.#phase='revised';this.#record('revision',`Observed a contradiction at ${this.#updated.join('; ')}. Revised the internal map and replanned; no movement on this tick.`);}
    else if(!this.#path.length){this.#phase='blocked';this.#record('blocked','No route exists in the current internal map. This baseline does not explore remote unknown openings.');}
    else {const next=this.#path[0];if(this.#true.has(key(next.x,next.y))){this.#metrics.preventedMoves++;this.#phase='blocked';this.#record('blocked','The common physical guard prevented entry into a wall. The frozen model remains unchanged.');}else{this.#agent={...next};this.#visited.add(key(next.x,next.y));this.#metrics.actions++;this.#plan();this.#phase=this.#agent.x===GOAL.x&&this.#agent.y===GOAL.y?'goal':'moving';this.#metrics.goalReached=this.#phase==='goal';this.#record(this.#phase==='goal'?'goal':'move',this.#phase==='goal'?'Goal reached. Inspect or export this episode.':`Move to (${next.x},${next.y}) using the internal map.`);}}
    if(this.#metrics.ticks===MAX_TICKS&&!this.#terminal()){this.#phase='limit';this.#record('limit','The deterministic execution budget was reached.');}
    return {ok:true,snapshot:this.snapshot()};
  }
  snapshot(){return {schema:'isaac-lab-state-v1',implementationId:IMPLEMENTATION_ID,mapId:MAP_ID,config:{...this.#config},rows:ROWS,columns:COLS,agent:{...this.#agent},goal:{...GOAL},trueWalls:[...this.#true].sort(),modelWalls:[...this.#model].sort(),observed:[...this.#observed].sort(),visited:[...this.#visited].sort(),path:this.#path.map(p=>({...p})),updated:this.#updated.slice(),changed:this.#changed,phase:this.#phase,done:this.#terminal(),message:this.#message,metrics:{...this.#metrics},events:this.#events.map(e=>({...e,agent:{...e.agent}}))};}
  exportSnapshot(){if(this.#config.policy!=='revisable')throw new LabError('SCHEMA_UNSUPPORTED','Legacy v1 is reserved for the revisable baseline. Export a v2 episode for the frozen policy.');return {schema:'isaac-gridworld-v1',disclaimer:'Educational deterministic demonstration, not trained intelligence or a scientific benchmark.',algorithm:'Supplied prior; local Manhattan-radius-1 observation; model correction; uniform-cost BFS.',parameters:{rows:ROWS,columns:COLS,start:{...START},goal:{...GOAL},sensorRadius:1,costs:'uniform',randomness:'none'},operatorChangedEnvironment:this.#changed,metrics:{actions:this.#metrics.actions,ticks:this.#metrics.ticks,mismatches:this.#metrics.mismatches,cellRevisions:this.#metrics.cellRevisions,distinctObservedCells:this.#metrics.distinctObservedCells,goalReached:this.#metrics.goalReached},finalState:{agent:{...this.#agent},trueWalls:[...this.#true].sort(),modelWalls:[...this.#model].sort(),observed:[...this.#observed].sort()},events:this.#events.filter(e=>e.type!=='limit').map(e=>({...e,agent:{...e.agent}}))};}
  exportEpisode(){return {schema:'isaac-gridworld-v2',implementationId:IMPLEMENTATION_ID,mapId:MAP_ID,config:{...this.#config},initial:{rows:ROWS,columns:COLS,start:{...START},goal:{...GOAL},trueWalls:[...initialWalls()].sort(),modelWalls:[...initialWalls()].sort(),sensorRadius:1,costs:'uniform',randomness:'none'},commands:this.#commands.map(c=>({...c})),result:this.snapshot()};}
}

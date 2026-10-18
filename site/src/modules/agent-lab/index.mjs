/** Public application facade. UI and headless adapters import only this module. */
export {createEpisode,replayEpisode,runScenario,compareRevisionPolicies,compareTieBreaks} from './application/session.mjs';
export {COLS,ROWS,START,GOAL,MAP_ID,IMPLEMENTATION_ID,STRATEGIES,POLICIES,planRoute,initialWalls,LabError} from './domain/world.mjs';
export {MAX_EPISODE_BYTES} from './contracts/episode.mjs';

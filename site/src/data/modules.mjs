import settings from './content-settings.json' with {type:'json'};
export const isEnabled=route=>settings[route]?.enabled!==false;
export const moduleSettings=settings;

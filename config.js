import env from './env';

import { setGlobalParam } from './shared/global-params';

let defaultConfig = {
  assetsPath : '/assets/',
  localesPath: '/locales/',
  proxyPath  : '/p/'
};

let developmentConfig = {
  ...defaultConfig,

  expressPort: 4000,
  webpackPort: 4001,
  serverAddress: `http://localhost:4000`,
  proxyAddress : `https://bookmate.com`
};

let productionConfig = {
  ...defaultConfig,

  expressPort: 4010,
  serverAddress: `http://localhost:4010`,   // address for server requests (express, server render)
  proxyAddress : `http://localhost:65000`,  // address for proxy requests (ruby, api)
};

let currentConfig = {};

switch (env.value) {
  case 'development':
    currentConfig = developmentConfig;
    break;
  case 'production':
    currentConfig = productionConfig;
    break;
  default:
    currentConfig = defaultConfig;
}

setGlobalParam('config', currentConfig);

export default currentConfig;

let defaultConfig = {
  assetsPath : '/assets/',
  proxyPath  : '/p/'
};

let developmentConfig = {
  ...defaultConfig,

  expressPort: 4010,
  serverAddress: 'http://localhost:4010',
  proxyAddress : `https://bookmate.com`
};

let productionConfig = {
  ...defaultConfig,

  expressPort: 4010,
  serverAddress: 'http://localhost:4010',
  proxyAddress : `http://localhost:65000`
};

export default process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;

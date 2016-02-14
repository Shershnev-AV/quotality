import env from '../env';
import config from '../config';

import colors from 'colors/safe';
import webpack from 'webpack';

import webpackConfig, { webpackServerConfig } from './webpack-config';
import localesHandler from '../server/tools/locales-handler';

let compiler       = webpack(webpackConfig);
let serverCompiler = webpack(webpackServerConfig);

let localesCompiler = {
  run() {
    config.locales.forEach(async (locale) => {
      await localesHandler.writeLocaleJsonToFile(locale);
      console.log(colors.green.bold(`Compiled locale.${locale}.build.json`));
    });
  }
}

let logError = err => {
  console.log('Error:', err);
};

let logStats = stats => {
  console.log(stats.toString({
    colors: true,
    chunkModules: false
  }));
};

let logErrorAndStats = (err, stats) => {
  err ? logError(err) : logStats(stats)
}

if (!env.isDevelopment()) {
  console.log(colors.blue.bold(`Build locales..`));
  localesCompiler.run();
}

console.log(colors.blue.bold(`Build client..`));
compiler.run(logErrorAndStats);

console.log(colors.blue.bold(`Build server..`));
serverCompiler.run(logErrorAndStats);

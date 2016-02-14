import env from '../env';
import config from '../config';

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';

import webpackEntry, { webpackServerEntry } from './webpack-entry';
import webpackLoaders, { webpackServerLoaders } from './webpack-loaders';
import webpackPlugins, { webpackServerPlugins } from './webpack-plugins';
import webpackAssets from './webpack-assets';


export default {
  entry: webpackEntry,

  resolve: {
    root: path.resolve('./'),
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: webpackLoaders
  },

  postcss: [
    autoprefixer
  ],

  output: {
    path      : path.resolve(`./build`),
    filename  : webpackAssets.getAssetsName('js'),
    publicPath: `${webpackAssets.getAssetsPath()}/`
  },

  plugins: webpackPlugins
};

export let webpackServerConfig = {
  target: 'node',
  entry: webpackServerEntry,

  resolve: {
    root: path.resolve('./'),
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: webpackServerLoaders
  },

  externals: [
    (context, request, callback) => {
      let nodeModules = fs.readdirSync('node_modules');
      let nodeModule  = request.split('/')[0];

      if (nodeModules.includes(nodeModule)) {
        return callback(null, `commonjs ${request}`);
      }

      callback();
    }
  ],

  output: {
    path    : path.resolve(`./build`),
    filename: 'server.build.js',
    publicPath: `${webpackAssets.getAssetsPath()}/`
  },

  plugins: webpackServerPlugins
};

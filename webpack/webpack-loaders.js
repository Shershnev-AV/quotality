import env from '../env';

import ExtractTextPlugin from 'extract-text-webpack-plugin';


let getJSLoader = function() {
  let loaders = ['babel-loader'];

  if (env.isDevelopment()) {
    loaders.unshift('react-hot-loader');
  }

  return loaders.join('!');
};

var getStylusLoader = function() {
  let loaders = ['css-loader?modules', 'postcss-loader', 'stylus-loader'];

  if (env.isDevelopment()) {
    loaders.unshift('style-loader');

    return loaders.join('!');
  } else {
    return ExtractTextPlugin.extract(loaders.join('!'));
  }
};

export default [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: getJSLoader()
  },
  {
    test: /\.styl$/,
    loader: getStylusLoader()
  },
  {
    test: /\.html$/,
    loader: 'raw'
  },
  {
    test: /\.(woff|jpe?g|png|gif|svg)$/,
    loader: "url-loader?limit=100000"
  },
  {
    test: /\.(woff|jpe?g|png|gif|svg)\?only-url$/,
    loader: "file-loader"
  }
];

export let webpackServerLoaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  },
  {
    test: /\.styl$/,
    loader: 'css-loader/locals?modules!stylus-loader'
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  },
];

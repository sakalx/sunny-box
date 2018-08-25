const isProd = process.env.NODE_ENV === 'production';
const sourceMap = isProd ? 'nosources-source-map' : 'eval-source-map';

const
  path = require('path'),
  webpack = require('webpack'),
  WebpackPwaManifest = require('webpack-pwa-manifest'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  FaviconWebpackPlugin = require('favicons-webpack-plugin');

const
  develop = 'src',
  production = 'public';

const
  SRC_DIR = path.join(__dirname, develop),
  DIST_DIR = path.join(__dirname, production);

//============================================================
// Plugins
const cleanFolderProd = new CleanWebpackPlugin(production);

const commonsChunk = new webpack.optimize.CommonsChunkPlugin({
  name: ['index', 'vendor'],
});

const favicon = new FaviconWebpackPlugin({
  logo: `./${develop}/static/favicon/logo.png`,
  prefix: 'favicon/',
  emitStats: false,
  inject: true,
  background: '#fff',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: true,
    opengraph: false,
    twitter: false,
    yandex: false,
    windows: true,
  },
});

const htmlIndex = new HtmlWebpackPlugin({
  template: path.join(__dirname, develop, 'index.html'),
  inject: 'body',
  hash: true,
  filename: 'index.html',
  chunks: ['index', 'vendor'],
});

const uglifyJs = new webpack.optimize.UglifyJsPlugin({
  parallel: {cache: true, workers: 2},
  sourceMap: true,
});

const pwaManifest = new WebpackPwaManifest({
  name: 'BidWin project reWriter',
  short_name: 'Sunny-box',
  description: 'Sunny-box is a next-generation of online radio!',
  background_color: '#2196f3',
  theme_color: '#2196f3',
  start_url: '/',
  icons: [
    {
      src: path.resolve(`./${develop}/static/favicon/logo.png`,),
      sizes: [96, 128, 192, 256, 384, 512],
      destination: path.join('static', 'icons')
    }
  ]
});

const definePlugin = new webpack.DefinePlugin({
  'process.env': {NODE_ENV: JSON.stringify('production')},
});

//============================================================
// Configs
const htmlConfig = {
  loader: 'html-loader',
  options: {minimize: isProd},
};

// Config img
const
  imgDev = {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'static/img/',
    },
  },
  imgProd = [
    imgDev,
    {
      loader: 'image-webpack-loader',
      options: {
        optipng: {optimizationLevel: 7},
        pngquant: {quality: '65-90', speed: 4},
        mozjpeg: {progressive: true, quality: 65},
      },
    },
  ],
  imgConfig = isProd ? imgProd : imgDev;

const
  jsonConfig = [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'static/json',
      },
    }];
//============================================================
// WebPack
const config = {
  devtool: sourceMap,

  entry: {
    vendor: ['react', 'react-dom'],
    index: SRC_DIR + '/index',
  },

  output: {
    path: DIST_DIR + '/',
    filename: 'js/[name].[chunkhash].bundle.js',
    sourceMapFilename: '[file].map',
  },

  module: {
    rules: [
      // HTML - loader
      {
        include: SRC_DIR,
        test: /\.html$/,
        use: htmlConfig,
      },
      // JS babel - loader
      {
        include: [
          path.resolve(__dirname, `${develop}`),
        ],
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
      // IMG - loader
      {
        include: path.resolve(__dirname, `${develop}/static`),
        test: /\.(jpg|png)$/,
        use: imgConfig,
      },
      // JSON - via file-loader
      {
        include: path.resolve(__dirname, `${develop}/static/json`),
        test: /\.(json)$/,
        use: jsonConfig,
      },
    ],
  },

  devServer: {
    port: 3000,
    open: true,
    inline: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  },

  // shortcuts
  resolve: {
    alias: {
      'root': path.resolve(__dirname, develop),
    },
  },

  plugins: isProd ? [
    cleanFolderProd,
    commonsChunk,
    definePlugin,
    //favicon,
    htmlIndex,
    uglifyJs,
    //pwaManifest,
  ] : [
    commonsChunk,
    htmlIndex,
  ],
};
module.exports = config;
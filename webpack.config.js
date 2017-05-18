const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { AotPlugin } = require('@ngtools/webpack');

const path = require('path');

const root = (...dir) => path.resolve(__dirname, ...dir);

const dist = root('dist');
const nodeModules = root('node_modules');
const styles = root('client', 'styles.css');

module.exports = function (env = {}) {
  const isProd = !!env.prod;
  const aot = !!env.aot;

  let config = {
    entry: {
      vendor: [
        'core-js/es6',
        'core-js/es7/reflect',
        'zone.js/dist/zone'
      ],
      styles: [
        './client/styles.css'
      ],
      main: [
        './client/bootstrap.ts'
      ]
    },
    output: {
      path: dist,
      filename: isProd ? '[name].[chunkhash:7].bundle.js' : '[name].bundle.js',
      sourceMapFilename: isProd ? undefined : '[name].map',
      chunkFilename: isProd ? '[id].[chunkhash:7].chunk.js' : '[id].chunk.js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.jade']
    },
    module: {
      rules: [
        { test: /\.ts$/, use: ['@ngtools/webpack'], exclude: [/\.(spec|e2e)\.ts$/] },
        { test: /\.html$/, use: ['raw-loader'] },
        { test: /\.jade$/, loader: 'jade-loader' },
        { test: /\.css$/, use: ['raw-loader', 'postcss-loader'], exclude: [styles] },
        { test: /\.less$/, use: ['raw-loader', 'postcss-loader', 'less-loader'] },
        { test: /\.scss$/, use: ['raw-loader', 'postcss-loader', 'sass-loader'] }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: !isProd,
        minimize: isProd,
        options: {
          context: __dirname,
        }
      }),
      new webpack.DefinePlugin({
        IS_PROD: JSON.stringify(isProd)
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['main'],
        minChunks: (module) => module.userRequest && module.userRequest.startsWith(nodeModules)
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'inline',
        minChunks: Infinity
      }),
      new AotPlugin({
        tsConfigPath: './tsconfig.json',
        mainPath: './client/bootstrap.ts',
        skipCodeGeneration: !aot
      }),
      new HtmlWebpackPlugin({
        template: './client/index.html'
      })
    ],
    devtool: !isProd ? 'source-map' : undefined,
    devServer: {
      port: 9000,
      contentBase: './client',
      historyApiFallback: true
    }
  };

  if (isProd) {
    config.module.rules.push({
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?importLoaders=1', 'postcss-loader']
      }),
      include: [styles]
    });
    config.plugins.push(new ExtractTextPlugin('[name].[chunkhash:7].css'));
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
  } else {
    config.entry.vendor.push('zone.js/dist/long-stack-trace-zone');
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader'],
      include: [styles]
    });
  }

  return config;
};

const webpack = require('webpack');

const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

let EXTENSION_ID = 'eicfkdbeghijnpejgpggddpocooghikk'; //process.env.NODE_ENV=='development' ? 'hppnppiichjojpkkkakmbdhnoabhmdji':'cifbpdjhjkopeekabdgfjgmcbcgloioi';

console.log('NODE_ENV: ' + process.env.NODE_ENV);
console.log('EXTENSION_ID: '+ EXTENSION_ID);

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  context: path.resolve(__dirname, "./src"),
  entry: {
    background: "./js/background"
  },

  output: {
    path: __dirname + '/public/assets',
    publicPath: 'chrome-extension://' + EXTENSION_ID + '/assets/',
    filename: "[name].js",
    library: "[name]"
  },
  
  resolve: {
    modules: [path.resolve(__dirname, './src/js/utils'),path.resolve(__dirname, './src/js'),path.resolve(__dirname, './src/styles'),'node_modules'],
    extensions: ['.js', '.sass']
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
         test: /\.sass$/,
         use: [
           process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
           'css-loader',
           "sass-loader"
         ]
      },
      {
        test:   /\.(png|gif|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.DefinePlugin({
      EXTENSION_ID: JSON.stringify(EXTENSION_ID)
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new CopyWebpackPlugin([
        { from: '../popup/build', to:'popup/' },
    ],{
      copyUnmodified:true
    })
  ]
};
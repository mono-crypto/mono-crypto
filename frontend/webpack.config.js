const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ESBuildPlugin } = require('esbuild-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProd = process.env.BUILD_MODE === 'production'

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, './public/'),
    filename: 'index_bundle.js'
  },
  resolve: {
    alias: {
      React: path.resolve(__dirname, './node_modules/react/'),
      ReactDOM: path.resolve(__dirname, './node_modules/react-dom/')
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx', // Or 'ts' if you don't need tsx
          target: 'es2015',
          tsconfigRaw: require('./tsconfig.json')
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/'
      }
    }
  },
  plugins: [
    new ESBuildPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}

import webpack from 'webpack'
import path from 'path'
const debug = require('debug')('app:config:webpack')

const env = process.env.NODE_ENV || 'development'
// const __DEV__ = env === 'development'
const __PROD__ = env === 'production'

debug('Creating configuration')

const webpackConfig = {
  // this is needed to resolve imports from the js root
  resolve: {
    // always import from root (src and node_modules)
    root: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ],
    extensions: ['', '.js', '.css']
  },
  /*
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  */
  // library entry point
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'tm-widgets.min.js',
  },
  // this for creating source maps
  devtool: 'source-map'
}

webpackConfig.plugins = [
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /it/)
]

webpackConfig.module = {
  loaders: []
}

// js loaders
webpackConfig.module.loaders.push({
  test: /\.(js)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    presets: ['es2015', 'stage-0']
  }
})

// sass
webpackConfig.module.loaders.push({
  test: /\.scss/,
  loader: 'style!css!sass'
})

// css loaders
webpackConfig.module.loaders.push({
  test: /\.css/,
  loader: 'style!css'
})

// fonts
webpackConfig.module.loaders.push(
  { test: /\.woff(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,
    loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,
    loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' }
)

// File loaders
webpackConfig.module.loaders.push(
  {
    test: /\.(png|jpg)$/,
    loader: 'url?limit=8192'
  }
)

if (__PROD__) {
  debug('Enabling plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}

export default webpackConfig

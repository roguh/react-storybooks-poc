const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => {
  const IS_PRODUCTION = argv.mode === 'production';

  const htmlWebpackOptions = {
    hash: IS_PRODUCTION,
    minify: IS_PRODUCTION ? {
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyJS: true,
      minifyCSS: true,
      removeComments: true,
      removeEmptyAttributes: true,
    } : false,
  };

  return {
    entry: {
      home: './src/app/home.jsx',
      map: './src/app/map.js',
      // This file is included separately in pages.
      errors: './src/app/errors.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist/public'),
      // publicPath: 'public',
      filename: '[name].js',
      // crossOriginLoading: 'anonymous',
      pathinfo: false,
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, 'src/views'),
          use: {
            loader: 'html-loader',
          },
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-transform-reserved-words',
                'transform-property-literals',
                'transform-member-expression-literals',
              ],
              presets: [
                [
                  '@babel/preset-env', {
                    useBuiltIns: 'usage',
                  },
                ],
                '@babel/react',
              ],
            },
          },
        },
        {
          test: /\.(c|sc|sa)ss$/,
          include: path.resolve(__dirname, 'src/scss'),
          use: [
            {
              loader: 'css-hot-loader',
            },
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  'node_modules/@agilemd/webui-styles',
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(['dist/public'], {
        exclude: ['fonts'],
      }),
      new HtmlWebpackPlugin(Object.assign({
        filename: 'home.html',
        template: 'src/views/home.html',
        excludeChunks: ['map'],
      }, htmlWebpackOptions)),
      new HtmlWebpackPlugin(Object.assign({
        filename: 'map.html',
        template: 'src/views/map.html',
        excludeChunks: ['home'],
      }, htmlWebpackOptions)),
      new SriPlugin({
        enabled: IS_PRODUCTION,
        hashFuncNames: ['sha256'],
      }),
      // Must come after HtmlWebpackPlugin
      new ScriptExtHtmlWebpackPlugin({
        defer: ['map.js', 'home.js'],
        defaultAttribute: 'sync',
      }),
      new MiniCssExtractPlugin({
        // contenthash not compatible with css-hot-reload
        filename: IS_PRODUCTION ? '[name].[contenthash].css' : '[name].css',
      }),
      new HotModuleReplacementPlugin(),
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        // Do not try to split errors into multiple .js files
        chunks: chunk => (
          chunk.name !== 'errors'
        ),
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      minimizer: [
        // Minimize JS
        new UglifyJsPlugin({
          parallel: true,
        }),
        // Optimize and minimize CSS with cssnano.
        // Reads project's browserslist config.
        new OptimizeCSSAssetsPlugin({
          cssProcessorPluginOptions: {
          },
        }),
      ],
    },
  };
};

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = (env) => {
    const isDevBuild = !((env && (env.prod || env.production)) || env == 'production');
    console.log('webpack start build', env, isDevBuild);
    const sharedConfig = () => ({
        mode: 'production',
        //devtool: 'source-map',
        stats: {
            modules: false
        },
        performance: {
            hints: false
        },
        resolve: { extensions: ['.js', '.vue'] },
        output: {
            filename: '[name].js',
            chunkFilename: '[name].[contenthash].js',
            publicPath: '/dist/js/',
            path: '/dist/js/',
            pathinfo: false
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: __dirname,
                    exclude: [/node_modules/, /wwwroot/]
                },
                {
                    test: /\.css$/,
                    loader: "vue-style-loader!css-loader"
                },
                { test: /\.(jpeg|jpg|gif|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
            ]
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new VueLoaderPlugin(),
            new CleanWebpackPlugin({
                verbose: true
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'disabled',
                analyzerPort: 1235
            })
        ],
        optimization: {
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            },
            minimizer: [new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                sourceMap: false,
                cache: true,
                parallel: true
            })]
        }
    });

    const outputDir = './wwwroot/dist/js';
    const clientBundleConfig = merge(sharedConfig(), {
        entry: { 'main-client': './ClientApp/client.js' },
        output: {
            path: path.join(__dirname, outputDir)
        },
        plugins: [
            new CleanWebpackPlugin({
                verbose: true
            })
        ],
        externals: 'hls.js'
    });

    return [clientBundleConfig];
}
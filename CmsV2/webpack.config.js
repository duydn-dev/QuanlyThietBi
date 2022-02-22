const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = () => {
    const sharedConfig = () => ({
        mode: 'development',
        stats: {
            modules: false
        },
        resolve: { extensions: ['.js', '.vue'] },
        output: {
            filename: '[name].js',
            publicPath: '/dist/js/'
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.vue$/,
                    loader: 'eslint-loader',
                    options: {
                        fix: false
                    }
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: __dirname,
                    exclude: [/node_modules/, /wwwroot/]
                },
                {
                    test: /\.css$/,
                    loader: 'vue-style-loader!css-loader'
                },
                { 
                    test: /\.(jpeg|jpg|gif|png|woff|woff2|eot|ttf|svg)$/, 
                    loader: 'url-loader?limit=100000' 
                }
            ]
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: false,
                debug: false
            }),
            new VueLoaderPlugin()
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
            }
        }
    });

    const clientBundleConfig = merge(sharedConfig(), {
        entry: { 'main-client': './ClientApp/client.js' },
        output: {
            path: path.join(__dirname, './wwwroot/dist/js')
        },
        externals: 'hls.js'
    });

    return [clientBundleConfig];
};
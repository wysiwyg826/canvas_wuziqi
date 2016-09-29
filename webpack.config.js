var webpack = require('webpack')
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    // entry point of our application
    entry: './index.js',
    // where to place the compiled bundle
    output: {
        path: __dirname + '/dist',
        filename: 'build.js',
        publicPath: '/dist/'
    },
    module: {
        // `loaders` is an array of loaders to use.
        // here we are only configuring vue-loader
        loaders: [{
            test: /\.html$/, // a regex for matching all files that end in `.vue`
            loader: 'html' // loader to use for matched files
        }, {
            test: /\.css$/, // a regex for matching all files that end in `.vue`
            loader: 'style!css' // loader to use for matched files
        }, {
            test: /\.(gif|jpg|png|woff|woff2|svg|eot|ttf)\??.*$/,
            loader: 'url-loader'
        }]
    }
}
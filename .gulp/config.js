let path          = require('path'),
    yargs         = require('yargs').argv,
    webpackStream = require('webpack-stream')

const dirs = {
    raw:   path.join('.', 'src'),
    build: path.join('.', 'assets')
}

const input = {
        js:   path.join(dirs.raw, 'js', '**', '*.js'),
        scss: path.join(dirs.raw, 'scss', '**', '*.scss')
    },
    output  = {
        js:   path.join(dirs.build, 'js'),
        css:  path.join(dirs.build, 'css')
    }

const webpack = {
    output: {
        filename: 'app.js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["env", "react"]
                }
            }
        ]
    },
    plugins: function () {
        if(!yargs.dev) {
            return [
                new webpackStream.webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
                new webpackStream.webpack.DefinePlugin({
                    "process.env": {
                        NODE_ENV: JSON.stringify("production")
                    }
                })
            ]
        } else {
            return []
        }
    }()
}

module.exports = {
    input,
    output,
    webpack
}
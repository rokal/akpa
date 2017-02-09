path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: "./src/main.tsx",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist"),
        publicPath: "static",
        devtoolModuleFilenameTemplate: function (info) {
            return "../" + info.resourcePath;
        }
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "cheap-module-source-map",
    debug: false,

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],

    // The following sections (node and externals) are meant for integrating
    // correctly the JSZip library in XLS-JS module 
    node: {
        fs: 'empty'
    },
    externals: [
        { './cptable': 'var cptable' },
        { './jszip': 'jszip' }
    ]
};
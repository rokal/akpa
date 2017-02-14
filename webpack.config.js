module.exports = {
    entry: "./src/main.tsx",
    output: {
        filename: "bundle.js",
        path: "/dist",
        devtoolModuleFilenameTemplate: function (info) {
            return "../" + info.resourcePath;
        }
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    debug: true,

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
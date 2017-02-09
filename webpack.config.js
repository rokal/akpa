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
    node: {
        fs: 'empty'
    },
    externals: [
        { './cptable': 'var cptable' },
        { './jszip': 'jszip' }
    ]
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM",
    // },
};
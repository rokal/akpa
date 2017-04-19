path = require('path');
const webpack = require('webpack');

/** 
 *  A note on two variables in Webpack
 *  - __dirname: This variable comes from NodeJs. It points to the location of
 *               the webpack configuration file.
 *  - process.cwd(): This function returns the current working directory of the
 *                   webpack module.
 * 
 *  In the following configuration, we assume the webpack configuration file is
 *  in the ./configs/deploy folder while the source code is in ./src and the 
 *  output will be in ./dist. This is why we are using process.cwd in the rest
 *  of the configuration below
 **/

module.exports = {
    context: path.join(process.cwd(), "src"),
    entry: "./main.tsx",
    output: {
        filename: "akpa.js",
        path: path.join(process.cwd(), "dist"),
        publicPath: "static",
        devtoolModuleFilenameTemplate: function (info) {
            if (info.resourcePath.match(".ts"+"$")==".ts" ||
                info.resourcePath.match(".tsx"+"$")==".tsx"){

                var parts = info.resourcePath.split("/");
                var goodParts = new Array();
                for (var i = parts.length - 1; i >= 0; i--){
                    if (parts[i] != "src")
                        goodParts.push(parts[i]);
                    else{
                        goodParts.push(parts[i]);
                        break;
                    }
                }
                goodParts.reverse();
                var thePath = "../";
                goodParts.forEach((element, index) => {
                    thePath = path.join(thePath, element);
                })                 
                //console.log("Path: " + thePath);
                return thePath;
            }
            else{
                return info.resourcePath;
            }
        }
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "cheap-module-source-map",
    debug: false,

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".ts", ".tsx", ".js"],       
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader?configFileName=./configs/build/tsconfig.json",
                options: {
                    configFileName : path.join(__dirname, "configs", "build", "tsconfig.json")
                },
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        })
    ],
};

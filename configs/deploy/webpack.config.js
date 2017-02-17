path = require('path');

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
        filename: "bundle.js",
        path: path.join(process.cwd(), "dist"),
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
    devtool: "source-map",
    debug: true,

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".ts", ".tsx", ".js"]
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
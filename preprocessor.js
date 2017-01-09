const tsc = require("typescript");
const tsConfig = require("./tsconfig-test.json");
const babelJest = require("babel-jest");
const jest = require("jest-cli");

// NodeJS API libraries
const pathLib = require("path");
const fs = require('fs');

module.exports = {
  process(src, path) {
      
    const isTs = path.endsWith('.ts');
    const isTsx = path.endsWith('.tsx');

    if (isTs || isTsx) {

      src = tsc.transpileModule(
        src,
        {          
          compilerOptions:tsConfig,
          fileName: path,
          reportDiagnostics: true, 
          moduleName: "myModule2"
        });

      src = src.outputText;

      if (isTsx) {        
        // Rename the .tsx file to a .jsx. Babel only accepts
        // .jsx extension
        path =  path.substr(0, path.lastIndexOf('.')) + (".jsx") || path;                
        src = babelJest.process(src, path);        
        
        // Write the Babel file to temp folder for possible debugging
        writeFile(src, path, ".jsx");
      }
      else{
        // Write the transcompile to temp folder for possible debugging
        writeFile(src, path, ".js");
      }

    }
    return src;
  },
};

  function writeFile(src, fullPath, extension)
  {
      // Build the path. This is really badly made as we don't
      // have the root directory besides using the '.'
      let pathObject = pathLib.parse(fullPath);
      let dirName = pathLib.join(".", "tests", "JsOutput");
      
      // Check the directory doesn't exists and if so, mkdir it
      if (!fs.existsSync(dirName))
      {
        fs.mkdir(dirName, function(err){
            if(err)
              return console.log(err);
        });
      }

      // Build the full path where the file will be save
      fullPath = pathLib.join(dirName, pathObject.name) + extension;

      // Write the file to the temp directory where it can be debugged
      fs.writeFile(fullPath, src, function(err) {
          if(err)
            return console.log(err);
      });
  }


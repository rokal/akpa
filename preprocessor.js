const tsc = require('typescript');
const tsConfig = require('./tsconfig-test.json');

module.exports = {
  process(src, path) {
      
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {

      let dest = tsc.transpileModule(
        src,
        {
          compilerOptions: tsConfig,
          fileName: path,
          reportDiagnostics: true, 
          moduleName: "myModule2"
        });

      // let dest = tsc.transpile(
      //   src,
      //   tsConfig.compilerOptions,
      //   path,
      //   []
      // );
      
      //console.trace("TRANSCOMPILED (" + path + "): " + dest.outputText); 
      return dest.outputText;
    }
    return src;
  },
};
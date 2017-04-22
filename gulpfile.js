var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var server = require('gulp-express');

gulp.task("webpack", function() {

    var webpack = require("gulp-webpack");
    var result = gulp.src('src/**/*.*')
        .pipe(webpack( require('./configs/deploy/webpack.config.js') ))
        .pipe(gulp.dest('./dist'));
});

// Compile Typescript project
gulp.task("compile", function() {

    var tsProject = ts.createProject("./configs/build/tsconfig.json");    
    var tsResult = tsProject
        .src()
        .pipe(sourcemaps.init())     // This means sourcemaps will be generated
        .pipe(tsProject());

    return tsResult   
        .js
        .pipe(babel({
            presets:["es2015"]        
        }))
        .pipe(sourcemaps.write(".", {sourceRoot: "../"})) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest("dist"))
});

// Compile Typescript project with tests
gulp.task("compile-test", function() {
    
    var tsTestProject = ts.createProject("./configs/build/tsconfig-test.json");
    var tsResult = tsTestProject
        .src()
        .pipe(sourcemaps.init())     // This means sourcemaps will be generated
        .pipe(tsTestProject());

    return tsResult   
        .js
        .pipe(sourcemaps.mapSources(function(sourcePath, file){
            // Gulp SourceMap is stupid. It appends extra '../' on each .ts file  
            // that we put in the .js.map. The 'substring(3)' removes these extra
            // characters until we find a logic behind this behaviour.
            return sourcePath.substring(3);  
        }))

        .pipe(sourcemaps.write(".")) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest("tests/JsOutput"))
});

// Compile server side project
gulp.task("compile-server", function() {
    
    var tsServerProject = ts.createProject("./configs/build/tsconfig-server.json");
    var tsResult = tsServerProject
        .src()
        .pipe(sourcemaps.init())     // This means sourcemaps will be generated        
        .pipe(tsServerProject());

    return tsResult   
        .js
        .pipe(sourcemaps.mapSources(function(sourcePath, file){
            // Gulp SourceMap is stupid. It appends extra '../' on each .ts file  
            // that we put in the .js.map. The 'substring(6)' removes these extra
            // characters until we find a logic behind this behaviour.
            return sourcePath.substring(6);  
        }))
        .pipe(sourcemaps.write(".")) 
        .pipe(gulp.dest("dist/server/"))
});


gulp.task("clean", function(){
    var del = require("del");
    return del([
        "dist/**/*",
        "tests/JsOutput/**/*",
  ]);
});

gulp.task("server", function() {

    // Start the server
    server.run(['./dist/server/server.js']);

    // Watch for file change and restart the server
    gulp.watch([
        "./src/server/**"], ["compile-server"]);   
});

// Start the webserver
// Don't forget to launch Chrome with --remote-debugging-port=9222
gulp.task("webserver", function() {
  
  var webserver = require("gulp-webserver");
  gulp.src("./")
    .pipe(webserver({
      host:             "localhost",
      port:             9001,
      livereload:       false,
      directoryListing: false
    }));
});

// Watch src files and what tasks to use on file changes
gulp.task("watch", function() {
    gulp.watch(["src/**.ts", "src/**.tsx"], ['compile']);
});

gulp.task("default", ["compile", "compile-test"]);

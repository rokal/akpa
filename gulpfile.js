var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var tsTestProject = ts.createProject("tsconfig-test.json");
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var webserver = require("gulp-webserver");
var gutil = require("gulp-util");

// Compile Typescript project
gulp.task("compile", function() {
    
    var tsResult = tsProject
        .src()
        .pipe(sourcemaps.init())     // This means sourcemaps will be generated
        .pipe(tsProject());

    return tsResult   
        .js
        .pipe(sourcemaps.write(".")) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest("dist"))
});

// Compile Typescript project
gulp.task("compile-test", function() {
    
    var tsResult = tsTestProject
        .src()
        .pipe(sourcemaps.init())     // This means sourcemaps will be generated
        .pipe(tsTestProject());

    return tsResult   
        .js
        .pipe(sourcemaps.write(".")) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest("tests/JestTransform"))
});

gulp.task("clean", function(){
    return del([
        "dist/**/*",
        "tests/JestTransform/**/*",
  ]);
});

// Start the webserver
// Don't forget to launch Chrome with --remote-debugging-port=9222
gulp.task("webserver", function() {
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
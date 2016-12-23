var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var sourcemaps = require('gulp-sourcemaps');
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

// Start the webserver
// Don't forget to launch Chrome with --remote-debugging-port=9222
gulp.task('webserver', function() {
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

gulp.task("default", ["compile","webserver","watch"]);
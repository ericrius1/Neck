var path = require('path');


var gulp = require('gulp');
var gutil= require('gulp-util');
var plumber = require('gulp-plumber');
var coffee = require('gulp-coffee');
var watch = require('gulp-watch')

var srcCoffeeDir = "src"
var destDir = "build/js"

var getGlob = function(glob_target) {
  var src = gulp.src(glob_target)

  //watch files and re-emit them downstream on change (or some file event)
  return src.pipe(watch())
            .pipe(plumber())
            .pipe(gutil.noop())
}

gulp.task('coffee', function(){
    var target = path.normalize(srcCoffeeDir + '/**/*.coffee');
    getGlob(target)
      .on('date', function(file){
        file.coffee_path = file.path;
      })
      .pipe(coffee({bare: true}))
        .on('error', function(error){
          gutil.log(error);
          gutil.beep();
        })
      .pipe(gulp.dest(destDir))

});

gulp.task('dev', function(){
  gulp.run('coffee')
});

gulp.task('default', function(){
  gulp.run('dev');
});
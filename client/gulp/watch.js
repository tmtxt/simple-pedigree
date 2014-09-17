var gulp = require('gulp');
var underscore = require('underscore');
var livereload = require('gulp-livereload');

gulp.task('watch', ['browserify-watch', 'less-watch'], function(){
  livereload.listen(35729);
});

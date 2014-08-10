var gulp = require('gulp');
var underscore = require('underscore');
var livereload = require('gulp-livereload');

var gLiveReload = require('./live-reload.js');
var BASE_DIR = require('./devdirs.js').BASE_DIR;

var ENABLE_WATCH = false;
exports.ENABLE_WATCH = ENABLE_WATCH;

gulp.task('watch', ['browserify-watch', 'less-watch'], function(){
  livereload.listen(35729);
});

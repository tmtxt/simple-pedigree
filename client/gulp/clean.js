var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rimraf = require('gulp-rimraf');
var underscore = require('underscore');
var fs = require('fs');

var BASE_DIR = require('./devdirs.js').BASE_DIR;
var SYMLINKS_MAPPING = require('./bower.js').SYMLINKS_MAPPING;

////////////////////////////////////////////////////////////////////////////////
// Clean all unecessary files (dist files, symlink)
gulp.task('clean', ['clean-dist', 'clean-bower', 'clean-symlink'], function(){});

// clean dist folder
gulp.task('clean-dist', function(){
  return gulp.src(BASE_DIR.dist.path, {read: false})
    .pipe(rimraf());
});

// clean bower install file
gulp.task('clean-bower', function(){
  return gulp.src(BASE_DIR.bower.path, {read: false})
    .pipe(rimraf());
});

// clean symlink
gulp.task('clean-symlink', function(cb){
  cleanSymlink(cb);
});
function cleanSymlink(cb){
  underscore.each(SYMLINKS_MAPPING, function(value, key){
    try{
      fs.unlinkSync(value);
    } catch(e){}
  });
  cb();
}

var gulp = require('gulp');

var BASE_DIR = require('./devdirs.js').BASE_DIR;

////////////////////////////////////////////////////////////////////////////////
// Copy assets file to the dist folder
gulp.task('copy-assets', function(){
  return copyAssets();
});
function copyAssets(){
  return gulp.src(BASE_DIR.source.assets.path + '/**/*.*')
    .pipe(gulp.dest(BASE_DIR.dist.assets.path));
}

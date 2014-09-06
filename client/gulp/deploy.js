var gulp = require('gulp');

// change this if you want to rename
exports.ENABLE_RENAME = false;

// DON'T CHANGE THIS
exports.ENABLE_DEBUG = true;

////////////////////////////////////////////////////////////////////////////////
// Setting up the project
gulp.task('development', ['copy-assets',
                          'copy-lib-assets',
                          'less-development',
                          'bundle-libs-manual-development',
                          'browserify-nowatch'],
          function(){});

// Setup for production (need to run after setup task)
gulp.task('production', ['copy-assets',
                         'copy-lib-assets',
                         'less-production',
                         'bundle-libs-manual-production',
                         'browserify-production'],
          function(){});

var gulp = require('gulp');

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

// aliases
gulp.task('dev', ['development']);
gulp.task('prod', ['production']);

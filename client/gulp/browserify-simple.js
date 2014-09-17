var literalify = require('literalify');
var underscore = require('underscore');
var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var gulpif = require('gulp-if');
var livereload = require('gulp-livereload');
var reactify = require('reactify');
var es6ify = require('es6ify');
var watchify = require('watchify');
var fs = require('fs');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var rename = require('gulp-rename');

var BASE_DIR = require('./devdirs.js').BASE_DIR;
var LIB_MAP = require('./config.js').LIB_MAP;
var errorHandler = require('./error-handler.js').browserifyHandler;
var gDeploy = require('./deploy.js');
var gWatch = require('./watch.js');
var gConfig = require('./config.js');

////////////////////////////////////////////////////////////////////////////////
// User config

// Browserify config
// put more config for browserify if you want
var BROWSERIFY_CONFIG = {
  basedir: BASE_DIR.name,
  paths: [BASE_DIR.source.javascript.path],
  cache: {},
  packageCache: {},
  fullPaths: true
};

var LITERALIFY_CONFIG = literalify.configure(LIB_MAP); // don't edit this line
// if you don't really know what you are doing

////////////////////////////////////////////////////////////////////////////////
// Browserify page script. The page name should be defined devfiles.js

gulp.task('browserify-pages-nowatch', function(){
  browserifyPages();
});

gulp.task('browserify-pages-watch', function(){
  gConfig.ENABLE_WATCH = true;
  browserifyPages();
});

gulp.task('browserify-pages-production', function(){
  gConfig.ENABLE_DEBUG = false;
  browserifyPages();
});

function browserifyPages(){
  var sourcePath = BASE_DIR.source.javascript.pages.path;
  var distPath = BASE_DIR.dist.javascript.pages.path;
  var pagesFolders = fs.readdirSync(sourcePath);

  // for each folder in pages, find the main.js inside that and browserify
  underscore.each(pagesFolders, function(folder){
    var stat = fs.statSync(sourcePath + '/' + folder);
    if(stat.isDirectory()) {
      var mainFile = sourcePath + '/' + folder + '/main.js';

      // start browserify
      BROWSERIFY_CONFIG.debug = gConfig.ENABLE_DEBUG;
      var b = browserify(BROWSERIFY_CONFIG);
      
      if(gConfig.ENABLE_WATCH) {
        b = watchify(b);
        b.on('update', function(){
          bundlePage(b, distPath + '/' + folder);
        });
      }

      b.transform(reactify);
      b.transform(LITERALIFY_CONFIG);
      b.add(mainFile);
      bundlePage(b, distPath + '/' + folder);
    }
  });
}

function bundlePage(b, dist){
  b.bundle()
    .on('error', errorHandler)
    .pipe(source('main.js'))
    .pipe(gulpif(gConfig.ENABLE_DEBUG === false, streamify(uglify())))
    .pipe(gulpif(gConfig.ENABLE_RENAME === true && gConfig.ENABLE_DEBUG === false,
                 streamify(rename({suffix: '.min'}))))
    .pipe(gulp.dest(dist))
    .pipe(gulpif(gConfig.ENABLE_WATCH, livereload()));
}

////////////////////////////////////////////////////////////////////////////////
// Browserify share.js
function browserifyShare(){
  BROWSERIFY_CONFIG.debug = gConfig.ENABLE_DEBUG;
  var b = browserify(BROWSERIFY_CONFIG);
  if(gConfig.ENABLE_WATCH) {
    b = watchify(b);
    b.on('update', function(){
      bundleShare(b);
    });
  }
  
  b.transform(es6ify);
  b.transform(reactify);
  b.transform(LITERALIFY_CONFIG);

  b.add(es6ify.runtime);
  b.add(BASE_DIR.source.javascript.share.path + '/share.js');

  bundleShare(b);
}

function bundleShare(b) {
  b.bundle()
    .on('error', errorHandler)
    .pipe(source('share.js'))
    .pipe(gulpif(gConfig.ENABLE_DEBUG === false, streamify(uglify())))
    .pipe(gulpif(gConfig.ENABLE_RENAME === true && gConfig.ENABLE_DEBUG === false,
                 streamify(rename({suffix: '.min'}))))
    .pipe(gulp.dest(BASE_DIR.dist.javascript.share.path))
    .pipe(gulpif(gConfig.ENABLE_WATCH, livereload()));
}

gulp.task('browserify-share-nowatch', function(){
  browserifyShare();
});

gulp.task('browserify-share-watch', function(){
  gConfig.ENABLE_WATCH = true;
  browserifyShare();
});

gulp.task('browserify-share-production', function(){
  gConfig.ENABLE_DEBUG = false;
  browserifyShare();
});

////////////////////////////////////////////////////////////////////////////////
// Browserify everything
gulp.task('browserify-nowatch', ['browserify-pages-nowatch', 'browserify-share-nowatch'], function(){});
gulp.task('browserify-watch', ['browserify-pages-watch', 'browserify-share-watch'], function(){});
gulp.task('browserify-production', ['browserify-pages-production', 'browserify-share-production'], function(){});

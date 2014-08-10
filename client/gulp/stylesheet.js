var gulp = require('gulp');
var plumber = require('gulp-plumber');
var less = require('gulp-less-sourcemap');
var livereload = require('gulp-livereload');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var underscore = require('underscore');
var fs = require('fs');
var q = require('q');
var lessc = require('less');
var path = require('path');
var util = require('gulp-util');

var BASE_DIR = require('./devdirs.js').BASE_DIR;
var lr = require('./live-reload.js');
var errorHandler = require('./error-handler.js').standardHandler;
var stylesheetWatchHandler = require('./error-handler.js').stylesheetWatchHandler;
var gDeploy = require('./deploy.js');
var gWatch = require('./watch.js');

////////////////////////////////////////////////////////////////////////////////
// LESS Parser config
var LESS_PARSER_CONFIG = {
  generateSourceMap: true,
  paths: [BASE_DIR.source.stylesheet.path]
};

function disableSourceMap(){
  gDeploy.ENABLE_DEBUG = false;
  LESS_PARSER_CONFIG.generateSourceMap = false;
}

////////////////////////////////////////////////////////////////////////////////
// Development and Production task

gulp.task('less-pages-development', ['symlink-bower-css'], function(){
  return transformLess(BASE_DIR.source.stylesheet.pages.path + '/*.less');
});

gulp.task('less-pages-production', ['symlink-bower-css'], function(){
  disableSourceMap();
  return transformLess(BASE_DIR.source.stylesheet.pages.path + '/*.less');
});

gulp.task('less-commons-development', ['symlink-bower-css'], function(){
  return transformLess(BASE_DIR.source.stylesheet.commons.path + '/common.less');
});

gulp.task('less-commons-production', ['symlink-bower-css'], function(){
  disableSourceMap();
  return transformLess(BASE_DIR.source.stylesheet.commons.path + '/common.less');
});

////////////////////////////////////////////////////////////////////////////////
// Watch tasks

gulp.task('less-commons-watch', function(){
  gDeploy.ENABLE_DEBUG = true;
  gWatch.ENABLE_WATCH = true;

  var graph = {};
  var graphRev = {};
  var promises = [];

  parseFile('common.less',
            BASE_DIR.source.stylesheet.commons.path + '/common.less',
            graph, promises);
  q.all(promises).then(function(){
    reverse(graph, graphRev);
    watch(graphRev, graph);
    util.log('Analyzing Common Less files complete. You can start working on .less files now');
  }, function(reason){
    stylesheetWatchHandler(reason);
  });
});

gulp.task('less-pages-watch', function(){
  gDeploy.ENABLE_DEBUG = true;
  gWatch.ENABLE_WATCH = true;
  
  // get list of less files in pages folder
  var pagesLessFiles = fs.readdirSync(BASE_DIR.source.stylesheet.pages.path);
  // list of promises
  var promises = [];
  // dependencies graph
  var graph = {};
  // dependencies graph in reverse order
  var graphRev = {};

  // parse all file in pages folder, each time call the parseFile function, add the
  // promise to the promises array for later use
  underscore.each(pagesLessFiles, function(file){
    var filePath = BASE_DIR.source.stylesheet.pages.path + '/' + file;
    parseFile(file, filePath, graph, promises);
  });

  // when all files have been parsed
  q.all(promises).then(function(trees){
    // calculate the dependencies graph in reverse order
    reverse(graph, graphRev);

    // start the watch process
    watch(graphRev, graph);

    util.log('Analyzing Pages Less files complete. You can start working on .less files now');
  }, function(reason){
    // print the reason
    stylesheetWatchHandler(reason);
  });
  
});

////////////////////////////////////////////////////////////////////////////////
// Combination tasks
gulp.task('less-development', ['less-commons-development',
                               'less-pages-development'], function(){});

// Used for development tasks
gulp.task('less-watch', ['less-commons-watch',
                         'less-pages-watch'], function(){});

// Used for production
gulp.task('less-production', ['less-commons-production',
                              'less-pages-production'], function(){});

////////////////////////////////////////////////////////////////////////////////
// Functions for watching files base on it dependencies

// Watching files base on the graph
function watch(graphRev, graph){
  underscore.each(graphRev, function(value, key) {
    var watcher = gulp.watch(key, function(e){
      transformLess(value);
    });
  });
}

// Transform input less files
function transformLess(input) {
  var outFolder = path.basename(path.dirname(input));
  outFolder = BASE_DIR.dist.stylesheet.path + '/' + outFolder;
  
  var stream = gulp.src(input)
    .pipe(less(LESS_PARSER_CONFIG))
    .on('error', errorHandler)
    .pipe(gulpif(gDeploy.ENABLE_DEBUG === false, minify()))
    .pipe(gulpif(gDeploy.ENABLE_RENAME === true && gDeploy.ENABLE_DEBUG === false,
                 rename({suffix: '.min'})))
    .pipe(gulp.dest(outFolder))
    .pipe(gulpif(gWatch.ENABLE_WATCH, livereload()));

  if(gWatch.ENABLE_WATCH) {
    stream.on('data', function(e){
      util.log(util.colors.green(path.basename(e.path)), 'compiled');
    });
  }
  
  return stream;
}

// Calculate the dependencies graph in reverse order
function reverse(graph, graphRev){
  underscore.each(graph, function(dependencies, file) {
    // the file is a dependency of itself, changing the file should trigger
    // compilation of that file also
    graphRev[file] = [file];
    
    underscore.each(dependencies, function(dependency){
      if(!graphRev.hasOwnProperty(dependency)) {
        // create new prop
        graphRev[dependency] = [];
      }
      if(graphRev[dependency].indexOf(file) < 0) graphRev[dependency].push(file);
    });
  });
}

// Parse the LESS file to find its dependencies
function parseFile(fileName, filePath, graph, promises) {
  // only parse if it's a .less file
  if(path.extname(fileName) === '.less') {
    // read the content
    var content = fs.readFileSync(filePath, 'utf8');

    // option for parsers
    var parser = new (lessc.Parser)({
      paths: [BASE_DIR.source.stylesheet.path,
              path.dirname(filePath)],
      filename: fileName
    });

    // create the promise to track the parse process
    var promise = q.Promise(function(resolve, reject, notify) {
      parser.parse(content, function(e, tree) {
        if(e) {
          // reject if error
          reject(e);
        } else {
          // 
          graph[filePath] = [];
          getDependencies(tree, graph[filePath]);
          resolve(tree);
        }
      });
    });

    // add to promises array
    promises.push(promise);
  }
}

// Recursively calculate the dependencies
function getDependencies(tree, dependencies) {
  var rules = tree.rules;
  underscore.each(rules, function(rule) {
    if(rule.hasOwnProperty("importedFilename")) {
      dependencies.push(BASE_DIR.name + '/' + rule.importedFilename);
      getDependencies(rule.root, dependencies);
    }
  });
}

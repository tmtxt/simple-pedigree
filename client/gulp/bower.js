var underscore = require('underscore');
var underscoreStr = require('underscore.string');
var plumber = require('gulp-plumber');
var gulp = require('gulp');
var concat = require('gulp-concat');
var bower = require('bower');
var fs = require('fs');
var path = require('path');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');

var BASE_DIR = require('./devdirs.js').BASE_DIR;
var errorHandler = require('./error-handler.js').standardHandler;
var gDeploy = require('./deploy.js');

////////////////////////////////////////////////////////////////////////////////
// CONFIG

// Bower packages' main files.
// ONLY use this if the task bundle-libraries-auto does not work for you and you
// have to use the bundle-libraries task to bundle it manually
// 
// Define the path (inside BASE_DIR) to main js executable files of the libraries
// used for bundling everything into one files
var LIBRARY_MAIN_FILES = ['bower/jquery/dist/jquery.js',
                          'bower/bootstrap/dist/js/bootstrap.js',
                          'bower/underscore/underscore.js',
                          'bower/backbone/backbone.js',
                          'bower/react/react.js',
                          'bower/backbone-react-component/lib/component.js',
                          'bower/kineticjs/kinetic.js',
                          'bower/jquery-ui/jquery-ui.js',
                          'bower/eventEmitter/EventEmitter.js'];

// Excluded libraries
// Specify the libraries name that you want to exclude when run the
// bundle-libraries-auto task
var EXCLUDED_LIBRARIES = ['holderjs'];

// Define what you want to copy from source to dist here.
// Some libraries use the relative path to assets so we need to copy it to the
// right place in dist folder (Usually under stylesheet folder)
// key: folder to copy
// value: destination to copy
var LIBRARY_ASSETS = {};
LIBRARY_ASSETS [BASE_DIR.bower.path + '/bootstrap/fonts/**/*.*'] =
  BASE_DIR.dist.stylesheet.path + '/fonts';
LIBRARY_ASSETS [BASE_DIR.bower.path + '/jquery-ui/themes/smoothness/images/**/*.*'] =
  BASE_DIR.dist.stylesheet.commons.path + '/images';

// Define the folder you want to symlink here
// symlink key -> value
// Because the symlink is system dependent so you need to use process.cwd() as
// the prefix and path.normalize()
var SYMLINKS_MAPPING = {};
SYMLINKS_MAPPING [BASE_DIR.bower.path + '/bootstrap/less'] =
  BASE_DIR.source.stylesheet.libs.path + '/bootstrap';
SYMLINKS_MAPPING [BASE_DIR.bower.path + '/jquery-ui/themes/smoothness'] =
  BASE_DIR.source.stylesheet.libs.path + '/jqueryui';
exports.SYMLINKS_MAPPING = SYMLINKS_MAPPING;

////////////////////////////////////////////////////////////////////////////////
// Auto install bower components
// Install all bower packages listed in bower.json
gulp.task('bower', function(cb){
  bower.commands.install([], {save: true}, {})
    .on('end', function(installed){
      cb();
    });
});

////////////////////////////////////////////////////////////////////////////////
// Symlink the library CSS folders to source/stylesheet/libs/
gulp.task('symlink-bower-css', ['bower'], function(cb){
  underscore.each(SYMLINKS_MAPPING, function(dest, source){
    var destFull = path.normalize(process.cwd() + '/' + dest);
    var sourceFull = path.normalize(process.cwd() + '/' + source);
    
    // check if the destination is already exist
    var stat;
    try{
      stat = fs.lstatSync(destFull);
      // exist, remove it
      fs.unlinkSync(destFull);
    } catch(e){
      // Not exist, just don't care
    }
    fs.symlinkSync(sourceFull, destFull);
  });

  // end task
  cb();
});

////////////////////////////////////////////////////////////////////////////////
// Bundling libraries into one js file

// Bundle libraries manually base on the LIBRARY_MAIN_FILES array
gulp.task('bundle-libs-manual-development', ['bower'], function(){
  return bundleLibsManual();
});

gulp.task('bundle-libs-manualy-production', ['bower'], function(){
  gDeploy.ENABLE_DEBUG = false;
  return bundleLibsManual();
});

// Bundle bower libraries automatically
gulp.task('bundle-libs-auto-development', ['bower'], function(){
  return bundleLibsAuto();
});

gulp.task('bundle-libs-auto-production', ['bower'], function(){
  gDeploy.ENABLE_DEBUG = false;
  return bundleLibsAuto();
});

function bundleLibsManual(){
  var libMainFiles = underscore.map(LIBRARY_MAIN_FILES, function(file){
    return BASE_DIR.path + '/' + file;
  });

  return bundleLibraries(libMainFiles);
}

function bundleLibsAuto(){
  var bowerFile = require(process.cwd() +'/' + BASE_DIR.path + '/bower.json');
  var bowerPackages = bowerFile.dependencies;
  var bowerDir = BASE_DIR.bower.path;
  var packagesOrder = [];
  var mainFiles = [];

  // Function for adding package name into packagesOrder array in the right order
  function addPackage(name){
    // package info and dependencies
    var info = require(process.cwd() + '/' + bowerDir + '/' + name + '/bower.json');
    var dependencies = info.dependencies;

    // add dependencies first
    if(!!dependencies){
      underscore.each(dependencies, function(value, key){
        if(EXCLUDED_LIBRARIES.indexOf(key) === -1){
          addPackage(key);
        }
      });
    }

    // and then add this package into the packagesOrder array if they are not exist yet
    if(packagesOrder.indexOf(name) === -1){
      packagesOrder.push(name);
    }
  }

  // calculate the order of packages
  underscore.each(bowerPackages, function(value, key){
    if(EXCLUDED_LIBRARIES.indexOf(key) === -1){
      addPackage(key);
    }
  });

  // get the main files of packages base on the order
  underscore.each(packagesOrder, function(bowerPackage){
    var info = require(process.cwd() + '/' + bowerDir + '/' + bowerPackage + '/bower.json');
    var main = info.main;
    var mainFile = main;

    // get only the .js file if mainFile is an array
    if(underscore.isArray(main)){
      underscore.each(main, function(file){
        if(underscoreStr.endsWith(file, '.js')){
          mainFile = file;
        }
      });
    }

    // make the full path
    mainFile = bowerDir + '/' + bowerPackage + '/' + mainFile;

    if(underscoreStr.endsWith(mainFile, '.js')){
      mainFiles.push(mainFile);
    }
  });

  // run the gulp stream
  return bundleLibraries(mainFiles);
}

function bundleLibraries(mainFiles){
  return gulp.src(mainFiles)
    .pipe(concat('libs.js'))
    .on('error', errorHandler)
    .pipe(gulpif(gDeploy.ENABLE_DEBUG === false, uglify()))
    .pipe(gulpif(gDeploy.ENABLE_RENAME === true && gDeploy.ENABLE_DEBUG === false,
                 rename({suffix: '.min'})))
    .pipe(gulp.dest(BASE_DIR.dist.javascript.libs.path));
}

////////////////////////////////////////////////////////////////////////////////
// Copy assets of libraries into the right place base on the LIBRARY_ASSETS
// object
gulp.task('copy-lib-assets', ['bower'], function(){
  underscore.each(LIBRARY_ASSETS, function(value, key){
    gulp.src(key)
      .pipe(gulp.dest(value));
  });
});

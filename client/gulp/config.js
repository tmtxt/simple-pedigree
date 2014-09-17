var BASE_DIR = require('./devdirs.js').BASE_DIR;

// Define the folder you want to symlink here
// symlink key -> value
// Because the symlink is system dependent so you need to use process.cwd() as
// the prefix and path.normalize()
var SYMLINKS_MAPPING = {};
SYMLINKS_MAPPING [BASE_DIR.bower.path] =
  BASE_DIR.source.stylesheet.libs.path +   '/bower';
exports.SYMLINKS_MAPPING = SYMLINKS_MAPPING;

// Bower packages' main files.
// ONLY use this if the task bundle-libraries-auto does not work for you and you
// have to use the bundle-libraries task to bundle it manually
// 
// Define the path (inside BASE_DIR) to main js executable files of the libraries
// used for bundling everything into one files
var LIBRARY_MAIN_FILES = ['bower/jquery/dist/jquery.js',
                          'bower/underscore/underscore.js',
                          'bower/bootstrap/dist/js/bootstrap.js',
                          'bower/react/react.js',
                          'bower/eventEmitter/EventEmitter.js',
                          'bower/masonry/dist/masonry.pkgd.js',
                          'bower/d3/d3.js',
                          'bower/q/q.js'];
exports.LIBRARY_MAIN_FILES = LIBRARY_MAIN_FILES;

// Define what you want to copy from source to dist here.
// Some libraries use the relative path to assets so we need to copy it to the
// right place in dist folder (Usually under stylesheet folder)
// key: folder to copy
// value: destination to copy
var LIBRARY_ASSETS = {};
LIBRARY_ASSETS [BASE_DIR.bower.path + '/bootstrap/fonts/**/*.*'] =
  BASE_DIR.dist.stylesheet.path + '/fonts';
LIBRARY_ASSETS [BASE_DIR.bower.path + '/fontawesome/fonts/**/*.*'] =
  BASE_DIR.dist.stylesheet.path + '/fonts';
exports.LIBRARY_ASSETS = LIBRARY_ASSETS;

// Excluded libraries
// Specify the libraries name that you want to exclude when run the
// bundle-libraries-auto task
var EXCLUDED_LIBRARIES = ['holderjs'];
exports.EXCLUDED_LIBRARIES = EXCLUDED_LIBRARIES;

// Literalify config
// Define the libraries that live in the global context here
// key: the module name to use in require('moduleName')
// value: the object that lives in global context
// To load the library: require('library_name');
var LIB_MAP = {
  'jquery': 'window.$',
  'underscore': 'window._',
  'react': 'window.React',
  'backbone': 'window.Backbone',
  'backbone-react-component': 'window.Backbone.React.Component',
  'kinetic': 'window.Kinetic',
  'document': 'window.document',
  'math': 'window.Math',
  'eventEmitter': 'window.EventEmitter',
  'd3': 'window.d3',
  'q': 'window.Q'
};
exports.LIB_MAP = LIB_MAP;

// Whether to rename the output file (add surfix .min) when run production task
exports.ENABLE_RENAME = false;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// PLEASE! DON'T CHANGE ANYTHING BELOW THIS LINE

// Enable debug mode?
exports.ENABLE_DEBUG = true;

// Enable Watch?
exports.ENABLE_WATCH = false;

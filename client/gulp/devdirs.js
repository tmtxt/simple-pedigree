var underscore = require('underscore');

////////////////////////////////////////////////////////////////////////////////
// The user config for directory
var BASE_DIR = {
  name: '.',
  path: '.',
  bower: {
    name: 'bower'
  },
  source: {
    name: 'source',
    javascript: {
      name: 'javascript',
      models: { name: 'models' },
      views: { name: 'views' },
      pages: { name: 'pages' },
      commons: { name: 'commons' },
      share: { name: 'share'}
    },
    stylesheet: {
      name: 'stylesheet',
      pages: { name: 'pages' },
      commons: { name: 'commons' },
      libs: { name: 'libs' }
    },
    assets : { name: 'assets' }
  },
  dist: {
    name: 'dist',
    javascript: {
      name: 'javascript',
      models: { name: 'models' },
      views: { name: 'views' },
      pages: { name: 'pages' },
      commons: { name: 'commons' },
      share: { name: 'share'},
      libs: { name: 'libs' },
      temp: { name: 'temp'}
    },
    stylesheet: {
      name: 'stylesheet',
      pages: { name: 'pages' },
      commons: { name: 'commons' }
    },
    assets : { name: 'assets' }
  },
  version: {
    name: 'version'
  }
};

////////////////////////////////////////////////////////////////////////////////
// OK, stop here, Don't touch the below code
// Full path
// Recursive construct path and put into BASE_DIR json
function constructPath(dir, parent){
  if(typeof dir === 'object'){
    dir.path = parent.path + '/' + dir.name;
    underscore.each(dir, function(value, key){
      constructPath(value, dir);
    });
  }
}
underscore.each(BASE_DIR, function(value, key){
  constructPath(value, BASE_DIR);
});

// Exports
exports.BASE_DIR = BASE_DIR;

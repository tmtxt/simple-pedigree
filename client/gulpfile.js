var gulp = require('gulp');

// GULP TASKS
var gBrowserify = require('./gulp/browserify-simple.js');
var gStylesheet = require('./gulp/stylesheet.js');
var gAssets = require('./gulp/assets.js');
var gBower = require('./gulp/bower.js');
var gClean = require('./gulp/clean.js');
var gVersionong = require('./gulp/versioning.js');
var gLiveReload = require('./gulp/live-reload.js');
var gWatch = require('./gulp/watch.js');
var gDeploy = require('./gulp/deploy.js');

gulp.task('default', function(){});

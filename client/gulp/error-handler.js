var Notification = require('node-notifier');
var util = require('gulp-util');

function standardHandler(err){
  // Send notification
  var notifier = new Notification();
  notifier.notify({
    message: 'Error: ' + err.message
  });

  // Log to console
  util.log(util.colors.red('Error'), err.message);
}

// Handler for browserify
function browserifyHandler(err){
  standardHandler(err);

  // End stream
  this.end();
}

// Handler for stylesheet watch
function stylesheetWatchHandler(err) {
  // Send notification
  var notifier = new Notification();
  notifier.notify({
    message: 'Error in LESS: ' + err.message
  });

  // log to console
  util.log(util.colors.red('Error'), err.message, 'Line', err.line, 'Column', err.column);
  util.log('Please fix all errors and restart gulp watch again');
}

exports.standardHandler = standardHandler;
exports.browserifyHandler = browserifyHandler;
exports.stylesheetWatchHandler = stylesheetWatchHandler;

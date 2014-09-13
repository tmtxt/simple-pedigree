// Modules
var Init = require('./init.js');
var GetData = require('./get_data.js');
var Zoom = require('./zoom.js');
var NodeMarriage = require('./node_marriage.js');
var Render = require('./render.js');

// Global Page object
var page = {
  // Configuration
  treeContainerId: null,
  defaultLinkHeight: null,
  enableMarriage: null,

  // Size
  treeWidth: null,
  treeHeight: null,
  linkHeight: null,

  // Layout
  treeLayout: null,
  diagonal: null,

  // SVG elements
  rootSvg: null,
  rootGroup: null,

  // Data
  root: null                    // The tree data
};

// Init
Init.init(page);
Zoom.init(page);
NodeMarriage.init();

// Start the application
// get the data from server and start rendering
GetData.getTreeData().then(function(data){
  // assign data to the page object
  page.root = data;
  Render.render(page);
});

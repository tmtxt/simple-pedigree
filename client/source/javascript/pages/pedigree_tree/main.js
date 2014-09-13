// libraries
var jquery = require('jquery');
var d3 = require('d3');

// other modules
var Init = require('./init.js');
var GetData = require('./get_data.js');
var Toggle = require('./toggle.js');
var Position = require('./position.js');
var Util = require('./util.js');
var Link = require('./link.js');
var NodeGroup = require('./node_group.js');
var NodeCircle = require('./node_circle.js');
var NodeName = require('./node_name.js');
var NodePicture = require('./node_picture.js');
var Config = require('./config.js');
var Zoom = require('./zoom.js');
var NodeMarriage = require('./node_marriage.js');
var Align = require('./align.js');
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
Init.init(page);

// zoom handler
Zoom.init(page.rootSvg, page.rootGroup);

// marriage info
NodeMarriage.init();

// Start the application
// get the data from server and start rendering
GetData.getTreeData().then(function(data){
  // assign data to the page object
  page.root = data;
  Render.render(page);
});

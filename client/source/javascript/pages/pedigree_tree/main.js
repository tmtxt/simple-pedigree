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

// the Page object
var page = {};
Init.init(page);

var rootSvg, rootGroup;
var root;
var rootId = window.root;
var enableMarriage = false;
var nodesList;

// create the svg tag and append to the body of the website
rootSvg = d3.select(page.treeContainerId).append("svg:svg")
  .attr("width", page.treeWidth)
  .attr("height", page.treeHeight);
rootGroup = rootSvg.append("svg:g")
  .attr("transform", "translate(" + 0 + "," + 0 + ")");

// zoom handler
Zoom.init(rootSvg, rootGroup);

// marriage info
NodeMarriage.init();

// get the data from server and start rendering
GetData.getTreeData().then(function(data){
  renderTree(data);
});

// render
function renderTree(tree) {
  root = tree;
  root.x0 = page.treeWidth / 2;
	root.y0 = 0;

  // marriage info
  jquery('.js-enable-marriage').change(function(){
    if(jquery(this).is(':checked')) {
      enableMarriage = true;
    } else {
      enableMarriage = false;
    }
    update(root);
  });

  // Initialize the display to show a few nodes.
  if(root.children)
    root.children.forEach(Toggle.toggleAll);

  // update the new position
  update(root);
}

// 
function update(source) {
  var duration = Util.getTransitionDuration();
  var nodes = page.treeLayout.nodes(root).reverse(); // compute new tree layout

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * page.linkHeight; });

	// move all the node down a bit, otherwise they will be at the border
  Position.offsetNodesPosition(nodes);

  // ENTER
  // create the node group
  var nodeGroups = NodeGroup.selectNodeGroups(rootGroup, nodes);
  var nodeEnter = NodeGroup.appendNodeGroups(nodeGroups, source);
  // create the elements inside that node group
  NodeCircle.appendCircles(nodeEnter, update);
  NodeName.appendNames(nodeEnter);
  NodePicture.appendPictures(nodeEnter);
  NodeMarriage.appendMarriage(nodeEnter);
	// compute the new tree height
  Util.updateTreeDiagramHeight(root);

	// UPDATE
  // Transition nodes to their new position.
  var nodeUpdate = NodeGroup.transitionNodeGroups(nodeGroups, duration);
  // update the node circle and text
  NodeCircle.updateCircles(nodeUpdate);
  NodeName.updateNames(nodeUpdate);

  // EXIT
  // Transition exiting nodes to the parent's new position.
  var nodeExit = NodeGroup.removeUnusedNodeGroups(nodeGroups, duration, source);

  // Update the links
  var links = Link.selectLinks(rootGroup, page.treeLayout, nodes);
  Link.createLinks(links, source, page.diagonal, duration);
  Link.transitionLinks(links, source, page.diagonal, duration);
  Link.removeUnusedLinks(links, source, page.diagonal, duration);

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

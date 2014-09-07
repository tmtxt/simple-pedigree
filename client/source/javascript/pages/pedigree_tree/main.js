// libraries
var jquery = require('jquery');
var d3 = require('d3');

// other modules
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

// the container id of the tree
var treeContainerId = "#js-tree-container";

var tree, diagonal;
var rootSvg, rootGroup;
var root;

// size of tree diagram
var treeWidth = jquery(treeContainerId).width();
var treeHeight = 1000;
var linkHeight = Config.defaultLinkHeight; // connection link height

// basic layout for the tree
// create a tree layout using d3js
tree = d3.layout.tree().size([treeWidth, treeHeight]);
diagonal = d3.svg.diagonal().projection(function(d) { return [d.x, d.y]; });

// create the svg tag and append to the body of the website
rootSvg = d3.select(treeContainerId).append("svg:svg")
  .attr("width", treeWidth)
  .attr("height", treeHeight);
rootGroup = rootSvg.append("svg:g")
  .attr("transform", "translate(" + 0 + "," + 0 + ")");

// zoom handler
Zoom.init(rootSvg, rootGroup);

// get the data from server and start rendering
GetData.getTreeData().then(function(data){
  renderTree(data);
});

// render
function renderTree(tree) {
  root = tree;
  root.x0 = treeWidth / 2;
	root.y0 = 0;

  // Initialize the display to show a few nodes.
  if(root.children)
    root.children.forEach(Toggle.toggleAll);

  // update the new position
  update(root);
}

// 
function update(source) {
  var duration = Util.getTransitionDuration();
  var nodes = tree.nodes(root).reverse(); // compute new tree layout

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * linkHeight; });

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
  var links = Link.selectLinks(rootGroup, tree, nodes);
  Link.createLinks(links, source, diagonal, duration);
  Link.transitionLinks(links, source, diagonal, duration);
  Link.removeUnusedLinks(links, source, diagonal, duration);

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}
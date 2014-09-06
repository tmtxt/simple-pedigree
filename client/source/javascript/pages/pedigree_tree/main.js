// libraries
var jquery = require('jquery');
var d3 = require('d3');

// other modules
var GetData = require('./get_data.js');
var Toggle = require('./toggle.js');
var Position = require('./position.js');
var Util = require('./util.js');
var Link = require('./link.js');

// the container id of the tree
var treeContainerId = "#js-tree-container";

var tree, diagonal;
var rootSvg, rootGroup;
var root;
var i = 0;

// size of tree diagram
var treeWidth = jquery(treeContainerId).width();
var treeHeight = 1000;
var linkHeight = 200; // connection link height

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
  var duration = d3.event && d3.event.altKey ? 5000 : 500;

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse();

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * linkHeight; });

	// move all the node down a bit, otherwise they will be at the border
  Position.offsetNodesPosition(nodes);

  // Update the data of nodes
  var node = rootGroup.selectAll("g.node")
    .data(nodes, function(d) { return d.id || (d.id = ++i); });
	
  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("svg:g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; });

  // the node
  nodeEnter.append("svg:circle")
    .attr("r", 10)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })
		.on("click", function(d) { Toggle.toggle(d); update(d); });

  // text for displaying name
  nodeEnter.append("svg:text")
  //.attr("x", function(d) { return d.children || d._children ? -10 : 10; })
    .attr("y", -19)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(function(d) { return d.name; })
    .style("fill-opacity", 1e-6)
		.on("click", function(d) {console.log(d);});

  // append picture
  nodeEnter.append("svg:image")
    .attr("xlink:href", function(d){
      return d.picture;
    })
    .attr("x", -20)
    .attr("y", -68)
    .attr("height", "40px")
    .attr("width", "40px")
    //.on("click", showNodeDialog)
  ;

	// compute the new tree height
	var maxDepth = Util.findMaxDepth(root);
	var newHeight = (maxDepth + 1) * linkHeight;
	d3.select("svg").attr("height", newHeight);
	
  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
    .duration(duration)
    .attr("transform", function(d) { 
			return "translate(" + d.x + "," + d.y + ")";
    });

  // update the node circle and text
  nodeUpdate.select("circle")
    .attr("r", 10)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
  nodeUpdate.select("text")
    .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
    .remove();

  nodeExit.select("circle")
    .attr("r", 1e-6);

  nodeExit.select("text")
    .style("fill-opacity", 1e-6);

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

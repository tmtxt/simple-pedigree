// libraries
var jquery = require('jquery');
var d3 = require('d3');

// other modules
var GetData = require('./get_data.js');

// the container id of the tree
var treeContainerId = "#js-tree-container";

var tree, diagonal, rootSvg, vis;
var nodesList;
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
vis = rootSvg.append("svg:g")
  .attr("transform", "translate(" + 0 + "," + 0 + ")");

GetData.getTreeData().then(function(data){
  renderTree(data);
});

// render
function renderTree(tree) {
  root = tree;
  root.x0 = treeWidth / 2;
	root.y0 = 0;
  
  function toggleAll(d) {
    if (d.children) {
      d.children.forEach(toggleAll);
      toggle(d);
    }
  }

  // Initialize the display to show a few nodes.
  if(root.children)
    root.children.forEach(toggleAll);

  // update the new position
  update(root);
}

function toggle(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
}

function update(source) {
  var duration = d3.event && d3.event.altKey ? 5000 : 500;

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse();
  nodesList = nodes;

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * linkHeight; });

	// update the x position
  calculateNodesPosition(treeWidth, nodes, root.x, root.y);
  // var offsetLeft = 0;
  // var ratio;
  // if(nodes.length === 1){
  //   ratio = root.x / (w/2);
  // } else {
  //   offsetLeft = d3.min(nodes, function(d) {return d.x;});
  //   offsetLeft -= 50;
  //   ratio = (root.x - offsetLeft) / (w/2);
  // }
  // nodes.forEach(function(d) {
	// 	d.x = (d.x - offsetLeft) / ratio;
  //   d.y += 80;
	// });

  // Update the nodes…
  var node = vis.selectAll("g.node")
    .data(nodes, function(d) { return d.id || (d.id = ++i); });
	
  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("svg:g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; });

  // the node
  nodeEnter.append("svg:circle")
    .attr("r", 1e-6)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })
		.on("click", function(d) { toggle(d); update(d); });

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
      // var imageLink = "/member_images/" + d.picture;
      // // check if the image exist
      // $.ajax({
      //   url: imageLink,
      //   type: 'GET',
      //   async: false,
      //   error: function(){ imageLink = "/default_member.png"; }
      // });
      // return imageLink;
    })
    .attr("x", -20)
    .attr("y", -68)
    .attr("height", "40px")
    .attr("width", "40px")
    // .on("click", showNodeDialog)
  ;

  
  // marriage pictures
  // if(marriageInfoEnable){
  //   d3.selectAll("image.node-marriage").remove();

  //   d3.selectAll("g.node")[0].forEach(function(d){
  //     var calculateLink = function(d){
  //       // var imageLink = "/member_images/" + d.marriagePicture[i];

  //       // // check if the image exist
  //       // $.ajax({
  //       //   url: imageLink,
  //       //   type: 'GET',
  //       //   async: false,
  //       //   error: function(){ imageLink = "/default_member.png"; }
  //       // });
  //       // return imageLink;
  //       return "/member_images/" + d.marriagePicture[i];
  //     };
  //     var showMarriageTooltip = function(d){
  //       var tooltipText = vis.append("svg:text")
  //         .attr("class", "marriage-tooltip")
  //         .style("opacity", 0)
  //         .attr("text-anchor", "middle")
  //         .attr("x", (parseInt(d3.select(this).attr("marriage-order")) + 1) * 40 + d.x)
  //         .attr("y", d.y - 71)
  //         .text(d3.select(this).attr("marriage-name"));
  //       tooltipText.transition().duration(500).style("opacity", 1);
  //     };
  //     var hideMarriageTooltip = function(d){
  //       d3.selectAll(".marriage-tooltip").transition().duration(1000)
  //         .style("opacity", 0).remove();
  //     };
  //     for(var i = 0; i < d.__data__.marriageId.length; i++) {
  //       d3.select(d).append("svg:image")
  //         .attr("class", "node-marriage")
  //         .attr("x", -20)
  //         .attr("y", -67)
  //         .attr("height", "40px")
  //         .attr("width", "40px")
  //         .attr("xlink:href", calculateLink)
  //         .attr("marriage-id", d.__data__.marriageId[i])
  //         .attr("marriage-name", d.__data__.marriageName[i])
  //         .attr("marriage-order", i)
  //         .on("click", showMarriageDialog)
  //         .on("mouseover", showMarriageTooltip)
  //         .on("mouseout", hideMarriageTooltip)
  //         .transition()
  //         .duration(marriageInfoEnableDuration)
  //         .attr("transform", "translate (" + (41 * (i+1)) + ",0)");
  //     }
      
  //   });
    
    
  //   // var nodeExisting = d3.selectAll("g.node").append("svg:image")
  //   //   .attr("class", "node-marriage")
  //   //   .attr("x", -20)
  //   //   .attr("y", -67)
  //   //   .attr("height", "40px")
  //   //   .attr("width", "40px")
  //   //   .attr("xlink:href", function(d){
  //   //     if(d.marriageId.length === 0){
  //   //       // remove the picture
  //   //       this.remove();
  //   //       return null;
  //   //     }
  //   //     else {
  //   //       var imageLink = "/member_images/" + d.marriagePicture;
  //   //       // check if the image exist
  //   //       $.ajax({
  //   //         url: imageLink,
  //   //         type: 'GET',
  //   //         async: false,
  //   //         error: function(){ imageLink = "/default_member.png"; }
  //   //       });
  //   //       return imageLink;
  //   //     }
  //   //   })
  //   //   .transition()
  //   //   .duration(marriageInfoEnableDuration)
  //   //   .attr("transform", "translate(50, 0)");    
    
  // } else {
  //   d3.selectAll("image.node-marriage").transition().duration(marriageInfoEnableDuration)
  //     .attr("transform", "translate(0,0)").remove();
  // }
  // marriageInfoEnableDuration = 0;
  

	// compute the new tree height
	var currentMaxDepth = 0;
	function findMaxDepth(parent){
		if(parent.children && parent.children.length > 0){
			parent.children.forEach(function(d){
				findMaxDepth(d);
			});
		} else if(parent.depth > currentMaxDepth){
			currentMaxDepth = parent.depth;
		}
	}
	findMaxDepth(root);
	var newHeight = (currentMaxDepth + 1) * linkHeight;
	d3.select("svg").attr("height", newHeight);
	
  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
    .duration(duration)
    .attr("transform", function(d) { 
			return "translate(" + d.x + "," + d.y + ")";
    });

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

  // Update the links…
  var link = vis.selectAll("path.link")
    .data(tree.links(nodes), function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("svg:path", "g")
    .attr("class", "link")
    .attr("d", function(d) {
      var o = {x: source.x0, y: source.y0};
      return diagonal({source: o, target: o});
    })
    .transition()
    .duration(duration)
    .attr("d", diagonal);

  // Transition links to their new position.
  link.transition()
    .duration(duration)
    .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
    .duration(duration)
    .attr("d", function(d) {
      var o = {x: source.x, y: source.y};
      return diagonal({source: o, target: o});
    })
    .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

function calculateNodesPosition(width, nodes, rootX){
  // var offsetLeft = 0;
  // var ratio;
  // if(nodes.length === 1){
  //   ratio = rootX / (width/2);
  // } else {
  //   offsetLeft = d3.min(nodes, function(d) {return d.x;});
  //   offsetLeft -= 50;
  //   ratio = (rootX - offsetLeft) / (width/2);
  // }
  nodes.forEach(function(d) {
		// d.x = (d.x - offsetLeft) / ratio;
    d.y += 80;
	});
}

var d3 = require('d3');

var Config = require('./config.js');

var linkHeight = Config.defaultLinkHeight;

function findMaxDepth(root) {
  var currentMaxDepth = 0;
  findMaxDepthRecursive(root);
  
  function findMaxDepthRecursive(parent) {
    if(parent.children && parent.children.length > 0){
			parent.children.forEach(function(d){
				findMaxDepthRecursive(d);
			});
		} else if(parent.depth > currentMaxDepth){
			currentMaxDepth = parent.depth;
		}
  }

  return currentMaxDepth;
}
exports.findMaxDepth = findMaxDepth;

function updateTreeDiagramHeight(root) {
  var maxDepth = findMaxDepth(root);
	var newHeight = (maxDepth + 1) * linkHeight;
	d3.select("svg").attr("height", newHeight);
}
exports.updateTreeDiagramHeight = updateTreeDiagramHeight;

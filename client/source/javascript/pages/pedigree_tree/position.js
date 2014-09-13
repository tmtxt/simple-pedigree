var d3 = require('d3');

// calculate the nodes position
function calculateNodesList(page) {
  page.nodesList = page.treeLayout.nodes(page.root).reverse();
}
exports.calculateNodesList = calculateNodesList;

// calculate the Y position of the nodes in nodesList
function calculateNodesY(page) {
  page.nodesList.forEach(function(d) { d.y = d.depth * page.linkHeight; });
}
exports.calculateNodesY = calculateNodesY;

// move all the diagram down a bit, otherwise, it would move over the upper
// border of the diagram
function offsetNodesPosition(page){
  page.nodesList.forEach(function(d) {
    // move the diagram down 80px
    d.y += 80;
	});
}
exports.offsetNodesPosition = offsetNodesPosition;

function calculatePosition(nearestNode) {
  
}
exports.calculatePosition = calculatePosition;

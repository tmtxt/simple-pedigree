var d3 = require('d3');

var Position = require('./position.js');

function reAlign(zoomListener, center, rootGroup) {
  var nearestNode = findNodeNearestToCenter(zoomListener, center);

  var translateX, translateY;
  translateX = (center.x - nearestNode.__data__.x);
  translateY = (center.y + 80 - nearestNode.__data__.y);

  rootGroup.transition().duration(500)
    .attr("transform", "translate(" + translateX + "," + translateY + ")");
  zoomListener.translate([translateX, translateY]);
  zoomListener.scale(1);

  Position.calculatePosition(nearestNode);
}
exports.reAlign = reAlign;

function findNodeNearestToCenter(zoomListener, center) {
  var nodesList =  d3.selectAll('g.node')[0];
  var nearestNode;
  var nearestDistance = 10000;  // just a very big number
  var translateX = zoomListener.translate()[0];
  var translateY = zoomListener.translate()[1];

  // if the nodesList exist
  if(nodesList.length > 0) {
    nearestNode = nodesList[0];

    nodesList.forEach(function(node) {
      var distance;
      var nodeX = node.__data__.x + translateX;
      var nodeY = node.__data__.y + translateY;
      nodeX = Math.abs(center.x - nodeX);
      nodeY = Math.abs(center.y - nodeY);
      distance = Math.sqrt(nodeX*nodeX + nodeY*nodeY);
      if(distance < nearestDistance) {
        nearestNode = node;
        nearestDistance = distance;
      }
    });
    
  }
  return nearestNode;
}

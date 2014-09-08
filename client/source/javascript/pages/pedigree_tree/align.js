exports.nodesList = null;

function reAlign(zoomListener, center, rootGroup) {
  var nodesList = exports.nodesList;
  var nearestNode = findNodeNearestToCenter(nodesList, zoomListener, center);

  var translateX, translateY;
  translateX = (center.x - nearestNode.x);
  translateY = (center.y + 80 - nearestNode.y);

  rootGroup.transition().duration(500)
    .attr("transform", "translate(" + translateX + "," + translateY + ")");
  zoomListener.translate([translateX, translateY]);
}
exports.reAlign = reAlign;

function findNodeNearestToCenter(nodesList, zoomListener, center) {
  var nearestNode;
  var nearestDistance = 10000;
  var translateX = zoomListener.translate()[0];
  var translateY = zoomListener.translate()[1];

  // if the nodesList exist
  if(nodesList.length > 0) {
    nearestNode = nodesList[0];

    nodesList.forEach(function(node) {
      var distance;
      var nodeX = node.x + translateX;
      var nodeY = node.y + translateY;
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

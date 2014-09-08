exports.nodesList = null;

function reAlign(zoomListener, center) {
  var nodesList = exports.nodesList;
  var node = findNodeNearestToCenter(nodesList, zoomListener, center);
  console.log(node);
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

function offsetNodesPosition(nodes){
  nodes.forEach(function(d) {
    // move the diagram down 80px
    d.y += 80;
	});
}
exports.offsetNodesPosition = offsetNodesPosition;

// just to create a unique id
var i = 0;

function selectNodeGroups(rootGroup, nodes) {
  var nodeGroups = rootGroup.selectAll("g.node")
    .data(nodes, function(d) { return d.id || (d.id = ++i); });
  return nodeGroups;
}
exports.selectNodeGroups = selectNodeGroups;

function appendNodeGroups(nodeGroups, source) {
  var nodeEnter = nodeGroups.enter().append("svg:g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; });
  return nodeEnter;
}
exports.appendNodeGroups = appendNodeGroups;

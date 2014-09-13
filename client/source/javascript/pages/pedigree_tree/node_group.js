// just to create a unique id
var i = 0;

function selectNodeGroups(page) {
  // select all the group <g.node> inside rootGroup and bind the data to all
  // those groups
  var nodeGroups = page.rootGroup.selectAll("g.node")
    .data(page.nodesList, function(d) { return d.id || (d.id = ++i); });
  return nodeGroups;
}
exports.selectNodeGroups = selectNodeGroups;

// append the new node group for the data bound if that node not exist
function appendNodeGroups(nodeGroups, source) {
  var nodeEnter = nodeGroups.enter().append("svg:g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; });
  return nodeEnter;
}
exports.appendNodeGroups = appendNodeGroups;

function transitionNodeGroups(nodeGroups, duration) {
  var nodeUpdate = nodeGroups.transition()
    .duration(duration)
    .attr("transform", function(d) { 
			return "translate(" + d.x + "," + d.y + ")";
    });
  return nodeUpdate;
}
exports.transitionNodeGroups = transitionNodeGroups;

function removeUnusedNodeGroups(nodeGroups, duration, source) {
  var nodeExit = nodeGroups.exit().transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
    .remove();
  return nodeExit;
}
exports.removeUnusedNodeGroups = removeUnusedNodeGroups;

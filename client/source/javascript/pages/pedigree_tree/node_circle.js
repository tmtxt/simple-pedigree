var Toggle = require('./toggle.js');
var Render = require('./render');

// append the circle to the node
function appendCircles(page, nodeEnter) {
  nodeEnter.append("svg:circle")
		.on("click", function(d) {
      Toggle.toggle(d); // toggle the node
      Render.update(page, d); // render the children
    });
}
exports.appendCircles = appendCircles;

function updateCircles(nodeUpdate) {
  nodeUpdate.select("circle")
    .attr("r", 10)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
}
exports.updateCircles = updateCircles;

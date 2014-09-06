var Toggle = require('./toggle.js');

function appendCircles(nodeEnter, update) {
  nodeEnter.append("svg:circle")
    .attr("r", 10)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })
		.on("click", function(d) { Toggle.toggle(d); update(d); });
}
exports.appendCircles = appendCircles;

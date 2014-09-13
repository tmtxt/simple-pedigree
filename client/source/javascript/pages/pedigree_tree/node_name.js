function appendNames(page, nodeEnter) {
  nodeEnter.append("svg:text");
}
exports.appendNames = appendNames;

function updateNames(page, nodeUpdate) {
  nodeUpdate.select("text")
    .text(function(d) { return d.name; })
    .attr("y", -19)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .style("fill-opacity", 1);
}
exports.updateNames = updateNames;

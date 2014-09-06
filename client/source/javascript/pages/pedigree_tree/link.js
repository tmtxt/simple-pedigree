// select all the the links and update their data using the input d3 tree and
// the nodes information
function selectLinks(rootGroup, tree, nodes){
  var links = rootGroup.selectAll("path.link")
    .data(tree.links(nodes), function(d) { return d.target.id; });

  return links;
}
exports.selectLinks = selectLinks;

function createLinks(links, source, diagonal, duration) {
  links.enter().insert("svg:path", "g")
    .attr("class", "link")
    .attr("d", function(d) {
      var o = {x: source.x0, y: source.y0};
      return diagonal({source: o, target: o});
    })
    .transition()
    .duration(duration)
    .attr("d", diagonal);
  
}
exports.createLinks = createLinks;

function transitionLinks(links, source, diagonal, duration) {
  links.transition()
    .duration(duration)
    .attr("d", diagonal);
}
exports.transitionLinks = transitionLinks;

function removeUnusedLinks(links, source, diagonal, duration) {
  links.exit().transition()
    .duration(duration)
    .attr("d", function(d) {
      var o = {x: source.x, y: source.y};
      return diagonal({source: o, target: o});
    })
    .remove();
}
exports.removeUnusedLinks = removeUnusedLinks;

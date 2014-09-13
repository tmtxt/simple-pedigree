// select all the the links and update their data using the input d3 tree and
// the nodes information
function selectLinks(page){
  var links = page.rootGroup.selectAll("path.link")
    .data(page.treeLayout.links(page.nodesList), function(d) { return d.target.id; });

  return links;
}
exports.selectLinks = selectLinks;

function createLinks(page, links, source, duration) {
  links.enter().insert("svg:path", "g")
    .attr("class", "link")
    .attr("d", function(d) {
      var o = {x: source.x0, y: source.y0};
      return page.diagonal({source: o, target: o});
    })
    .transition()
    .duration(duration)
    .attr("d", page.diagonal);
  
}
exports.createLinks = createLinks;

function transitionLinks(page, links, source, duration) {
  links.transition()
    .duration(duration)
    .attr("d", page.diagonal);
}
exports.transitionLinks = transitionLinks;

function removeUnusedLinks(page, links, source, duration) {
  links.exit().transition()
    .duration(duration)
    .attr("d", function(d) {
      var o = {x: source.x, y: source.y};
      return page.diagonal({source: o, target: o});
    })
    .remove();
}
exports.removeUnusedLinks = removeUnusedLinks;

function appendPictures(nodeEnter) {
  nodeEnter.append("svg:image")
    .attr("xlink:href", function(d){
      return d.picture;
    })
    .attr("x", -20)
    .attr("y", -68)
    .attr("height", "40px")
    .attr("width", "40px");
}
exports.appendPictures = appendPictures;

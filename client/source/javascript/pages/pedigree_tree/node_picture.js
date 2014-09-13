var Util = require('./util.js');

function appendPictures(page, nodeEnter) {
  nodeEnter.append("svg:image")
    .attr("xlink:href", function(d){
      return d.picture;
    })
    .attr("x", -20)
    .attr("y", -68)
    .attr("height", "40px")
    .attr("width", "40px")
    .on('click', function(d){
      Util.showInfoModal(d.id);
    });
}
exports.appendPictures = appendPictures;

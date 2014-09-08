var jquery = require('jquery');
var d3 = require('d3');
var underscore = require('underscore');

var Util = require('./util.js');

function init() {
  jquery('.js-enable-marriage').change(function(){
    if(jquery(this).is(':checked')) {
      enableMarriage();
    } else {
      disableMarriage();
    }
  });
}
exports.init = init;

function enableMarriage() {
  var duration = Util.getTransitionDuration();
  
  // get all visible nodes
  var nodes = d3.selectAll('g.node')[0];

  // loop
  nodes.forEach(function(node) {
    var order = 0;
    underscore.each(node.__data__.marriages, function(marriage) {
      if(!!marriage.id) {
        // append marriage info to the node group
        d3.select(node).append("svg:image")
          .attr("xlink:href", marriage.picture)
          .attr("class", "marriage-image")
          .attr("x", 0)
          .attr("y", -68)
          .attr("height", "40px")
          .attr("width", "40px")
          .datum(marriage)
          .on('click', function(d){
            Util.showInfoModal(d.id);
          })
          .transition()
          .duration(duration)
          .attr('transform', 'translate (' + ((45 * order) + 22) + ',0)');
        order = order + 1;
      }
    });
  });
}

function disableMarriage() {
  var duration = Util.getTransitionDuration();

  // remove all marriage images
  d3.selectAll('image.marriage-image')
    .transition()
    .duration(duration)
    .attr("transform", "translate(-20,0)")
    .remove();
}

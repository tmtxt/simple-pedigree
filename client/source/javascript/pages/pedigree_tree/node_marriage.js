var jquery = require('jquery');
var d3 = require('d3');
var underscore = require('underscore');

var Util = require('./util.js');
var Config = require('./config.js');

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
  Config.enableMarriage = true;
  
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
          .attr("x", -20)
          .attr("y", -68)
          .attr("height", "40px")
          .attr("width", "40px")
          .datum(marriage)
          .on('click', function(d){
            Util.showInfoModal(d.id);
          })
          .transition()
          .duration(duration)
          .attr('transform', 'translate (' + ((45 * order) + 45) + ',0)');
        order = order + 1;
      }
    });
  });
}

function disableMarriage() {
  var duration = Util.getTransitionDuration();
  Config.enableMarriage = false;

  // remove all marriage images
  d3.selectAll('image.marriage-image')
    .transition()
    .duration(duration)
    .attr("transform", "translate(0,0)")
    .remove();
}

// append marriage info to the current node
function appendMarriage(page, nodeEnter) {
  // whether marriage info is enable or not?
  if(Config.enableMarriage) {
    // get the new nodes (an array contains all the node, null for element
    // already exist)
    underscore.each(nodeEnter[0], function(node) {
      if(!!node) {
        var order = 0;
        // loop through all this node's marriages information
        underscore.each(node.__data__.marriages, function(marriage) {
          if(!!marriage.id) {
            // append marriage info to the node group
            d3.select(node).append("svg:image")
              .attr("xlink:href", marriage.picture)
              .attr("class", "marriage-image")
              .attr("x", ((45 * order) + 25))
              .attr("y", -68)
              .attr("height", "40px")
              .attr("width", "40px")
              .datum(marriage)
              .on('click', function(d){
                Util.showInfoModal(d.id);
              });
            order = order + 1;
          }
        });
        console.log(node);
      }
    });
    
  } else {
    
  }
}
exports.appendMarriage = appendMarriage;

// libraries
var d3 = require('d3');
var jquery = require('jquery');

// modules
var Align = require('./align.js');

// init
function init(page) {
  // create the zoom listener
  var zoomListener = d3.behavior.zoom()
    .scaleExtent([0.5, 1.5]);

  initEnableCheckbox(page, zoomListener);
  initResetButton(page, zoomListener);

  return zoomListener;
}
exports.init = init;

function initEnableCheckbox(page, zoomListener) {
  jquery('.js-enable-zoom').change(function(){
    if(jquery(this).is(':checked')) {
      enableZoom(page, zoomListener);
    } else {
      disableZoom(page, zoomListener);
    }
  });
}

function initResetButton(page, zoomListener) {
  jquery('.js-reset-zoom').click(function(){
    enableZoom(page, zoomListener);
    page.rootGroup
      .transition()
      .duration(300)
      .attr("transform", "translate(" + 0 + "," + 0 + ")");
    zoomListener.translate([0,0]).scale(1);

    if(jquery('.js-enable-zoom').is(':checked') === false){
      disableZoom(page, zoomListener);
    }
  });
}

function zoomHandler(page) {
  page.rootGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function enableZoom(page, zoomListener) {
  zoomListener
    .on("zoom", function(){
      zoomHandler(page);
    })
    .on("zoomend", function(){
      var center = {x: page.rootSvg.attr("width") / 2, y: 0};
      Align.reAlign(page, zoomListener, center);
    });
  zoomListener
  (page.rootSvg);
}
exports.enableZoom = enableZoom;

function disableZoom(page, zoomListener) {
  zoomListener
    .on("zoom", null)
    .on("zoomend", null);
  page.rootSvg
    .on("mousedown.zoom", null)
    .on("wheel.zoom", null)
    .on("mousemove.zoom", null)
    .on("dblclick.zoom", null)
    .on("touchstart.zoom", null);
}
exports.disableZoom = disableZoom;

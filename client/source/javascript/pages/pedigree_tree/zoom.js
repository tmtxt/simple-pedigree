var d3 = require('d3');
var jquery = require('jquery');

var Align = require('./align.js');

function init(rootSvg, rootGroup) {
  // create the zoom listener
  var zoomListener = d3.behavior.zoom()
    .scaleExtent([0.5, 1.5]);

  initEnableCheckbox(rootSvg, rootGroup, zoomListener);
  initResetButton(rootSvg, rootGroup, zoomListener);

  return zoomListener;
}
exports.init = init;

function zoomHandler(rootGroup) {
  rootGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function initEnableCheckbox(rootSvg, rootGroup, zoomListener) {
  jquery('.js-enable-zoom').change(function(){
    if(jquery(this).is(':checked')) {
      enableZoom(rootSvg, rootGroup, zoomListener);
    } else {
      disableZoom(rootSvg, rootGroup, zoomListener);
    }
  });
}

function enableZoom(rootSvg, rootGroup, zoomListener) {
  zoomListener
    .on("zoom", function(){
      zoomHandler(rootGroup);
    })
    .on("zoomend", function(){
      Align.reAlign(zoomListener, {x: rootSvg.attr("width") / 2, y: 0}, rootGroup);
    });
  zoomListener(rootSvg);
}
exports.enableZoom = enableZoom;

function disableZoom(rootSvg, rootGroup, zoomListener) {
  zoomListener.on("zoom", null).on("zoomend", null);
  rootSvg.on("mousedown.zoom", null).on("wheel.zoom", null)
    .on("mousemove.zoom", null)
    .on("dblclick.zoom", null)
    .on("touchstart.zoom", null);
}
exports.disableZoom = disableZoom;

function initResetButton(rootSvg, rootGroup, zoomListener) {
  jquery('.js-reset-zoom').click(function(){
    enableZoom(rootSvg, rootGroup, zoomListener);
    rootGroup.transition().duration(300)
      .attr("transform", "translate(" + 0 + "," + 0 + ")");
    zoomListener.translate([0,0]).scale(1);

    if(jquery('.js-enable-zoom').is(':checked') === false){
      disableZoom(rootSvg, rootGroup, zoomListener);
    }
  });
}

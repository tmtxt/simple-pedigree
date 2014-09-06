var d3 = require('d3');
var jquery = require('jquery');

function init(rootSvg, rootGroup) {
  // create the zoom listener
  var zoomListener = d3.behavior.zoom()
    .scaleExtent([0.5, 1.5]);

  //
  jquery('.js-enable-zoom').change(function(){
    if(jquery(this).is(':checked')) {
      enableZoom(rootSvg, rootGroup, zoomListener);
    } else {
      disableZoom(rootSvg, rootGroup, zoomListener);
    }
  });

  return zoomListener;
}
exports.init = init;

function zoomHandler(rootGroup) {
  rootGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function enableZoom(rootSvg, rootGroup, zoomListener) {
  zoomListener.on("zoom", function(){
    zoomHandler(rootGroup);
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

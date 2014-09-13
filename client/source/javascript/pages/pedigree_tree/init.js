var jquery = require('jquery');
var d3 = require('d3');

function init(page) {
  initConfig(page);
}
exports.init = init;

// some initial configuration
function initConfig(page) {
  // tree container id
  page.treeContainerId = "#js-tree-container";

  // connection height
  page.defaultLinkHeight = 200;

  // disable marriage information by default
  page.enableMarriage = false;
}

function initSize(page) {
  
}

function initLayout(page) {
  var tree, diagonal;

  // basic layout for the tree
  // create a tree layout using d3js
  tree = d3.layout.tree().size([treeWidth, treeHeight]);
  diagonal = d3.svg.diagonal().projection(function(d) { return [d.x, d.y]; });
}

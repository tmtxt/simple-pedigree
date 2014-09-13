var jquery = require('jquery');
var d3 = require('d3');

function init(page) {
  initConfig(page);
  initSize(page);
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

// init size of the tree layout and its components
function initSize(page) {
  page.treeWidth = jquery(page.treeContainerId).width();
  page.treeHeight = 1000;
  page.linkHeight = page.defaultLinkHeight;
}

function initLayout(page) {
  var tree, diagonal;

  // basic layout for the tree
  // create a tree layout using d3js
  tree = d3.layout.tree().size([treeWidth, treeHeight]);
  diagonal = d3.svg.diagonal().projection(function(d) { return [d.x, d.y]; });
}

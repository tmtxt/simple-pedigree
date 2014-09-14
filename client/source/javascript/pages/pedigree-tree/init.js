var jquery = require('jquery');
var d3 = require('d3');

function init(page) {
  initConfig(page);
  initSize(page);
  initLayout(page);
  initSvg(page);
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

// init the layout of the tree
function initLayout(page) {
  // basic layout for the tree
  // create a tree layout using d3js
  page.treeLayout = d3.layout.tree().size([page.treeWidth, page.treeHeight]);
  page.diagonal = d3.svg.diagonal().projection(function(d) { return [d.x, d.y]; });
}

// init the SVG elements
function initSvg(page) {
  // SVG root
  page.rootSvg = d3.select(page.treeContainerId).append("svg:svg")
    .attr("width", page.treeWidth)
    .attr("height", page.treeHeight);

  // group
  page.rootGroup = page.rootSvg.append("svg:g")
    .attr("transform", "translate(" + 0 + "," + 0 + ")");
}

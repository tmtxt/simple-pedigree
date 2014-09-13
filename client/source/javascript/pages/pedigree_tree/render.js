var jquery = require('jquery');

var GetData = require('./get_data.js');
var Toggle = require('./toggle.js');
var Position = require('./position.js');
var Util = require('./util.js');
var Link = require('./link.js');
var NodeGroup = require('./node_group.js');
var NodeCircle = require('./node_circle.js');
var NodeName = require('./node_name.js');
var NodePicture = require('./node_picture.js');
var Config = require('./config.js');
var Zoom = require('./zoom.js');
var NodeMarriage = require('./node_marriage.js');
var Align = require('./align.js');

function render(page) {
  var root = page.root;
  root.x0 = page.treeWidth / 2;
	root.y0 = 0;

  // marriage info
  jquery('.js-enable-marriage').change(function(){
    if(jquery(this).is(':checked')) {
      page.enableMarriage = true;
    } else {
      page.enableMarriage = false;
    }
    update(page, root);
  });

  // Initialize the display to show a few nodes.
  if(root.children)
    root.children.forEach(Toggle.toggleAll);

  // update the new position
  update(page, root);
}
exports.render = render;

function update(page, source) {
  var duration = Util.getTransitionDuration();
  Position.calculateNodesList(page);
  Position.calculateNodesY(page);
  Position.offsetNodesPosition(page);

  // select the groups of node, each group represent a person, bind the data
  // from page.root to those groups
  var nodeGroups = NodeGroup.selectNodeGroups(page);

  // ENTER
  // create new node group if not exist
  var nodeEnter = NodeGroup.appendNodeGroups(nodeGroups, source);
  // create the elements inside that node group
  NodeCircle.appendCircles(page, nodeEnter);
  NodeName.appendNames(page, nodeEnter);
  NodePicture.appendPictures(page, nodeEnter);
  NodeMarriage.appendMarriage(page, nodeEnter);
	// compute the new tree height
  Util.updateTreeDiagramHeight(page.root);

	// UPDATE
  // Update the data and transition nodes to their new position.
  var nodeUpdate = NodeGroup.transitionNodeGroups(nodeGroups, duration);
  // update the node circle and text
  NodeCircle.updateCircles(nodeUpdate);
  NodeName.updateNames(nodeUpdate);

  // EXIT
  // Transition exiting nodes to the parent's new position.
  var nodeExit = NodeGroup.removeUnusedNodeGroups(nodeGroups, duration, source);

  // Update the links
  var links = Link.selectLinks(page.rootGroup, page.treeLayout, page.nodesList);
  Link.createLinks(links, source, page.diagonal, duration);
  Link.transitionLinks(links, source, page.diagonal, duration);
  Link.removeUnusedLinks(links, source, page.diagonal, duration);

  // Stash the old positions for transition.
  page.nodesList.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}
exports.update = update;

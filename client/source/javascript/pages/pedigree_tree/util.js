var d3 = require('d3');
var React = require('react');
var jquery = require('jquery');

var Config = require('./config.js');
var PersonInfoModal = require('views/person_info_modal.jsx');
var GetData = require('./get_data.js');

var linkHeight = Config.defaultLinkHeight;

function findMaxDepth(root) {
  var currentMaxDepth = 0;
  findMaxDepthRecursive(root);
  
  function findMaxDepthRecursive(parent) {
    if(parent.children && parent.children.length > 0){
			parent.children.forEach(function(d){
				findMaxDepthRecursive(d);
			});
		} else if(parent.depth > currentMaxDepth){
			currentMaxDepth = parent.depth;
		}
  }

  return currentMaxDepth;
}
exports.findMaxDepth = findMaxDepth;

function updateTreeDiagramHeight(page) {
  var maxDepth = findMaxDepth(page.root);
	var newHeight = (maxDepth + 1) * linkHeight;
	d3.select("svg").attr("height", newHeight);
  page.treeHeight = newHeight;
}
exports.updateTreeDiagramHeight = updateTreeDiagramHeight;

function getTransitionDuration() {
  return d3.event && d3.event.altKey ? 5000 : 500;
}
exports.getTransitionDuration = getTransitionDuration;

function showInfoModal(personId) {
  GetData.getPersonInfo(personId).then(function(person){
    console.log(person);
    React.renderComponent(PersonInfoModal({person: person}),
                          document.getElementById('js-person-info-modal'));
    jquery('.js-info-modal').modal();
  }, function(){
    console.log("error");
  });
  
}
exports.showInfoModal = showInfoModal;


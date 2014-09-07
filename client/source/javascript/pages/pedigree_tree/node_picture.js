var React = require('react');
var jquery = require('jquery');

var PersonInfoModal = require('views/person_info_modal.jsx');

function appendPictures(nodeEnter) {
  nodeEnter.append("svg:image")
    .attr("xlink:href", function(d){
      return d.picture;
    })
    .attr("x", -20)
    .attr("y", -68)
    .attr("height", "40px")
    .attr("width", "40px")
    .on('click', function(d){
      showInfoModal(d.id);
    });
}
exports.appendPictures = appendPictures;

function showInfoModal(personId) {
  React.renderComponent(PersonInfoModal({}),
                       document.getElementById('js-person-info-modal'));
  jquery('.js-info-modal').modal();
}
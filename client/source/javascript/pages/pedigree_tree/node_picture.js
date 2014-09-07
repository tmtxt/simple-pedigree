var React = require('react');
var jquery = require('jquery');

var PersonInfoModal = require('views/person_info_modal.jsx');
var GetData = require('./get_data.js');

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
  GetData.getPersonInfo(personId).then(function(person){
    console.log(person);
    React.renderComponent(PersonInfoModal(person),
                          document.getElementById('js-person-info-modal'));
    jquery('.js-info-modal').modal();
  }, function(){
    console.log("error");
  });
  
}

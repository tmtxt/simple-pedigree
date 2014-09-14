var React = require('react');

var PersonDetail = require('views/person_detail.jsx');

var person = window.person;

if(!!person) {
  React.renderComponent(PersonDetail({person: person}),
                       document.getElementById('js-info-container'));
}

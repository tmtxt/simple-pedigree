// libs
var jquery = require('jquery');

// DOM elements
var aliveStatusSelect = jquery('.js-alive-status-select');
var deathDateDiv = jquery('.js-death-date-div');

// hide death date by default
deathDateDiv.hide();

// show the death date div when alive status is death
aliveStatusSelect.change(function(){
  if(aliveStatusSelect.val() == 1) {
    deathDateDiv.show(500);
  }
});

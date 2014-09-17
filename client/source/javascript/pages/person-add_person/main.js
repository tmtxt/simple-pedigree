// libs
var jquery = require('jquery');

// DOM elements
var aliveStatusSelect = jquery('.js-alive-status-select');
var deathDateDiv = jquery('.js-death-date-div');
var birthDateInput = jquery('.js-birth-date-input');
var deathDateInput = jquery('.js-death-date-input');

// hide death date by default
deathDateDiv.hide();

// show the death date div when alive status is death
aliveStatusSelect.change(function(){
  if(aliveStatusSelect.val() == 1) {
    deathDateDiv.show(500);
  } else {
    deathDateDiv.hide(500);
  }
});

// initialize date picker
birthDateInput.datepicker({
  autoclose: true
});
deathDateInput.datepicker({
  autoclose: true
});

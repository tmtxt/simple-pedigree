var jquery = require('jquery');

// get the tree
jquery.ajax({
  url: '/pedigree/getTree',
  success: function(data) {
    console.log(data);
  }
});

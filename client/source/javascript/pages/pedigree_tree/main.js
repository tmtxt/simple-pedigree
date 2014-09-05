var jquery = require('jquery');

jquery.ajax({
  url: '/pedigree/getTree',
  success: function(data) {
    console.log(data);
  }
});

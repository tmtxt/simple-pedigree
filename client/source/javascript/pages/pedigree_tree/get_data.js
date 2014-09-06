// functions for getting data

// libs
var q = require('q');
var jquery = require('jquery');

// get tree data from server
function getTreeData() {
  return q.Promise(function(resolve, reject, notify){
    // get the tree
    jquery.ajax({
      url: '/pedigree/getTree',
      success: function(data) {
        console.log(data);
        resolve(data);
      }
    });
  });
}
exports.getTreeData = getTreeData;

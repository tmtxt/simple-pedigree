// functions for getting data

// libs
var q = require('q');
var jquery = require('jquery');

//
var rootId = window.rootId;

// get tree data from server
function getTreeData() {
  return q.Promise(function(resolve, reject, notify){
    // get the tree
    jquery.ajax({
      data: {
        root: rootId
      },
      url: '/pedigree/getTree',
      success: function(data) {
        console.log(data);
        resolve(data);
      }
    });
  });
}
exports.getTreeData = getTreeData;

function getPersonInfo(personId) {
  return q.Promise(function(resolve, reject, notify){
    jquery.ajax({
      data: {
        personId: personId
      },
      url: '/pedigree/getPersonInfo',
      success: function(data) {
        if(data.success) {
          resolve(data.person);
        } else {
          reject();
        }
      },
      error: function() {
        reject();
      }
    });
  });
}
exports.getPersonInfo = getPersonInfo;

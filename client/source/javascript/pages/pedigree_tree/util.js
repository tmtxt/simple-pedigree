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

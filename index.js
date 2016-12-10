function cloneObject(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  var temp = obj.constructor();
  for (var key in obj) {
    temp[key] = cloneObject(obj[key]);
  }

  return temp;
}

module.exports = function(arrayOfObjects, options) {
  if (Array.isArray(arrayOfObjects)) {
    if (arrayOfObjects.length > 0) {
      var defaultOptions = {
        leftAttribute: 'lft',
        rightAttribute: 'rgt'
      };

      options = Object.assign({}, defaultOptions, options);

      var clone = cloneObject(arrayOfObjects);

      var makeTree = function(root) {
        var stack = [root];
        var popResult;
        for (var i = 1; i < clone.length; i++) {
          while (stack[stack.length - 1][options.rightAttribute] < clone[i][options.leftAttribute]) {
            popResult = stack.pop();
          }

          if (stack[stack.length - 1].children) {
            stack[stack.length - 1].children.push(clone[i]);
          } else {
            stack[stack.length - 1].children = [clone[i]];
          }
          stack.push(clone[i]);
        }
      };
      makeTree(clone[0])
      return clone[0];
    } else {
      return {};
    }
  } else {
    throw new Error('First argument need to be an array of objects.');
  }

}

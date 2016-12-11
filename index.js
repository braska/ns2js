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

      // first element is root by default
      var rootKeys = [0];
      // finding all roots
      for (var i = 0; i < clone.length; i++) {
        if (+clone[i][options.leftAttribute] == +clone[rootKeys[rootKeys.length - 1]][options.rightAttribute] + 1) {
          rootKeys.push(i);
        }
      }

      var makeTree = function(subtree) {
        var stack = [subtree[0]];
        var popResult;
        for (var i = 1; i < subtree.length; i++) {
          while (+stack[stack.length - 1][options.rightAttribute] < +subtree[i][options.leftAttribute]) {
            popResult = stack.pop();
          }

          if (stack[stack.length - 1].children) {
            stack[stack.length - 1].children.push(subtree[i]);
          } else {
            stack[stack.length - 1].children = [subtree[i]];
          }
          stack.push(subtree[i]);
        }
      };

      var subtrees = [];
      var subtree;
      for (var i = 0; i < rootKeys.length; i++) {
        if (i + 1 == rootKeys.length) {
          subtree = clone.slice(rootKeys[i]);
        } else {
          subtree = clone.slice(rootKeys[i], rootKeys[i + 1]);
        }
        subtrees.push(subtree);
        makeTree(subtree);
      }

      return subtrees.reduce(function(prev, current) {
        prev.push(current[0]);
        return prev;
      }, []);
    } else {
      return [];
    }
  } else {
    throw new Error('First argument need to be an array of objects.');
  }

}

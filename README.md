# Nested Set to JavaScript object converter.

*Note: this converter usable only with sorted by left key array of objects. More over, first object in array must be root of set and only one root allowed.*

## Usage

### Add converter to project

```console
$ npm install --save ns2js
```

### Use in your code

Example:

```js
const converter = require('ns2js');
const Categories = require('../collections/Categories');

Categories.orderBy('lft').fetch().then((ns) => {
  let result = converter(ns, {
    leftAttribute: 'lft',
    rightAttribute: 'rgt'
  });
  console.log(result);
});
```

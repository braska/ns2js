# Nested Set to JavaScript object converter.

ns2js is converter from nested set (array of objects that have right and left key fields) to JavaScript array of objects, each of which is root of nested set and contains `children` field.

*Note: this converter usable only with sorted by left key array of objects.*

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

See [test.js](test.js) for more information.

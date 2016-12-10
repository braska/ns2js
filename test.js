import test from 'ava';
import converter from './index';

const exampleNestedSetOfCategories = [
  {name: 'Catalog', lft: 1, rgt: 11},
  {name: 'Cars', lft: 2, rgt: 7},
  {name: 'Volvo', lft: 3, rgt: 4},
  {name: 'BMW', lft: 5, rgt: 6},
  {name: 'Mobile phones', lft: 8, rgt: 11},
  {name: 'Sony', lft: 9, rgt: 10}
];

const exampleResult = {
  name: 'Catalog',
  lft: 1,
  rgt: 11,
  children: [
    {
      name: 'Cars',
      lft: 2,
      rgt: 7,
      children: [
        {name: 'Volvo', lft: 3, rgt: 4},
        {name: 'BMW', lft: 5, rgt: 6}
      ]
    },
    {
      name: 'Mobile phones',
      lft: 8,
      rgt: 11,
      children: [
        {name: 'Sony', lft: 9, rgt: 10}
      ]
    }
  ]
};

test('Nested set converts correctly', t => {
  let result = converter(exampleNestedSetOfCategories);
  t.deepEqual(result, exampleResult);
});

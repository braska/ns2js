import test from 'ava';
import converter from './index';

const exampleNestedSetOfCategoriesWithOneRoot = [
  {name: 'Catalog', lft: 1, rgt: 11},
  {name: 'Cars', lft: 2, rgt: 7},
  {name: 'Volvo', lft: 3, rgt: 4},
  {name: 'BMW', lft: 5, rgt: 6},
  {name: 'Mobile phones', lft: 8, rgt: 11},
  {name: 'Sony', lft: 9, rgt: 10}
];

const exampleResultWithOneRoot = [{
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
}];

const exampleNestedSetOfCategoriesWithMultipleRoots = [
  {name: 'Cars', lft: 1, rgt: 6},
  {name: 'Volvo', lft: 2, rgt: 3},
  {name: 'BMW', lft: 4, rgt: 5},
  {name: 'Mobile phones', lft: 7, rgt: 10},
  {name: 'Sony', lft: 8, rgt: 9}
];

const exampleResultWithMultipleRoots = [
  {
    name: 'Cars',
    lft: 1,
    rgt: 6,
    children: [
      {name: 'Volvo', lft: 2, rgt: 3},
      {name: 'BMW', lft: 4, rgt: 5}
    ]
  },
  {
    name: 'Mobile phones',
    lft: 7,
    rgt: 10,
    children: [
      {name: 'Sony', lft: 8, rgt: 9}
    ]
  }
];

// lgt and rgt are strings
const example2NestedSetOfCategoriesWithMultipleRoots = [
  {name: 'Cars', lft: '1', rgt: '2'},
  {name: 'Mobile phones', lft: '3', rgt: '4'}
];

const example2ResultWithMultipleRoots = [
  {name: 'Cars', lft: '1', rgt: '2'},
  {name: 'Mobile phones', lft: '3', rgt: '4'}
];

test('Nested Set with one root converts correctly', t => {
  let result = converter(exampleNestedSetOfCategoriesWithOneRoot);
  t.deepEqual(result, exampleResultWithOneRoot);
});

test('First Nested Set with multiple roots converts correctly', t => {
  let result = converter(exampleNestedSetOfCategoriesWithMultipleRoots);
  t.deepEqual(result, exampleResultWithMultipleRoots);
});

test('Second Nested Set with multiple roots converts correctly', t => {
  let result = converter(example2NestedSetOfCategoriesWithMultipleRoots);
  t.deepEqual(result, example2ResultWithMultipleRoots);
});

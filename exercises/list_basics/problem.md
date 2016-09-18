Functional JavaScript with Ramda.js

#Functional JavaScript without ramda: array methods.
There are already a few functional tools in JavaScript that help us deal with
abstracting the intention of a loop. Loops are often found in imperative code,
used to iterate over and potentially transform a list. JavaScript already gives
us some tools for abstracting the intention of a given loop.

map, reduce, filter, every, some, sort, find, findIndex all provide functional
alternatives to loops, and they can help to increase the readability of code.
Reducing cognitive overhead of a person reading code is a good thing, and
functional programming can help make code easier to reason about.

For instance, here is a for loop that transforms an array:

```
const xs = [1, 2, 3, 4, 5]
let added = []

for (let i = 0; i < xs.length; i++) {
  added[i] = xs[i] + 1
}
// added => [2, 3, 4, 5, 6]
```

We can abstract away what occurs inside the loop, somewhat:

```
const xs = [1, 2, 3, 4, 5]
const addOne = x => x + 1
let added = []

for (let i = 0; i < xs.length; i++) {
  added[i] = addOne(xs[i])
}
// added => [2, 3, 4, 5, 6]
```

But that really only factored out the `+ 1` bit of the loop innards. It doesn't
provide much value unless we need to reuse that function elsewhere. We can do
better.

Array.prototype.map can abstract away the following functionality of the loop:

 - Initialization statement `let i = 0;`
 - Test expression `i < xs.length`
 - Update statement `i++`
 - Using the updated value `added[i] = addOne(xs[i])`

Here is the same example using Array.prototype.map:

```
const addOne = x => x + 1
const xs = [1, 2, 3, 4, 5]

const added = xs.map(addOne)
``

Using JavaScript's array prototype methods:
  - map
  - filter
  - reduce
  - some

------------------------------------------------------------------------
##EXERCISE
Export a module with the following methods. Assume these methods will be passed
an array containing the correct types.

double :: [Number] -> [Number]
Takes an array of numbers, returns an array with all elements multiplied by 2.

isEven :: [Number] -> [Number]
Takes an array of numbers, returns an array of all elements that are even.

sum :: [Number] -> Number
Takes an array of numbers, returns the sum of its elements.

hasCat :: [String] -> Boolean
Takes an array of strings. Returns true if the array contains the element, 'cat'

----------------------------------------------------------------------
## HINTS

Documentation for Array methods:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

----------------------------------------------------------------------

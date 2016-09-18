#Point-free programming with ramda.js.

Now that we have abstracted away for the loop, let us explore how we can reduce
the cognitive overhead of the following function:

```
const mapAddThree = xs => xs.map(x => x + 3)
```

Notice two sets of arguments, the first being the array we intend on mapping
over, `xs`, and the second being each number in that array, `x`. These sets of
arguments are also known as "points".

Lets first make a function that removes the points of the example, specifically
from the addition of 3.

How? Partial application.

Partial application is the act of taking a function with multiple arguments,
and turning it into a function that, when invoked without all of its arguments,
will return a new function that can take the remaining arguments.

Here is an example:

```
const add = (a, b) => {
  if (b == null) return b => a + b

  return a + b
}
```

If we then apply a single argument to the function, we receive a function with
the first argument always bound.

```
add(3)(2) // => 5
add(3, 2) // => 5

const mapAddThree = xs => xs.map(add(3))
```

That's looking better. We've removed the points from the function inside map,
but how can we remove the points of map?

Here's one cool thing about ramda.js, from the docs:

 - Ramda functions are automatically curried. This allows you to easily build
   up new functions from old ones simply by not supplying the final parameters.

This means we can partially apply any ramda function and recieve new functions.
All of the functions used in the previous exercise have ramda counterparts.
Ramda's `add` function acts the same as ours. We'll use both of them to achieve
the desired functionality.

```
const {map, add} = require('ramda')

const mapAddThree = map(add(3))

mapAddThree([1,2,3]) // => [4,5,6]
```

And there you have it.

----------------------------------------------------------------------
##EXERCISE

Using only ramda's `reduce` and `add` functions, write a module that exports
a function to sum an array of numbers. Do this in a point-free style like the
example given.

module.exports :: [Number] -> Number
  
----------------------------------------------------------------------
##HINTS
Look at the arguments on reduce. Make sure to set the initializer.

http://ramdajs.com/docs/#reduce
http://ramdajs.com/docs/#add

----------------------------------------------------------------------

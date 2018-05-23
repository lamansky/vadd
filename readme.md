# vadd

Adds one or more values to an Array, Set, or other collection.

## Installation

Requires [Node.js](https://nodejs.org/) 8.3.0 or above.

```bash
npm i vadd
```

## API

The module exports an `add()` function that has one other function attached to it as a method: `add.all()`.

### `add()`

#### Parameters

1. Bindable: `collection` (Array, Set, or WeakSet): The collection to which to add a value.
2. `valueToAdd` (any): The value to add to the end of the collection.
3. Optional: Object argument:
    * `arrays` / `sets` / `weakSets` (arrays of classes/strings): Arrays of classes and/or string names of classes that should be treated as equivalent to `Array`/`Set`/`WeakSet` (respectively).
    * `index` (integer): The index at which to splice the new values. Only applies if `collection` is an Array. To insert values at the end, either omit the argument or set it to `-0` (negative zero).
    * `loose` (boolean): Whether or not to compare values loosely (as defined by `looselyEquals`) for the purpose of testing uniqueness if `unique` is `true`. Defaults to `false`.
    * `looselyEquals` (function): A callback that accepts two values and returns `true` if they are to be considered equivalent or `false` otherwise. This argument is only used if `loose` is `true`. If omitted, the default behavior will, among other things, consider arrays/objects to be equal if they have the same entries.
    * `unique` (boolean): Whether or not to refrain from adding values that already exist in the collection. Defaults to `false`. You can define what uniqueness means by using the `loose` and `looselyEquals` arguments.

#### Return Value

The number of items added (either `0` or `1`).

#### Example

```javascript
const add = require('vadd')

const arr = [1]
add(arr, 2) // [1, 2]
add(arr, 0, {index: 0}) // [0, 1, 2]
```

### `add.all()`

Use this function if you want to add multiple values to a collection at once. The signature is the same as the main function except that the second parameter is called `valuesToAdd` and takes an iterable (such as an array). The return value is the total number of items added.

#### Example

```javascript
const add = require('vadd')

const set = new Set()

add.all(set, [1, 2, 3])

set.has(1) // true
set.has(2) // true
set.has(3) // true
```

## Related

The “k” family of modules works on keyed/indexed collections.

* [khas](https://github.com/lamansky/khas)
* [kget](https://github.com/lamansky/kget)
* [kedit](https://github.com/lamansky/kedit)
* [kset](https://github.com/lamansky/kset)
* [kinc](https://github.com/lamansky/kinc)
* [kdel](https://github.com/lamansky/kdel)

The “v” family of modules works on any collection of values.

* [vhas](https://github.com/lamansky/vhas)
* [vget](https://github.com/lamansky/vget)
* [vsize](https://github.com/lamansky/vsize)
* [vdel](https://github.com/lamansky/vdel)

'use strict'

const add = require('.')
const assert = require('assert')
const isArrayWith = require('is-array-with')

describe('add()', function () {
  it('should add a value to an Array', function () {
    const arr = [1]
    add(arr, 2)
    assert(isArrayWith(arr, 1, 2))
  })

  it('should add a value to an Array at the given `index`', function () {
    const arr = [1, 3]
    add(arr, 2, {index: -1})
    assert(isArrayWith(arr, 1, 2, 3))
  })

  it('should add a value to the end of an Array if `index` is negative zero', function () {
    const arr = [1, 3]
    add(arr, 5, {index: -0})
    assert(isArrayWith(arr, 1, 3, 5))
  })

  it('should add a value to a Set', function () {
    const set = new Set([1])
    add(set, 2)
    assert(set.has(1))
    assert(set.has(2))
  })

  it('should add a value to a WeakSet', function () {
    const obj = {}
    const set = new WeakSet()
    assert(!set.has(obj))
    add(set, obj)
    assert(set.has(obj))
  })

  it('should throw an error trying to add a value to a Map', function () {
    assert.throws(() => { add(new Map(), 'value') }, TypeError)
  })

  it('should throw an error trying to add a value to an Object', function () {
    assert.throws(() => { add({}, 'value') }, TypeError)
  })

  it('should throw an error trying to add a value to a WeakMap', function () {
    assert.throws(() => { add(new WeakMap(), 'value', {loose: true}) }, TypeError)
  })

  it('shouldn’t re-add already-existing values to an Array if `unique` is true', function () {
    const arr = [1, 2, 3]
    add(arr, 3, {unique: true})
    assert(isArrayWith(arr, 1, 2, 3))
    add(arr, 0, {unique: true})
    assert(isArrayWith(arr, 1, 2, 3, 0))
  })

  it('shouldn’t add loose duplicates if `unique` and `loose` are true', function () {
    const looselyEquals = (a, b) => a.toLowerCase() === b.toLowerCase()
    const set = new Set(['test', 'example'])
    add(set, 'Test', {loose: true, looselyEquals, unique: true})
    assert(!set.has('Test'))
    add(set, 'Test!', {loose: true, looselyEquals, unique: true})
    assert(set.has('Test!'))
  })

  it('should return the number of items added', function () {
    const set = new Set([1])
    assert.strictEqual(add(set, 1), 0)
    assert.strictEqual(add(set, 2), 1)
  })

  describe('#all()', function () {
    it('should add all values to an Array', function () {
      const arr = [1]
      add.all(arr, [2, 3])
      assert(isArrayWith(arr, 1, 2, 3))
    })

    it('should add all values to a Set', function () {
      const set = new Set([1])
      add.all(set, [2, 3])
      assert(set.has(1))
      assert(set.has(2))
      assert(set.has(3))
    })

    it('should add all values to a WeakSet', function () {
      const obj1 = {}
      const obj2 = {}
      const set = new WeakSet()
      assert(!set.has(obj1))
      assert(!set.has(obj2))
      add.all(set, [obj1, obj2])
      assert(set.has(obj1))
      assert(set.has(obj2))
    })

    it('should work with any iterable', function () {
      const arr = []
      add.all(arr, 'abc')
      assert(isArrayWith(arr, 'a', 'b', 'c'))
    })

    it('should add all values to an Array at the given `index`', function () {
      const arr = ['d']
      add.all(arr, 'abc', {index: 0})
      assert(isArrayWith(arr, 'a', 'b', 'c', 'd'))
    })

    it('should return the number of items added', function () {
      assert.strictEqual(add.all(new Set([1]), [1, 2]), 1)
    })
  })
})

'use strict'

const filter = require('filter-iter')
const has = require('vhas')
const is = require('is-instance-of')
const isNumber = require('@lamansky/is-number')
const iterify = require('iterify')
const xfn = require('xfn')

module.exports = xfn({
  pluralArg: 1,
  pluralProp: 'all',
}, function add (collection, valuesToAdd, {index, unique, ...options} = {}) {
  valuesToAdd = iterify(valuesToAdd)
  const {arrays = [], loose, sets = [], weakSets = []} = options

  let itemsAdded = 0
  const isArray = is(collection, ['Array', arrays])
  if (unique && (isArray || loose)) {
    valuesToAdd = filter(valuesToAdd, v => !has(collection, v, options))
  }
  if (isArray) {
    if (isNumber(index) && !Object.is(index, -0)) {
      collection.splice(index, 0, ...valuesToAdd)
    } else {
      for (const v of valuesToAdd) {
        collection.push(v)
        itemsAdded++
      }
    }
  } else if (is(collection, ['Set', sets, 'WeakSet', weakSets])) {
    for (const v of valuesToAdd) {
      if (!collection.has(v)) {
        collection.add(v)
        itemsAdded++
      }
    }
  } else {
    throw new TypeError('Cannot add unkeyed values to keyed collections or non-objects')
  }
  return itemsAdded
})

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartTotal } from '../src/cart.js'

// This test fails until you implement cartTotal. That is the point:
// run `npm test` first and see it red.
test('the example from the slides', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 },
  ]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  assert.equal(cartTotal(items, options), 467400)
})

const standardOptions = {
  vatRate: 0.08,
  freeShipFrom: 500000,
  shipFee: 30000,
}

test('empty cart returns zero without VAT or shipping', () => {
  assert.equal(cartTotal([], standardOptions), 0)
})

test('charges shipping below the subtotal threshold', () => {
  const items = [{ name: 'Item', price: 100000, qty: 1 }]
  assert.equal(cartTotal(items, standardOptions), 138000)
})

test('VAT crossing the threshold does not qualify for free shipping', () => {
  const items = [{ name: 'Item', price: 490000, qty: 1 }]
  assert.equal(cartTotal(items, standardOptions), 559200)
})

test('shipping is free exactly at the subtotal threshold', () => {
  const items = [{ name: 'Item', price: 250000, qty: 2 }]
  assert.equal(cartTotal(items, standardOptions), 540000)
})

test('shipping is free above the subtotal threshold', () => {
  const items = [{ name: 'Item', price: 600000, qty: 1 }]
  assert.equal(cartTotal(items, standardOptions), 648000)
})

test('negative price throws RangeError', () => {
  const items = [{ name: 'Item', price: -1, qty: 1 }]
  assert.throws(() => cartTotal(items, standardOptions), RangeError)
})

test('zero quantity throws RangeError', () => {
  const items = [{ name: 'Item', price: 100000, qty: 0 }]
  assert.throws(() => cartTotal(items, standardOptions), RangeError)
})

test('negative quantity throws RangeError', () => {
  const items = [{ name: 'Item', price: 100000, qty: -1 }]
  assert.throws(() => cartTotal(items, standardOptions), RangeError)
})

test('fractional quantity throws RangeError', () => {
  const items = [{ name: 'Item', price: 100000, qty: 1.5 }]
  assert.throws(() => cartTotal(items, standardOptions), RangeError)
})

test('returns a number rather than a string', () => {
  const items = [{ name: 'Item', price: 100000, qty: 1 }]
  assert.equal(typeof cartTotal(items, standardOptions), 'number')
})

test('rounds a fractional total down to the nearest whole dong', () => {
  const items = [{ name: 'Item', price: 101, qty: 1 }]
  const options = { ...standardOptions, shipFee: 0 }
  // 101 + 8.08 = 109.08
  assert.equal(cartTotal(items, options), 109)
})

test('rounds a fractional total up to the nearest whole dong', () => {
  const items = [{ name: 'Item', price: 109, qty: 1 }]
  const options = { ...standardOptions, shipFee: 0 }
  // 109 + 8.72 = 117.72
  assert.equal(cartTotal(items, options), 118)
})

test('rounds a half-dong total up', () => {
  const items = [{ name: 'Item', price: 105, qty: 1 }]
  const options = { ...standardOptions, vatRate: 0.1, shipFee: 0 }
  // 105 + 10.5 = 115.5
  assert.equal(cartTotal(items, options), 116)
})

test('rounds only the final total rather than individual items', () => {
  const items = [
    { name: 'First item', price: 1.4, qty: 1 },
    { name: 'Second item', price: 1.4, qty: 1 },
  ]
  const options = { ...standardOptions, vatRate: 0, shipFee: 0 }
  assert.equal(cartTotal(items, options), 3)
})

test('zero price is valid and a nonempty cart still pays shipping', () => {
  const items = [{ name: 'Free item', price: 0, qty: 1 }]
  assert.equal(cartTotal(items, standardOptions), 30000)
})

test('validates later items even after the subtotal reaches the threshold', () => {
  const items = [
    { name: 'Valid item', price: 600000, qty: 1 },
    { name: 'Invalid item', price: -1, qty: 1 },
  ]
  assert.throws(() => cartTotal(items, standardOptions), RangeError)
})

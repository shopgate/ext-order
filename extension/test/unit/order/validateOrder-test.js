const assert = require('assert')
const executeStep = require('../../../order/validateOrder')
const ValidationError = require('../../../errors/ValidationError')

describe('validateOrder', () => {
  /** @type {ExtOrderUser} */
  const validUser = {id: 'qwqw-we-er-r-r', mail: 'mail@mail.com', firstName: 'John', lastName: 'Doe'}
  const inValidUser = {id: 'qwqw-we-er-r-r', mail: 'mail ... mail.com', firstName: 'John', lastName: 'Doe'}

  /** @type {ExtOrderItem} */
  const validProduct = {id: 'SG1', name: 'Cool product', type: 'product', unitPrice: 100, quantity: 1}
  const validCoupon = {id: '10off', name: 'Coupon 10% off', type: 'coupon', unitPrice: 100, quantity: 1}
  const inValidProduct = {id: 'SG1', name: 'Non product item', type: 'not product', unitPrice: 100, quantity: 0}

  const validShipppingMethod = {id: 'DHL', name: 'DHL next day delivery', amount: 100, taxAmount: 0}
  const inValidShipppingMethod = {id: 'malformed shipping method', name: null, amount: -100, taxAmount: 0}

  // noinspection JSValidateTypes
  /** @type {ExtOrder} */
  const orderFixture = {
    user: validUser,
    items: [validProduct, validCoupon],
    shippingMethod: validShipppingMethod,
    logs: [{id: 1}],
    currency: 'EUR',
    taxAmount: 0,
    total: 0
  }

  it('Should validate order without errors', async () => {
    let stepError
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep({}, {order: orderFixture})
    } catch (err) {
      stepError = err
    } finally {
      assert.ifError(stepError)
    }
  })

  const failedTests = {
    'It should fail on empty input': {},
    'It should fail when user is not valid': {...orderFixture, user: inValidUser},
    'It should fail when item is not valid': {...orderFixture, items: [inValidProduct]},
    'It should fail when currency is not valid': {...orderFixture, currency: 'QWERTY'},
    'It should fail when shipping method is not valid': {...orderFixture, shippingMethod: inValidShipppingMethod}
  }

  Object.entries(failedTests).forEach(([testIt, inputOrder]) => {
    it(testIt, async () => {
      try {
        // noinspection JSCheckFunctionSignatures
        await executeStep({}, {order: inputOrder})
        assert.fail()
      } catch (err) {
        assert(err instanceof ValidationError)
      }
    })
  })
})

const assert = require('assert')
const executeStep = require('../../../order/checkContext')
const OrderError = require('../../../errors/OrderError')

describe('checkContext', () => {
  const contextFixture = {
    log: {
      warn () {}
    },
    meta: {
      userId: null
    }
  }

  it('Should throw error on checkContext', async () => {
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep(contextFixture)
    } catch (err) {
      assert(err instanceof OrderError)
    }
  })

  it('Should bot throw error on checkContext', async () => {
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep({...contextFixture, meta: {userId: 100}})
      assert.ok(true)
    } catch (err) {
      assert.ifError(err)
    }
  })
})

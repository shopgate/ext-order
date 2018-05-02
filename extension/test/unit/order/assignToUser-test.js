const assert = require('assert')
const executeStep = require('../../../order/assignToUser')

describe('assignToUser', () => {
  const assignToUserInput = {
    orderId: 'qwerty-10'
  }
  const context = {
    log: {
      error: () => {}
    },
    storage: {
      user: {}
    }
  }
  const fixtureUserOrders = ['qwerty-1', 'qwerty-2', 'qwerty-3']

  it('Should record lastOrderId and assign recent order to user', async () => {
    context.storage.user.set = async (key, val) => {
      assert.equal(key, 'lastOrderId')
      assert.equal(val, assignToUserInput.orderId)
      context.storage.user.set = async (key, val) => {
        assert.equal(key, 'orders')
        assert.deepEqual(val, [assignToUserInput.orderId, ...fixtureUserOrders])
      }
    }
    context.storage.user.get = async (key) => {
      assert.equal(key, 'orders')
      return [...fixtureUserOrders] // clone
    }
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep(context, assignToUserInput)
    } catch (err) {
      assert.ifError(err)
    }
  })
})

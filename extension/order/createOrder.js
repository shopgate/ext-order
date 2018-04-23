const uuidv4 = require('uuid/v4')
const InternalError = require('./../errors/InternalError')

/**
 * @typedef {Object} CreateOrderInput
 * @property {ExtOrder} order
 */

/**
 * Idempotent order creation
 *
 * @param {SDKContext} context
 * @param {CreateOrderInput} input
 */
module.exports = async (context, input) => {
  const order = input.order

  // generate orderId
  const orderId = uuidv4()

  order.orderId = orderId
  try {
    await context.storage.extension.set(`${input.order.checkoutId}-orderId`, orderId)
  } catch (err) {
    context.log.error(err, `Failed to set orderId for checkoutId into extension storage`)
    throw new InternalError()
  }

  try {
    await context.storage.extension.set(orderId, order)
  } catch (err) {
    context.log.error(err, 'Failed to save order into extension storage')
    throw new InternalError()
  }

  return order
}

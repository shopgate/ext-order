const uuidv4 = require('uuid/v4')
const InternalError = require('./../common/Error/InternalError')

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
    await context.storage.extension.set(orderId, order)
  } catch (err) {
    context.log.error(err, 'Failed to save order into extension storage')
    throw new InternalError()
  }

  return order
}

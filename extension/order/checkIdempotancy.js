const InternalError = require('./../errors/InternalError')

/**
 * @typedef {Object} CheckIdempotancyInput
 * @property {ExtOrder} order
 */

/**
 * PreCheck is user is logged in, etc
 *
 * @param {SDKContext} context
 * @param {CheckIdempotancyInput} input
 */
module.exports = async (context, input) => {
  let orderId
  try {
    orderId = await context.storage.extension.get(`${input.order.checkoutId}-orderId`)
  } catch (err) {
    context.log.error(err, `Failed to find orderId by checkoutId from extension storage`)
    throw new InternalError()
  }

  return {
    orderId: orderId || null
  }
}

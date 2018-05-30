const InternalError = require('./../common/Error/InternalError')

/**
 * @typedef {Object} AssignToUserInput
 * @property {string} orderId
 */

/**
 * Assign order to user
 *
 * @param {SDKContext} context
 * @param {AssignToUserInput} input
 */
module.exports = async (context, input) => {
  const orderId = input.orderId

  try {
    await context.storage.user.set('lastOrderId', orderId)
  } catch (err) {
    context.log.error(err, 'Failed to save lastOrderId for user into user storage')
    throw new InternalError()
  }

  let userOrders
  try {
    userOrders = (await context.storage.user.get('orders')) || []
  } catch (err) {
    context.log.error(err, 'Failed to fetch userOrders from user storage')
    throw new InternalError()
  }

  userOrders.unshift(orderId)
  try {
    await context.storage.user.set('orders', userOrders)
  } catch (err) {
    context.log.error(err, 'Failed to save userOrders into user storage')
    throw new InternalError()
  }
}

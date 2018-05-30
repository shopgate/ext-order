const OrderError = require('./../common/Error/OrderError')

/**
 * Check if user storage available, etc
 *
 * @param {SDKContext} context
 */
module.exports = async (context) => {
  if (!context.meta.userId) {
    context.log.warn('User is not logged in to create an order')
    throw new OrderError()
  }
}

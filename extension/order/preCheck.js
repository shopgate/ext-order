const OrderError = require('./../errors/OrderError')

/**
 * PreCheck is user is logged in, etc
 *
 * @param {SDKContext} context
 */
module.exports = async (context) => {
  if (!context.meta.userId) {
    context.log.warn('User is not logged in to create an order')
    throw new OrderError()
  }
}

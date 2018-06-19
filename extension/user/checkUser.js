const OrderError = require('./../common/Error/OrderError')

/**
 * Check if user logged in
 *
 * @param {SDKContext} context
 */
module.exports = async (context) => {
  if (!context.meta.userId) {
    context.log.warn('User is not logged in')
    throw new OrderError()
  }
}

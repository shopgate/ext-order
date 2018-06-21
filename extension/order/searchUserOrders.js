const checkUser = require('./../user/checkUser')
const InternalError = require('./../common/Error/InternalError')
/**
 * @typedef {Object} SearchOrdersInput
 * @property {number} limit
 * @property {number} offset
 * @property {Object[]} sort
 * @property {Object[]} filters
 */

/**
 * Check user context, fetch user orders, slice by offset and limit
 * Sort is ignored. Recent orders are returned
 *
 * @param {SDKContext} context
 * @param {SearchOrdersInput} input
 * @return {Promise<{orderIds: string[]}>}
 */
module.exports = async (context, input) => {
  // check if user is logged in and user storage is available
  checkUser(context)

  const userFilter = input.filters.find(filter => filter.field === 'userId')
  if (!userFilter) {
    return {
      orderIds: []
    }
  }

  let userOrders
  try {
    userOrders = (await context.storage.user.get('orders')) || []
  } catch (err) {
    context.log.error(err, 'Failed to fetch userOrders from user storage')
    throw new InternalError()
  }

  const orderIds = userOrders.slice(input.offset, input.limit)

  return {
    orderIds
  }
}

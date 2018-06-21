const OrderError = require('./../common/Error/OrderError')
/**
 * @typedef {Object} SearchOrdersInput
 * @property {number} limit
 * @property {number} offset
 * @property {Object[]} sort
 * @property {Object[]} filters
 */

/**
 * @return {Promise<{orderIds: string[]}>}
 */
module.exports = async () => {
  throw new OrderError('Not implemented yet')
}

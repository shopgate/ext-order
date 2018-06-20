/**
 * Get orders from source by orderIds in parallel
 *
 * @param {SDKContext} context
 * @param {{orderIds: string[], fields: ?string[]}} input
 * @return {Promise<{orders: Object[]}>}
 */
module.exports = async (context, input) => {
  if (!Array.isArray(input.orderIds) || !input.orderIds.length) {
    return {
      orders: []
    }
  }

  const promisesSelectors = input.orderIds.map(orderId => context.storage.extension.get(orderId))

  let orders = await Promise.all(promisesSelectors)

  return {
    orders
  }
}

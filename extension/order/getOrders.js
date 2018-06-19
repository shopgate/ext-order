/**
 * Get orders from source by orderIds in parallel
 * @param {SDKContext} context
 * @param {{orderIds: string[]}} input
 * @return {Promise<{orders: Object[]}>}
 */
module.exports = async (context, input) => {
  const promises = input.orderIds.map(orderId => {
    context.storage.extension.get(orderId)
  })

  const orders = await Promise.all(promises)

  return {
    orders
  }
}

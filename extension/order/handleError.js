const OrderError = require('./../common/Error/OrderError')

/**
 * Order error handler for create order pipeline
 * @param {?Error} error
 * @param {SDKContext} context
 */
module.exports = async (error, context) => {
  // If no error occurred, do nothing
  if (!error) {
    return
  }

  // Own error. Rethrow
  if (error instanceof OrderError) {
    throw error
  }

  // Outer error. log and throw own error
  context.log.error(error, 'Error in creating new order')
  throw new OrderError(error)
}

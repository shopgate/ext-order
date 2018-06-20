const Joi = require('joi')
const ValidationError = require('./../common/Error/ValidationError')
const getOrdersRequestSchema = require('./getOrdersRequestSchema')

/**
 * @param {SDKContext} context
 * @param {Object} input
 */
module.exports = async (context, input) => {
  const validationResult = Joi.validate(input, getOrdersRequestSchema)
  if (validationResult.error) {
    throw new ValidationError(validationResult.error.details[0].message)
  }

  // Return normalized input with default values
  return validationResult.value
}

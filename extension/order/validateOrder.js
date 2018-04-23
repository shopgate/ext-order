const Joi = require('joi')
const ValidationError = require('./../errors/ValidationError')
const {schemaOrder} = require('./orderSchema')

/**
 * @typedef {Object} ValidateOrderInput
 * @property {ExtOrder} order
 */

/**
 * @param {SDKContext} context
 * @param {ValidateOrderInput} input
 */
module.exports = async (context, input) => {
  const validationResult = Joi.validate(input.order, schemaOrder)
  if (validationResult.error) {
    throw new ValidationError(validationResult.error.details[0].message)
  }
}

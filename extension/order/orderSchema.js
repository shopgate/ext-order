const Joi = require('joi')

const schemaUser = Joi.object().keys({
  id: Joi.string().required(),
  mail: Joi.string().email({minDomainAtoms: 2}).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
})

const schemaSingleItem = Joi.object().keys({
  id: Joi.string().required(),
  name: Joi.string().required(),
  type: Joi.string().valid(['product', 'coupon']).required(),
  unitPrice: Joi.number(), // -100 | 0 | 100
  quantity: Joi.number().positive().integer().min(1) // 1 | 2 | ...
})

const schemaShippingMethod = Joi.object().keys({
  id: Joi.string().required(),
  name: Joi.string().required(),
  amount: Joi.number(),
  taxAmount: Joi.number().min(0)
})

const schemaPaymentMethod = Joi.object().keys({
  id: Joi.string().required(),
  name: Joi.string().required(),
  amount: Joi.number(),
  taxAmount: Joi.number().min(0)
})

const schemaOrder = Joi.object().keys({
  user: schemaUser,
  items: Joi.array().min(1).items(schemaSingleItem),
  shippingMethod: schemaShippingMethod,
  paymentMethod: schemaPaymentMethod,
  currency: Joi.string().required().length(3), // ISO code of 3 symbols
  total: Joi.number().required()
}).requiredKeys([
  'user',
  'items',
  'shippingMethod',
  'paymentMethod',
  'currency',
  'total'
]).unknown(true) // other keys are allowed as well

module.exports = {
  schemaOrder
}

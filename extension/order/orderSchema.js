const Joi = require('joi')

const schemaUser = Joi.object().keys({
  id: Joi.string().required(),
  mail: Joi.string().email({minDomainAtoms: 2}).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
})

const schemaAddress = Joi.object().keys({
  id: Joi.string().required(),
  firstName: Joi.string().required().min(1).max(100),
  lastName: Joi.string().required().min(1).max(100),
  street: Joi.string().required().min(1).max(255),
  city: Joi.string().required().min(1).max(100),
  provinceCode: Joi.string().required().allow(null).max(10),
  countryCode: Joi.string().required().min(2).max(2),
  zipCode: Joi.string().required().min(1).max(10)
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

const orderTotals = Joi.array().min(1).items(
  Joi.object().keys({
    id: Joi.string().required(),
    amount: Joi.number().required()
  })
)

const schemaOrder = Joi.object().keys({
  user: schemaUser,
  items: Joi.array().min(1).items(schemaSingleItem),
  shippingAddress: schemaAddress,
  billingAddress: schemaAddress,
  shippingMethod: schemaShippingMethod,
  paymentMethod: schemaPaymentMethod,
  currency: Joi.string().required().length(3), // ISO code of 3 symbols
  total: Joi.number().required(),
  totals: orderTotals
}).requiredKeys([
  'user',
  'items',
  'shippingAddress',
  'billingAddress',
  'shippingMethod',
  'paymentMethod',
  'currency',
  'total',
  'totals'
]).unknown(true)// other keys are allowed as well

module.exports = {
  schemaOrder
}

const Joi = require('joi')

const schemaSingleSortItem = Joi.object().keys({
  field: Joi.string().required(),
  direction: Joi.string().valid(['asc', 'desc']).default('desc')
})

const schemaSingleFilterItem = Joi.object().keys({
  field: Joi.string().required(),
  value: [
    Joi.string().required(),
    Joi.array().items(Joi.string().required())
  ],
  condition: Joi.string().valid(['eq', 'neq', 'gt', 'lt', 'lte', 'gte', 'in', 'notin', 'null', 'notnull', 'like']).default('eq')
})

const getOrdersRequestSchema = Joi.object().keys({
  limit: Joi.number().positive().integer().default(10),
  offset: Joi.number().integer().default(0).min(0),
  sort: Joi.array().items(schemaSingleSortItem),
  filters: Joi.array().items(schemaSingleFilterItem)
})

module.exports = getOrdersRequestSchema

/**
 * @typedef {Object} SDKContext
 * @property {ExtensionConfig} config
 * @property {SDKContextMeta} meta
 * @property {SDKContextStorage} storage
 * @property {SDKContextLog} log
 * @property {function} tracedRequest
 */

/**
 * @typedef {Object} ExtensionConfig
 */

/**
 * @typedef {Object} SDKContextMeta
 * @property {string} deviceId
 * @property {string} appId
 * @property {string} userId
 * @property {string} appLanguage
 */

/**
 * @typedef {Object} SDKContextStorage
 * @property {SDKContextEntityStorage} extension
 * @property {SDKContextEntityStorage} device
 * @property {SDKContextEntityStorage} user
 */

/**
 * @typedef {Object} SDKContextEntityStorage
 * @property {function} get - (string key, function cb)
 * @property {function} set - (string key, mixed value, function cb)
 * @property {function} del - (string key, function cb)
 */

/**
 * @typedef {Object} SDKContextLog
 * @property {function} trace
 * @property {function} debug
 * @property {function} info
 * @property {function} warn
 * @property {function} error
 * @property {function} fatal
 */

/**
 * @typedef {Object} ExtOrder
 * @property {?string} id
 * @property {!ExtOrderUser} user
 * @property {!ExtOrderItem[]} items
 * @property {?ExtOrderAddress} shippingAddress
 * @property {?ExtOrderAddress} billingAddress
 * @property {?ExtOrderShippingMethod} shippingMethod
 * @property {?ExtOrderPaymentMethod} paymentMethod
 * @property {?ExtOrderTransaction[]} transactions
 * @property {?Object[]} customFields
 * @property {!string} checkoutId
 * @property {!string} currency
 * @property {!number} taxAmount
 * @property {!number} total
 */

/**
 * @typedef {Object} ExtOrderUser
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} mail
 */

/**
 * @typedef {Object} ExtOrderItem
 * @property {string} id
 * @property {string} name
 * @property {string} type
 * @property {number} unitPrice
 * @property {number} quantity
 */

/**
 * @typedef {Object} ExtOrderAddress
 */

/**
 * @typedef {Object} ExtOrderShippingMethod
 * @property {string} id
 * @property {string} name
 * @property {number} amount
 * @property {number} taxAmount
 */

/**
 * @typedef {Object} ExtOrderPaymentMethod
 * @property {string} id
 * @property {string} name
 * @property {number} amount
 * @property {number} taxAmount
 */

/**
 * @typedef {Object} ExtOrderTransaction
 */

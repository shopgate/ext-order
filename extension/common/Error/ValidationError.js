const OrderError = require('./OrderError')

class ValidationError extends OrderError {
  constructor (error) {
    super()

    this.code = 'EVALIDATION'
    this.message = `Validation error ${error}`
    this.error = error
    this.validationErrors = []
  }
}

module.exports = ValidationError

const OrderError = require('./OrderError')

class ValidationError extends OrderError {
  constructor (error) {
    super()

    this.code = 'EINV'
    this.message = `Validation error ${error}`
    this.error = error
  }
}

module.exports = ValidationError

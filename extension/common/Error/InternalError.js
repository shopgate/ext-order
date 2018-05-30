const OrderError = require('./OrderError')

class InternalError extends OrderError {
  constructor (cause = {message: ''}) {
    super()

    this.cause = cause
    this.code = 'EINTERNAL'
    this.message = `An internal error occurred ${cause.message}`
  }
}

module.exports = InternalError

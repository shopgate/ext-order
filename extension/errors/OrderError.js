class OrderError extends Error {
  constructor (cause = {message: ''}) {
    super()

    this.cause = cause
    this.code = 'EORDER'
    this.message = `Order error: ${cause.message}`
  }
}

module.exports = OrderError

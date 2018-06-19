const assert = require('assert')
const executeStep = require('../../../order/getOrdersRequestValidate')
const ValidationError = require('../../../common/Error/ValidationError')

describe('getOrdersRequestValidate', () => {
  const validSort = {field: 'userId'}
  const invalidSort = {field: 1000, direction: 'non a direction'}

  const validFilter = {field: 'userId', value: 'user_id', condition: 'eq'}
  const validFilterArray = {field: 'userId', value: ['100', '200'], condition: 'in'}
  const invalidFilter = {field: 'userId', value: 1000, condition: 'not_equal'}

  const successTests = {
    'Valid empty input': {},
    'Valid limit': {limit: 10},
    'Valid limit and offset': {limit: 10, offset: 0},
    'Valid limit, offset and sort order': {limit: 10, offset: 0, sort: [{...validSort}]},
    'Valid limit, offset, sort order and filter': {limit: 10, offset: 0, sort: [{...validSort}], filters: [{...validFilter}]},
    'Valid filter value array': {filters: [{...validFilterArray}]}
  }
  Object.entries(successTests).forEach(([testIt, input]) => {
    it(testIt, async () => {
      try {
        // noinspection JSCheckFunctionSignatures
        await executeStep({}, input)
      } catch (err) {
        assert.ifError(err)
      }
    })
  })

  const failedTests = {
    'Invalid limit': {limit: -100},
    'Invalid offset': {offset: -100},
    'Invalid sort as string': {sort: 'i am a string'},
    'Invalid sort': {sort: [{...invalidSort}]},
    'Invalid filters as string': {filters: 'i am a string'},
    'Invalid filters': {filters: [{...invalidFilter}]}
  }
  Object.entries(failedTests).forEach(([testIt, input]) => {
    it(testIt, async () => {
      try {
        // noinspection JSCheckFunctionSignatures
        await executeStep({}, input)
        assert.fail()
      } catch (err) {
        assert(err instanceof ValidationError)
      }
    })
  })
})

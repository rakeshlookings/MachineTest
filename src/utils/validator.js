const { MESSAGES } = require('./constants.json')
const { validationResult } = require('express-validator')

module.exports.validator = (req) => {
  const response = {
    status: true
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    response.status = false
    response.message = MESSAGES.BODY_MISSING
  }
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const errorList = errors.errors
    const listError = []
    for (let i = 0; i < errorList.length; i++) {
      const key = errorList[i].param
      const value = errorList[i].msg
      listError.push([key, value])
    }
    const obj = Object.fromEntries(listError)
    response.status = false
    response.message = MESSAGES.MANDATORY_FIELDS_MISSING
    response.fields = obj
  }
  return response
}
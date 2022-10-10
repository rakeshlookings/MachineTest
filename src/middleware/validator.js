const { check } = require('express-validator')
const { ROLES } = require('../utils//constants.json')

module.exports.addUserValidator = [
  check('name').not().isEmpty().withMessage('name is required').bail().isLength({ min: 3 }).withMessage('name should be of minimum three letters'),
  check('phone').not().isEmpty().withMessage('Phone required').bail().isLength({ min: 8 }).withMessage('Phone should be minimum eight letters'),
  check('role').if(check('role').isIn(Object.values(ROLES)))
]

module.exports.loginValidator = [
  check('phone').exists(),
  check('password').exists()
]


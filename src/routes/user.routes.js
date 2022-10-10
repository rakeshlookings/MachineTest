const express = require('express')
const userRouter = express.Router()
const UserController = require('../controllers/User.controller')
const { requiresAuth } = require('express-openid-connect');
const validators = require('../middleware/validator')

userRouter.post('/login', validators.loginValidator , UserController.login)

userRouter.post('/', validators.addUserValidator ,UserController.addUser)

userRouter.post('/add-doctor', validators.addUserValidator ,UserController.addDoctor)
userRouter.put('/update-doctor/:id', validators.addUserValidator ,UserController.updateDoctor)
userRouter.delete('/remove-doctor/:id', validators.addUserValidator ,UserController.removeDoctor)
userRouter.get('/list-doctor', validators.addUserValidator ,UserController.listDoctors)
userRouter.get('/get-doctor/:id', validators.addUserValidator ,UserController.getDoctor)

module.exports = userRouter
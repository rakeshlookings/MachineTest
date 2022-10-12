const express = require('express')
const userRouter = express.Router()
const UserController = require('../controllers/User.controller')
const { requiresAuth } = require('express-openid-connect');
const validators = require('../middleware/validator')

userRouter.post('/login', validators.loginValidator , UserController.login)

userRouter.post('/', validators.addUserValidator ,UserController.addUser)

userRouter.post('/add-doctor', validators.addDctorValidator ,UserController.addDoctor)
userRouter.put('/update-doctor/:id', UserController.updateDoctor)
userRouter.delete('/remove-doctor/:id', UserController.deleteDoctor)
userRouter.get('/list-doctor', UserController.listDoctors)
userRouter.get('/get-doctor/:id', UserController.getDoctor)

module.exports = userRouter
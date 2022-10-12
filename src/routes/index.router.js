const express = require('express')
const router = express.Router()
const userRouter = require('./user.routes')
const bookingRouter = require('./booking.routes')

router.use('/user', userRouter)
router.use('/booking', bookingRouter)

module.exports = router
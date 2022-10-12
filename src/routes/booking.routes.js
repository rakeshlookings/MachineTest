const express = require('express')
const bookingRouter = express.Router()
const BookningController = require('../controllers/Booking.controller')

bookingRouter.get('/get-doctor', BookningController.getDoctor)

bookingRouter.post('/book-slot', BookningController.bookSlot)

// bookingRouter.get('/bookings-patient', BookningController.listBookingPatient)

// bookingRouter.get('/bookings-doctor', BookningController.listBookingDoctor)

module.exports = bookingRouter
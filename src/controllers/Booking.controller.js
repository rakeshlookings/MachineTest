const BookingService = require('../services/Booking.service')
const getDoctor = async(req,res) => {
    try {
        const response = await BookingService.listDoctors(req)
        return res.status(201).json(response)
    } catch(err) {
        return res.send(err.message)
    }
}

const bookSlot = async(req,res) => {
    try {
        const response = await BookingService.bookSlot(req)
        return res.status(201).json(response)
    } catch(err) {
        return res.send(err.message)
    }
}

module.exports = {
    getDoctor,
    bookSlot
}

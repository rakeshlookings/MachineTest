const User = require('../models/user.model')
const Booking = require('../models/booking.model')
const {ROLES} = require('../utils/constants.json')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ENV = process.env
const datArray = ["Sunday", "Monday"]
const listDoctors = async({query}) => {

      const expertise = query.expertise;
      let date = query.date;
      const dateValString = date
      if (!expertise || !date) {
        throw new Error('Insufficient details')
      }

      date = new Date(date)
      const day = datArray[date.getDay()]

      console.log("day:",day)

      let doctors = await User.find({role:'DOCTOR',expertise: expertise})

      doctors = doctors.filter(doc => {
        let value = false
        doc.availableSlots.forEach(element => {
          console.log('slots:', element.day, day)
          if (element.day === day) {
            value =  true
          }
        });
        return value
      })
      doctors = JSON.parse(JSON.stringify(doctors))
      const outputDoctors = []
      for (let doctor of doctors) {
        const blocked = []
        const bookings = await Booking.find({doctor: doctor._id, date:dateValString })
        for (let booking of bookings){
          blocked.push(booking.slot)
        }
        doctor.blocked = blocked
        outputDoctors.push(doctor)
      }
      return {
        succ:true,
        payload:outputDoctors
      }
}



const bookSlot = async({body, headers}) => {

    const {doctorId, date, slot} = body
    const userId = jwt.verify(headers?.authorization?.split(':')[1], ENV.JWT_KEY)?.user?._id

    if (!doctorId || !date || !slot) {
      throw new Error('Insufficient details')
    }

    const booking = new Booking({
        patient: userId,
        doctor: doctorId,
        date:date,
        slot:slot
    })
    await booking.save()
    return {
        success:true,
        code:201
    }
}

const listBookingDoctor = async({params, user}) => {

  const bookings = await Booking.find({
    doctorId:params.id
  })
  return {
      success:true,
      payload:bookings,
      code:200
  }
}

const listBookingPatient = async({params, user}) => {

  const bookings = await Booking.find({
    patientId:params.id
  })
  return {
      success:true,
      payload:bookings,
      code:200
  }
}
module.exports = {
    listDoctors,
    bookSlot,
    listBookingDoctor,
    listBookingPatient
}
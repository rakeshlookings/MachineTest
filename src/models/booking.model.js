const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
}

const bookingSchema = new Schema({
  patient:{ type: Schema.Types.ObjectId, ref: 'User', sparse: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'User', sparse: true },
  date: String,
  slot: String,
  isPaid: { type: Boolean, default: false },
  timeOfBooking: { type: Date , default: Date.now()}
}, schemaOptions)

const Bookings = mongoose.model('Booking', bookingSchema)

module.exports = Bookings

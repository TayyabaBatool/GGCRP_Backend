const mongoose = require('mongoose')
const { Schema } = mongoose

const admissionSeatsSchema = new Schema({
    listNo: {
        type: Number,
        default: 1
    },
    seats: {
        type: Number,
    },
})

module.exports = mongoose.model('admissionSeats', admissionSeatsSchema)
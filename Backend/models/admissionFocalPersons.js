const mongoose = require('mongoose')
const { Schema } = mongoose

const admissionFocalPersonsSchema = new Schema({
    no: {
        type: Number,
    },
    committee: {
        type: String,
    },
    focalPerson: {
        type: String
    },
    contactNumber: {
        type: String
    }
})

module.exports = mongoose.model('admissionFocalPersons', admissionFocalPersonsSchema)

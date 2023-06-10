const mongoose = require('mongoose')
const { Schema } = mongoose

const admissionImpDatesSchema = new Schema({
    iDate: {
        type: Date,
    },
    event: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('admissionImpdates', admissionImpDatesSchema)

const mongoose = require('mongoose')
const { Schema } = mongoose

const admissionCommitteeSchema = new Schema({
    no: {
        type: Number,
    },
    science: {
        type: String,
    },
    arts: {
        type: String
    }
})

module.exports = mongoose.model('admissionCommittee', admissionCommitteeSchema)

const mongoose = require('mongoose')
const { Schema } = mongoose

const feeConcessionCommitteeSchema = new Schema({
    no: {
        type: Number,
    },
    member: {
        type: String
    }
})

module.exports = mongoose.model('feeConcessionCommittee', feeConcessionCommitteeSchema)

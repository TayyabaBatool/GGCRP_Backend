const mongoose = require('mongoose')
const { Schema } = mongoose

const prospectusCommitteeSchema = new Schema({
    no: {
        type: Number,
    },
    member: {
        type: String
    },
    designation: {
        type: String
    }
})

module.exports = mongoose.model('prospectusCommittee', prospectusCommitteeSchema)

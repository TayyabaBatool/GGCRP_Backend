const mongoose = require('mongoose')
const { Schema } = mongoose

const datesheetsSchema = new Schema({
    datesheetNo: {
        type: Number,
    },
    title: {
        type: String,
        required: true
    },
    uploadedOn: {
        type: String,
        required: true
    },
    datesheetDoc: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('datesheet', datesheetsSchema)

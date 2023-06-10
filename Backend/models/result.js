const mongoose = require('mongoose')
const { Schema } = mongoose

const resultsSchema = new Schema({
    resultNo: {
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
    resultDoc: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('result', resultsSchema)

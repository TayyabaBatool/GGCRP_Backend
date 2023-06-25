const mongoose = require('mongoose')
const { Schema } = mongoose

const homeFileSchema = new Schema({
    fileNo: {
        type: Number,
    },
    title: {
        type: String,
        required: true
    },
    uploadedOn: {
        type: String,
    },
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    homeDoc: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('homeFile', homeFileSchema)

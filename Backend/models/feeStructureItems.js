const mongoose = require('mongoose')
const { Schema } = mongoose

const feeStructureSchema = new Schema({
    fund: {
        type: String,
        required: true
    },
    fee: {
        type: String
    }
})

module.exports = mongoose.model('feeStructureItems', feeStructureSchema)

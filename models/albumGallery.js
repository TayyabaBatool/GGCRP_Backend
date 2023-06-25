const mongoose = require('mongoose')
const { Schema } = mongoose

const albumGallerySchema = new Schema({
    id: {
        type: Number,
    },
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('albumGallery', albumGallerySchema)

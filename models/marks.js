const mongoose = require('mongoose')
const { Schema } = mongoose

const markSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    studentName:{
        type: String,
        ref: "student"
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'subject'
    },
    subjectCode: {
        type: String,
   },
    exam: {
        type: String,
        required:true
    },
    marks: {
        type: Number,
        default: 0
    },
    totalMarks: {
        type: Number,
        default: 100
    },
    department: {
        type:String
    },
    year: {
        type:Number
    },
    section: {
        type:String
    }
})

module.exports = mongoose.model('mark', markSchema)

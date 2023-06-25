const mongoose = require('mongoose')
const { Schema } = mongoose

const applyNowSchema = new Schema({

    profile_photo: {
        type: String,
    }, 
    class_BS: {
        type: String,
    }, 
    subject: {
        type: String,
    }, 
    reg_no_matric: {
        type: String,
    }, 
    enroll_no_inter: {
        type: String,
    }, 
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    dob: {
        type: String,
    }, 
    father_name: {
        type: String,
    }, 
    guardian_name: {
        type: String,
    }, 
    father_profession: {
        type: String,
    }, 
    father_mob_number: {
        type: String,
    }, 
    permanent_address: {
        type: String,
        }, 
    contact_number: {
        type: String,
    }, 
    temporary_address: {
        type: String,
    }, 
    student_mobile_number: {
        type: String,
    },
    marital_status: {
        type: String,
    }, 
    residence: {
        type: String,
    }, 
    blood_group: {
        type: String,
    }, 
    matric_year: {
        type: String,
    }, 
    matric_faculty: {
        type: String,
    }, 
    matric_roll_no: {
        type: String,
    }, 
    matric_obtained_marks: {
        type: String,
    }, 
    matric_grade: {
        type: String,
    }, 
    matric_subjects: {
        type: String,
    }, 
    matric_school: {
        type: String,
    }, 
    inter_year: {
        type: String,
    }, 
    inter_faculty: {
        type: String,
    }, 
    inter_roll_no: {
        type: String,
    }, 
    inter_obtained_marks: {
        type: String,
    }, 
    inter_grade: {
        type: String,
    }, 
    inter_subjects: {
        type: String,
    }, 
    inter_school: {
        type: String,
    }, 
    subject_marks: {
        type: String,
    }, 
    other_subject1: {
        type: String,
    }, 
    other_subject2: {
        type: String,
    }, 
    other_subject3: {
        type: String,
    }, 
    need_bus: {
        type: String,
    }, 
    zakat_eligibile: {
        type: String,
    }, 
    have_scholarship: {
        type: String,
    }, 
    what_in_future: {
        type: String,
    }, 
    applicant_sign: {
        type: String,
    }, 
    father_sign: {
        type: String,
    }, 
    student_cnic: {
        type: String,
    }, 
    father_cnic: {
        type: String,
    },
})

module.exports = mongoose.model('applyNow', applyNowSchema)

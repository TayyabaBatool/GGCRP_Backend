const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateStudentRegisterInput = (data) => {
    let errors = {}
    data.name = !isEmpty(data.name) ? data.name : '';
    data.fatherName = !isEmpty(data.fatherName) ? data.fatherName: '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.studentMobileNumber = !isEmpty(data.studentMobileNumber) ? data.studentMobileNumber : '';
    data.fatherMobileNumber = !isEmpty(data.fatherMobileNumber) ? data.fatherMobileNumber : '';
    data.department = !isEmpty(data.department) ? data.department : '';
    data.section = !isEmpty(data.section) ? data.section : '';
    data.dob = !isEmpty(data.dob) ? data.dob : '';
    data.year = !isEmpty(data.year) ? data.year : '';
    data.address = !isEmpty(data.address) ? data.address : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }
    if (!Validator.isLength(data.fatherName, { min: 2, max: 30 })) {
        errors.fatherName = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.fatherName)) {
        errors.fatherName = 'Father Name is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    if (!Validator.isMobilePhone(data.studentMobileNumber)) {
        errors.studentMobileNumber = 'Please Enter Correct Mobile number';
    }

    if (Validator.isEmpty(data.studentMobileNumber)) {
        errors.studentMobileNumber = 'Mobile Number is required';
    }
    
    if (!Validator.isMobilePhone(data.fatherMobileNumber)) {
        errors.fatherMobileNumber = 'Please Enter Correct Mobile number';
    }

    if (Validator.isEmpty(data.fatherMobileNumber)) {
        errors.fatherMobileNumber = 'Father Mobile Number is required';
    }

    if (Validator.isEmpty(data.department)) {
        errors.department = 'Department field is required';
    }

    if (Validator.isEmpty(data.year)) {
        errors.year = 'Year field is required';
    }

    if (Validator.isEmpty(data.section)) {
        errors.section = 'Section field is required';
    }

    if (Validator.isEmpty(data.dob)) {
        errors.dob = 'DOB field is required';
    }
    if (Validator.isEmpty(data.address)) {
        errors.address = 'Address field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateStudentRegisterInput
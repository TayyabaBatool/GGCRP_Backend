const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateFacultyRegisterInput = (data) => {
    let errors = {}
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.facultyMobileNumber = !isEmpty(data.facultyMobileNumber) ? data.facultyMobileNumber: '';
    data.department = !isEmpty(data.department) ? data.department : '';
    data.designation = !isEmpty(data.designation) ? data.designation : '';
    data.qualification = !isEmpty(data.qualification) ? data.qualification : '';
    data.specialization = !isEmpty(data.specialization) ? data.specialization : '';
    data.dob = !isEmpty(data.dob) ? data.dob : '';
    data.address = !isEmpty(data.address) ? data.address : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }
    if (!Validator.isMobilePhone(data.facultyMobileNumber)) {
        errors.facultyMobileNumber = 'Please Enter Correct Mobile number';
    }

    if (Validator.isEmpty(data.facultyMobileNumber)) {
        errors.facultyMobileNumber = 'Mobile Number is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (Validator.isEmpty(data.department)) {
        errors.department = 'Department field is required';
    }

    if (Validator.isEmpty(data.dob)) {
        errors.dob = 'DOB field is required';
    }
    if (Validator.isEmpty(data.designation)) {
        errors.designation = 'Designation field is required';
    }
    if (Validator.isEmpty(data.qualification)) {
        errors.qualification = 'Qualification field is required';
    }
    if (Validator.isEmpty(data.specialization)) {
        errors.specialization = 'Specialization field is required';
    }
    if (Validator.isEmpty(data.address)) {
        errors.address = 'Address field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateFacultyRegisterInput
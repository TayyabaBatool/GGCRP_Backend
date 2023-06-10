const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
var sequential = require("sequential-ids");
var generator = new sequential.Generator()

//Validation
const validateAdminRegisterInput = require('../validation/adminRegister')
const validateAdminUpdatePassword = require('../validation/adminUpdatePassword')
const validateFacultyRegisterInput = require('../validation/facultyRegister')
const validateStudentRegisterInput = require('../validation/studentRegister')
const validateAdminLoginInput = require('../validation/adminLogin')
const validateSubjectRegisterInput = require('../validation/subjectRegister')

//Models
const Subject = require('../models/subject')
const Student = require('../models/student')
const Faculty = require('../models/faculty')
const Admin = require('../models/admin')

//Config
const keys = require('../config/key')

module.exports = {
    addAdmin: async (req, res, next) => {
        try {
            const { errors, isValid } = validateAdminRegisterInput(req.body);

            if (!isValid) {
                return res.status(400).json(errors)
            }
            const { name, email, dob, contactNumber } = req.body
            
            //VALIDATE REQUEST BODY
            if (!name || !email || !dob || !contactNumber){
                return res.status(400).json({success:false, message:"Probably you have missed certain fields"})
            }

            const admin = await Admin.findOne({ email })
            if (admin) {
                return res.status(400).json({success:false, message:"Email already exist"})
            }
            const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })

            let hashedPassword;
            hashedPassword = await bcrypt.hash(dob, 10)
             var date = new Date();
            const joiningYear = date.getFullYear()
            generator.add('admin', {
                digits : 3, letters: 0,
                restore: `000`
              });
              generator.start();
           
            
            var components = [
                "ADM",
                generator.generate('admin')
            ];

            var registrationNumber = components.join("");
            const newAdmin = await new Admin({
                name,
                email,
                password: hashedPassword,
                registrationNumber,
                avatar,
                joiningYear,
                contactNumber,
                dob,
            })
            await newAdmin.save()
            return res.status(200).json({ success: true, message: "Admin registerd successfully", response: newAdmin })
        }
        catch (error) {
            return res.status(400).json({ success: false, message: error.message })
        }
    },
    adminLogin: async (req, res, next) => {
        try {
            const { errors, isValid } = validateAdminLoginInput(req.body);

            // Check Validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { registrationNumber, password } = req.body;

            const admin = await Admin.findOne({ registrationNumber })
            if (!admin) {
                errors.registrationNumber = 'Registration number not found';
                return res.status(404).json(errors);
            }
            const isCorrect = await bcrypt.compare(password, admin.password)
            if (!isCorrect) {
                errors.password = 'Invalid Credentials';
                return res.status(404).json(errors);
            }
            const payload = {
                id: admin.id, name: admin.name, email: admin.email,
                contactNumber: admin.contactNumber, avatar: admin.avatar,
                registrationNumber: admin.registrationNumber,                
            };
            jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 7200 },
                (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                }
            );
        }
        catch (err) {
            console.log("Error in admin login", err.message)
        }

    },
    getAllStudents: async (req, res, next) => {
        try {
            const { branch, name } = req.body
            const students = await Student.find({})
            if (students.length === 0) {
                return res.status(404).json({ message: "No students found" })
            }
            res.status(200).json({ result: students })
        }
        catch (err) {
            res.status(400).json({ message: `error in getting all student", ${err.message}` })
        }

    },
    addStudent: async (req, res, next) => {
        try {
            // console.log('top')
            const { errors, isValid } = validateStudentRegisterInput(req.body);
            // console.log('inner')
            if (!isValid) {
                return res.status(400).json(errors)
            }
            // console.log('a')
            const { name, email, year, fatherName, address,
             department, section, dob, studentMobileNumber,
                fatherMobileNumber } = req.body
                console.log('b')
            const student = await Student.findOne({ stuemail })
            if (student) {
                errors.stuemail = "Email already exist"
                return res.status(400).json(errors)
            }
            const avatar = gravatar.url(stuemail, { s: '200', r: 'pg', d: 'mm' })
            let departmentHelper;
            if (department === "English") {
                departmentHelper = "ENG"
            }
            else if (department === "Urdu") {
                departmentHelper = "URD"
            }
            else if (department === "Botany") {
                departmentHelper = "BOT"
            }
            else if (department === "Chemistry") {
                departmentHelper = "CHE"
            }
            else if (department === "I.T") {
                departmentHelper = "ITD"

            }
            else if (department === "Economics") {
                departmentHelper = "ECO"
            }
            else if (department === "Islamic Studies"){
                departmentHelper = "ISD"
            }

            let hashedPassword;
            hashedPassword = await bcrypt.hash(studob, 10)
            var date = new Date();
            const batch = date.getFullYear()

            generator.add('student', {
                digits : 3, letters: 0,
                restore: `000`
              });
              generator.start();
            
            var components = [
                "STU",
                generator.generate('student'),
                departmentHelper
            ];

            var registrationNumber = components.join("");
            const newStudent = await new Student({
                name,
                email,
                password: hashedPassword,
                year,
                fatherName,
                address,
                registrationNumber,
                department,
                section,
                batch,
                avatar,
                dob,
                studentMobileNumber,
                fatherMobileNumber
            })
            // await newStudent.save()
            // const subjects = await Subject.find({ year })
            // if (subjects.length !== 0) {
            //     for (var i = 0; i < subjects.length; i++) {
            //         newStudent.subjects.push(subjects[i]._id)
            //     }
            // }
            await newStudent.save()
            res.status(200).json({ result: newStudent })
        }
        catch (err) {
            res.status(400).json({ message: `error in adding new student", ${err.message}` })
            console.log("error in adding")
        }

    },
    addFaculty: async (req, res, next) => {
        try {
            const { errors, isValid } = validateFacultyRegisterInput(req.body)
            //Validation
            if (!isValid) {
                return res.status(400).json(errors)
            }
            const { name, email, designation, qualification,specialization, department, facultyMobileNumber,
             dob, address } = req.body
            const faculty = await Faculty.findOne({ email })
            if (faculty) {
                errors.email = 'Email already exist'
                return res.status(400).json(errors)
            }
            const avatar = gravatar.url(req.body.email, {
                s: '200', // Size
                r: 'pg', // Rating
                d: 'mm' // Default
            });
            let departmentHelper;
            if (department === "English") {
                departmentHelper = "ENG"
            }
            else if (department === "Urdu") {
                departmentHelper = "URD"
            }
            else if (department === "Botany") {
                departmentHelper = "BOT"
            }
            else if (department === "Chemistry") {
                departmentHelper = "CHE"
            }
            else if (department === "I.T") {
                departmentHelper = "ITD"

            }
            else if (department === "Economics") {
                departmentHelper = "ECO"
            }
            else if (department === "Islamic Studies"){
                departmentHelper = "ISD"
            }

        
            let hashedPassword;
            hashedPassword = await bcrypt.hash(dob, 10)
            var date = new Date();
            const joiningYear = date.getFullYear()

            generator.add('faculty', {
                digits : 3, letters: 0,
                restore: `000`
              });
              generator.start();
            
            var components = [
                "FAC",
                generator.generate('faculty'),
                departmentHelper,
            ];

            var registrationNumber = components.join("");
            const newFaculty = await new Faculty({
                name,
                email,
                designation,
                password: hashedPassword,
                department,
                qualification,
                specialization,
                facultyMobileNumber,
                avatar,
                registrationNumber,
                dob,
                address,
                joiningYear
            })
            await newFaculty.save()
            res.status(200).json({ result: newFaculty })
        }
        catch (err) {
            console.log("error", err.message)
            res.status(400).json({ message: `error in adding new Faculty", ${err.message}` })
        }

    },
    getAllFaculty: async (req, res, next) => {
        try {
            const faculties = await Faculty.find({})
            if (faculties.length === 0) {
                return res.status(404).json({ message: "No Record Found" })
            }
            res.status(200).json({ result: faculties })
        }
        catch (err) {
            res.status(400).json({ message: `error in getting new Faculty", ${err.message}` })
        }

    },

    // getSingleFaculty: async(req,res,next)=>{
    //     var id = req.body.id;
    //     const singleUser = await Faculty.findById(id,function(data){
    //         res.send(singleUser)
    //     })
    // },

    updateFaculty: async (req, res, next) => {
        try{
            var id = req.body.id;
            var name = req.body.name;
            var qualification = req.body.qualification;
            var designation = req.body.designation;
            var specialization = req.body.specialization;
            var department = req.body.department;
            // var email = req.body.email;
            Faculty.findById(id,function(err,data){
                if (!data) {
                    return res.status(404).json({message:"Id not found"});
                }
                data.name=name?name:data.name;
                // data.email=email?email:data.email;
                data.designation=designation?designation:data.designation;
                data.department=department?department:data.department;
                data.qualification=qualification?qualification:data.qualification;
                data.specialization=specialization?specialization:data.specialization;
                data.save(function(err){
                    if(err) throw err;
                    res.status(200).json({message: "Faculty Updated Successfully",result: data})
                });
            })
        }
        catch(err){
            res.status(400).json({ message: `error in updating new Faculty", ${err.message}` })
        }
    },
    updateStudent: async (req, res, next) => {
        try{
            var id = req.body.id;
            var name = req.body.name;
            var email = req.body.email;
            Student.findById(id,function(err,data){
                if (!data) {
                    return res.status(404).json({message:"Id not found"});
                }
                data.name=name?name:data.name;
                data.email=email?email:data.email;
                data.save(function(err){
                    if(err) throw err;
                    res.status(200).json({message: "Student Updated Successfully",result: data})
                });
            })
        }
        catch(err){
            res.status(400).json({ message: `error in updating new Student", ${err.message}` })
        }
    },
    deleteFaculty: async (req, res, next) => {
        try{
            var id = req.body.id;
            user= Faculty.findById(id,function(err,data){
                if(!data){
                    return res.status(404).json({message:"Record does not Exist"});  
                }
                Faculty.remove(user,function(err,data){
                    if(err) throw err;
                    res.status(200).json({message: "Faculty Deleted Successfully",result: data})
                })
            })

        }
        catch(err){
            res.status(400).json({ message: `error in deleting new Faculty", ${err.message}` })
        }
        
    },
    deleteStudent: async (req, res, next) => {
        try{
            var id = req.body.id;
            user= Student.findById(id,function(err,data){
                if(!data){
                    return res.status(404).json({message:"Record does not Exist"});  
                }
                Student.remove(user,function(err,data){
                    if(err) throw err;
                    res.status(200).json({message: "Student Deleted Successfully",result: data})
                })
            })

        }
        catch(err){
            res.status(400).json({ message: `error in deleting new Student", ${err.message}` })
        }
        
    },
    deleteSubject: async (req, res, next) => {
        try{
            var id = req.body.id;
            user= Subject.findById(id,function(err,data){
                if(!data){
                    return res.status(404).json({message:"Record does not Exist"});  
                }
                Subject.remove(user,function(err,data){
                    if(err) throw err;
                    res.status(200).json({message: "Subject Deleted Successfully",result: data})
                })
            })

        }
        catch(err){
            res.status(400).json({ message: `error in deleting new Subject", ${err.message}` })
        }
        
    },
    
    addSubject: async (req, res, next) => {
        try {
            const { errors, isValid } = validateSubjectRegisterInput(req.body)
            //Validation
            if (!isValid) {
                return res.status(400).json(errors)
            }
            const { totalLectures, department, subjectCode,
                subjectName, year } = req.body
            const subject = await Subject.findOne({ subjectCode })
            if (subject) {
                errors.subjectCode = "Given Subject is already added"
                return res.status(400).json(errors)
            }
            const newSubject = await new Subject({
                totalLectures,
                subjectCode,
                subjectName,
                department,
                year
            })
            await newSubject.save()
            return res.status(200).json({ success: true, message: "Subject added successfully", response: newSubject })
            const subjects = await Subject.find({ department, year })
            if (subjects.length === 0) {
                errors.department = "No branch found for given subject"
                return res.status(400).json(errors)
            }
            else {
                for (var i = 0; i < subjects.length; i++) {
                    subjects[i].subjects.push(newSubject._id)
                    await subjects[i].save()
                }
            }
        }
        catch (err) {
            console.log(`error in adding new subject", ${err.message}`)
        }
    },
    getAllSubjects: async (req, res, next) => {
        try {
            const allSubjects = await Subject.find({})
            if (!allSubjects) {
                return res.status(404).json({ message: "You havent registered any subject yet." })
            }
            res.status(200).json({result: allSubjects})
        }
        catch (err) {
            res.status(400).json({ message: `error in getting all Subjects", ${err.message}` })
        }
    },
    getAllFaculty: async (req, res, next) => {
        try {
            const { department } = req.body
            const allFaculties = await Faculty.find({ department })
            res.status(200).json({ result: allFaculties })
        }
        catch (err) {
            console.log("Error in gettting all faculties", err.message)
        }
    },
    getAllStudent: async (req, res, next) => {
        try {
            const { department, year } = req.body
            const allStudents = await Student.find({ department, year })
            res.status(200).json({ result: allStudents })
        }
        catch (err) {
            console.log("Error in gettting all students", err.message)
        }
    },
    getAllSubject: async (req, res, next) => {
        try {
            const { department, year } = req.body
            const allSubjects = await Subject.find({ department, year })
            res.status(200).json({ result: allSubjects })
        }
        catch (err) {
            console.log("Error in gettting all subjects", err.message)
        }
    },
    updatePassword: async (req, res, next) => {
        try {
            const { errors, isValid } = validateAdminUpdatePassword(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { registrationNumber, oldPassword, newPassword, confirmNewPassword } = req.body
            if (newPassword !== confirmNewPassword) {
                errors.confirmNewPassword = 'Password Mismatch'
                return res.status(404).json(errors);
            }
            const admin = await Admin.findOne({ registrationNumber })
            const isCorrect = await bcrypt.compare(oldPassword, admin.password)
            if (!isCorrect) {
                errors.oldPassword = 'Invalid old Password';
                return res.status(404).json(errors);
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(newPassword, 10)
            admin.password = hashedPassword;
            await admin.save()
            res.status(200).json({ message: "Password Updated" })
        }
        catch (err) {
            console.log("Error in updating password", err.message)
        }
    },
}
const express = require('express')
const router = express.Router()
const passport = require('passport')

const { addAdmin, adminLogin, addFaculty, addStudent,
    addSubject, getAllFaculty, getAllStudents, getAllSubjects,
    getAllStudent,
    getAllSubject, updatePassword, updateFaculty, deleteFaculty,updateStudent,deleteStudent, deleteSubject} = require('../Controller/adminController')

router.post('/login', adminLogin)
router.post('/addAdmin', addAdmin)
router.post('/updatePassword', passport.authenticate('jwt', { session: false }), updatePassword)
router.post('/getAllFaculty', passport.authenticate('jwt', { session: false }),getAllFaculty)
router.patch('/updateFaculty',passport.authenticate('jwt', { session: false }),updateFaculty)
router.delete('/delFaculty',passport.authenticate('jwt', { session: false }),deleteFaculty)
router.post('/getAllStudent', passport.authenticate('jwt', { session: false }), getAllStudent)
router.patch('/updateStudent',passport.authenticate('jwt', { session: false }),updateStudent)
router.delete('/delStudent',passport.authenticate('jwt', { session: false }),deleteStudent)
router.post('/getAllSubject', passport.authenticate('jwt', { session: false }), getAllSubject)
router.delete('/delSubject',passport.authenticate('jwt', { session: false }),deleteSubject)
router.post('/addFaculty', passport.authenticate('jwt', { session: false }), addFaculty)
router.post('/addStudent', passport.authenticate('jwt', { session: false }),addStudent)
router.post('/addSubject', passport.authenticate('jwt', { session: false }), addSubject)
router.get('/getFaculties', passport.authenticate('jwt', { session: false }), getAllFaculty)
router.get('/getStudents', passport.authenticate('jwt', { session: false }), getAllStudents)
router.get('/getSubjects', passport.authenticate('jwt', { session: false }),getAllSubjects)

module.exports = router
const express = require('express')
const router = express.Router()

const {
    resultAddResult, resultGetResult,
    datesheetAddDatesheet, datesheetGetDatesheet, 
} = require('../Controller/examController')

// For Results Page
router.post('/addResultDoc', resultAddResult);
router.get('/getResultDoc', resultGetResult);

// For Datesheets Page
router.post('/addDatesheetDoc', datesheetAddDatesheet);
router.get('/getDatesheetDoc', datesheetGetDatesheet);

module.exports = router
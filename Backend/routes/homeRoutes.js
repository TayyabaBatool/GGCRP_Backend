const express = require('express')
const router = express.Router()

const {
    homeAddFile, homeGetFile,
} = require('../Controller/homeController')

// For Results Page
router.post('/addHomeDoc', homeAddFile);
router.get('/getHomeDoc', homeGetFile);

module.exports = router
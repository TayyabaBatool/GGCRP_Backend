const express = require('express')
const router = express.Router()

// const AlbumGalleryModel = require('../models/albumGallery')

// // For image
// const multer = require("multer")

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "public/uploads/");
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.originalname);
//     }
// })

// const upload = multer({storage: storage})


// router.post("/addImg", (req, res, next) => {
    
//         console.log("Imageee: ", req.body)

//         // const newImageItem = new AlbumGalleryModel({
//         //     id: req.body.id,
//         //     title: req.body.title,
//         //     img: req.body.img
//         // });

//         // newImageItem
//         //     .save()
//         //     .then(() => res.json("New Image posted"))
//         //     .catch((err) => res.status(400).json(`T_Error: ${err}`))

//         const {id, title, img} = req.body

//         const newImageItem = new AlbumGalleryModel(
//             id,
//             title,
//             img
//         )
//         newImageItem
//             .save()
//             .then(() => res.json("New Image posted"))
//             .catch((err) => res.status(400).json(`T_Error: ${err}`))

   
// })








const {
    galleryAddImage, gallerGetImage, 
} = require('../Controller/galleryController')

// For Gallery Page
router.post('/addGalleryImage', galleryAddImage);
router.get('/getGalleryImage', gallerGetImage);

module.exports = router
// const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;

// const storage = new GridFsStorage({
//     url: process.env.MONGO_URL,
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => {
//         const filename = `${Date.now()}-any-name-${file.originalname}`;
//         console.log("filee"+filename);
//         const match = ["image/png", "image/jpeg"];

//         res.send("Fileee" + file)

//         if (match.indexOf(file.mimetype) === -1) {
//             const filename = `${Date.now()}-any-name-${file.originalname}`;
//             console.log(filename);
//             return filename;
//         }

//         return {
//             bucketName: "photos",
//             filename: `${Date.now()}-any-name-${file.originalname}`,
//         };
//     },
// });

// module.exports = multer({ storage });
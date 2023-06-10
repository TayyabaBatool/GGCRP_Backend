const AlbumGalleryModel = require('../models/albumGallery')

module.exports = {

    galleryAddImage: async(req, res, next) => {
        try {
            const { id, title, img } = req.body

            //VALIDATE REQUEST BODY
            if(!img || !title) {
                return res.status(400).json({success: false, message: "Probably you have missed certain fields"})
            }

            const imageItem = await AlbumGalleryModel.findOne({ title, img })
            if (imageItem) {
                return res.status(400).json({success:false, message:"This image item already exist"})
            }

             // With sort and limit, getting the last inserted document for setting id incremented value
             var lastDoc = await AlbumGalleryModel.findOne({}).sort({_id:-1}).limit(1)

             var lastDocNo;
             if(!lastDoc) {
                 var thisDocNo = 1
             }
             else {
                lastDocNo = lastDoc.id
                 var thisDocNo = lastDocNo+1
             }

            const newImageItem = await new AlbumGalleryModel({
                id: thisDocNo,
                title,
                img
            })
            await newImageItem.save()
            return res.status(200).json({success: true, message: "Image Item Added Successfully", headers: {"Access-Control-Allow-Origin": "*"}, response: newImageItem})
        }
        catch (error) {
            return res.status(400).json({ success: false, message: "T_Error: Error in adding Image item: " + error.message })
        }
    },
    gallerGetImage: async(req, res, next) => {
        try {
            const{id, title, img} = req.body
            const imageItem = await AlbumGalleryModel.find({})
            if(imageItem.length === 0) {
                return res.status(404).json({ message: "No Image Items found" })
            }
            res.status(200).json({ result: imageItem })
        }
        catch (err) {
            res.status(400).json({ message: `Error in getting all Image Items", ${err.message}` })
        }
    }
}
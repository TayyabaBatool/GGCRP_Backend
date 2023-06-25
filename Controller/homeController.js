const FilesModel = require('../models/homeFile')

module.exports = {

    homeAddFile: async(req, res, next) => {
        try {
            const { fileNo, title, uploadedOn, day, month, year, homeDoc } = req.body

            //VALIDATE REQUEST BODY
            if(!title || !homeDoc) {
                return res.status(400).json({success: false, message: "Probably you have missed certain fields"})
            }

            const docItem = await FilesModel.findOne({ title, homeDoc })
            if (docItem) {
                return res.status(400).json({success:false, message:"This File item already exist"})
            }

             // With sort and limit, getting the last inserted document for setting id incremented value
             var lastDoc = await FilesModel.findOne({}).sort({_id:-1}).limit(1)

             var lastDocNo;
             if(!lastDoc) {
                 var thisDocNo = 1
             }
             else {
                lastDocNo = lastDoc.fileNo
                 var thisDocNo = lastDocNo+1
             }

             var today = new Date();
             today.setHours(0,0,0,0);

            const newFileItem = await new FilesModel({
                fileNo: thisDocNo,
                title,
                uploadedOn: today,
                day,
                month,
                year,
                homeDoc
            })
            await newFileItem.save()
            return res.status(200).json({success: true, message: "Home Doc Added Successfully", headers: {"Access-Control-Allow-Origin": "*"}, response: newFileItem})
        }
        catch (error) {
            return res.status(400).json({ success: false, message: "T_Error: Error in adding Home Doc: " + error.message })
        }
    },
    homeGetFile: async(req, res, next) => {
        try {
            const{ fileNo, title, uploadedOn, day, month, year, homeDoc } = req.body
            const fileItem = await FilesModel.find({}).sort({_id:-1})
            if(fileItem.length === 0) {
                return res.status(404).json({ message: "No File Items found" })
            }
            res.status(200).json({ result: fileItem })
        }
        catch (err) {
            res.status(400).json({ message: `Error in getting all File Items", ${err.message}` })
        }
    },
}
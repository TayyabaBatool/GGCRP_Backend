const ResultModel = require('../models/result')
const DatesheetModel = require('../models/datesheet')

module.exports = {

    resultAddResult: async(req, res, next) => {
        try {
            const { resultNo, title, uploadedOn, resultDoc } = req.body

            //VALIDATE REQUEST BODY
            if(!title || !resultDoc) {
                return res.status(400).json({success: false, message: "Probably you have missed certain fields"})
            }

            const docItem = await ResultModel.findOne({ title, resultDoc })
            if (docItem) {
                return res.status(400).json({success:false, message:"This Result File item already exist"})
            }

             // With sort and limit, getting the last inserted document for setting id incremented value
             var lastDoc = await ResultModel.findOne({}).sort({_id:-1}).limit(1)

             var lastDocNo;
             if(!lastDoc) {
                 var thisDocNo = 1
             }
             else {
                lastDocNo = lastDoc.resultNo
                 var thisDocNo = lastDocNo+1
             }

             var today = new Date();
             today.setHours(0,0,0,0);

            const newResultItem = await new ResultModel({
                resultNo: thisDocNo,
                title,
                uploadedOn: today,
                resultDoc
            })
            await newResultItem.save()
            return res.status(200).json({success: true, message: "Result Doc Added Successfully", headers: {"Access-Control-Allow-Origin": "*"}, response: newResultItem})
        }
        catch (error) {
            return res.status(400).json({ success: false, message: "T_Error: Error in adding Result: " + error.message })
        }
    },
    resultGetResult: async(req, res, next) => {
        try {
            const{resultNo, title, uploadedOn, resultDoc} = req.body
            const resultItem = await ResultModel.find({}).sort({_id:-1})
            if(resultItem.length === 0) {
                return res.status(404).json({ message: "No Result Items found" })
            }
            res.status(200).json({ result: resultItem })
        }
        catch (err) {
            res.status(400).json({ message: `Error in getting all Result Items", ${err.message}` })
        }
    },
    datesheetAddDatesheet: async(req, res, next) => {
        try {
            const { datesheetNo, title, uploadedOn, datesheetDoc } = req.body

            //VALIDATE REQUEST BODY
            if(!title || !datesheetDoc) {
                return res.status(400).json({success: false, message: "Probably you have missed certain fields"})
            }

            const docItem = await DatesheetModel.findOne({ title, datesheetDoc })
            if (docItem) {
                return res.status(400).json({success:false, message:"This Datesheet File item already exist"})
            }

             // With sort and limit, getting the last inserted document for setting id incremented value
             var lastDoc = await DatesheetModel.findOne({}).sort({_id:-1}).limit(1)

             var lastDocNo;
             if(!lastDoc) {
                 var thisDocNo = 1
             }
             else {
                lastDocNo = lastDoc.datesheetNo
                 var thisDocNo = lastDocNo+1
             }

             var today = new Date();
             today.setHours(0,0,0,0);

            const newDatesheetItem = await new DatesheetModel({
                datesheetNo: thisDocNo,
                title,
                uploadedOn: today,
                datesheetDoc
            })
            await newDatesheetItem.save()
            return res.status(200).json({success: true, message: "Datesheet Doc Added Successfully", headers: {"Access-Control-Allow-Origin": "*"}, response: newDatesheetItem})
        }
        catch (error) {
            return res.status(400).json({ success: false, message: "T_Error: Error in adding Datesheet: " + error.message })
        }
    },
    datesheetGetDatesheet: async(req, res, next) => {
        try {
            const{datesheetNo, title, uploadedOn, datesheetDoc} = req.body
            const datesheettItem = await DatesheetModel.find({})
            if(datesheettItem.length === 0) {
                return res.status(404).json({ message: "No Result Items found" })
            }
            res.status(200).json({ result: datesheettItem })
        }
        catch (err) {
            res.status(400).json({ message: `Error in getting all Result Items", ${err.message}` })
        }
    }
}
const AdmissionCommitteeItem = require('../models/admissionCommittee')
const FeeConcessionCommitteeItem = require('../models/feeConcessionCommittee')
const ProspectusCommitteeItem = require('../models/prospectusCommittee')
const AdmissionFocalPersons = require('../models/admissionFocalPersons')

const AdmissionImpDates = require('../models/admissionImpDates')

const FeeItem = require('../models/feeStructureItems')

const ApplyNow = require('../models/applyNow')
const AdmissionAwaitingStudent = require('../models/admissionAwaitingStudent')
const AdmissionApprovedStudents = require('../models/admissionApprovedStudents')

const NoOfSeats = require('../models/admissionSeats')
const AdmissionShortlistedStudents = require('../models/admissionShortlistedStudents')

module.exports = {
    admissionAddAdmissionCommittee: async(req, res, next) => {
        try {
            const { science, arts, no } = req.body

            //VALIDATE REQUEST BODY
            if(!science && !arts) {
                return res.status(400).json({success: false, message: "Probably you have missed certain fields"})
            }

            const committeeItem = await AdmissionCommitteeItem.findOne({ no, science, arts })
            if (committeeItem) {
                return res.status(400).json({success:false, message:"This committee item already exist"})
            }

             // With sort and limit, getting the last inserted document
             var lastDoc = await AdmissionCommitteeItem.findOne({}).sort({_id:-1}).limit(1)
             var lastDocNo;
             if(!lastDoc) {
                 var thisDocNo = 1
             }
             else {
                lastDocNo = lastDoc.no
                 var thisDocNo = lastDocNo+1
             }

            const newCommitteeItem = await new AdmissionCommitteeItem({
                no: thisDocNo,
                science,
                arts,
            })
            await newCommitteeItem.save()
            return res.status(200).json({success: true, message: "Committee Item Added Successfully", response: newCommitteeItem})
        }
        catch (error) {
            return res.status(400).json({ success: false, message: "T_Error: Error in adding Committee item: " + error.message })
        }
    }, 
    admissionGetAdmissionCommittee: async(req, res, next) => {
        try {
            const{no, science, arts} = req.body
            const committeeItem = await AdmissionCommitteeItem.find({})
            if(committeeItem.length === 0) {
                return res.status(404).json({ message: "No Committee Items found" })
            }
            res.status(200).json({ result: committeeItem })
        }
        catch (err) {
            res.status(400).json({ message: `Error in getting all Committee Items", ${err.message}` })
        }
    },
    admissionAddFeeConcessionCommittee: async(req, res, next) => {
        try {
            const { no, member } = req.body

            //VALIDATE REQUEST BODY
            if(!member) {
                return res.status(400).json({success: false, message: "Probably you have missed certain fields"})
            }

            const committeeItem = await FeeConcessionCommitteeItem.findOne({ no, member })
            if (committeeItem) {
                return res.status(400).json({success:false, message:"This committee item already exist"})
            }

            const newCommitteeItem = await new FeeConcessionCommitteeItem({
                no,
                member
            })
            await newCommitteeItem.save()
            return res.status(200).json({success: true, message: "Committee Item Added Successfully", response: newCommitteeItem})
        }
        catch (error) {
            return res.status(400).json({ success: false, message: "T_Error: Error in adding Committee item: " + error.message })
        }
    }, 
    admissionGetFeeConcessionCommittee: async(req, res, next) => {
        try {
            const{no, member} = req.body
            const committeeItem = await FeeConcessionCommitteeItem.find({})
            if(committeeItem.length === 0) {
                return res.status(404).json({ message: "No Committee Items found" })
            }
            res.status(200).json({ result: committeeItem })
        }
        catch (err) {
            res.status(400).json({ message: `Error in getting all Committee Items", ${err.message}` })
        }
    },
    admissionAddProspectusCommittee: async(req, res, next) => {
        try {
            const { no, member, designation } = req.body

            //VALIDATE REQUEST BODY
            if(!member) {
                return res.status(400).json({success: false, message: "Probably you have missed certain fields"})
            }

            const committeeItem = await ProspectusCommitteeItem.findOne({ no, member })
            if (committeeItem) {
                return res.status(400).json({success:false, message:"This committee item already exist"})
            }

            // With sort and limit, getting the last inserted document
            var lastDoc = await ProspectusCommitteeItem.findOne({}).sort({_id:-1}).limit(1)
            var lastDocNo;
            if(!lastDoc) {
                var thisDocNo = 1
            }
            else {
               lastDocNo = lastDoc.no
                var thisDocNo = lastDocNo+1
            }

            const newCommitteeItem = await new ProspectusCommitteeItem({
                no: thisDocNo,
                member,
                designation
            })
            await newCommitteeItem.save()
            return res.status(200).json({success: true, message: "Prospectus Committee Item Added Successfully", response: newCommitteeItem})
        }
        catch (error) {
            return res.status(400).json({ success: false, message: "T_Error: Error in adding Committee item: " + error.message })
        }
    }, 
    admissionGetProspectusCommittee: async(req, res, next) => {
        try {
            const{no, member, designation} = req.body
            const committeeItem = await ProspectusCommitteeItem.find({})
            if(committeeItem.length === 0) {
                return res.status(404).json({ message: "No Committee Items found" })
            }
            res.status(200).json({ result: committeeItem })
        }
        catch (err) {
            res.status(400).json({ message: `Error in getting all Committee Items", ${err.message}` })
        }
    },
    admissionAddFocalPersons: async(req, res, next) => {
        try {
            const { no, committee, focalPerson, contactNumber } = req.body

            //VALIDATE REQUEST BODY
            if(!committee && !focalPerson) {
                return res.status(400).json({success: false, message: "Probably you have missed certain fields"})
            }

            const focalPersonData = await AdmissionFocalPersons.findOne({ no, committee, focalPerson })
            if (focalPersonData) {
                return res.status(400).json({success:false, message:"This Focal Person Data already exist"})
            }

            const newFocalPersonData = await new AdmissionFocalPersons({
                no,
                committee,
                focalPerson,
                contactNumber
            })
            await newFocalPersonData.save()
            return res.status(200).json({success: true, message: "Focal Person Data Added Successfully", response: newFocalPersonData})
        }
        catch (error) {
            return res.status(400).json({ success: false, message: "T_Error: Error in adding Focal Person Data : " + error.message })
        }
    }, 
    admissionGetFocalPersons: async(req, res, next) => {
        try {
            const{ no, committee, focalPerson, contactNumber } = req.body
            const focalPersonData = await AdmissionFocalPersons.find({})
            if(focalPersonData.length === 0) {
                return res.status(404).json({ message: "No Focal Person Data found" })
            }
            res.status(200).json({ result: focalPersonData })
        }
        catch (err) {
            res.status(400).json({ message: `Error in getting all Focal Persons Data", ${err.message}` })
        }
    },
    admissionAddImpDate: async(req, res, next) => {
        try {
            const { iDate, event } = req.body

            //VALIDATE REQUEST BODY
            if( !iDate || !event ) {
                return res.status(400).json({success: false, message: "Probably you have missed certain fields"})
            }

            const impDateItem = await AdmissionImpDates.findOne({ iDate, event })
            if (impDateItem) {
                return res.status(400).json({success:false, message:"This Important Date item already exists"})
            }

            const newImpDateItem = await new AdmissionImpDates({
                iDate: new Date(iDate),
                event
            })
            await newImpDateItem.save()
            return res.status(200).json({success: true, message: "Imp Date Item Added Successfully", response: newImpDateItem})
        }
        catch (error) {
            return res.status(400).json({ success: false, message: "T_Error: Error in adding Imp Date item: " + error.message })
        }
    }, 
    admissionGetImpDates: async(req, res, next) => {
        try {
            const{ iDate, event } = req.body
            var today = new Date();
            today.setHours(0,0,0,0);

            // Selecting only those dates which are greater than today --> Means coming imp dates
            const query = { iDate: {$gt: today} };

            // Sort in descending (-1) order by length.
            const sort = { iDate: 1 };
            
            const impDateItems = await AdmissionImpDates.find(query).sort(sort)

            if(impDateItems.length === 0) {
                return res.status(404).json({ message: "No Imp date Items found" })
            }
            res.status(200).json({ result: impDateItems })
        }
        catch (err) {
            res.status(400).json({ message: `Error in getting all Imp Date Items", ${err.message}` })
        }
    },
    admissionAddFeeItems: async(req, res, next) => {
        try {
            const { fund, fee } = req.body

            //VALIDATE REQUEST BODY
            if(!fund) {
                return res.status(400).json({success: false, message: "Probably you have missed certain fields"})
            }

            const feeItem = await FeeItem.findOne({ fund })
            if (feeItem) {
                return res.status(400).json({success:false, message:"Fund already exist"})
            }

            const newFeeItem = await new FeeItem({
                fund,
                fee,
            })
            await newFeeItem.save()
            return res.status(200).json({success: true, message: "Fee Item Added Successfully", response: newFeeItem})
        }
        catch (error) {
            return res.status(400).json({ success: false, message: "T_Error: Error in adding fee item: " + error.message })
        }
    }, 
    admissionGetFeeItems: async(req, res, next) => {
        try {
            const{fund, fee} = req.body
            const feeItems = await FeeItem.find({})
            if(feeItems.length === 0) {
                return res.status(404).json({ message: "No Fee Items found" })
            }
            res.status(200).json({ result: feeItems })
        }
        catch (err) {
            res.status(400).json({ message: `Error in getting all Fee Items", ${err.message}` })
        }
    },
    admissionAddApplyNowData: async(req, res, next) => {
        try {
            
            const { profile_photo, class_BS, subject, reg_no_matric, enroll_no_inter, name, email,
            dob, father_name, guardian_name, father_profession, father_mob_number, 
            permanent_address, contact_number, temporary_address, student_mobile_number,
            marital_status, residence, blood_group, matric_year, matric_faculty, 
            matric_roll_no, matric_obtained_marks, matric_grade, matric_subjects, 
            matric_school, inter_year, inter_faculty, 
            inter_roll_no, inter_obtained_marks, inter_grade, inter_subjects, 
            inter_school, subject_marks, other_subject1, other_subject2, other_subject3, 
            need_bus, zakat_eligibile, have_scholarship, what_in_future, 
            applicant_sign, father_sign, student_cnic, father_cnic } = req.body

            //VALIDATE REQUEST BODY
            if(!name || !father_name || !student_cnic || !father_cnic) {
                return res.status(400).json({success: false, message: "Probably you have missed certain fields"})
            }

            const applyNowData = await ApplyNow.findOne({ student_cnic })
            if (applyNowData) {
                return res.status(400).json({success:false, message:"Student already exist"})
            }

            const newApplyNowData = await new ApplyNow({
                profile_photo, class_BS, subject, reg_no_matric, enroll_no_inter, name, email,
                dob, father_name, guardian_name, father_profession, father_mob_number, 
                permanent_address, contact_number, temporary_address, student_mobile_number,
                marital_status, residence, blood_group, matric_year, matric_faculty, 
                matric_roll_no, matric_obtained_marks, matric_grade, matric_subjects, 
                matric_school, inter_year, inter_faculty, 
                inter_roll_no, inter_obtained_marks, inter_grade, inter_subjects, 
                inter_school, subject_marks, other_subject1, other_subject2, other_subject3, 
                need_bus, zakat_eligibile, have_scholarship, what_in_future, 
                applicant_sign, father_sign, student_cnic, father_cnic
            })

            // Calculating merit value based on inter_marks and the selecetd subject marks
            var inter_marks_int = parseInt(inter_obtained_marks);
            var subject_marks_int = parseInt(subject_marks);
            var meritValue = ((inter_marks_int*75/1100) + (subject_marks_int*25/200));
            console.log("Meritttt : ", (meritValue.toFixed(4)));

            // Adding student data in the Awaiting students Table so that admin can view them and approve the students application
            const newAwaitingStudent = await new AdmissionAwaitingStudent({
                profile_photo, class_BS, subject, reg_no_matric, enroll_no_inter, name, email,
                dob, father_name, guardian_name, father_profession, father_mob_number, 
                permanent_address, contact_number, temporary_address, student_mobile_number,
                marital_status, residence, blood_group, matric_year, matric_faculty, 
                matric_roll_no, matric_obtained_marks, matric_grade, matric_subjects, 
                matric_school, inter_year, inter_faculty, 
                inter_roll_no, inter_obtained_marks, inter_grade, inter_subjects, 
                inter_school, subject_marks, other_subject1, other_subject2, other_subject3, 
                need_bus, zakat_eligibile, have_scholarship, what_in_future, 
                applicant_sign, father_sign, student_cnic, father_cnic, 
                merit: meritValue,
            })
            await newApplyNowData.save()
            await newAwaitingStudent.save()
            return res.status(200).json({success: true, message: "Apply Now Data Added Successfully", response: newApplyNowData})
        }
        catch(err) {
            return res.status(400).json({ success: false, message: "T_Error: Error in posting form data:  " + error.message })
        }
    },
    admissionGetApplyNowData: async(req, res, next) => {
        try {
            const{name, student_cnic, father_cnic, subject, matric_obtained_marks, inter_obtained_marks, subject_marks} = req.body
           
            const studentData = await ApplyNow.find({})
            //console.log("resulttttttttttttt: ", studentData[1].name)
            if(studentData.length === 0) {
                return res.status(404).json({ message: "No Students Data found" })
            }
            res.status(200).json({ result: studentData })
        }
        catch (err) {
            res.status(400).json({ message: `Error in getting all Student's data", ${err.message}` })
        }
    },
    admissionGetAwaitingStudents: async(req, res, next) => {
        try {
            const{name, student_cnic, father_cnic, subject, matric_obtained_marks, inter_obtained_marks, subject_marks, merit} = req.body

            const query = {};
            // Sort in descending (-1) order by merit percentage.
            const sort = { merit: -1 }
            
            const awaitingStudentData = await AdmissionAwaitingStudent.find(query).sort(sort)
            if(awaitingStudentData.length === 0) {
                return res.status(404).json({ message: "No Awaiting Students Data found" })
            }
            res.status(200).json({ result: awaitingStudentData })
        }
        catch (err) {
            res.status(400).json({ message: `Error in getting Awaiting Student's data", ${err.message}` })
        }
    },
    admissionApproveStudent: async(req, res, next) => {
        try {
            const { id } = req.body

            //VALIDATE REQUEST BODY
            if(!id) {
                return res.status(400).json({success: false, message: "Probably you have missed certain fields"})
            }

            const student = await AdmissionApprovedStudents.findOne({ _id: id })
            if (student) {
                return res.status(400).json({success:false, message:"This student is already approved"})
            }

            const awaitingStudentData = await AdmissionAwaitingStudent.findOne({_id: id})
            console.log("std...", awaitingStudentData)

            // Adding new approved student
            const newApprovedStudent = await AdmissionApprovedStudents.insertMany(awaitingStudentData)
            // Deleting from Awaiting list
            const deletedStudent = await AdmissionAwaitingStudent.deleteOne({_id: id})

            return res.status(200).json({success: true, message: "Approved Student Successfully", response: newApprovedStudent})
        }
        catch (error) {
            return res.status(400).json({ success: false, message: "T_Error: Error in approving student: " + error.message })
        }
    },
    admissionGetApprovedStudents: async(req, res, next) => {
        try {
            const{name, student_cnic, father_cnic, subject, matric_obtained_marks, inter_obtained_marks, subject_marks, merit} = req.body

            const query = {};
            // Sort in descending (-1) order by merit percentage.
            const sort = { merit: -1 }
            
            const approvedStudents = await AdmissionApprovedStudents.find(query).sort(sort)
            if(approvedStudents.length === 0) {
                return res.status(404).json({ message: "No Awaiting Students Data found" })
            }
            res.status(200).json({ result: approvedStudents })
        }
        catch (err) {
            res.status(400).json({ message: `Error in getting Awaiting Student's data", ${err.message}` })
        }
    },
    admissionDisapproveStudent: async(req, res, next) => {
        try {
            const { id } = req.body

            //VALIDATE REQUEST BODY
            if(!id) {
                return res.status(400).json({success: false, message: "Probably you have missed certain fields"})
            }

            const awaitingStudentData = await AdmissionAwaitingStudent.findOne({_id: id})

            if(!awaitingStudentData) {
                return res.status(404).json({ message: "No Awaiting Students Data found" })
            }

            // Deleting from Awaiting list
            const deletedStudent = await AdmissionAwaitingStudent.deleteOne({_id: id})

            return res.status(200).json({success: true, message: "Disapproved Student Successfully", response: awaitingStudentData})
        }
        catch (error) {
            return res.status(400).json({ success: false, message: "T_Error: Error in approving student: " + error.message })
        }
    },
    admissionAddSeatsAndUploadMeritList: async(req, res, next) => {
        try {
            /////// Adding new no of available seats /////////
            const { listNo, seats, deadlineDate } = req.body

            //VALIDATE REQUEST BODY
            if(!seats || !deadlineDate) {
                return res.status(400).json({success: false, message: "Probably you have missed certain fields"})
            }

            // With sort and limit, getting the last\latest inserted document
            var lastListDoc = await NoOfSeats.findOne({}).sort({_id:-1}).limit(1)
            var lastListNo;
            if(!lastListDoc) {
                var thisListNo = 1
            }
            else {
                lastListNo = lastListDoc.listNo
                var thisListNo = lastListNo+1
            }

            // Adding new seats value to admissionSeats table
            const newSeatsValue = await new NoOfSeats({
                listNo: thisListNo,
                seats,
            })
            await newSeatsValue.save()

            /////// Selecting given no of students from Approved Students table and inserrting them into Shortlisted Students Table  /////////
            var shortlistedStudentsDoc = await AdmissionApprovedStudents.find({}).sort({merit:-1}).limit(seats)

            // Adding a flag document with just (merit list no field and deadline field) for each new merit list upload flag
            const newMeritList = await AdmissionShortlistedStudents.insertMany({
                meritListNo: thisListNo,
                deadlineDate
            })

            // this option prevents additional documents from being inserted if one fails
            const options = { ordered: true };
            
            // Adding new students to Shortlisted Students Table 
            const newShortlistedStudents = await AdmissionShortlistedStudents.insertMany(shortlistedStudentsDoc, options)
            
            for (const index in shortlistedStudentsDoc) {
                // Adding meritListNo field
                AdmissionShortlistedStudents.findOneAndUpdate({_id: shortlistedStudentsDoc[index]._id},
                    {$set : {"meritListNo": thisListNo, deadlineDate}},
                    {upsert:false,
                    multi:true},
                    function(err, course) {
                        if (err) {
                            return res.status(400).json({ success: false, message: "T_Error: Error in posting no of seats:  " + error.message })
                        } 
                    })
                
                // Deleting those added students from Approved Students Table
                const deletedStudents = await AdmissionApprovedStudents.deleteOne({_id: shortlistedStudentsDoc[index]._id})
            } 
            console.log("Enterreddd")

            return res.status(200).json({success: true, message: "Seats value Added Successfully and shortlisted students added", response: newSeatsValue})
        }
        catch(err) {
            return res.status(400).json({ success: false, message: "T_Error: Error in posting no of seats:  " + error.message })
        }
    },
    admissionGetNoOfSeats: async(req, res, next) => {
        try {
            const{seats} = req.body
            // With sort and limit, getting the last inserted document
            const noOfSeats = await NoOfSeats.find({}).sort({_id:-1}).limit(1)
            if(noOfSeats.length === 0) {
                return res.status(404).json({ message: "No No. Of Seats value found" })
            }
            res.status(200).json({ result: noOfSeats })
        }
        catch (err) {
            res.status(400).json({ message: `Error in getting No Of Seats value", ${err.message}` })
        }
    },
    admissionNoOfMeritLists: async(req, res, next) => {
        try {
            const{seats} = req.body
            // With sort and limit, getting the last inserted document
            const Lists = await NoOfSeats.find({})
            res.status(200).json({ result: Lists.length })
        }
        catch (err) {
            res.status(400).json({ message: `Error in getting No Of Seats value", ${err.message}` })
        }
    },
    admissionGetShortlistedStudents: async(req, res, next) => {
        try {
            const{name, student_cnic, father_cnic, subject, matric_obtained_marks, inter_obtained_marks, subject_marks, merit, meritListNo} = req.body

            const query = {};
            // Sort in descending (-1) order by merit percentage.
            const sort = { meritListNo: -1 }
            
            const shortlistedStudentData = await AdmissionShortlistedStudents.find(query).sort(sort)
            if(shortlistedStudentData.length === 0) {
                return res.status(404).json({ message: "No Shorlisted Student Data found" })
            }
            res.status(200).json({ result: shortlistedStudentData })
        }
        catch (err) {
            res.status(400).json({ message: `Error in getting Shortlisted Student's data", ${err.message}` })
        }
    },  
    // Rough Function for adding data to Awaiting students when it gets empty for uploading merit list
    roughFunction: async(req, res, next) => {
        try {
            const newAwaitingStudent = await AdmissionAwaitingStudent.insertMany(
                [{"profile_photo":"C:\\fakepath\\Profile.jpg","class_BS":"BS","subject":"Mathematics","reg_no_matric":"18-SE-08","enroll_no_inter":"","name":"Tayyaba Batool","dob":"2001-01-27","father_name":"Hamid","guardian_name":"","father_profession":"Teacher","father_mob_number":"781256516","permanent_address":"H#123y RWP Pakistan","contact_number":"1536585","temporary_address":"H#cgsiu Kotli Pakistan","student_mobile_number":"826692159","marital_status":"Unmarried","residence":"Other Boarding","blood_group":"B+","matric_year":"1016","matric_faculty":"Computers","matric_roll_no":"8","matric_obtained_marks":"995","matric_grade":"A","matric_subjects":"Computer, Maths","matric_school":"Faisal Model","inter_year":"2018","inter_faculty":"Pre engg.","inter_roll_no":"29","inter_obtained_marks":"975","inter_grade":"A","inter_subjects":"Maths, Chemistry, Physics","inter_school":"Punjab College","subject_marks":"98","other_subject1":"English","other_subject2":"Islamiat","other_subject3":"Pak Studies","need_bus":"Yes","zakat_eligibile":"","have_scholarship":"Yes","what_in_future":"Software Engg.","applicant_sign":"C:\\fakepath\\logo.png","father_sign":"C:\\fakepath\\T_Logo.jpg","student_cnic":"78428-8761238-9","father_cnic":"12265-1612523-7", "merit": 80.00,"__v":0},
                {"profile_photo":"C:\\fakepath\\logo.png","class_BS":"","subject":"Physics","reg_no_matric":"da","enroll_no_inter":"da","name":"Jawad","dob":"2020-05-27","father_name":"1ew","guardian_name":"faef","father_profession":"asf","father_mob_number":"3875","permanent_address":"asf","contact_number":"124","temporary_address":"qa","student_mobile_number":"124","marital_status":"Unmarried","residence":"College Hostel","blood_group":"O+","matric_year":"2009","matric_faculty":"fs","matric_roll_no":"124e","matric_obtained_marks":"900","matric_grade":"A","matric_subjects":"wdw","matric_school":"fwfe","inter_year":"2012","inter_faculty":"qwd","inter_roll_no":"wqe","inter_obtained_marks":"850","inter_grade":"A","inter_subjects":"wf","inter_school":"","subject_marks":"96","other_subject1":"qwd","other_subject2":"wda","other_subject3":"","need_bus":"No","zakat_eligibile":"","have_scholarship":"No","what_in_future":"qwd","applicant_sign":"C:\\fakepath\\logo.png","father_sign":"C:\\fakepath\\T_Logo.jpg","student_cnic":"21321-3218-213786","father_cnic":"12312-12331212-1","merit": 70.23, "__v":0},
                {"profile_photo":"C:\\fakepath\\logo.png","class_BS":"FSC","subject":"Physics","reg_no_matric":"da","enroll_no_inter":"da","name":"Tayyaba Hamid","dob":"2020-05-27","father_name":"1ew","guardian_name":"faef","father_profession":"asf","father_mob_number":"3875","permanent_address":"asf","contact_number":"124","temporary_address":"qa","student_mobile_number":"124","marital_status":"Unmarried","residence":"College Hostel","blood_group":"O+","matric_year":"2009","matric_faculty":"fs","matric_roll_no":"124e","matric_obtained_marks":"321","matric_grade":"A","matric_subjects":"wdw","matric_school":"fwfe","inter_year":"2012","inter_faculty":"qwd","inter_roll_no":"wqe","inter_obtained_marks":"32","inter_grade":"A","inter_subjects":"wf","inter_school":"","subject_marks":"50","other_subject1":"qwd","other_subject2":"wda","other_subject3":"","need_bus":"No","zakat_eligibile":"","have_scholarship":"No","what_in_future":"qwd","applicant_sign":"C:\\fakepath\\logo.png","father_sign":"C:\\fakepath\\T_Logo.jpg","student_cnic":"21321-313218-213786","father_cnic":"12312-1233132212-1","merit": 60.89, "__v":0},
                {"profile_photo":"C:\\fakepath\\Profile.jpg","class_BS":"BS","subject":"Chemistry","reg_no_matric":"18-SE-08","enroll_no_inter":"Pre-Engg-29","name":"Kinzaa","dob":"2001-01-27","father_name":"Hamid Masood","guardian_name":"","father_profession":"Teaching","father_mob_number":"31654852612","permanent_address":"H #1213 St RWP","contact_number":"785614361361","temporary_address":"","student_mobile_number":"112654","marital_status":"Unmarried","residence":"Other Boarding","blood_group":"B+","matric_year":"2016","matric_faculty":"Computers","matric_roll_no":"01","matric_obtained_marks":"995","matric_grade":"A","matric_subjects":"Computers","matric_school":"Faisal","inter_year":"2018","inter_faculty":"Pre Engg.","inter_roll_no":"Pre-Engg-29","inter_obtained_marks":"975","inter_grade":"A","inter_subjects":"Maths, Phy, Che","inter_school":"Punjab","subject_marks":"85","other_subject1":"Islamic Studies","other_subject2":"Maths","other_subject3":"","need_bus":"Yes","zakat_eligibile":"","have_scholarship":"Yes","what_in_future":"Software Engineer","applicant_sign":"C:\\fakepath\\logo.png","father_sign":"C:\\fakepath\\T_Logo.jpg","student_cnic":"35164-1565286-7","father_cnic":"36424-78215674-8", "merit": 70.12,"__v":0},
                {"profile_photo":"C:\\fakepath\\T_Logo.jpg","class_BS":"BS","subject":"Chemistry","reg_no_matric":"34","enroll_no_inter":"45","name":"Jawad Hamid","dob":"2003-01-18","father_name":"Hamid","guardian_name":"","father_profession":"Professor","father_mob_number":"1234567837","permanent_address":"Rawalpindi","contact_number":"2345678938","temporary_address":"","student_mobile_number":"+923457829871","marital_status":"Unmarried","residence":"Other Boarding","blood_group":"AB+","matric_year":"2018","matric_faculty":"Comp.","matric_roll_no":"28","matric_obtained_marks":"900","matric_grade":"A","matric_subjects":"Computer","matric_school":"","inter_year":"2020","inter_faculty":"Engg.","inter_roll_no":"10","inter_obtained_marks":"950","inter_grade":"A","inter_subjects":"Maths, Phy, Che","inter_school":"","subject_marks":"90","other_subject1":"Eng","other_subject2":"Pak Stud.","other_subject3":"","need_bus":"No","zakat_eligibile":"","have_scholarship":"No","what_in_future":"Engineer","applicant_sign":"C:\\fakepath\\Profile.jpg","father_sign":"C:\\fakepath\\logo.png","student_cnic":"256781-7834867-4","father_cnic":"56789-3455678-9", "merit": 90.22,"__v":0},
                {"profile_photo":"C:\\fakepath\\Profile.jpg","class_BS":"BS","subject":"Islamic Studies","reg_no_matric":"65","enroll_no_inter":"45","name":"Batool Tayyaba","dob":"2008-06-21","father_name":"Rashid","guardian_name":"","father_profession":"Doctor","father_mob_number":"5628534323","permanent_address":"Street #45  RWP","contact_number":"6789245632","temporary_address":"","student_mobile_number":"+926789156721","marital_status":"Married","residence":"College Hostel","blood_group":"O-","matric_year":"2010","matric_faculty":"Sci","matric_roll_no":"23","matric_obtained_marks":"870","matric_grade":"B+","matric_subjects":"Comp.","matric_school":"","inter_year":"2014","inter_faculty":"Maths","inter_roll_no":"34","inter_obtained_marks":"890","inter_grade":"B+","inter_subjects":"Maths","inter_school":"","subject_marks":"80","other_subject1":"Eng.","other_subject2":"Urdu.","other_subject3":"","need_bus":"No","zakat_eligibile":"","have_scholarship":"No","what_in_future":"Professor","applicant_sign":"C:\\fakepath\\logo.png","father_sign":"C:\\fakepath\\Profile.jpg","student_cnic":"67823-8765432-0","father_cnic":"87654-2876543-2", "merit": 50.12,"__v":0},
                {"profile_photo":"C:\\fakepath\\Profile.jpg","class_BS":"BS","subject":"Urdu","reg_no_matric":"23","enroll_no_inter":"45","name":"Arshiya Fatima","dob":"2006-07-20","father_name":"Qasim","guardian_name":"","father_profession":"Engineer","father_mob_number":"5678536729","permanent_address":"Rajanpur","contact_number":"5689257912","temporary_address":"","student_mobile_number":"+92875498654","marital_status":"Unmarried","residence":"Other Boarding","blood_group":"B+","matric_year":"2015","matric_faculty":"Sci","matric_roll_no":"23","matric_obtained_marks":"870","matric_grade":"B+","matric_subjects":"Bio","matric_school":"","inter_year":"2017","inter_faculty":"Medical","inter_roll_no":"25","inter_obtained_marks":"816","inter_grade":"B","inter_subjects":"Biology","inter_school":"","subject_marks":"87","other_subject1":"Eng.","other_subject2":"Maths","other_subject3":"","need_bus":"No","zakat_eligibile":"","have_scholarship":"No","what_in_future":"Good Human","applicant_sign":"C:\\fakepath\\Profile.jpg","father_sign":"C:\\fakepath\\logo.png","student_cnic":"56782-7654279-0","father_cnic":"567829-0987621-9", "merit": "80",40.23:0},
                {"profile_photo":"C:\\fakepath\\Profile.jpg","class_BS":"BS","subject":"Botany","reg_no_matric":"23","enroll_no_inter":"45","name":"Irha Batool","dob":"2006-07-20","father_name":"Ali","guardian_name":"","father_profession":"Engineer","father_mob_number":"5678536725","permanent_address":"Rajanpur","contact_number":"5689257916","temporary_address":"","student_mobile_number":"+92875498654","marital_status":"Married","residence":"Other Boarding","blood_group":"B+","matric_year":"2015","matric_faculty":"Sci","matric_roll_no":"23","matric_obtained_marks":"890","matric_grade":"B+","matric_subjects":"Bio","matric_school":"","inter_year":"2017","inter_faculty":"Medical","inter_roll_no":"25","inter_obtained_marks":"922","inter_grade":"A","inter_subjects":"Biology","inter_school":"","subject_marks":"87","other_subject1":"Eng.","other_subject2":"Maths","other_subject3":"","need_bus":"No","zakat_eligibile":"","have_scholarship":"No","what_in_future":"Doctor","applicant_sign":"C:\\fakepath\\Profile.jpg","father_sign":"C:\\fakepath\\logo.png","student_cnic":"56782-7654279-9","father_cnic":"567829-0987621-8", "merit": 30.12,"__v":0},
                {"profile_photo":"C:\\fakepath\\Profile.jpg","class_BS":"BS","subject":"Islamic Studies","reg_no_matric":"23","enroll_no_inter":"54","name":"Sadia","dob":"1999-07-15","father_name":"Hmeed","guardian_name":"","father_profession":"Manager","father_mob_number":"4567825637","permanent_address":"Rajanpur District","contact_number":"75621551453","temporary_address":"","student_mobile_number":"+926745215716","marital_status":"Unmarried","residence":"College Hostel","blood_group":"A-","matric_year":"2016","matric_faculty":"Sci","matric_roll_no":"23","matric_obtained_marks":"700","matric_grade":"B","matric_subjects":"Science","matric_school":"","inter_year":"2019","inter_faculty":"Phy","inter_roll_no":"43","inter_obtained_marks":"650","inter_grade":"B","inter_subjects":"Physics","inter_school":"","subject_marks":"60","other_subject1":"Eng","other_subject2":"Che","other_subject3":"","need_bus":"No","zakat_eligibile":"","have_scholarship":"No","what_in_future":"Engineer","applicant_sign":"C:\\fakepath\\logo.png","father_sign":"C:\\fakepath\\T_Logo.jpg","student_cnic":"56781-87172645162-8","father_cnic":"68787-75126431-7", "merit": 78.23,"__v":0},
                {"profile_photo":"C:\\fakepath\\T_Logo.jpg","class_BS":"BS","subject":"Economics","reg_no_matric":"3","enroll_no_inter":"4","name":"Maira","dob":"2022-05-12","father_name":"e","guardian_name":"","father_profession":"wre","father_mob_number":"23442353443","permanent_address":"sgg","contact_number":"343243543543","temporary_address":"","student_mobile_number":"32452523414","marital_status":"Married","residence":"Other Boarding","blood_group":"O-","matric_year":"2015","matric_faculty":"34","matric_roll_no":"56","matric_obtained_marks":"740","matric_grade":"B","matric_subjects":"fg","matric_school":"","inter_year":"2017","inter_faculty":"Medical","inter_roll_no":"45","inter_obtained_marks":"700","inter_grade":"B","inter_subjects":"ghf","inter_school":"","subject_marks":"56","other_subject1":"eng","other_subject2":"urdu","other_subject3":"","need_bus":"No","zakat_eligibile":"","have_scholarship":"No","what_in_future":"ghf","applicant_sign":"C:\\fakepath\\Profile.jpg","father_sign":"C:\\fakepath\\logo.png","student_cnic":"56784-7654327-9","father_cnic":"56743-0987654-9", "merit": "80","merit": 88.34,"__v":0},
                {"profile_photo":"C:\\fakepath\\Profile.jpg","class_BS":"BS","subject":"Chemistry","reg_no_matric":"56","enroll_no_inter":"6","name":"Tayyaba","dob":"2013-02-13","father_name":"jhgasj","guardian_name":"hjasg","father_profession":"asv","father_mob_number":"52613416531","permanent_address":"sqhgqjgs","contact_number":"72861752121","temporary_address":"","student_mobile_number":"1221212112","marital_status":"Unmarried","residence":"Other Boarding","blood_group":"B-","matric_year":"212","matric_faculty":"dhajg","matric_roll_no":"23","matric_obtained_marks":"62516","matric_grade":"","matric_subjects":"qwef","matric_school":"","inter_year":"12","inter_faculty":"adsg","inter_roll_no":"23","inter_obtained_marks":"217","inter_grade":"","inter_subjects":"hdaj","inter_school":"","subject_marks":"256","other_subject1":"whgah","other_subject2":"hwagd","other_subject3":"asnh","need_bus":"No","zakat_eligibile":"","have_scholarship":"Yes","what_in_future":"awdh","applicant_sign":"C:\\fakepath\\T_Logo.jpg","father_sign":"C:\\fakepath\\logo.png","student_cnic":"15621-1762516421-61","father_cnic":"126152-1276121-8", "merit": 88.23,"__v":0},
                {"profile_photo":"C:\\fakepath\\Profile.jpg","class_BS":"BS","subject":"Chemistry","reg_no_matric":"08","enroll_no_inter":"65","name":"Tayyaba B","dob":"2022-05-10","father_name":"Hamid","guardian_name":"","father_profession":"Teaching","father_mob_number":"7656655643","permanent_address":"RWP","contact_number":"67345672356","temporary_address":"","student_mobile_number":"+921345678234","marital_status":"Unmarried","residence":"Other Boarding","blood_group":"B-","matric_year":"2016","matric_faculty":"SCi","matric_roll_no":"64","matric_obtained_marks":"987","matric_grade":"","matric_subjects":"Maths","matric_school":"","inter_year":"2018","inter_faculty":"Engg","inter_roll_no":"34","inter_obtained_marks":"870","inter_grade":"","inter_subjects":"Phy","inter_school":"","subject_marks":"180","other_subject1":"Eng","other_subject2":"Pak Stud.","other_subject3":"","need_bus":"No","zakat_eligibile":"","have_scholarship":"No","what_in_future":"Engineer","applicant_sign":"C:\\fakepath\\logo.png","father_sign":"C:\\fakepath\\T_Logo.jpg","student_cnic":"12345-9815678-2","father_cnic":"26783-0987654-8", "merit": 95.12,"__v":0}]

            )
            return res.status(200).json({success: true, message: "Awaiting student Data Added Successfully", response: newAwaitingStudent})
        }
        catch (err) {
            res.status(400).json({ message: `Error in adding Awaiting Student's data", ${err.message}` })
        }
    }, 
}



//----------- Tayyaba's Notes -----------//
/*
When you want to clear all the lists and start uploading from start for example for the new year the do the following steps:

Step 1: Delete/Drop (admissionseats) from MongoDB Cloud

Step 2: Delete (admissionshortlistedstudents) from MongoDB Cloud

Step 3: Delete (admissionapprovedstudents) from MongoDB Cloud

Step 4: Delete (admissionawaitingstudents) from MongoDB Cloud

Step 5: Open Thunder Client extension and POST the following request (localhost:5000/api/admission/roughFunc)...This will insert dummy data to the admission avaiting students for testing purpose-
Otherwise, for real purpose, also Delete (applynows) data and then reopen the admission process of students to accept new enrollments and the applynows and awaiting students table will again start filling-
from begining and then Admin can approve students and upload merit list

*/
const express = require('express')
const router = express.Router()
const applyNowUpload = require('../middleware/applyNowUpload')

const {
    admissionAddAdmissionCommittee, admissionGetAdmissionCommittee,
    admissionAddFeeConcessionCommittee, admissionGetFeeConcessionCommittee,
    admissionAddProspectusCommittee, admissionGetProspectusCommittee, 
    admissionAddFocalPersons, admissionGetFocalPersons,
    admissionAddImpDate, admissionGetImpDates,
    admissionAddFeeItems, admissionGetFeeItems, 
    admissionAddApplyNowData, admissionGetApplyNowData,
    admissionGetAwaitingStudents, 
    admissionApproveStudent, admissionGetApprovedStudents,
    admissionDisapproveStudent,
    admissionAddSeatsAndUploadMeritList, 
    admissionGetNoOfSeats, admissionNoOfMeritLists, 
    admissionGetShortlistedStudents,
    roughFunction,
} = require('../Controller/admissionController')

// For Admission Page
router.post('/addAdmissionCommittee', admissionAddAdmissionCommittee);
router.get('/getAdmissionCommittee', admissionGetAdmissionCommittee);

router.post('/addFeeConcessionCommittee', admissionAddFeeConcessionCommittee);
router.get('/getFeeConcessionCommittee', admissionGetFeeConcessionCommittee);

router.post('/addProspectusCommittee', admissionAddProspectusCommittee);
router.get('/getProspectusCommittee', admissionGetProspectusCommittee);

router.post('/addFocalPersons', admissionAddFocalPersons);
router.get('/getFocalPersons', admissionGetFocalPersons);

// For Important Dates page
router.post('/addImpDate', admissionAddImpDate);
router.get('/getImpDates', admissionGetImpDates);

router.post('/addFeeItems', admissionAddFeeItems);
router.get('/getFeeItems', admissionGetFeeItems);

router.post('/addApplyNowData', admissionAddApplyNowData);
router.get('/getApplyNowData', admissionGetApplyNowData);

router.get('/getAwaitingStudents', admissionGetAwaitingStudents);

router.post('/approveStudent', admissionApproveStudent);
router.get('/getApprovedStudents', admissionGetApprovedStudents);
router.post('/disapproveStudent', admissionDisapproveStudent);

router.post('/addSeatsAndUploadMeritList', admissionAddSeatsAndUploadMeritList);

router.get('/getNoOfSeats', admissionGetNoOfSeats);
router.get('/getNoOfMeritLists', admissionNoOfMeritLists);

router.get('/getShortlistedStudents', admissionGetShortlistedStudents);


router.post('/roughFunc', roughFunction);




// // For Uploading Apply Now Form Images
// router.post('/upload', applyNowUpload.single("file"), async (req, res) => {
//     if (req.file === undefined) return res.send("you must select a file.");
//     const imgUrl = `http://localhost:5000/file/${req.file.filename}`;
//     return res.send(imgUrl);
// });

module.exports = router


/*
Address: http://localhost:5000/api/admission/addFeeItems
Request: POST
Body:
{
    "fund": "Admission Fee F.A per anum",
    "fee": "200/-"
}
*/
const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const student_controller = require('../controllers/studentc');


// a simple test url to check that all of our files are communicating correctly.
router.post('/create', student_controller.student_create);
module.exports=router;
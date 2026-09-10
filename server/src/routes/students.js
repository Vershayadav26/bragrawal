const express = require('express');
const { auth } = require('../middleware/auth');
const ctrl = require('../controllers/studentController');

const router = express.Router();
router.use(auth(['STUDENT']));
router.get('/me', ctrl.profile);
router.get('/timetable', ctrl.timetable);
router.get('/attendance', ctrl.attendance);
router.get('/results', ctrl.results);

module.exports = router;

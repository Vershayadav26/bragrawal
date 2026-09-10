const express = require('express');
const { auth } = require('../middleware/auth');
const ctrl = require('../controllers/teacherController');

const router = express.Router();
router.use(auth(['TEACHER']));
router.get('/me', ctrl.profile);
router.get('/students', ctrl.students);
router.get('/timetable', ctrl.timetable);
router.post('/attendance', ctrl.markAttendance);

module.exports = router;

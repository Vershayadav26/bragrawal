const express = require('express');
const { auth } = require('../middleware/auth');
const ctrl = require('../controllers/adminController');

const router = express.Router();
router.use(auth(['ADMIN']));

router.get('/overview', ctrl.overview);
router.get('/classes', ctrl.classes);

router.get('/students', ctrl.listStudents);
router.post('/students', ctrl.createStudent);
router.put('/students/:id', ctrl.updateStudent);
router.delete('/students/:id', ctrl.deleteStudent);

router.get('/teachers', ctrl.listTeachers);
router.post('/teachers', ctrl.createTeacher);
router.put('/teachers/:id', ctrl.updateTeacher);
router.delete('/teachers/:id', ctrl.deleteTeacher);

router.get('/notices', ctrl.listNotices);
router.post('/notices', ctrl.createNotice);
router.put('/notices/:id', ctrl.updateNotice);
router.delete('/notices/:id', ctrl.deleteNotice);

router.get('/events', ctrl.listEvents);
router.post('/events', ctrl.createEvent);
router.put('/events/:id', ctrl.updateEvent);
router.delete('/events/:id', ctrl.deleteEvent);

router.get('/admissions', ctrl.listAdmissions);
router.put('/admissions/:id', ctrl.updateAdmission);
router.delete('/admissions/:id', ctrl.deleteAdmission);

router.get('/gallery', ctrl.listGallery);
router.post('/gallery', ctrl.createGallery);
router.put('/gallery/:id', ctrl.updateGallery);
router.delete('/gallery/:id', ctrl.deleteGallery);

module.exports = router;

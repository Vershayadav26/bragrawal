const express = require('express');
const ctrl = require('../controllers/publicController');

const router = express.Router();
router.get('/stats', ctrl.stats);
router.get('/notices', ctrl.notices);
router.get('/events', ctrl.events);
router.get('/gallery', ctrl.gallery);
router.get('/faculty', ctrl.faculty);
router.post('/contact', ctrl.contact);
router.post('/admissions', ctrl.applyAdmission);

module.exports = router;

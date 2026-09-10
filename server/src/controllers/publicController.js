const prisma = require('../models/prisma');
const { asyncHandler } = require('../middleware/error');

exports.stats = asyncHandler(async (_req, res) => {
  const [students, teachers, notices, events] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.notice.count(),
    prisma.event.count(),
  ]);
  res.json({
    students: students + 1180,
    teachers: teachers + 72,
    years: 28,
    achievements: 140,
    notices,
    events,
  });
});

exports.notices = asyncHandler(async (_req, res) => {
  const items = await prisma.notice.findMany({ orderBy: [{ pinned: 'desc' }, { date: 'desc' }] });
  res.json(items);
});

exports.events = asyncHandler(async (_req, res) => {
  const items = await prisma.event.findMany({ orderBy: { date: 'asc' } });
  res.json(items);
});

exports.gallery = asyncHandler(async (_req, res) => {
  const items = await prisma.gallery.findMany({ orderBy: { title: 'asc' } });
  res.json(items);
});

exports.faculty = asyncHandler(async (_req, res) => {
  const items = await prisma.teacher.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { subject: 'asc' },
  });
  res.json(items);
});

exports.contact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required' });
  }
  const saved = await prisma.contactMessage.create({
    data: {
      name,
      email,
      phone: phone || '',
      subject: subject || 'General enquiry',
      message,
    },
  });
  res.status(201).json({ message: 'Thank you. We will get back to you shortly.', id: saved.id });
});

exports.applyAdmission = asyncHandler(async (req, res) => {
  const { studentName, parentName, email, phone, applyingFor, previousSchool, message } = req.body;
  if (!studentName || !parentName || !email || !phone || !applyingFor) {
    return res.status(400).json({ message: 'Please fill in all required fields' });
  }
  const saved = await prisma.admission.create({
    data: {
      studentName,
      parentName,
      email,
      phone,
      applyingFor,
      previousSchool: previousSchool || '',
      message: message || '',
    },
  });
  res.status(201).json({ message: 'Application received. Our admissions team will contact you.', id: saved.id });
});

const bcrypt = require('bcryptjs');
const prisma = require('../models/prisma');
const { asyncHandler } = require('../middleware/error');

exports.overview = asyncHandler(async (_req, res) => {
  const [students, teachers, notices, events, admissions, pending] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.notice.count(),
    prisma.event.count(),
    prisma.admission.count(),
    prisma.admission.count({ where: { status: 'PENDING' } }),
  ]);
  const recentAdmissions = await prisma.admission.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });
  res.json({
    stats: { students, teachers, notices, events, admissions, pending },
    recentAdmissions,
  });
});

exports.classes = asyncHandler(async (_req, res) => {
  const items = await prisma.class.findMany({ orderBy: [{ grade: 'asc' }, { section: 'asc' }] });
  res.json(items);
});

exports.listStudents = asyncHandler(async (_req, res) => {
  const items = await prisma.student.findMany({
    include: { user: { select: { name: true, email: true } }, class: true },
    orderBy: { rollNumber: 'asc' },
  });
  res.json(items);
});

exports.createStudent = asyncHandler(async (req, res) => {
  const { name, email, password, classId, rollNumber, parentName, phone, dob, address, gender } = req.body;
  if (!name || !email || !classId || !rollNumber) {
    return res.status(400).json({ message: 'Name, email, class and roll number are required' });
  }
  const hash = await bcrypt.hash(password || 'Student@123', 10);
  const user = await prisma.user.create({
    data: { name, email: email.toLowerCase(), password: hash, role: 'STUDENT' },
  });
  const student = await prisma.student.create({
    data: {
      userId: user.id,
      classId,
      rollNumber,
      parentName: parentName || '',
      phone: phone || '',
      dob: dob || '',
      address: address || '',
      gender: gender || 'Other',
    },
    include: { user: { select: { name: true, email: true } }, class: true },
  });
  res.status(201).json(student);
});

exports.updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, classId, rollNumber, parentName, phone, dob, address, gender } = req.body;
  const existing = await prisma.student.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ message: 'Student not found' });
  await prisma.user.update({
    where: { id: existing.userId },
    data: {
      ...(name ? { name } : {}),
      ...(email ? { email: email.toLowerCase() } : {}),
    },
  });
  const student = await prisma.student.update({
    where: { id },
    data: { classId, rollNumber, parentName, phone, dob, address, gender },
    include: { user: { select: { name: true, email: true } }, class: true },
  });
  res.json(student);
});

exports.deleteStudent = asyncHandler(async (req, res) => {
  const existing = await prisma.student.findUnique({ where: { id: req.params.id } });
  if (!existing) return res.status(404).json({ message: 'Student not found' });
  await prisma.user.delete({ where: { id: existing.userId } });
  res.json({ message: 'Student removed' });
});

exports.listTeachers = asyncHandler(async (_req, res) => {
  const items = await prisma.teacher.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { subject: 'asc' },
  });
  res.json(items);
});

exports.createTeacher = asyncHandler(async (req, res) => {
  const { name, email, password, subject, qualification, experience, bio, photo, phone } = req.body;
  if (!name || !email || !subject) {
    return res.status(400).json({ message: 'Name, email and subject are required' });
  }
  const hash = await bcrypt.hash(password || 'Teacher@123', 10);
  const user = await prisma.user.create({
    data: { name, email: email.toLowerCase(), password: hash, role: 'TEACHER' },
  });
  const teacher = await prisma.teacher.create({
    data: {
      userId: user.id,
      subject,
      qualification: qualification || '',
      experience: Number(experience) || 0,
      bio: bio || '',
      photo: photo || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      phone: phone || '',
    },
    include: { user: { select: { name: true, email: true } } },
  });
  res.status(201).json(teacher);
});

exports.updateTeacher = asyncHandler(async (req, res) => {
  const existing = await prisma.teacher.findUnique({ where: { id: req.params.id } });
  if (!existing) return res.status(404).json({ message: 'Teacher not found' });
  const { name, email, subject, qualification, experience, bio, photo, phone } = req.body;
  await prisma.user.update({
    where: { id: existing.userId },
    data: {
      ...(name ? { name } : {}),
      ...(email ? { email: email.toLowerCase() } : {}),
    },
  });
  const teacher = await prisma.teacher.update({
    where: { id: existing.id },
    data: {
      subject,
      qualification,
      experience: experience !== undefined ? Number(experience) : undefined,
      bio,
      photo,
      phone,
    },
    include: { user: { select: { name: true, email: true } } },
  });
  res.json(teacher);
});

exports.deleteTeacher = asyncHandler(async (req, res) => {
  const existing = await prisma.teacher.findUnique({ where: { id: req.params.id } });
  if (!existing) return res.status(404).json({ message: 'Teacher not found' });
  await prisma.user.delete({ where: { id: existing.userId } });
  res.json({ message: 'Teacher removed' });
});

exports.listNotices = asyncHandler(async (_req, res) => {
  res.json(await prisma.notice.findMany({ orderBy: [{ pinned: 'desc' }, { date: 'desc' }] }));
});

exports.createNotice = asyncHandler(async (req, res) => {
  const { title, content, category, pinned } = req.body;
  if (!title || !content) return res.status(400).json({ message: 'Title and content are required' });
  const item = await prisma.notice.create({
    data: { title, content, category: category || 'General', pinned: Boolean(pinned) },
  });
  res.status(201).json(item);
});

exports.updateNotice = asyncHandler(async (req, res) => {
  const { title, content, category, pinned } = req.body;
  const item = await prisma.notice.update({
    where: { id: req.params.id },
    data: { title, content, category, pinned },
  });
  res.json(item);
});

exports.deleteNotice = asyncHandler(async (req, res) => {
  await prisma.notice.delete({ where: { id: req.params.id } });
  res.json({ message: 'Notice deleted' });
});

exports.listEvents = asyncHandler(async (_req, res) => {
  res.json(await prisma.event.findMany({ orderBy: { date: 'desc' } }));
});

exports.createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, venue, image } = req.body;
  if (!title || !date) return res.status(400).json({ message: 'Title and date are required' });
  const item = await prisma.event.create({
    data: {
      title,
      description: description || '',
      date: new Date(date),
      venue: venue || '',
      image: image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    },
  });
  res.status(201).json(item);
});

exports.updateEvent = asyncHandler(async (req, res) => {
  const { title, description, date, venue, image } = req.body;
  const item = await prisma.event.update({
    where: { id: req.params.id },
    data: {
      title,
      description,
      date: date ? new Date(date) : undefined,
      venue,
      image,
    },
  });
  res.json(item);
});

exports.deleteEvent = asyncHandler(async (req, res) => {
  await prisma.event.delete({ where: { id: req.params.id } });
  res.json({ message: 'Event deleted' });
});

exports.listAdmissions = asyncHandler(async (_req, res) => {
  res.json(await prisma.admission.findMany({ orderBy: { createdAt: 'desc' } }));
});

exports.updateAdmission = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const item = await prisma.admission.update({
    where: { id: req.params.id },
    data: { status },
  });
  res.json(item);
});

exports.deleteAdmission = asyncHandler(async (req, res) => {
  await prisma.admission.delete({ where: { id: req.params.id } });
  res.json({ message: 'Admission record deleted' });
});

exports.listGallery = asyncHandler(async (_req, res) => {
  res.json(await prisma.gallery.findMany({ orderBy: { title: 'asc' } }));
});

exports.createGallery = asyncHandler(async (req, res) => {
  const { title, imageUrl, category } = req.body;
  if (!title || !imageUrl) return res.status(400).json({ message: 'Title and image URL are required' });
  const item = await prisma.gallery.create({
    data: { title, imageUrl, category: category || 'Campus' },
  });
  res.status(201).json(item);
});

exports.updateGallery = asyncHandler(async (req, res) => {
  const { title, imageUrl, category } = req.body;
  const item = await prisma.gallery.update({
    where: { id: req.params.id },
    data: { title, imageUrl, category },
  });
  res.json(item);
});

exports.deleteGallery = asyncHandler(async (req, res) => {
  await prisma.gallery.delete({ where: { id: req.params.id } });
  res.json({ message: 'Gallery item deleted' });
});

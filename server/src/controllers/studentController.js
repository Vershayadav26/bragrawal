const prisma = require('../models/prisma');
const { asyncHandler } = require('../middleware/error');

exports.profile = asyncHandler(async (req, res) => {
  const student = await prisma.student.findUnique({
    where: { userId: req.user.id },
    include: { user: { select: { name: true, email: true } }, class: true },
  });
  if (!student) return res.status(404).json({ message: 'Student profile not found' });
  res.json(student);
});

exports.timetable = asyncHandler(async (req, res) => {
  const student = await prisma.student.findUnique({ where: { userId: req.user.id } });
  if (!student) return res.status(404).json({ message: 'Student profile not found' });
  const rows = await prisma.timetable.findMany({
    where: { classId: student.classId },
    include: { teacher: { include: { user: { select: { name: true } } } } },
    orderBy: [{ day: 'asc' }, { period: 'asc' }],
  });
  res.json(rows);
});

exports.attendance = asyncHandler(async (req, res) => {
  const student = await prisma.student.findUnique({ where: { userId: req.user.id } });
  if (!student) return res.status(404).json({ message: 'Student profile not found' });
  const rows = await prisma.attendance.findMany({
    where: { studentId: student.id },
    orderBy: { date: 'desc' },
  });
  const present = rows.filter((r) => r.status === 'PRESENT').length;
  const late = rows.filter((r) => r.status === 'LATE').length;
  const absent = rows.filter((r) => r.status === 'ABSENT').length;
  const percent = rows.length ? Math.round(((present + late) / rows.length) * 100) : 0;
  res.json({ records: rows, summary: { present, late, absent, total: rows.length, percent } });
});

exports.results = asyncHandler(async (req, res) => {
  const student = await prisma.student.findUnique({ where: { userId: req.user.id } });
  if (!student) return res.status(404).json({ message: 'Student profile not found' });
  const rows = await prisma.result.findMany({
    where: { studentId: student.id },
    orderBy: [{ term: 'desc' }, { subject: 'asc' }],
  });
  res.json(rows);
});

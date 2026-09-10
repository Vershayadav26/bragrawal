const prisma = require('../models/prisma');
const { asyncHandler } = require('../middleware/error');

exports.profile = asyncHandler(async (req, res) => {
  const teacher = await prisma.teacher.findUnique({
    where: { userId: req.user.id },
    include: { user: { select: { name: true, email: true } } },
  });
  if (!teacher) return res.status(404).json({ message: 'Teacher profile not found' });
  res.json(teacher);
});

exports.students = asyncHandler(async (req, res) => {
  const teacher = await prisma.teacher.findUnique({ where: { userId: req.user.id } });
  if (!teacher) return res.status(404).json({ message: 'Teacher profile not found' });
  const slots = await prisma.timetable.findMany({
    where: { teacherId: teacher.id },
    select: { classId: true },
    distinct: ['classId'],
  });
  const classIds = slots.map((s) => s.classId);
  const students = await prisma.student.findMany({
    where: { classId: { in: classIds } },
    include: { user: { select: { name: true, email: true } }, class: true },
    orderBy: { rollNumber: 'asc' },
  });
  res.json(students);
});

exports.timetable = asyncHandler(async (req, res) => {
  const teacher = await prisma.teacher.findUnique({ where: { userId: req.user.id } });
  if (!teacher) return res.status(404).json({ message: 'Teacher profile not found' });
  const rows = await prisma.timetable.findMany({
    where: { teacherId: teacher.id },
    include: { class: true },
    orderBy: [{ day: 'asc' }, { period: 'asc' }],
  });
  res.json(rows);
});

exports.markAttendance = asyncHandler(async (req, res) => {
  const teacher = await prisma.teacher.findUnique({ where: { userId: req.user.id } });
  if (!teacher) return res.status(404).json({ message: 'Teacher profile not found' });
  const { date, records } = req.body;
  if (!date || !Array.isArray(records) || !records.length) {
    return res.status(400).json({ message: 'Date and attendance records are required' });
  }
  const studentIds = records.map((r) => r.studentId);
  await prisma.attendance.deleteMany({ where: { date, studentId: { in: studentIds } } });
  await prisma.attendance.createMany({
    data: records.map((row) => ({
      studentId: row.studentId,
      date,
      status: row.status,
      markedBy: teacher.id,
    })),
  });
  res.json({ message: 'Attendance saved' });
});

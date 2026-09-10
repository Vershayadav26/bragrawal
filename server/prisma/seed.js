const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
process.env.DATABASE_URL = `file:${path.join(__dirname, 'dev.db').replace(/\\/g, '/')}`;

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const IMG = {
  campus: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200',
  classroom: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200',
  lab: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200',
  sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba6851?w=1200',
  library: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200',
  assembly: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200',
  art: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200',
  music: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200',
  science: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200',
  fest: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
  graduation: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200',
  computer: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200',
};

async function main() {
  await prisma.attendance.deleteMany();
  await prisma.result.deleteMany();
  await prisma.timetable.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.notice.deleteMany();
  await prisma.event.deleteMany();
  await prisma.admission.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.class.deleteMany();
  await prisma.user.deleteMany();

  const password = {
    admin: await bcrypt.hash('Admin@123', 10),
    teacher: await bcrypt.hash('Teacher@123', 10),
    student: await bcrypt.hash('Student@123', 10),
  };

  await prisma.user.create({
    data: {
      name: 'Anita Sharma',
      email: 'admin@greenwood.edu',
      password: password.admin,
      role: 'ADMIN',
    },
  });

  const classes = await Promise.all([
    prisma.class.create({ data: { name: 'Class 8', section: 'A', grade: 8 } }),
    prisma.class.create({ data: { name: 'Class 9', section: 'A', grade: 9 } }),
    prisma.class.create({ data: { name: 'Class 10', section: 'A', grade: 10 } }),
    prisma.class.create({ data: { name: 'Class 12', section: 'Science', grade: 12 } }),
  ]);
  const [c8, c9, c10, c12] = classes;

  const teacherDefs = [
    {
      name: 'Dr. Meera Kapoor',
      email: 'teacher@greenwood.edu',
      subject: 'Mathematics',
      qualification: 'Ph.D. Mathematics, IIT Delhi',
      experience: 14,
      bio: 'Heads the mathematics department and mentors the school olympiad team.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      phone: '+91 98100 11001',
    },
    {
      name: 'Rahul Menon',
      email: 'rahul.menon@greenwood.edu',
      subject: 'Physics',
      qualification: 'M.Sc. Physics, St. Stephen\'s College',
      experience: 11,
      bio: 'Runs the robotics club and the senior physics lab programme.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      phone: '+91 98100 11002',
    },
    {
      name: 'Priya Nair',
      email: 'priya.nair@greenwood.edu',
      subject: 'English',
      qualification: 'M.A. English, JNU',
      experience: 9,
      bio: 'Leads the literary society and the school annual magazine.',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      phone: '+91 98100 11003',
    },
    {
      name: 'Arjun Sethi',
      email: 'arjun.sethi@greenwood.edu',
      subject: 'Computer Science',
      qualification: 'M.Tech CSE, NIT Trichy',
      experience: 8,
      bio: 'Coordinates coding clubs and the annual hackathon.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      phone: '+91 98100 11004',
    },
    {
      name: 'Farah Qureshi',
      email: 'farah.qureshi@greenwood.edu',
      subject: 'Biology',
      qualification: 'M.Sc. Biotechnology, AIIMS',
      experience: 10,
      bio: 'Guides NEET aspirants and the environment club.',
      photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
      phone: '+91 98100 11005',
    },
    {
      name: 'Vikram Rao',
      email: 'vikram.rao@greenwood.edu',
      subject: 'Physical Education',
      qualification: 'M.P.Ed, LNIPE Gwalior',
      experience: 12,
      bio: 'Coach of the football and athletics teams.',
      photo: 'https://images.unsplash.com/photo-1500648767791-11c7efad84fb?w=400&h=400&fit=crop',
      phone: '+91 98100 11006',
    },
  ];

  const teachers = [];
  for (const t of teacherDefs) {
    const user = await prisma.user.create({
      data: {
        name: t.name,
        email: t.email,
        password: password.teacher,
        role: 'TEACHER',
      },
    });
    const teacher = await prisma.teacher.create({
      data: {
        userId: user.id,
        subject: t.subject,
        qualification: t.qualification,
        experience: t.experience,
        bio: t.bio,
        photo: t.photo,
        phone: t.phone,
      },
    });
    teachers.push(teacher);
  }
  const [mathT, phyT, engT, csT, bioT, peT] = teachers;

  const studentDefs = [
    { name: 'Aarav Malhotra', email: 'student@greenwood.edu', classId: c10.id, roll: '10A-01', parent: 'Sanjay Malhotra', phone: '+91 98200 22001', dob: '2010-04-12', address: '21 Rose Lane, Chandigarh', gender: 'Male' },
    { name: 'Ishita Verma', email: 'ishita.verma@greenwood.edu', classId: c10.id, roll: '10A-02', parent: 'Neha Verma', phone: '+91 98200 22002', dob: '2010-08-03', address: '8 Maple Street, Panchkula', gender: 'Female' },
    { name: 'Kabir Singh', email: 'kabir.singh@greenwood.edu', classId: c10.id, roll: '10A-03', parent: 'Harpreet Singh', phone: '+91 98200 22003', dob: '2010-01-22', address: '44 Sector 21, Chandigarh', gender: 'Male' },
    { name: 'Ananya Joshi', email: 'ananya.joshi@greenwood.edu', classId: c9.id, roll: '9A-01', parent: 'Rakesh Joshi', phone: '+91 98200 22004', dob: '2011-06-18', address: '12 Lake Road, Mohali', gender: 'Female' },
    { name: 'Dev Patel', email: 'dev.patel@greenwood.edu', classId: c9.id, roll: '9A-02', parent: 'Amit Patel', phone: '+91 98200 22005', dob: '2011-11-09', address: '3 Cedar Avenue, Mohali', gender: 'Male' },
    { name: 'Sara Khan', email: 'sara.khan@greenwood.edu', classId: c8.id, roll: '8A-01', parent: 'Imran Khan', phone: '+91 98200 22006', dob: '2012-02-14', address: '19 Hill View, Chandigarh', gender: 'Female' },
    { name: 'Rohan Iyer', email: 'rohan.iyer@greenwood.edu', classId: c12.id, roll: '12S-01', parent: 'Lakshmi Iyer', phone: '+91 98200 22007', dob: '2008-09-27', address: '56 Sector 8, Chandigarh', gender: 'Male' },
    { name: 'Meher Gill', email: 'meher.gill@greenwood.edu', classId: c12.id, roll: '12S-02', parent: 'Navjot Gill', phone: '+91 98200 22008', dob: '2008-12-05', address: '7 Orchard Close, Panchkula', gender: 'Female' },
  ];

  const students = [];
  for (const s of studentDefs) {
    const user = await prisma.user.create({
      data: { name: s.name, email: s.email, password: password.student, role: 'STUDENT' },
    });
    const student = await prisma.student.create({
      data: {
        userId: user.id,
        classId: s.classId,
        rollNumber: s.roll,
        parentName: s.parent,
        phone: s.phone,
        dob: s.dob,
        address: s.address,
        gender: s.gender,
      },
    });
    students.push(student);
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = [
    { period: 1, start: '08:30', end: '09:15' },
    { period: 2, start: '09:15', end: '10:00' },
    { period: 3, start: '10:15', end: '11:00' },
    { period: 4, start: '11:00', end: '11:45' },
    { period: 5, start: '12:30', end: '13:15' },
    { period: 6, start: '13:15', end: '14:00' },
  ];
  const weekPlan = [
    [mathT, phyT, engT, csT, bioT, peT],
    [engT, mathT, phyT, bioT, csT, peT],
    [csT, bioT, mathT, engT, phyT, peT],
    [phyT, engT, csT, mathT, bioT, peT],
    [bioT, csT, peT, phyT, mathT, engT],
  ];

  for (const cls of classes) {
    for (let d = 0; d < days.length; d += 1) {
      for (let p = 0; p < periods.length; p += 1) {
        const teacher = weekPlan[d][p];
        await prisma.timetable.create({
          data: {
            classId: cls.id,
            teacherId: teacher.id,
            day: days[d],
            period: periods[p].period,
            subject: teacher.subject,
            startTime: periods[p].start,
            endTime: periods[p].end,
          },
        });
      }
    }
  }

  const demoStudent = students[0];
  const statuses = ['PRESENT', 'PRESENT', 'PRESENT', 'PRESENT', 'LATE', 'PRESENT', 'ABSENT'];
  for (let i = 0; i < 24; i += 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    await prisma.attendance.create({
      data: {
        studentId: demoStudent.id,
        date: date.toISOString().slice(0, 10),
        status: statuses[i % statuses.length],
        markedBy: mathT.id,
      },
    });
  }

  const resultRows = [
    ['Mathematics', 88, 'A'],
    ['Physics', 81, 'A'],
    ['English', 92, 'A+'],
    ['Computer Science', 95, 'A+'],
    ['Biology', 79, 'B+'],
  ];
  for (const [subject, marks, grade] of resultRows) {
    await prisma.result.create({
      data: {
        studentId: demoStudent.id,
        subject,
        examType: 'Mid-Term',
        marks,
        maxMarks: 100,
        grade,
        term: 'Term 1 2026',
      },
    });
  }
  for (const [subject, marks, grade] of resultRows) {
    await prisma.result.create({
      data: {
        studentId: demoStudent.id,
        subject,
        examType: 'Unit Test 2',
        marks: Math.max(70, marks - 6),
        maxMarks: 100,
        grade,
        term: 'Term 1 2026',
      },
    });
  }

  await prisma.notice.createMany({
    data: [
      { title: 'Admissions open for 2026–27', content: 'Applications for Classes Nursery to XII are now open. Submit the online enquiry form or visit the campus admissions desk on working days.', category: 'Admissions', pinned: true },
      { title: 'Parent-teacher meeting — 18 September', content: 'PTM for Classes VIII to XII will be held from 9:00 AM to 1:00 PM in the respective classrooms.', category: 'Academics', pinned: true },
      { title: 'Annual sports day registrations', content: 'House captains must submit event lists to the sports office by 12 September.', category: 'Sports', pinned: false },
      { title: 'Library week 15–19 September', content: 'Book talks, quiz rounds and author readings will run through the week in the senior library.', category: 'Library', pinned: false },
      { title: 'Bus route 4 timing change', content: 'Route 4 will depart 10 minutes earlier from 16 September due to road works on Madhya Marg.', category: 'Transport', pinned: false },
      { title: 'Science exhibition volunteers', content: 'Class XI–XII students may register as exhibition guides with Dr. Kapoor.', category: 'Events', pinned: false },
    ],
  });

  await prisma.event.createMany({
    data: [
      { title: 'Founders\' Day', description: 'Awards, cultural programme and alumni address in the auditorium.', date: new Date('2026-10-04'), venue: 'Main Auditorium', image: IMG.assembly },
      { title: 'Inter-house football finals', description: 'Sapphire vs Emerald. Families welcome in the stands.', date: new Date('2026-09-20'), venue: 'Sports Ground', image: IMG.sports },
      { title: 'Science & Innovation Fair', description: 'Student projects from Classes VIII–XII with guest judges from PEC.', date: new Date('2026-09-28'), venue: 'Innovation Block', image: IMG.lab },
      { title: 'Winter concert', description: 'Choir, orchestra and dance ensembles present the winter programme.', date: new Date('2026-12-12'), venue: 'Performing Arts Centre', image: IMG.music },
      { title: 'Career guidance week', description: 'University representatives and alumni panels for Classes XI–XII.', date: new Date('2026-11-08'), venue: 'Seminar Hall', image: IMG.classroom },
    ],
  });

  await prisma.gallery.createMany({
    data: [
      { title: 'Main campus', imageUrl: IMG.campus, category: 'Campus' },
      { title: 'Senior classrooms', imageUrl: IMG.classroom, category: 'Academics' },
      { title: 'Science laboratories', imageUrl: IMG.lab, category: 'Academics' },
      { title: 'Sports ground', imageUrl: IMG.sports, category: 'Sports' },
      { title: 'Central library', imageUrl: IMG.library, category: 'Campus' },
      { title: 'Morning assembly', imageUrl: IMG.assembly, category: 'Life' },
      { title: 'Art studio', imageUrl: IMG.art, category: 'Arts' },
      { title: 'Music room', imageUrl: IMG.music, category: 'Arts' },
      { title: 'Computer lab', imageUrl: IMG.computer, category: 'Academics' },
      { title: 'Annual fest', imageUrl: IMG.fest, category: 'Events' },
      { title: 'Graduation day', imageUrl: IMG.graduation, category: 'Events' },
      { title: 'Innovation lab', imageUrl: IMG.science, category: 'Academics' },
    ],
  });

  await prisma.admission.createMany({
    data: [
      { studentName: 'Vihaan Kapoor', parentName: 'Ritu Kapoor', email: 'ritu.kapoor@email.com', phone: '+91 99000 10001', applyingFor: 'Class 6', previousSchool: 'Little Oaks School', message: 'Looking for a strong mathematics programme.', status: 'PENDING' },
      { studentName: 'Aanya Bose', parentName: 'Debashish Bose', email: 'dbose@email.com', phone: '+91 99000 10002', applyingFor: 'Class 11 Science', previousSchool: 'City Public School', message: 'Interested in computer science electives.', status: 'REVIEWED' },
      { studentName: 'Neil Sharma', parentName: 'Pooja Sharma', email: 'pooja.s@email.com', phone: '+91 99000 10003', applyingFor: 'Class 1', previousSchool: '', message: 'Sibling already in Class 4.', status: 'ACCEPTED' },
      { studentName: 'Zara Ali', parentName: 'Imtiaz Ali', email: 'imtiaz.ali@email.com', phone: '+91 99000 10004', applyingFor: 'Class 9', previousSchool: 'Riverdale High', message: 'Transfer due to relocation.', status: 'PENDING' },
    ],
  });

  console.log('Seed complete.');
  console.log('Admin    admin@greenwood.edu   / Admin@123');
  console.log('Teacher  teacher@greenwood.edu / Teacher@123');
  console.log('Student  student@greenwood.edu / Student@123');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

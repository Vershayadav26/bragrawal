const KEY = 'gis_local_db'

const IMG = {
  campus: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200',
  classroom: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200',
  lab: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200',
  sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba6851?w=1200',
  library: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200',
  assembly: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200',
  art: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200',
  music: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200',
  fest: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
  graduation: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200',
  computer: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200',
}

function id() {
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function seed() {
  const classes = [
    { id: 'c8', name: 'Class 8', section: 'A', grade: 8 },
    { id: 'c9', name: 'Class 9', section: 'A', grade: 9 },
    { id: 'c10', name: 'Class 10', section: 'A', grade: 10 },
    { id: 'c12', name: 'Class 12', section: 'Science', grade: 12 },
  ]

  const teachers = [
    {
      id: 't1',
      userId: 'u-t1',
      user: { name: 'Dr. Meera Kapoor', email: 'teacher@greenwood.edu' },
      subject: 'Mathematics',
      qualification: 'Ph.D. Mathematics, IIT Delhi',
      experience: 14,
      bio: 'Heads the mathematics department and mentors the school olympiad team.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      phone: '+91 98100 11001',
    },
    {
      id: 't2',
      userId: 'u-t2',
      user: { name: 'Rahul Menon', email: 'rahul.menon@greenwood.edu' },
      subject: 'Physics',
      qualification: "M.Sc. Physics, St. Stephen's College",
      experience: 11,
      bio: 'Runs the robotics club and the senior physics lab programme.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      phone: '+91 98100 11002',
    },
    {
      id: 't3',
      userId: 'u-t3',
      user: { name: 'Priya Nair', email: 'priya.nair@greenwood.edu' },
      subject: 'English',
      qualification: 'M.A. English, JNU',
      experience: 9,
      bio: 'Leads the literary society and the school annual magazine.',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      phone: '+91 98100 11003',
    },
    {
      id: 't4',
      userId: 'u-t4',
      user: { name: 'Arjun Sethi', email: 'arjun.sethi@greenwood.edu' },
      subject: 'Computer Science',
      qualification: 'M.Tech CSE, NIT Trichy',
      experience: 8,
      bio: 'Coordinates coding clubs and the annual hackathon.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      phone: '+91 98100 11004',
    },
    {
      id: 't5',
      userId: 'u-t5',
      user: { name: 'Farah Qureshi', email: 'farah.qureshi@greenwood.edu' },
      subject: 'Biology',
      qualification: 'M.Sc. Biotechnology, AIIMS',
      experience: 10,
      bio: 'Guides NEET aspirants and the environment club.',
      photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
      phone: '+91 98100 11005',
    },
    {
      id: 't6',
      userId: 'u-t6',
      user: { name: 'Vikram Rao', email: 'vikram.rao@greenwood.edu' },
      subject: 'Physical Education',
      qualification: 'M.P.Ed, LNIPE Gwalior',
      experience: 12,
      bio: 'Coach of the football and athletics teams.',
      photo: 'https://images.unsplash.com/photo-1500648767791-11c7efad84fb?w=400&h=400&fit=crop',
      phone: '+91 98100 11006',
    },
  ]

  const students = [
    { id: 's1', userId: 'u-s1', user: { name: 'Aarav Malhotra', email: 'student@greenwood.edu' }, classId: 'c10', class: classes[2], rollNumber: '10A-01', parentName: 'Sanjay Malhotra', phone: '+91 98200 22001', dob: '2010-04-12', address: '21 Rose Lane, Chandigarh', gender: 'Male' },
    { id: 's2', userId: 'u-s2', user: { name: 'Ishita Verma', email: 'ishita.verma@greenwood.edu' }, classId: 'c10', class: classes[2], rollNumber: '10A-02', parentName: 'Neha Verma', phone: '+91 98200 22002', dob: '2010-08-03', address: '8 Maple Street, Panchkula', gender: 'Female' },
    { id: 's3', userId: 'u-s3', user: { name: 'Kabir Singh', email: 'kabir.singh@greenwood.edu' }, classId: 'c10', class: classes[2], rollNumber: '10A-03', parentName: 'Harpreet Singh', phone: '+91 98200 22003', dob: '2010-01-22', address: '44 Sector 21, Chandigarh', gender: 'Male' },
    { id: 's4', userId: 'u-s4', user: { name: 'Ananya Joshi', email: 'ananya.joshi@greenwood.edu' }, classId: 'c9', class: classes[1], rollNumber: '9A-01', parentName: 'Rakesh Joshi', phone: '+91 98200 22004', dob: '2011-06-18', address: '12 Lake Road, Mohali', gender: 'Female' },
    { id: 's5', userId: 'u-s5', user: { name: 'Dev Patel', email: 'dev.patel@greenwood.edu' }, classId: 'c9', class: classes[1], rollNumber: '9A-02', parentName: 'Amit Patel', phone: '+91 98200 22005', dob: '2011-11-09', address: '3 Cedar Avenue, Mohali', gender: 'Male' },
    { id: 's6', userId: 'u-s6', user: { name: 'Sara Khan', email: 'sara.khan@greenwood.edu' }, classId: 'c8', class: classes[0], rollNumber: '8A-01', parentName: 'Imran Khan', phone: '+91 98200 22006', dob: '2012-02-14', address: '19 Hill View, Chandigarh', gender: 'Female' },
    { id: 's7', userId: 'u-s7', user: { name: 'Rohan Iyer', email: 'rohan.iyer@greenwood.edu' }, classId: 'c12', class: classes[3], rollNumber: '12S-01', parentName: 'Lakshmi Iyer', phone: '+91 98200 22007', dob: '2008-09-27', address: '56 Sector 8, Chandigarh', gender: 'Male' },
    { id: 's8', userId: 'u-s8', user: { name: 'Meher Gill', email: 'meher.gill@greenwood.edu' }, classId: 'c12', class: classes[3], rollNumber: '12S-02', parentName: 'Navjot Gill', phone: '+91 98200 22008', dob: '2008-12-05', address: '7 Orchard Close, Panchkula', gender: 'Female' },
  ]

  const teacherPlan = [teachers[0], teachers[1], teachers[2], teachers[3], teachers[4], teachers[5]]
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const periods = [
    { period: 1, startTime: '08:30', endTime: '09:15' },
    { period: 2, startTime: '09:15', endTime: '10:00' },
    { period: 3, startTime: '10:15', endTime: '11:00' },
    { period: 4, startTime: '11:00', endTime: '11:45' },
    { period: 5, startTime: '12:30', endTime: '13:15' },
    { period: 6, startTime: '13:15', endTime: '14:00' },
  ]
  const weekPlan = [
    [0, 1, 2, 3, 4, 5],
    [2, 0, 1, 4, 3, 5],
    [3, 4, 0, 2, 1, 5],
    [1, 2, 3, 0, 4, 5],
    [4, 3, 5, 1, 0, 2],
  ]
  const timetable = []
  classes.forEach((cls) => {
    days.forEach((day, d) => {
      periods.forEach((p, i) => {
        const teacher = teacherPlan[weekPlan[d][i]]
        timetable.push({
          id: `${cls.id}-${day}-${p.period}`,
          classId: cls.id,
          class: cls,
          teacherId: teacher.id,
          teacher: { ...teacher, user: teacher.user },
          day,
          period: p.period,
          subject: teacher.subject,
          startTime: p.startTime,
          endTime: p.endTime,
        })
      })
    })
  })

  const attendance = []
  const statuses = ['PRESENT', 'PRESENT', 'PRESENT', 'PRESENT', 'LATE', 'PRESENT', 'ABSENT']
  for (let i = 0; i < 18; i += 1) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    if (date.getDay() === 0 || date.getDay() === 6) continue
    attendance.push({
      id: `a-${i}`,
      studentId: 's1',
      date: date.toISOString().slice(0, 10),
      status: statuses[i % statuses.length],
      markedBy: 't1',
    })
  }

  const results = [
    ['Mathematics', 88, 'A'],
    ['Physics', 81, 'A'],
    ['English', 92, 'A+'],
    ['Computer Science', 95, 'A+'],
    ['Biology', 79, 'B+'],
  ].flatMap(([subject, marks, grade], i) => [
    { id: `r1-${i}`, studentId: 's1', subject, examType: 'Mid-Term', marks, maxMarks: 100, grade, term: 'Term 1 2026' },
    { id: `r2-${i}`, studentId: 's1', subject, examType: 'Unit Test 2', marks: Math.max(70, marks - 6), maxMarks: 100, grade, term: 'Term 1 2026' },
  ])

  return {
    users: [
      { id: 'u-admin', name: 'Anita Sharma', email: 'admin@greenwood.edu', password: 'Admin@123', role: 'ADMIN' },
      { id: 'u-t1', name: 'Dr. Meera Kapoor', email: 'teacher@greenwood.edu', password: 'Teacher@123', role: 'TEACHER' },
      { id: 'u-s1', name: 'Aarav Malhotra', email: 'student@greenwood.edu', password: 'Student@123', role: 'STUDENT' },
    ],
    classes,
    teachers,
    students,
    timetable,
    attendance,
    results,
    notices: [
      { id: 'n1', title: 'Admissions open for 2026–27', content: 'Applications for Classes Nursery to XII are now open. Submit the online enquiry form or visit the campus admissions desk on working days.', category: 'Admissions', date: new Date().toISOString(), pinned: true },
      { id: 'n2', title: 'Parent-teacher meeting — 18 September', content: 'PTM for Classes VIII to XII will be held from 9:00 AM to 1:00 PM in the respective classrooms.', category: 'Academics', date: new Date().toISOString(), pinned: true },
      { id: 'n3', title: 'Annual sports day registrations', content: 'House captains must submit event lists to the sports office by 12 September.', category: 'Sports', date: new Date().toISOString(), pinned: false },
      { id: 'n4', title: 'Library week 15–19 September', content: 'Book talks, quiz rounds and author readings will run through the week in the senior library.', category: 'Library', date: new Date().toISOString(), pinned: false },
      { id: 'n5', title: 'Bus route 4 timing change', content: 'Route 4 will depart 10 minutes earlier from 16 September due to road works on Madhya Marg.', category: 'Transport', date: new Date().toISOString(), pinned: false },
      { id: 'n6', title: 'Science exhibition volunteers', content: 'Class XI–XII students may register as exhibition guides with Dr. Kapoor.', category: 'Events', date: new Date().toISOString(), pinned: false },
    ],
    events: [
      { id: 'e1', title: "Founders' Day", description: 'Awards, cultural programme and alumni address in the auditorium.', date: '2026-10-04', venue: 'Main Auditorium', image: IMG.assembly },
      { id: 'e2', title: 'Inter-house football finals', description: 'Sapphire vs Emerald. Families welcome in the stands.', date: '2026-09-20', venue: 'Sports Ground', image: IMG.sports },
      { id: 'e3', title: 'Science & Innovation Fair', description: 'Student projects from Classes VIII–XII with guest judges from PEC.', date: '2026-09-28', venue: 'Innovation Block', image: IMG.lab },
      { id: 'e4', title: 'Winter concert', description: 'Choir, orchestra and dance ensembles present the winter programme.', date: '2026-12-12', venue: 'Performing Arts Centre', image: IMG.music },
      { id: 'e5', title: 'Career guidance week', description: 'University representatives and alumni panels for Classes XI–XII.', date: '2026-11-08', venue: 'Seminar Hall', image: IMG.classroom },
    ],
    gallery: [
      { id: 'g1', title: 'Main campus', imageUrl: IMG.campus, category: 'Campus' },
      { id: 'g2', title: 'Senior classrooms', imageUrl: IMG.classroom, category: 'Academics' },
      { id: 'g3', title: 'Science laboratories', imageUrl: IMG.lab, category: 'Academics' },
      { id: 'g4', title: 'Sports ground', imageUrl: IMG.sports, category: 'Sports' },
      { id: 'g5', title: 'Central library', imageUrl: IMG.library, category: 'Campus' },
      { id: 'g6', title: 'Morning assembly', imageUrl: IMG.assembly, category: 'Life' },
      { id: 'g7', title: 'Art studio', imageUrl: IMG.art, category: 'Arts' },
      { id: 'g8', title: 'Music room', imageUrl: IMG.music, category: 'Arts' },
      { id: 'g9', title: 'Computer lab', imageUrl: IMG.computer, category: 'Academics' },
      { id: 'g10', title: 'Annual fest', imageUrl: IMG.fest, category: 'Events' },
      { id: 'g11', title: 'Graduation day', imageUrl: IMG.graduation, category: 'Events' },
      { id: 'g12', title: 'Innovation lab', imageUrl: IMG.lab, category: 'Academics' },
    ],
    admissions: [
      { id: 'ad1', studentName: 'Vihaan Kapoor', parentName: 'Ritu Kapoor', email: 'ritu.kapoor@email.com', phone: '+91 99000 10001', applyingFor: 'Class 6', previousSchool: 'Little Oaks School', message: 'Looking for a strong mathematics programme.', status: 'PENDING', createdAt: new Date().toISOString() },
      { id: 'ad2', studentName: 'Aanya Bose', parentName: 'Debashish Bose', email: 'dbose@email.com', phone: '+91 99000 10002', applyingFor: 'Class 11 Science', previousSchool: 'City Public School', message: 'Interested in computer science electives.', status: 'REVIEWED', createdAt: new Date().toISOString() },
      { id: 'ad3', studentName: 'Neil Sharma', parentName: 'Pooja Sharma', email: 'pooja.s@email.com', phone: '+91 99000 10003', applyingFor: 'Class 1', previousSchool: '', message: 'Sibling already in Class 4.', status: 'ACCEPTED', createdAt: new Date().toISOString() },
      { id: 'ad4', studentName: 'Zara Ali', parentName: 'Imtiaz Ali', email: 'imtiaz.ali@email.com', phone: '+91 99000 10004', applyingFor: 'Class 9', previousSchool: 'Riverdale High', message: 'Transfer due to relocation.', status: 'PENDING', createdAt: new Date().toISOString() },
    ],
  }
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  const data = seed()
  localStorage.setItem(KEY, JSON.stringify(data))
  return data
}

function save(db) {
  localStorage.setItem(KEY, JSON.stringify(db))
}

export function getDb() {
  return load()
}

export function setDb(db) {
  save(db)
}

export { id }

/**
 * EduPulse - Advanced Student Management & Dossier Application
 * Frontend Logic, State Management & Interactive Components
 */

// Student Database Store
const studentsDatabase = [
    {
        id: "#STU-2024-8842",
        name: "Seraphina Vance",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
        department: "School of Computer Science & Artificial Intelligence",
        degree: "B.Tech in Artificial Intelligence",
        batch: "Batch 2024-28 (Year 3)",
        email: "seraphina.v@edu.pulse.ac",
        phone: "+1 (555) 438-9201",
        cgpa: 3.92,
        rank: "Top 3% of Class",
        attendanceRate: 96.4,
        attendedHours: 162,
        totalHours: 168,
        creditsEarned: 88,
        totalCreditsNeeded: 120,
        feeDue: "$0.00",
        feeStatus: "Paid",
        status: "Enrolled • Full Time",
        scholarshipTitle: "Global STEM Excellence Fellowship",
        scholarshipDetails: "35% Tuition Waiver Renewal maintained above 3.80 CGPA",
        gpaHistory: [3.85, 3.88, 3.90, 3.94, 3.89, 3.92],
        deptAverageHistory: [3.20, 3.25, 3.31, 3.28, 3.34, 3.38],
        courses: [
            { code: "CS-401", title: "Deep Neural Networks & Transformers", credits: 4, instructor: "Prof. Alan Turing", midterm: "96/100", assignment: "98%", grade: "A+", status: "In Progress" },
            { code: "CS-405", title: "Computer Vision & Visual Perception", credits: 4, instructor: "Dr. Fei-Fei Li", midterm: "92/100", assignment: "94%", grade: "A", status: "In Progress" },
            { code: "CS-412", title: "Reinforcement Learning & Robotics", credits: 4, instructor: "Dr. Richard Sutton", midterm: "89/100", assignment: "91%", grade: "A-", status: "In Progress" },
            { code: "CS-420", title: "Distributed Systems & Cloud Computing", credits: 3, instructor: "Dr. Leslie Lamport", midterm: "95/100", assignment: "97%", grade: "A", status: "In Progress" },
            { code: "MTH-302", title: "Bayesian Statistics & Optimization", credits: 4, instructor: "Prof. Thomas Bayes", midterm: "98/100", assignment: "100%", grade: "A+", status: "In Progress" },
            { code: "ETH-201", title: "AI Ethics, Governance & Law", credits: 3, instructor: "Dr. Joy Buolamwini", midterm: "94/100", assignment: "95%", grade: "A", status: "In Progress" }
        ],
        achievements: [
            { icon: "🏆", title: "1st Place - National Inter-Collegiate Hackathon 2025", subtitle: "Autonomous Disaster Response Drone AI model", date: "Nov 2025" },
            { icon: "⭐", title: "Dean's Honor Roll (5 Consecutive Semesters)", subtitle: "Maintained GPA > 3.85 consistently", date: "Fall 2024 - Spring 2026" },
            { icon: "📄", title: "Published Research Paper at IEEE Student Conclave", subtitle: "Efficient Attention Mechanisms on Edge TPU Hardware", date: "Jan 2026" },
            { icon: "🎖️", title: "Certified TensorFlow & PyTorch Advanced Engineer", subtitle: "Credential ID: TF-AI-892401-VERIFIED", date: "Aug 2025" }
        ],
        timetable: {
            Mon: [
                { time: "09:00 AM - 10:30 AM", code: "CS-401", title: "Deep Neural Networks", instructor: "Prof. Turing", room: "Hall 302 (Turing Lab)" },
                { time: "11:00 AM - 12:30 PM", code: "CS-405", title: "Computer Vision Studio", instructor: "Dr. Li", room: "Lab A-12 (GPU Cluster)" },
                { time: "02:00 PM - 03:30 PM", code: "MTH-302", title: "Bayesian Optimization", instructor: "Prof. Bayes", room: "Auditorium 4" }
            ],
            Tue: [
                { time: "10:00 AM - 11:30 AM", code: "CS-412", title: "Reinforcement Learning", instructor: "Dr. Sutton", room: "Robotics Arena B" },
                { time: "01:30 PM - 03:00 PM", code: "ETH-201", title: "AI Governance & Policy", instructor: "Dr. Buolamwini", room: "Seminar Room 10" },
                { time: "03:30 PM - 05:00 PM", code: "CS-401", title: "Neural Networks Lab", instructor: "Prof. Turing", room: "Lab A-12" }
            ],
            Wed: [
                { time: "09:00 AM - 10:30 AM", code: "CS-420", title: "Distributed Cloud Systems", instructor: "Dr. Lamport", room: "Room 408" },
                { time: "11:00 AM - 12:30 PM", code: "CS-405", title: "Computer Vision Theory", instructor: "Dr. Li", room: "Hall 302" },
                { time: "02:00 PM - 04:00 PM", code: "ADV-01", title: "Academic Advising & Mentorship", instructor: "Dr. Eleanor Ward", room: "Office 210" }
            ],
            Thu: [
                { time: "10:00 AM - 11:30 AM", code: "CS-412", title: "Robotics Simulation Lab", instructor: "Dr. Sutton", room: "Robotics Arena B" },
                { time: "01:00 PM - 02:30 PM", code: "CS-420", title: "Cloud Architecture Lab", instructor: "Dr. Lamport", room: "Server Room Lab 2" },
                { time: "03:00 PM - 04:30 PM", code: "MTH-302", title: "Bayesian Optimization Tutorial", instructor: "Prof. Bayes", room: "Room 205" }
            ],
            Fri: [
                { time: "09:30 AM - 11:00 AM", code: "ETH-201", title: "Case Studies in Ethical AI", instructor: "Dr. Buolamwini", room: "Seminar Room 10" },
                { time: "11:30 AM - 01:00 PM", code: "SEM-99", title: "Distinguished Guest Tech Colloquium", instructor: "Visiting Faculty", room: "Grand Amphitheater" }
            ]
        },
        subjectAttendance: [
            { subject: "CS-401 Deep Neural Networks", conducted: 32, attended: 31, absent: 1, rate: "96.8%", status: "Safe" },
            { subject: "CS-405 Computer Vision", conducted: 30, attended: 29, absent: 1, rate: "96.6%", status: "Safe" },
            { subject: "CS-412 Reinforcement Learning", conducted: 28, attended: 27, absent: 1, rate: "96.4%", status: "Safe" },
            { subject: "CS-420 Distributed Systems", conducted: 26, attended: 25, absent: 1, rate: "96.1%", status: "Safe" },
            { subject: "MTH-302 Bayesian Statistics", conducted: 32, attended: 31, absent: 1, rate: "96.8%", status: "Safe" },
            { subject: "ETH-201 AI Ethics & Law", conducted: 20, attended: 19, absent: 1, rate: "95.0%", status: "Safe" }
        ],
        leaveHistory: [
            { reason: "ACM Student Conference Delegate Attendance", dates: "Oct 12 - Oct 14, 2026", type: "Academic Duty", status: "Approved", by: "Dr. Eleanor Ward" },
            { reason: "Viral Flu & Medical Quarantine", dates: "Aug 22 - Aug 23, 2026", type: "Medical Leave", status: "Approved (Cert Verified)", by: "Campus Clinic" }
        ],
        feeStructure: [
            { item: "Semester VI Tuition Fee", term: "Fall 2026", gross: "$9,200.00", scholarship: "-$3,000.00", net: "$6,200.00", status: "Paid in Full" },
            { item: "Advanced AI GPU Cluster Lab Levy", term: "Fall 2026", gross: "$600.00", scholarship: "$0.00", net: "$600.00", status: "Paid in Full" },
            { item: "Campus Health & Student Life Insurance", term: "Annual 2026", gross: "$400.00", scholarship: "$0.00", net: "$400.00", status: "Paid in Full" },
            { item: "Semester V Tuition Fee", term: "Spring 2026", gross: "$9,200.00", scholarship: "-$3,000.00", net: "$6,200.00", status: "Paid in Full" },
            { item: "Semester V Technology & Library Dues", term: "Spring 2026", gross: "$600.00", scholarship: "$0.00", net: "$600.00", status: "Paid in Full" }
        ],
        transactions: [
            { id: "TXN-2026-9812", date: "Aug 15, 2026", desc: "Fall 2026 Term Tuition & Lab Assessment", method: "Direct Bank ACH (Chase)", amount: "$6,800.00" },
            { id: "TXN-2026-4432", date: "Jan 10, 2026", desc: "Spring 2026 Term Tuition & Fees", method: "Visa Corp (**** 8109)", amount: "$6,800.00" },
            { id: "TXN-2025-1109", date: "Aug 12, 2025", desc: "Fall 2025 Term Tuition & Fees", method: "Direct Bank ACH (Chase)", amount: "$6,800.00" }
        ],
        personalInfo: {
            dob: "March 14, 2004 (Age 22)",
            gender: "Female",
            bloodGroup: "O Positive (O+)",
            nationality: "United States (Citizen)",
            aadhaarSsn: "SSN: ***-**-8492",
            residence: "Dormitory Hall Alpha, Suite 412B, North Campus",
            permanentAddress: "742 Evergreen Terrace, Seattle, WA 98101",
            emergencyContactPhone: "+1 (555) 902-1144"
        },
        guardians: [
            {
                name: "Dr. Arthur Vance",
                relation: "Father & Primary Guardian",
                phone: "+1 (555) 902-1144",
                email: "arthur.vance@neurotech.org",
                occupation: "Chief Neurosurgeon, Seattle General Hospital"
            },
            {
                name: "Elena Rostova Vance",
                relation: "Mother & Secondary Guardian",
                phone: "+1 (555) 902-1145",
                email: "elena.vance@aerospace.io",
                occupation: "Senior Principal Propulsion Engineer"
            }
        ],
        medical: {
            bloodType: "O+ (Positive)",
            allergies: ["Penicillin", "Tree Nuts (Mild)"],
            chronicConditions: "None reported",
            vaccinationStatus: "Up to date (COVID-19 Bivalent, MMR, Meningococcal ACWY)",
            physician: "Dr. Robert Chen, MD (Campus Health Center)"
        },
        documents: [
            { title: "Official Academic Transcript (Sem 1-5)", type: "PDF", size: "1.4 MB", date: "Aug 20, 2026", badge: "Verified Official" },
            { title: "Dean's List Merit Certificate 2025-26", type: "PDF", size: "840 KB", date: "Jun 14, 2026", badge: "Honors" },
            { title: "University Admission & Enrollment Agreement", type: "PDF", size: "2.1 MB", date: "Jul 10, 2024", badge: "Signed & Archived" },
            { title: "Government Identity & Passport Scan", type: "IMG", size: "3.2 MB", date: "Jul 05, 2024", badge: "Confidential" },
            { title: "Campus Health Physical & Immunization Record", type: "PDF", size: "950 KB", date: "Aug 02, 2024", badge: "Medical Clearance" },
            { title: "Global STEM Fellowship Award Letter", type: "PDF", size: "620 KB", date: "Jun 28, 2024", badge: "Financial Aid" }
        ],
        notesTimeline: [
            {
                author: "Dr. Eleanor Ward",
                role: "Head Academic Advisor",
                date: "Sep 28, 2026 • 10:45 AM",
                type: "Advisory",
                text: "Conducted mid-semester advising session regarding Seraphina's Capstone proposal on Neural Sparsification. Student is remarkably well-prepared and has secured faculty sponsorship from Prof. Turing. Recommended for early accelerated graduation track."
            },
            {
                author: "Prof. Alan Turing",
                role: "Faculty - CS Department",
                date: "Aug 30, 2026 • 02:15 PM",
                type: "Commendation",
                text: "Seraphina demonstrated exceptional mastery during the Transformer Optimization workshop, helping peer students debug multi-head attention kernels. Top score achieved in preliminary diagnostic quiz."
            },
            {
                author: "Dr. Eleanor Ward",
                role: "Head Academic Advisor",
                date: "May 18, 2026 • 04:30 PM",
                type: "Academic",
                text: "End of Term Review: Maintained 3.92 CGPA. STEM Excellence Scholarship confirmed renewed for Academic Year 2026-27."
            }
        ]
    },
    {
        id: "#STU-2024-7190",
        name: "Julian Thorne",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
        department: "Department of Electrical & Robotics",
        degree: "B.S. in Robotics Engineering",
        batch: "Batch 2024-28 (Year 3)",
        email: "julian.thorne@edu.pulse.ac",
        phone: "+1 (555) 782-3904",
        cgpa: 3.84,
        rank: "Top 7% of Class",
        attendanceRate: 94.2,
        attendedHours: 156,
        totalHours: 168,
        creditsEarned: 84,
        totalCreditsNeeded: 120,
        feeDue: "$0.00",
        feeStatus: "Paid",
        status: "Enrolled • Full Time",
        scholarshipTitle: "Robotics Innovation Merit Grant",
        scholarshipDetails: "25% Tuition Waiver Renewal",
        gpaHistory: [3.70, 3.75, 3.80, 3.82, 3.86, 3.84],
        deptAverageHistory: [3.15, 3.18, 3.22, 3.20, 3.24, 3.28],
        courses: [
            { code: "EE-401", title: "Kinematics & Dynamics of Robot Arms", credits: 4, instructor: "Dr. Hiroshi Ishiguro", midterm: "90/100", assignment: "92%", grade: "A", status: "In Progress" },
            { code: "EE-410", title: "Embedded Real-Time Operating Systems", credits: 4, instructor: "Prof. Linus Torvalds", midterm: "94/100", assignment: "95%", grade: "A", status: "In Progress" },
            { code: "EE-425", title: "Sensors, Actuators & Signal Processing", credits: 3, instructor: "Dr. H. Nyquist", midterm: "88/100", assignment: "90%", grade: "A-", status: "In Progress" },
            { code: "CS-412", title: "Reinforcement Learning & Robotics", credits: 4, instructor: "Dr. Richard Sutton", midterm: "93/100", assignment: "94%", grade: "A", status: "In Progress" }
        ],
        achievements: [
            { icon: "🤖", title: "Lead Hardware Engineer - RoboCup 2025", subtitle: "2nd place in Autonomous Mobile Rover category", date: "Dec 2025" }
        ],
        timetable: {
            Mon: [
                { time: "09:00 AM - 10:30 AM", code: "EE-401", title: "Kinematics Studio", instructor: "Dr. Ishiguro", room: "Robotics Bay 1" }
            ],
            Tue: [
                { time: "10:00 AM - 11:30 AM", code: "EE-410", title: "Embedded RTOS Lab", instructor: "Prof. Torvalds", room: "Circuit Lab 4" }
            ],
            Wed: [
                { time: "09:00 AM - 10:30 AM", code: "EE-425", title: "Signal Processing", instructor: "Dr. Nyquist", room: "Hall 201" }
            ],
            Thu: [
                { time: "10:00 AM - 11:30 AM", code: "CS-412", title: "Reinforcement Learning", instructor: "Dr. Sutton", room: "Robotics Arena B" }
            ],
            Fri: [
                { time: "01:00 PM - 03:00 PM", code: "EE-401", title: "Robotic Arm Calibration Practicum", instructor: "Dr. Ishiguro", room: "Bay 1" }
            ]
        },
        subjectAttendance: [
            { subject: "EE-401 Robot Kinematics", conducted: 30, attended: 29, absent: 1, rate: "96.6%", status: "Safe" },
            { subject: "EE-410 Embedded RTOS", conducted: 28, attended: 26, absent: 2, rate: "92.8%", status: "Safe" },
            { subject: "EE-425 Sensor Systems", conducted: 24, attended: 22, absent: 2, rate: "91.6%", status: "Safe" },
            { subject: "CS-412 Reinforcement Learning", conducted: 28, attended: 27, absent: 1, rate: "96.4%", status: "Safe" }
        ],
        leaveHistory: [
            { reason: "Hardware hackathon travel", dates: "Nov 02 - Nov 04, 2026", type: "Academic", status: "Approved", by: "Dr. Eleanor Ward" }
        ],
        feeStructure: [
            { item: "Semester VI Tuition Fee", term: "Fall 2026", gross: "$9,200.00", scholarship: "-$2,300.00", net: "$6,900.00", status: "Paid in Full" }
        ],
        transactions: [
            { id: "TXN-2026-8819", date: "Aug 14, 2026", desc: "Fall 2026 Tuition Settlement", method: "Bank Wire Transfer", amount: "$6,900.00" }
        ],
        personalInfo: {
            dob: "November 08, 2003 (Age 22)",
            gender: "Male",
            bloodGroup: "A Positive (A+)",
            nationality: "Canada",
            aadhaarSsn: "SSN: ***-**-9128",
            residence: "East Campus Hall, Room 204",
            permanentAddress: "128 Queen St W, Toronto, ON",
            emergencyContactPhone: "+1 (555) 782-9900"
        },
        guardians: [
            {
                name: "Marcus Thorne",
                relation: "Father",
                phone: "+1 (555) 782-9900",
                email: "marcus.thorne@arch.ca",
                occupation: "Structural Architect"
            }
        ],
        medical: {
            bloodType: "A+",
            allergies: ["Latex"],
            chronicConditions: "None",
            vaccinationStatus: "Up to date",
            physician: "Dr. Sarah Jenkins, MD"
        },
        documents: [
            { title: "Academic Transcript (Sem 1-5)", type: "PDF", size: "1.2 MB", date: "Aug 18, 2026", badge: "Verified" },
            { title: "Robotics Merit Grant Letter", type: "PDF", size: "550 KB", date: "Jul 12, 2024", badge: "Financial Aid" }
        ],
        notesTimeline: [
            {
                author: "Dr. Eleanor Ward",
                role: "Head Academic Advisor",
                date: "Oct 01, 2026 • 11:30 AM",
                type: "Advisory",
                text: "Julian is collaborating effectively with the Robotics Club. Recommended for the upcoming International Mechatronics Symposium."
            }
        ]
    },
    {
        id: "#STU-2024-9120",
        name: "Amara Patel",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
        department: "School of Biomedical Engineering",
        degree: "B.S. in Neural Engineering & Prosthetics",
        batch: "Batch 2024-28 (Year 3)",
        email: "amara.patel@edu.pulse.ac",
        phone: "+1 (555) 612-8833",
        cgpa: 3.96,
        rank: "Top 1% of Class (Rank #1)",
        attendanceRate: 98.8,
        attendedHours: 166,
        totalHours: 168,
        creditsEarned: 92,
        totalCreditsNeeded: 120,
        feeDue: "$0.00",
        feeStatus: "Paid",
        status: "Enrolled • Full Time",
        scholarshipTitle: "Presidential Merit Gold Scholarship",
        scholarshipDetails: "50% Full Academic Tuition Waiver",
        gpaHistory: [3.92, 3.94, 3.96, 3.98, 3.95, 3.96],
        deptAverageHistory: [3.28, 3.30, 3.32, 3.35, 3.34, 3.36],
        courses: [
            { code: "BME-401", title: "Brain-Computer Interface Architecture", credits: 4, instructor: "Dr. Miguel Nicolelis", midterm: "99/100", assignment: "100%", grade: "A+", status: "In Progress" },
            { code: "BME-410", title: "Biocompatible Biomaterials", credits: 3, instructor: "Dr. Robert Langer", midterm: "96/100", assignment: "98%", grade: "A+", status: "In Progress" },
            { code: "CS-401", title: "Deep Neural Networks & Transformers", credits: 4, instructor: "Prof. Alan Turing", midterm: "97/100", assignment: "99%", grade: "A+", status: "In Progress" }
        ],
        achievements: [
            { icon: "🥇", title: "Valedictorian Track - Biomedical Engineering", subtitle: "Maintained Highest GPA in Class", date: "2024 - Present" },
            { icon: "🔬", title: "Undergraduate Research Grant Awardee", subtitle: "$15,000 NSF Grant for Non-Invasive EEG Prosthetics", date: "Feb 2026" }
        ],
        timetable: {
            Mon: [
                { time: "09:00 AM - 10:30 AM", code: "CS-401", title: "Deep Neural Networks", instructor: "Prof. Turing", room: "Hall 302" }
            ],
            Tue: [
                { time: "09:00 AM - 11:00 AM", code: "BME-401", title: "BCI Laboratory", instructor: "Dr. Nicolelis", room: "Bio-Med Lab 3" }
            ],
            Wed: [
                { time: "11:00 AM - 12:30 PM", code: "BME-410", title: "Biomaterials Synthesis", instructor: "Dr. Langer", room: "Chem Hall 1" }
            ],
            Thu: [
                { time: "01:00 PM - 03:00 PM", code: "BME-401", title: "EEG Neural Decoding Practicum", instructor: "Dr. Nicolelis", room: "Bio-Med Lab 3" }
            ],
            Fri: [
                { time: "10:00 AM - 12:00 PM", code: "RES-90", title: "Independent Research Lab Hours", instructor: "Dr. Ward", room: "Research Tower" }
            ]
        },
        subjectAttendance: [
            { subject: "BME-401 BCI Architecture", conducted: 32, attended: 32, absent: 0, rate: "100%", status: "Safe" },
            { subject: "BME-410 Biomaterials", conducted: 24, attended: 23, absent: 1, rate: "95.8%", status: "Safe" },
            { subject: "CS-401 Neural Networks", conducted: 32, attended: 32, absent: 0, rate: "100%", status: "Safe" }
        ],
        leaveHistory: [],
        feeStructure: [
            { item: "Semester VI Tuition Fee", term: "Fall 2026", gross: "$9,200.00", scholarship: "-$4,600.00", net: "$4,600.00", status: "Paid in Full" }
        ],
        transactions: [
            { id: "TXN-2026-7721", date: "Aug 10, 2026", desc: "Fall 2026 Tuition Settlement", method: "Direct Deposit", amount: "$4,600.00" }
        ],
        personalInfo: {
            dob: "January 19, 2004 (Age 22)",
            gender: "Female",
            bloodGroup: "B Positive (B+)",
            nationality: "United States",
            aadhaarSsn: "SSN: ***-**-4421",
            residence: "Honors Living Center, Suite 101",
            permanentAddress: "400 Silicon Ave, Palo Alto, CA",
            emergencyContactPhone: "+1 (555) 612-9911"
        },
        guardians: [
            {
                name: "Dr. Rajesh Patel",
                relation: "Father",
                phone: "+1 (555) 612-9911",
                email: "r.patel@biogen.com",
                occupation: "VP of Molecular Therapeutics"
            }
        ],
        medical: {
            bloodType: "B+",
            allergies: ["None"],
            chronicConditions: "None",
            vaccinationStatus: "Up to date",
            physician: "Dr. Robert Chen, MD"
        },
        documents: [
            { title: "Official Academic Transcript", type: "PDF", size: "1.5 MB", date: "Aug 20, 2026", badge: "Verified Official" },
            { title: "Presidential Gold Scholarship Grant", type: "PDF", size: "750 KB", date: "Jul 10, 2024", badge: "Financial Aid" }
        ],
        notesTimeline: [
            {
                author: "Dr. Eleanor Ward",
                role: "Head Academic Advisor",
                date: "Sep 20, 2026 • 09:00 AM",
                type: "Commendation",
                text: "Amara's recent EEG signal filtering experiment achieved state-of-the-art signal-to-noise ratio in the laboratory. Truly outstanding scholar."
            }
        ]
    }
];

// Current State
let currentStudent = studentsDatabase[0];
let currentTimetableDay = "Mon";
let selectedNoteType = "Advisory";

// Chart instances
let gpaChartInstance = null;
let creditsChartInstance = null;
let attendanceRatioChartInstance = null;

// DOM Content Loaded Initializer
document.addEventListener("DOMContentLoaded", () => {
    initLucideIcons();
    initAppNavigation();
    initSidebarStudentList();
    renderStudentProfile(currentStudent);
    initEventListeners();
    initGlobalSearch();
    initModals();
});

function initLucideIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Sidebar Student Switcher population
function initSidebarStudentList() {
    const listContainer = document.getElementById("sidebarStudentList");
    if (!listContainer) return;

    listContainer.innerHTML = "";
    studentsDatabase.forEach((stu) => {
        const item = document.createElement("div");
        item.className = `quick-student-item ${stu.id === currentStudent.id ? "selected" : ""}`;
        item.innerHTML = `
            <img src="${stu.avatar}" alt="${stu.name}" class="quick-stu-avatar">
            <div class="quick-stu-info">
                <span class="quick-stu-name">${stu.name}</span>
                <span class="quick-stu-gpa">GPA: ${stu.cgpa.toFixed(2)} • ${stu.id}</span>
            </div>
        `;
        item.addEventListener("click", () => {
            switchActiveStudent(stu.id);
        });
        listContainer.appendChild(item);
    });
}

// Switch active student by ID
function switchActiveStudent(studentId) {
    const found = studentsDatabase.find(s => s.id === studentId);
    if (!found) return;

    currentStudent = found;
    renderStudentProfile(currentStudent);
    initSidebarStudentList();

    // Close mobile sidebar if open
    const sidebar = document.getElementById("appSidebar");
    if (sidebar) sidebar.classList.remove("open");

    showToast(`Switched active profile to ${found.name}`, "success");
}

// Main Profile Renderer
function renderStudentProfile(stu) {
    // Header & Hero basics
    setText("headerBreadcrumbName", stu.name);
    setText("sidebarStudentName", stu.name);
    setText("sidebarStudentId", `ID: ${stu.id}`);
    setImageSrc("sidebarAvatar", stu.avatar);

    setText("heroName", stu.name);
    setText("heroId", stu.id);
    setText("heroDepartment", stu.department);
    setText("heroDegree", stu.degree);
    setText("heroBatch", stu.batch);
    setText("heroEmail", stu.email);
    setText("heroPhone", stu.phone);
    setImageSrc("heroAvatar", stu.avatar);

    // Metrics
    setText("metricCgpa", stu.cgpa.toFixed(2));
    setText("metricAttendance", `${stu.attendanceRate}%`);
    setText("metricCredits", stu.creditsEarned);
    setText("metricFeeStatus", stu.feeDue);

    const creditPct = ((stu.creditsEarned / stu.totalCreditsNeeded) * 100).toFixed(1);
    const creditBar = document.getElementById("metricCreditProgress");
    if (creditBar) creditBar.style.width = `${creditPct}%`;

    // Render Tab 1: Academic Courses & Achievements
    renderCoursesTable(stu.courses);
    renderAchievements(stu.achievements);
    renderAcademicCharts(stu);

    // Render Tab 2: Attendance & Timetable
    renderTimetable(stu.timetable, currentTimetableDay);
    renderSubjectAttendance(stu.subjectAttendance);
    renderLeaveHistory(stu.leaveHistory);
    renderAttendanceChart(stu);

    // Render Tab 3: Finance Ledger
    renderFeeStructure(stu.feeStructure);
    renderTransactions(stu.transactions);

    // Render Tab 4: Guardians & Medical
    renderPersonalInfo(stu.personalInfo);
    renderGuardians(stu.guardians);
    renderMedical(stu.medical);

    // Render Tab 5: Documents Repository
    renderDocuments(stu.documents);

    // Render Tab 6: Advisor Remarks
    renderNotesTimeline(stu.notesTimeline);

    // Update Digital ID Card Preview
    updateDigitalIdCardPreview(stu);

    initLucideIcons();
}

// Tab 1 Components
function renderCoursesTable(courses) {
    const tbody = document.getElementById("coursesTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    courses.forEach(c => {
        const tr = document.createElement("tr");
        const gradeClass = c.grade.startsWith("A") ? "grade-a" : c.grade.startsWith("B") ? "grade-b" : "grade-c";
        
        tr.innerHTML = `
            <td>
                <div>
                    <span class="course-code-pill">${c.code}</span>
                    <strong>${c.title}</strong>
                </div>
            </td>
            <td><strong>${c.credits} cr</strong></td>
            <td>${c.instructor}</td>
            <td><span class="text-primary font-weight-bold">${c.midterm}</span></td>
            <td>${c.assignment}</td>
            <td><span class="grade-badge ${gradeClass}">${c.grade}</span></td>
            <td><span class="status-badge badge-success">${c.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function renderAchievements(achievements) {
    const container = document.getElementById("achievementsList");
    if (!container) return;
    container.innerHTML = "";

    achievements.forEach(a => {
        const div = document.createElement("div");
        div.className = "achievement-card";
        div.innerHTML = `
            <div class="achieve-icon">${a.icon}</div>
            <div class="achieve-info">
                <strong>${a.title}</strong>
                <p>${a.subtitle}</p>
                <span class="achieve-date">${a.date}</span>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderAcademicCharts(stu) {
    // GPA Progression Line Chart
    const gpaCtx = document.getElementById("gpaChart");
    if (gpaCtx) {
        if (gpaChartInstance) gpaChartInstance.destroy();

        gpaChartInstance = new Chart(gpaCtx, {
            type: 'line',
            data: {
                labels: ['Sem I', 'Sem II', 'Sem III', 'Sem IV', 'Sem V', 'Sem VI'],
                datasets: [
                    {
                        label: `${stu.name} GPA`,
                        data: stu.gpaHistory,
                        borderColor: '#4f46e5',
                        backgroundColor: 'rgba(79, 70, 229, 0.1)',
                        borderWidth: 3,
                        pointBackgroundColor: '#4f46e5',
                        pointBorderColor: '#ffffff',
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        fill: true,
                        tension: 0.35
                    },
                    {
                        label: 'Department Class Average',
                        data: stu.deptAverageHistory,
                        borderColor: '#f59e0b',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        pointRadius: 3,
                        fill: false,
                        tension: 0.2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        titleFont: { family: 'Plus Jakarta Sans', size: 12 },
                        bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
                        padding: 10,
                        cornerRadius: 8
                    }
                },
                scales: {
                    y: {
                        min: 2.5,
                        max: 4.0,
                        grid: { color: '#f1f5f9' },
                        ticks: { stepSize: 0.3, font: { family: 'Plus Jakarta Sans', size: 11 } }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: 'Plus Jakarta Sans', size: 11 } }
                    }
                }
            }
        });
    }

    // Credits Distribution Donut Chart
    const creditsCtx = document.getElementById("creditsDonutChart");
    if (creditsCtx) {
        if (creditsChartInstance) creditsChartInstance.destroy();

        creditsChartInstance = new Chart(creditsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Core Major', 'Electives', 'Humanities', 'Labs'],
                datasets: [{
                    data: [54, 18, 12, 4],
                    backgroundColor: ['#4f46e5', '#06b6d4', '#f59e0b', '#10b981'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '72%',
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
}

// Tab 2 Components
function renderTimetable(timetable, day) {
    const container = document.getElementById("timetableScheduleList");
    if (!container) return;
    container.innerHTML = "";

    const schedule = timetable[day] || [];
    if (schedule.length === 0) {
        container.innerHTML = `<div style="padding: 24px; text-align: center; color: #94a3b8;">No lectures scheduled for ${day}. Free study & lab work day!</div>`;
        return;
    }

    schedule.forEach(item => {
        const div = document.createElement("div");
        div.className = "timetable-item";
        div.innerHTML = `
            <div class="tt-time">
                <strong>${item.time}</strong>
                <span>Active Period</span>
            </div>
            <div class="tt-course">
                <div class="tt-title">
                    <span class="course-code-pill">${item.code}</span>
                    <span>${item.title}</span>
                </div>
                <div class="tt-instructor">Instructor: <strong>${item.instructor}</strong></div>
            </div>
            <div class="tt-location">
                <i data-lucide="map-pin"></i>
                <span>${item.room}</span>
            </div>
        `;
        container.appendChild(div);
    });

    initLucideIcons();
}

function renderSubjectAttendance(subjectAttendance) {
    const tbody = document.getElementById("subjectAttendanceTbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    subjectAttendance.forEach(s => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${s.subject}</strong></td>
            <td>${s.conducted} hrs</td>
            <td><strong class="text-success">${s.attended} hrs</strong></td>
            <td><span class="text-danger">${s.absent} hrs</span></td>
            <td><strong>${s.rate}</strong></td>
            <td><span class="status-badge badge-success">${s.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function renderLeaveHistory(leaves) {
    const container = document.getElementById("leaveHistoryList");
    if (!container) return;
    container.innerHTML = "";

    if (leaves.length === 0) {
        container.innerHTML = `<div style="padding: 12px; font-size: 0.82rem; color: #94a3b8; text-align: center;">No recorded absences on file.</div>`;
        return;
    }

    leaves.forEach(l => {
        const div = document.createElement("div");
        div.className = "leave-item";
        div.innerHTML = `
            <div class="leave-header">
                <span class="leave-reason">${l.reason}</span>
                <span class="status-badge badge-success">${l.status}</span>
            </div>
            <div class="leave-dates">
                <span><i data-lucide="calendar" style="width: 12px; height: 12px; vertical-align: middle;"></i> ${l.dates}</span> • 
                <span>Approved by: <strong>${l.by}</strong></span>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderAttendanceChart(stu) {
    const attCtx = document.getElementById("attendanceRatioChart");
    if (attCtx) {
        if (attendanceRatioChartInstance) attendanceRatioChartInstance.destroy();

        attendanceRatioChartInstance = new Chart(attCtx, {
            type: 'doughnut',
            data: {
                labels: ['Present', 'Medical Leave', 'Unexcused'],
                datasets: [{
                    data: [stu.attendanceRate, 2.4, Math.max(0, 100 - stu.attendanceRate - 2.4).toFixed(1)],
                    backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '76%',
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
}

// Tab 3 Components
function renderFeeStructure(fees) {
    const tbody = document.getElementById("feeStructureTbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    fees.forEach(f => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${f.item}</strong></td>
            <td>${f.term}</td>
            <td>${f.gross}</td>
            <td><strong class="text-success">${f.scholarship}</strong></td>
            <td><strong>${f.net}</strong></td>
            <td><span class="status-badge badge-success">${f.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function renderTransactions(transactions) {
    const tbody = document.getElementById("transactionsTbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    transactions.forEach(t => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><span class="course-code-pill">${t.id}</span></td>
            <td>${t.date}</td>
            <td>${t.desc}</td>
            <td>${t.method}</td>
            <td><strong>${t.amount}</strong></td>
            <td>
                <button class="btn btn-xs btn-outline" onclick="simulateDownload('${t.id}-Receipt.pdf')">
                    <i data-lucide="receipt"></i> Receipt
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Tab 4 Components
function renderPersonalInfo(info) {
    const grid = document.getElementById("personalInfoGrid");
    if (!grid) return;
    grid.innerHTML = `
        <div class="info-box">
            <span class="info-label">Date of Birth & Age</span>
            <span class="info-val">${info.dob}</span>
        </div>
        <div class="info-box">
            <span class="info-label">Gender & Identity</span>
            <span class="info-val">${info.gender}</span>
        </div>
        <div class="info-box">
            <span class="info-label">Nationality & Citizen Status</span>
            <span class="info-val">${info.nationality}</span>
        </div>
        <div class="info-box">
            <span class="info-label">National ID / Social Security</span>
            <span class="info-val">${info.aadhaarSsn}</span>
        </div>
        <div class="info-box" style="grid-column: span 2;">
            <span class="info-label">Campus On-Campus Residence</span>
            <span class="info-val">${info.residence}</span>
        </div>
        <div class="info-box" style="grid-column: span 2;">
            <span class="info-label">Permanent Home Residence</span>
            <span class="info-val">${info.permanentAddress}</span>
        </div>
    `;
}

function renderGuardians(guardians) {
    const container = document.getElementById("guardiansList");
    if (!container) return;
    container.innerHTML = "";

    guardians.forEach(g => {
        const div = document.createElement("div");
        div.className = "guardian-card";
        div.innerHTML = `
            <div class="guardian-header">
                <div class="guardian-name-role">
                    <strong>${g.name}</strong>
                    <span>${g.relation}</span>
                </div>
                <span class="status-badge badge-info">Verified Guardian</span>
            </div>
            <div class="guardian-contacts">
                <div class="g-contact-row">
                    <i data-lucide="phone"></i>
                    <span>${g.phone}</span>
                </div>
                <div class="g-contact-row">
                    <i data-lucide="mail"></i>
                    <span>${g.email}</span>
                </div>
                <div class="g-contact-row">
                    <i data-lucide="briefcase"></i>
                    <span>${g.occupation}</span>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderMedical(medical) {
    const box = document.getElementById("medicalRecordBox");
    if (!box) return;

    box.innerHTML = `
        <div class="info-box">
            <span class="info-label">Blood Type & Rh Factor</span>
            <strong class="info-val" style="color: #dc2626; font-size: 1rem;">${medical.bloodType}</strong>
        </div>
        <div class="info-box">
            <span class="info-label">Known Allergies</span>
            <div class="med-badge-group">
                ${medical.allergies.map(a => `<span class="status-badge badge-warning">${a}</span>`).join("")}
            </div>
        </div>
        <div class="info-box">
            <span class="info-label">Chronic Conditions</span>
            <span class="info-val">${medical.chronicConditions}</span>
        </div>
        <div class="info-box">
            <span class="info-label">Designated Campus Physician</span>
            <span class="info-val">${medical.physician}</span>
        </div>
    `;
}

// Tab 5 Components
function renderDocuments(documents) {
    const grid = document.getElementById("documentsGrid");
    if (!grid) return;
    grid.innerHTML = "";

    documents.forEach(d => {
        const isImg = d.type === "IMG";
        const iconType = isImg ? "icon-img" : "icon-pdf";
        const iconName = isImg ? "image" : "file-text";

        const div = document.createElement("div");
        div.className = "document-card";
        div.innerHTML = `
            <div class="doc-icon ${iconType}">
                <i data-lucide="${iconName}"></i>
            </div>
            <div class="doc-details">
                <div class="doc-title" title="${d.title}">${d.title}</div>
                <div class="doc-meta">${d.type} • ${d.size} • ${d.date}</div>
                <span class="status-badge badge-success" style="margin-top: 6px; display: inline-block;">${d.badge}</span>
            </div>
            <button class="btn btn-xs btn-outline" onclick="simulateDownload('${d.title}')" title="Download Document">
                <i data-lucide="download"></i>
            </button>
        `;
        grid.appendChild(div);
    });
}

// Tab 6 Components
function renderNotesTimeline(notes) {
    const container = document.getElementById("notesTimeline");
    if (!container) return;
    container.innerHTML = "";

    notes.forEach(n => {
        const entry = document.createElement("div");
        entry.className = "timeline-entry";
        entry.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-card">
                <div class="timeline-header">
                    <div class="timeline-author">
                        <strong>${n.author}</strong>
                        <span>(${n.role})</span>
                    </div>
                    <span class="status-badge badge-info">${n.type}</span>
                </div>
                <div class="timeline-text">${n.text}</div>
                <div style="font-size: 0.72rem; color: #94a3b8; margin-top: 8px;">Logged at: ${n.date}</div>
            </div>
        `;
        container.appendChild(entry);
    });
}

function updateDigitalIdCardPreview(stu) {
    setImageSrc("idCardAvatar", stu.avatar);
    setText("idCardName", stu.name);
    setText("idCardIdNumber", stu.id);
    setText("idCardProgram", stu.degree);
    setText("idCardBarcodeText", stu.id.replace(/[^0-9]/g, '') + "9982");
}

// Initialize Navigation & Event Listeners
function initAppNavigation() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const sidebarNavItems = document.querySelectorAll(".sidebar-nav .nav-item");

    function setActiveTab(targetId) {
        // Tab buttons
        tabButtons.forEach(btn => {
            const isMatch = btn.getAttribute("data-target") === targetId;
            btn.classList.toggle("active", isMatch);
            btn.setAttribute("aria-selected", isMatch ? "true" : "false");
        });

        // Sidebar items
        sidebarNavItems.forEach(item => {
            const isMatch = item.getAttribute("data-tab") === targetId;
            item.classList.toggle("active", isMatch);
        });

        // Tab panels
        document.querySelectorAll(".tab-panel").forEach(panel => {
            panel.classList.toggle("active", panel.id === targetId);
        });

        initLucideIcons();
    }

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-target");
            setActiveTab(target);
        });
    });

    sidebarNavItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const target = item.getAttribute("data-tab");
            if (target) {
                setActiveTab(target);
                // Close mobile sidebar
                const sidebar = document.getElementById("appSidebar");
                if (sidebar) sidebar.classList.remove("open");
            }
        });
    });
}

function initEventListeners() {
    // Mobile Sidebar toggle
    const menuBtn = document.getElementById("menuToggleBtn");
    const closeSidebarBtn = document.getElementById("closeSidebarBtn");
    const sidebar = document.getElementById("appSidebar");

    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", () => sidebar.classList.add("open"));
    }
    if (closeSidebarBtn && sidebar) {
        closeSidebarBtn.addEventListener("click", () => sidebar.classList.remove("open"));
    }

    // Timetable Day Filter Pills
    const dayPills = document.querySelectorAll(".day-pill");
    dayPills.forEach(pill => {
        pill.addEventListener("click", () => {
            dayPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            currentTimetableDay = pill.getAttribute("data-day");
            renderTimetable(currentStudent.timetable, currentTimetableDay);
        });
    });

    // Note Type Selector
    const typeButtons = document.querySelectorAll(".type-btn");
    typeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            typeButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            selectedNoteType = btn.getAttribute("data-type");
        });
    });

    // Submit Advisor Note
    const btnSubmitNote = document.getElementById("btnSubmitNote");
    const newNoteInput = document.getElementById("newNoteInput");
    if (btnSubmitNote && newNoteInput) {
        btnSubmitNote.addEventListener("click", () => {
            const val = newNoteInput.value.trim();
            if (!val) {
                showToast("Please enter remarks before submitting.", "danger");
                return;
            }

            const newRecord = {
                author: "Dr. Eleanor Ward",
                role: "Head Academic Advisor",
                date: "Just now",
                type: selectedNoteType,
                text: val
            };

            currentStudent.notesTimeline.unshift(newRecord);
            renderNotesTimeline(currentStudent.notesTimeline);
            newNoteInput.value = "";
            showToast("Advisor note committed to student permanent file.", "success");
            initLucideIcons();
        });
    }

    // Print / Export Dossier
    const btnExport = document.getElementById("btnExportDossier");
    if (btnExport) {
        btnExport.addEventListener("click", () => {
            window.print();
        });
    }

    // Digital ID Card
    const btnIdCard = document.getElementById("btnIdCard");
    if (btnIdCard) {
        btnIdCard.addEventListener("click", () => {
            openModal("idCardModal");
        });
    }

    // Quick Action Buttons
    const btnSendMessage = document.getElementById("btnSendMessage");
    if (btnSendMessage) {
        btnSendMessage.addEventListener("click", () => {
            showToast(`Mail client dispatched for ${currentStudent.email}`, "success");
        });
    }

    const btnRequestAudit = document.getElementById("btnRequestAudit");
    if (btnRequestAudit) {
        btnRequestAudit.addEventListener("click", () => {
            showToast("Generating comprehensive Degree Audit & Graduation Readiness PDF...", "success");
        });
    }

    const btnUploadDoc = document.getElementById("btnUploadDoc");
    if (btnUploadDoc) {
        btnUploadDoc.addEventListener("click", () => {
            showToast("Document upload portal ready. Drag and drop PDF or credentials.", "success");
        });
    }

    const btnMakePayment = document.getElementById("btnMakePayment");
    if (btnMakePayment) {
        btnMakePayment.addEventListener("click", () => {
            showToast("University Bursar Payment Gateway opened.", "success");
        });
    }
}

// Global Search with Instant Dropdown
function initGlobalSearch() {
    const searchInput = document.getElementById("globalStudentSearch");
    const resultsDropdown = document.getElementById("searchResultsDropdown");

    if (!searchInput || !resultsDropdown) return;

    // Keyboard shortcut ⌘K or /
    document.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
            e.preventDefault();
            searchInput.focus();
        }
    });

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            resultsDropdown.style.display = "none";
            return;
        }

        const matches = studentsDatabase.filter(s => 
            s.name.toLowerCase().includes(query) ||
            s.id.toLowerCase().includes(query) ||
            s.department.toLowerCase().includes(query) ||
            s.degree.toLowerCase().includes(query)
        );

        if (matches.length === 0) {
            resultsDropdown.innerHTML = `<div style="padding: 12px; font-size: 0.82rem; color: #94a3b8; text-align: center;">No matching student dossiers found.</div>`;
            resultsDropdown.style.display = "block";
            return;
        }

        resultsDropdown.innerHTML = "";
        matches.forEach(m => {
            const item = document.createElement("div");
            item.className = "search-result-item";
            item.innerHTML = `
                <img src="${m.avatar}" alt="${m.name}" class="search-res-avatar">
                <div>
                    <strong style="font-size: 0.86rem; display: block; color: #0f172a;">${m.name}</strong>
                    <span style="font-size: 0.72rem; color: #64748b;">${m.id} • ${m.degree}</span>
                </div>
            `;
            item.addEventListener("click", () => {
                switchActiveStudent(m.id);
                resultsDropdown.style.display = "none";
                searchInput.value = "";
            });
            resultsDropdown.appendChild(item);
        });

        resultsDropdown.style.display = "block";
    });

    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !resultsDropdown.contains(e.target)) {
            resultsDropdown.style.display = "none";
        }
    });
}

// Modals Handling
function initModals() {
    // Open Edit Modal
    const btnEditProfile = document.getElementById("btnEditProfile");
    if (btnEditProfile) {
        btnEditProfile.addEventListener("click", () => {
            document.getElementById("editFullName").value = currentStudent.name;
            document.getElementById("editStudentIdField").value = currentStudent.id;
            document.getElementById("editEmail").value = currentStudent.email;
            document.getElementById("editPhone").value = currentStudent.phone;
            document.getElementById("editDepartment").value = currentStudent.department;
            document.getElementById("editDegree").value = currentStudent.degree;
            document.getElementById("editBatch").value = currentStudent.batch;
            document.getElementById("editCgpa").value = currentStudent.cgpa;
            document.getElementById("editAttendance").value = currentStudent.attendanceRate;
            document.getElementById("editAvatarUrl").value = currentStudent.avatar;

            openModal("editStudentModal");
        });
    }

    // Submit Edit Form
    const editForm = document.getElementById("editStudentForm");
    if (editForm) {
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();

            currentStudent.name = document.getElementById("editFullName").value.trim();
            currentStudent.id = document.getElementById("editStudentIdField").value.trim();
            currentStudent.email = document.getElementById("editEmail").value.trim();
            currentStudent.phone = document.getElementById("editPhone").value.trim();
            currentStudent.department = document.getElementById("editDepartment").value.trim();
            currentStudent.degree = document.getElementById("editDegree").value.trim();
            currentStudent.batch = document.getElementById("editBatch").value.trim();
            currentStudent.cgpa = parseFloat(document.getElementById("editCgpa").value) || currentStudent.cgpa;
            currentStudent.attendanceRate = parseFloat(document.getElementById("editAttendance").value) || currentStudent.attendanceRate;
            
            const avatarVal = document.getElementById("editAvatarUrl").value.trim();
            if (avatarVal) currentStudent.avatar = avatarVal;

            renderStudentProfile(currentStudent);
            initSidebarStudentList();
            closeModal("editStudentModal");
            showToast("Student profile updated successfully.", "success");
        });
    }

    // Open Add Student Modal
    const btnAddNew = document.getElementById("btnAddNewStudent");
    if (btnAddNew) {
        btnAddNew.addEventListener("click", () => {
            openModal("addStudentModal");
        });
    }

    // Submit Add Student Form
    const addForm = document.getElementById("addStudentForm");
    if (addForm) {
        addForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const newStudent = {
                id: document.getElementById("newStudentId").value.trim(),
                name: document.getElementById("newFullName").value.trim(),
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80",
                department: document.getElementById("newDepartment").value,
                degree: document.getElementById("newDegree").value.trim(),
                batch: document.getElementById("newBatch").value.trim() || "Batch 2024-28",
                email: document.getElementById("newEmail").value.trim(),
                phone: document.getElementById("newPhone").value.trim(),
                cgpa: parseFloat(document.getElementById("newCgpa").value) || 3.75,
                rank: "Newly Enrolled",
                attendanceRate: 98.0,
                attendedHours: 49,
                totalHours: 50,
                creditsEarned: 60,
                totalCreditsNeeded: 120,
                feeDue: "$0.00",
                feeStatus: "Paid",
                status: "Enrolled • Full Time",
                scholarshipTitle: "Merit Academic Entrance Grant",
                scholarshipDetails: "Standard Enrollment Tuition Status",
                gpaHistory: [3.70, 3.75, 3.78, 3.80, 3.75, 3.75],
                deptAverageHistory: [3.20, 3.25, 3.30, 3.32, 3.35, 3.38],
                courses: [
                    { code: "GEN-101", title: "Foundations of Scientific Computing", credits: 4, instructor: "Faculty Lead", midterm: "92/100", assignment: "95%", grade: "A", status: "Enrolled" },
                    { code: "MTH-201", title: "Linear Algebra & Vector Calculus", credits: 4, instructor: "Prof. Gauss", midterm: "88/100", assignment: "90%", grade: "A-", status: "Enrolled" }
                ],
                achievements: [
                    { icon: "🎓", title: "Freshman Honors Scholar", subtitle: "Admitted with Distinction", date: "Fall 2026" }
                ],
                timetable: {
                    Mon: [{ time: "10:00 AM - 11:30 AM", code: "GEN-101", title: "Scientific Computing", instructor: "Faculty Lead", room: "Hall 101" }],
                    Tue: [],
                    Wed: [{ time: "01:00 PM - 02:30 PM", code: "MTH-201", title: "Linear Algebra", instructor: "Prof. Gauss", room: "Room 204" }],
                    Thu: [],
                    Fri: []
                },
                subjectAttendance: [
                    { subject: "GEN-101 Computing", conducted: 20, attended: 20, absent: 0, rate: "100%", status: "Safe" },
                    { subject: "MTH-201 Linear Algebra", conducted: 20, attended: 19, absent: 1, rate: "95.0%", status: "Safe" }
                ],
                leaveHistory: [],
                feeStructure: [
                    { item: "Term Tuition Fee", term: "Fall 2026", gross: "$9,200.00", scholarship: "$0.00", net: "$9,200.00", status: "Paid in Full" }
                ],
                transactions: [
                    { id: "TXN-2026-NEW1", date: "Sep 01, 2026", desc: "Term Enrollment Clearance", method: "Online Card", amount: "$9,200.00" }
                ],
                personalInfo: {
                    dob: "April 12, 2005",
                    gender: "Not specified",
                    bloodGroup: "A+",
                    nationality: "Domestic",
                    aadhaarSsn: "SSN: ***-**-1100",
                    residence: "West Hall Dorms",
                    permanentAddress: "Main Street, City",
                    emergencyContactPhone: document.getElementById("newPhone").value.trim()
                },
                guardians: [
                    {
                        name: "Primary Guardian",
                        relation: "Guardian",
                        phone: document.getElementById("newPhone").value.trim(),
                        email: "guardian@pulse.ac",
                        occupation: "Professional"
                    }
                ],
                medical: {
                    bloodType: "A+",
                    allergies: ["None listed"],
                    chronicConditions: "None",
                    vaccinationStatus: "Verified",
                    physician: "Campus Health Center"
                },
                documents: [
                    { title: "Admission Contract & Terms", type: "PDF", size: "1.1 MB", date: "Sep 01, 2026", badge: "Signed" }
                ],
                notesTimeline: [
                    {
                        author: "Dr. Eleanor Ward",
                        role: "Head Academic Advisor",
                        date: "Just now",
                        type: "Advisory",
                        text: "New student enrollment processed and registered in the departmental database."
                    }
                ]
            };

            studentsDatabase.push(newStudent);
            currentStudent = newStudent;
            renderStudentProfile(currentStudent);
            initSidebarStudentList();
            closeModal("addStudentModal");
            addForm.reset();
            showToast(`Enrolled new student: ${newStudent.name}`, "success");
        });
    }

    // Modal Close Buttons
    document.querySelectorAll("[data-close]").forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-close");
            closeModal(modalId);
        });
    });

    // Close on backdrop click
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
        backdrop.addEventListener("click", (e) => {
            if (e.target === backdrop) {
                backdrop.classList.remove("active");
            }
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add("active");
        initLucideIcons();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("active");
    }
}

// Helpers
function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function setImageSrc(id, src) {
    const el = document.getElementById(id);
    if (el) el.src = src;
}

function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" style="width: 18px; height: 18px;"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    initLucideIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function simulateDownload(filename) {
    showToast(`Downloading secure document: ${filename}`, "success");
}

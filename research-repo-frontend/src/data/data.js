import img from '../assets/img/Frame 1.png'

export const sampleProjects = [
  {
    id: 1,
    title: "AI-Powered LMS",
    department: "Computer Science",
    uploadedBy: 1,
    batch: "2023",
    abstract: "Analyze student performance with AI.",
    tags: ["AI", "LMS"],
    forks: 2,
    watchers: 5,
    stars: 10,
    created: "15-01-2025",
    students: [
      {
        name: "John Doe",
        reg: "E/19/001",
        batch: "2025",
        department: "Computer Science",
        image: img
      }
    ],
    supervisors: [
      {
        name: "Prof. Perera",
        department: "Computer Science",
        email: "perera@university.edu",
        image: img
      }
    ],
    languages: [
      { name: "Python", percent: "60%" },
      { name: "React", percent: "30%" },
      { name: "SQL", percent: "10%" }
    ]
  },
  {
    id: 2,
    title: "Blockchain Voting",
    department: "Information Technology",
    batch: "2024",
    abstract: "Secure voting system using blockchain.",
    tags: ["Blockchain", "Voting"],
    forks: 1,
    watchers: 3,
    stars: 7,
    created: "20-02-2024",
    students: [
      {
        name: "Jane Smith",
        reg: "E/18/045",
        batch: "2024",
        department: "Information Technology",
        image: img
      }
    ],
    supervisors: [
      {
        name: "Dr. Fernando",
        department: "Information Technology",
        email: "fernando@university.edu",
        image: img
      }
    ],
    languages: [
      { name: "Solidity", percent: "50%" },
      { name: "JavaScript", percent: "40%" },
      { name: "Python", percent: "10%" }
    ]
  },
  {
    id: 3,
    title: "IoT Smart Farming",
    department: "Computer Science",
    batch: "2024",
    abstract: "Monitor crops using IoT devices.",
    tags: ["IoT", "Farming"],
    forks: 0,
    watchers: 2,
    stars: 5,
    created: "05-03-2024",
    students: [
      {
        name: "Michael Lee",
        reg: "E/18/078",
        batch: "2024",
        department: "Computer Science",
        image: img
      }
    ],
    supervisors: [
      {
        name: "Prof. Silva",
        department: "Computer Science",
        email: "silva@university.edu",
        image: img
      }
    ],
    languages: [
      { name: "C++", percent: "50%" },
      { name: "Python", percent: "30%" },
      { name: "Arduino", percent: "20%" }
    ]
  },
  {
    id: 4,
    title: "AI Driven Latency Constrained Resource Management In Kubernetes",
    department: "Computer Science",
    batch: "2025",
    abstract: "This repo focuses on latency-aware resource optimization for Kubernetes.",
    tags: ["AI", "Kubernetes", "Resource Management"],
    forks: 3,
    watchers: 1,
    stars: 1,
    created: "31-01-2025",
    students: [
      {
        name: "Pasindu Thennakoon",
        reg: "E/19/003",
        batch: "2025",
        department: "Computer Science",
        image: img
      }
    ],
    supervisors: [
      {
        name: "Dr. Silva",
        department: "Computer Science",
        email: "dr.silva@university.edu",
        image: img
      }
    ],
    languages: [
      { name: "Python", percent: "75.71%" },
      { name: "Jupyter Notebook", percent: "18.34%" },
      { name: "C++", percent: "3.05%" },
      { name: "Cython", percent: "2.28%" },
      { name: "C", percent: "0.46%" }
    ]
  },
  {
    id: 5,
    title: "Facial Recognition Attendance System",
    department: "Software Engineering",
    batch: "2025",
    abstract: "Automated attendance marking system using facial recognition.",
    tags: ["AI", "Computer Vision"],
    forks: 4,
    watchers: 6,
    stars: 15,
    created: "10-02-2025",
    students: [
      {
        name: "Sara Khan",
        reg: "E/19/056",
        batch: "2025",
        department: "Software Engineering",
        image: img
      }
    ],
    supervisors: [
      {
        name: "Dr. Weerasinghe",
        department: "Software Engineering",
        email: "weerasinghe@university.edu",
        image: img
      }
    ],
    languages: [
      { name: "Python", percent: "80%" },
      { name: "OpenCV", percent: "15%" },
      { name: "TensorFlow", percent: "5%" }
    ]
  },
  {
    id: 6,
    title: "Smart Traffic Light Control System",
    department: "Electronics",
    batch: "2024",
    abstract: "AI-based traffic light system to reduce congestion.",
    tags: ["IoT", "AI", "Traffic"],
    forks: 2,
    watchers: 4,
    stars: 8,
    created: "12-01-2024",
    students: [
      {
        name: "Liam Brown",
        reg: "E/18/034",
        batch: "2024",
        department: "Electronics",
        image: img
      }
    ],
    supervisors: [
      {
        name: "Prof. Jayasuriya",
        department: "Electronics",
        email: "jayasuriya@university.edu",
        image: img
      }
    ],
    languages: [
      { name: "Python", percent: "50%" },
      { name: "C++", percent: "40%" },
      { name: "MATLAB", percent: "10%" }
    ]
  },
  {
    id: 7,
    title: "E-Commerce Recommendation System",
    department: "Computer Science",
    batch: "2025",
    abstract: "Personalized product recommendation engine using ML.",
    tags: ["AI", "E-Commerce", "ML"],
    forks: 5,
    watchers: 10,
    stars: 20,
    created: "22-03-2025",
    students: [
      {
        name: "Emily White",
        reg: "E/19/099",
        batch: "2025",
        department: "Computer Science",
        image: img
      }
    ],
    supervisors: [
      {
        name: "Dr. Abeywardena",
        department: "Computer Science",
        email: "abeywardena@university.edu",
        image: img
      }
    ],
    languages: [
      { name: "Python", percent: "70%" },
      { name: "Scikit-learn", percent: "20%" },
      { name: "SQL", percent: "10%" }
    ]
  },
  {
    id: 8,
    title: "Health Monitoring Wearable",
    department: "Biomedical Engineering",
    batch: "2024",
    abstract: "IoT-enabled wearable device for patient monitoring.",
    tags: ["IoT", "Healthcare"],
    forks: 1,
    watchers: 2,
    stars: 6,
    created: "02-04-2024",
    students: [
      {
        name: "David Green",
        reg: "E/18/111",
        batch: "2024",
        department: "Biomedical Engineering",
        image: img
      }
    ],
    supervisors: [
      {
        name: "Prof. Rodrigo",
        department: "Biomedical Engineering",
        email: "rodrigo@university.edu",
        image: img
      }
    ],
    languages: [
      { name: "C", percent: "50%" },
      { name: "Python", percent: "30%" },
      { name: "Arduino", percent: "20%" }
    ]
  },
  {
    id: 9,
    title: "AI Chatbot for University Helpdesk",
    department: "Information Technology",
    batch: "2025",
    abstract: "Chatbot to assist students with university queries.",
    tags: ["AI", "Chatbot", "NLP"],
    forks: 6,
    watchers: 12,
    stars: 25,
    created: "01-05-2025",
    students: [
      {
        name: "Sophia Turner",
        reg: "E/19/120",
        batch: "2025",
        department: "Information Technology",
        image: img
      }
    ],
    supervisors: [
      {
        name: "Dr. Nimal",
        department: "Information Technology",
        email: "nimal@university.edu",
        image: img
      }
    ],
    languages: [
      { name: "Python", percent: "65%" },
      { name: "TensorFlow", percent: "20%" },
      { name: "Node.js", percent: "15%" }
    ]
  },
  {
    id: 10,
    title: "Cybersecurity Threat Detection System",
    department: "Cybersecurity",
    batch: "2024",
    abstract: "Real-time system to detect and mitigate security threats.",
    tags: ["Cybersecurity", "AI"],
    forks: 3,
    watchers: 8,
    stars: 18,
    created: "18-06-2024",
    students: [
      {
        name: "Chris Martin",
        reg: "E/18/142",
        batch: "2024",
        department: "Cybersecurity",
        image: img
      }
    ],
    supervisors: [
      {
        name: "Prof. Ranasinghe",
        department: "Cybersecurity",
        email: "ranasinghe@university.edu",
        image: img
      }
    ],
    languages: [
      { name: "Python", percent: "55%" },
      { name: "Java", percent: "35%" },
      { name: "SQL", percent: "10%" }
    ]
  }
];
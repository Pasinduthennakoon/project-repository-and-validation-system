export const pendingUploads = [
  {
    id: 301,
    title: "AI-Powered Medical Chatbot",
    department: "Computer Science",
    batch: "2025",
    abstract: "A chatbot for medical Q&A using NLP and symptom analysis.",
    tags: ["AI", "NLP", "Healthcare"],
    supervisors: [{ name: "Dr. Silva", email: "lecturer@example.com" }], // ✅ added
    students: [{ name: "Pasindu Thennakoon", reg: "E/19/003", email: "pasindu@uni.edu" }], // ✅ renamed to match expected field
    status: "WAITING_SUPERVISOR_APPROVAL",
    created: "2025-11-05",
  },
  {
    id: 301,
    title: "tourist guide bot",
    department: "Computer Science",
    batch: "2025",
    abstract: "A chatbot toursism field using NLP and symptom analysis.",
    tags: ["AI", "NLP"],
    supervisors: [{ name: "Dr. Gunawardhana", email: "Gunawardhana@example.com" }], // ✅ added
    students: [{ name: "Pasindu Thennakoon", reg: "E/19/003", email: "pasindu@uni.edu" }], // ✅ renamed to match expected field
    status: "WAITING_SUPERVISOR_APPROVAL",
    created: "2025-11-05",
  },
];

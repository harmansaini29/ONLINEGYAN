import { LayoutDashboard, BookOpen, Users, DollarSign, Settings, Compass, PlayCircle, BarChart } from "lucide-react";

export const CURRENT_USER = {
  name: "Harman Saini",
  role: "Senior Instructor",
  avatar: "https://i.pravatar.cc/150?img=11",
  stats: {
    revenue: "$128,430",
    students: "4,892",
    rating: "4.9"
  }
};

// --- NEW: MENTORS DATA ---
export const MENTORS = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Senior AI Researcher",
    company: "Google DeepMind",
    avatar: "https://i.pravatar.cc/150?img=5",
    expertise: ["Artificial Intelligence", "Python", "Data Science"],
    hourlyRate: "$150",
    rating: "5.0",
    reviews: 120,
    available: true
  },
  {
    id: 2,
    name: "Mark Zuckerberg",
    role: "Founder & CEO",
    company: "Meta",
    avatar: "https://i.pravatar.cc/150?img=3",
    expertise: ["Entrepreneurship", "Scaling", "Product Management"],
    hourlyRate: "$5000",
    rating: "4.9",
    reviews: 850,
    available: false
  },
  {
    id: 3,
    name: "Jessica Pearson",
    role: "Legal Consultant",
    company: "Pearson Hardman",
    avatar: "https://i.pravatar.cc/150?img=9",
    expertise: ["Corporate Law", "Negotiation", "Public Speaking"],
    hourlyRate: "$300",
    rating: "4.8",
    reviews: 95,
    available: true
  }
];

// --- NEW: ENROLLED COURSES (FOR TRACKING) ---
export const ENROLLED_COURSES = [
  {
    id: 101,
    title: "Full Stack Web Development",
    instructor: "Angela Yu",
    thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80",
    progress: 75, // Percentage completed
    totalLessons: 40,
    completedLessons: 30,
    lastAccessed: "2 hours ago"
  },
  {
    id: 102,
    title: "Financial Trading 101",
    instructor: "Warren Buffet",
    thumbnail: "https://images.unsplash.com/photo-1611974765270-ca1258822f8f?auto=format&fit=crop&w=800&q=80",
    progress: 30,
    totalLessons: 20,
    completedLessons: 6,
    lastAccessed: "1 day ago"
  }
];

// ... (Keep existing generateCurriculum and COURSES as they are) ...
const generateCurriculum = (courseTitle) => [
  {
    title: "Module 1: Fundamentals",
    lessons: [
      { id: 1, title: `Intro to ${courseTitle}`, duration: "10:05", completed: true, type: 'video' },
      { id: 2, title: "Setup & Installation", duration: "15:20", completed: true, type: 'video' },
      { id: 3, title: "Core Concepts", duration: "12:45", current: true, type: 'video' },
    ]
  },
  {
    title: "Module 2: Advanced Techniques",
    lessons: [
      { id: 4, title: "Deep Dive", duration: "18:30", locked: true, type: 'video' },
      { id: 5, title: "Final Project", duration: "22:15", locked: true, type: 'project' },
    ]
  }
];

export const COURSES = [
  { 
    id: 1, 
    title: "Advanced React Patterns", 
    category: "Development",
    rating: 4.9, 
    price: "$99",
    instructor: "Alex Morgan",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    status: "Published", 
    sales: 1240, 
    earnings: "$12,400",
    modules: generateCurriculum("Advanced React Patterns")
  },
  { 
    id: 2, 
    title: "UI/UX Design Masterclass", 
    category: "Design",
    rating: 4.8, 
    price: "$89",
    instructor: "Sarah Design",
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&w=800&q=80",
    status: "Draft", 
    sales: 0, 
    earnings: "$0",
    modules: generateCurriculum("UI/UX Design")
  },
  { 
    id: 3, 
    title: "Three.js 3D Web Magic", 
    category: "Development",
    rating: 5.0, 
    price: "$129",
    instructor: "Code Wizard",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    status: "Published", 
    sales: 856, 
    earnings: "$8,560",
    modules: generateCurriculum("Three.js")
  },
  { 
    id: 4, 
    title: "Digital Marketing Pro", 
    category: "Marketing",
    rating: 4.7, 
    price: "$99",
    instructor: "Emily Market",
    thumbnail: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80",
    status: "Published", 
    sales: 1240, 
    earnings: "$12,400",
    modules: generateCurriculum("Digital Marketing")
  },
];

export const INSTRUCTOR_SIDEBAR = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/instructor/dashboard" },
  { icon: BookOpen, label: "My Courses", path: "/instructor/courses" },
  { icon: Users, label: "Students", path: "/instructor/students" },
  { icon: DollarSign, label: "Earnings", path: "/instructor/earnings" },
  { icon: Settings, label: "Settings", path: "/instructor/settings" },
];

export const LEARNER_SIDEBAR = [
  { icon: Compass, label: "Browse", path: "/learner/marketplace" },
  { icon: PlayCircle, label: "My Learning", path: "/learner/my-learning" },
  { icon: Users, label: "Mentors", path: "/mentors" }, 
  { icon: Settings, label: "Settings", path: "/learner/settings" },
];
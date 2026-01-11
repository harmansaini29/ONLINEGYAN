import { LayoutDashboard, BookOpen, Users, DollarSign, Settings } from "lucide-react";

export const CURRENT_USER = {
  name: "Alex Morgan",
  role: "Senior Instructor",
  avatar: "https://i.pravatar.cc/150?img=11",
  stats: {
    revenue: "$128,430",
    students: "4,892",
    rating: "4.9"
  }
};

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
    earnings: "$12,400" 
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
    earnings: "$0" 
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
    earnings: "$8,560" 
  },
];

export const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/instructor/dashboard" },
  { icon: BookOpen, label: "My Courses", path: "/instructor/courses" },
  { icon: Users, label: "Students", path: "/instructor/students" },
  { icon: DollarSign, label: "Earnings", path: "/instructor/earnings" },
  { icon: Settings, label: "Settings", path: "/instructor/settings" },
];
// ============================================================
//  CampusConnect — Mock Data (TypeScript)
// ============================================================

export interface Event {
  id: number;
  title: string;
  department: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  description: string;
  registered: number;
  capacity: number;
  featured: boolean;
  image: string;
}

export interface Department {
  id: number;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  eventCount: number;
}

export interface Notification {
  id: number;
  type: "announcement" | "registration" | "reminder";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface User {
  name: string;
  shortName: string;
  initial: string;
  role: string;
  studentId: string;
  email: string;
  department: string;
  program: string;
  year: string;
  bio: string;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Annual Fashion Showcase 2026",
    department: "Fashion Design",
    category: "Fashion",
    date: "2026-08-15",
    time: "10:00 AM",
    venue: "Main Auditorium",
    organizer: "Department of Fashion Design",
    description:
      "Experience an inspiring showcase of student creativity, innovative designs, and emerging fashion trends. This annual event brings together the brightest minds from the Fashion Design department to present their semester-long projects to industry professionals and the campus community.",
    registered: 124,
    capacity: 200,
    featured: true,
    image: "/images/fashion-event.jpg",
  },
  {
    id: 2,
    title: "Culinary Innovation Fest",
    department: "Culinary Arts",
    category: "Culinary",
    date: "2026-08-20",
    time: "11:00 AM",
    venue: "Culinary Arts Lab",
    organizer: "Department of Culinary Arts",
    description:
      "Discover creative culinary ideas, live demonstrations, and innovative dishes prepared by talented students. This festival celebrates the art of cooking with live cook-offs, tasting sessions, and workshops led by professional chefs.",
    registered: 80,
    capacity: 150,
    featured: true,
    image: "/images/culinary-event.png",
  },
  {
    id: 3,
    title: "AI & Robotics Expo",
    department: "Engineering",
    category: "Technology",
    date: "2026-08-25",
    time: "9:30 AM",
    venue: "Innovation Center",
    organizer: "Department of Engineering",
    description:
      "Explore student-built robots, artificial intelligence projects, automation systems, and innovative technologies. See the future being built today by our engineering students in live demonstrations and interactive exhibits.",
    registered: 175,
    capacity: 250,
    featured: true,
    image: "/images/robotics-event.jpg",
  },
  {
    id: 4,
    title: "CodeSprint Hackathon",
    department: "Computer Science",
    category: "Technology",
    date: "2026-09-02",
    time: "8:00 AM",
    venue: "Computer Science Block",
    organizer: "Department of Computer Science",
    description:
      "Collaborate, code, and build innovative technology solutions during an exciting campus hackathon. Teams of 2-4 students compete over 24 hours to build solutions to real-world problems.",
    registered: 95,
    capacity: 120,
    featured: false,
    image: "/images/hackathon-event.png",
  },
  {
    id: 5,
    title: "Campus Cultural Night",
    department: "Arts & Culture",
    category: "Cultural",
    date: "2026-09-10",
    time: "5:00 PM",
    venue: "Open Air Theatre",
    organizer: "Student Cultural Committee",
    description:
      "Celebrate campus diversity through music, dance, performances, and cultural showcases. Students from across departments come together for an unforgettable evening of art, culture, and community.",
    registered: 300,
    capacity: 500,
    featured: false,
    image: "/images/cultural-event.jpg",
  },
  {
    id: 6,
    title: "Startup Pitch Challenge",
    department: "Business & Management",
    category: "Entrepreneurship",
    date: "2026-09-18",
    time: "2:00 PM",
    venue: "Seminar Hall",
    organizer: "School of Business & Management",
    description:
      "Present innovative startup ideas, receive expert feedback, and compete for recognition. This event connects aspiring entrepreneurs with mentors and investors.",
    registered: 65,
    capacity: 100,
    featured: false,
    image: "/images/startup-event.jpg",
  },
];

export const departments: Department[] = [
  {
    id: 1,
    name: "Fashion Design",
    icon: "✦",
    color: "#e11d48",
    bgColor: "#fff1f2",
    description: "Creative fashion, textile design, and styling programs.",
    eventCount: 4,
  },
  {
    id: 2,
    name: "Culinary Arts",
    icon: "◈",
    color: "#ea580c",
    bgColor: "#fff7ed",
    description: "Professional culinary training, baking, and hospitality.",
    eventCount: 3,
  },
  {
    id: 3,
    name: "Computer Science",
    icon: "⬡",
    color: "#4f46e5",
    bgColor: "#eef2ff",
    description: "Software engineering, AI, cybersecurity, and technology.",
    eventCount: 6,
  },
  {
    id: 4,
    name: "Engineering",
    icon: "⚙",
    color: "#7c3aed",
    bgColor: "#f5f3ff",
    description: "Mechanical, electrical, civil, and robotics engineering.",
    eventCount: 5,
  },
  {
    id: 5,
    name: "Business & Management",
    icon: "◆",
    color: "#059669",
    bgColor: "#ecfdf5",
    description: "MBA programs, entrepreneurship, finance, and marketing.",
    eventCount: 4,
  },
  {
    id: 6,
    name: "Arts & Culture",
    icon: "◇",
    color: "#d97706",
    bgColor: "#fffbeb",
    description: "Fine arts, performing arts, music, dance, and cultural studies.",
    eventCount: 5,
  },
];

export const notifications: Notification[] = [
  {
    id: 1,
    type: "announcement",
    title: "New technology event added",
    message: "AI & Robotics Expo is now open for student registrations.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "registration",
    title: "Registration confirmed",
    message: "Your registration for the Annual Fashion Showcase has been confirmed.",
    time: "Yesterday",
    read: false,
  },
  {
    id: 3,
    type: "reminder",
    title: "Event reminder",
    message: "AI & Robotics Expo starts tomorrow at 9:30 AM at Innovation Center.",
    time: "2 days ago",
    read: false,
  },
  {
    id: 4,
    type: "announcement",
    title: "Culinary Innovation Fest — new session added",
    message: "A new afternoon session has been added to the Culinary Innovation Fest.",
    time: "3 days ago",
    read: true,
  },
  {
    id: 5,
    type: "registration",
    title: "Registration confirmed",
    message: "Your spot at Campus Cultural Night has been reserved.",
    time: "4 days ago",
    read: true,
  },
];

export const initialUser: User = {
  name: "Sukhitha",
  shortName: "Sukhi",
  initial: "S",
  role: "Student",
  studentId: "CC2026001",
  email: "sukhi@campusconnect.edu",
  department: "Robotics Engineering",
  program: "B.Tech",
  year: "1st Year",
  bio: "Robotics engineering student interested in coding, technology, creativity, and building innovative projects.",
};

export const categoryColors: Record<string, { bg: string; text: string }> = {
  Fashion: { bg: "bg-rose-100", text: "text-rose-700" },
  Culinary: { bg: "bg-orange-100", text: "text-orange-700" },
  Technology: { bg: "bg-indigo-100", text: "text-indigo-700" },
  Cultural: { bg: "bg-amber-100", text: "text-amber-700" },
  Entrepreneurship: { bg: "bg-emerald-100", text: "text-emerald-700" },
};

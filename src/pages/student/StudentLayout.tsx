import { useEffect, useState } from "react";
import StudentDashboard from "./StudentDashboard";
import StudentSidebar from "@/components/StudentSidebar";
import { Menu } from "lucide-react";
import ExamList from "./ExamList";
import ExamResults from "./ExamResults";
import ExamReview from "./ExamReview";
import AnnouncementList from "../AnnouncementList";
import { useAnnouncementStore } from "@/store/announcementStore";
import { useAuthStore } from "@/store/authStore";

export default function StudentLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("dashboard");
   const [hasUnread, setHasUnread] = useState(false);
    const {fetchAnnouncementsForNotfications,announcements}=useAnnouncementStore()
const {user}=useAuthStore()
  const renderContent = () => {
    switch (activeRoute) {
      case "dashboard":
        return <StudentDashboard />;
      case "exams":
        return <ExamList/>
      case "results":
        return <ExamResults/>
      case "study-groups":
        return <ExamReview/>
      case "Notifications":
        return <AnnouncementList/>
      case "settings":
        return <div className="p-8"><h1 className="text-2xl font-bold">Settings</h1></div>;
      default:
        return <StudentDashboard />;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Your async logic here
      await fetchAnnouncementsForNotfications('student');
    };
  
    fetchData();
  }, [fetchAnnouncementsForNotfications]);
  
useEffect(() => {
  // current logged-in user
  if (!user.id) return;

  const visitedByUser = JSON.parse(localStorage.getItem("visitedAnnouncements") || "{}");

  const userVisited = visitedByUser[user.id] || [];

  const unread = announcements.some((a) => !userVisited.includes(a.id));
  setHasUnread(unread);
}, [announcements, user]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      <StudentSidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div className="relative inline-block">
  <Menu className="w-5 h-5" />
  {hasUnread && (
    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
  )}
</div>
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Student Portal</h1>
            <div className="w-9" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
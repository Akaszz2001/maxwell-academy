import { useEffect, useState } from "react";


import { Menu } from "lucide-react";



import FacultySidebar from "@/components/FacultySidebar";
import FacultyDashboard from "./FacultyDashboard";
import FacultyExams from "./FacultyExans";
import CreateExam from "./CreateExam";
import StudentResults from "./StudentResults";
import AnnouncementList from "../AnnouncementList";
import { useAnnouncementStore } from "@/store/AnnouncementStore";
import { useAuthStore } from "@/store/authStore";

export default function FacultyLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
const {user}=useAuthStore()
  const [activeRoute, setActiveRoute] = useState("dashboard");

    const [hasUnread, setHasUnread] = useState(false);
    const {fetchAnnouncementsForNotfications,announcements}=useAnnouncementStore()

  const renderContent = () => {
    switch (activeRoute) {
      case "dashboard":
        return <FacultyDashboard />;
      case "exams":
        return <FacultyExams/>
        case "createexam":
            return <CreateExam/>
      case "results":
        return <StudentResults/>
      case "Notifications":
        return <AnnouncementList/>
     
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      // Your async logic here
      await fetchAnnouncementsForNotfications('faculty');
    };
  
    fetchData();
  }, [fetchAnnouncementsForNotfications]);
  
  
  useEffect(() => {
    // current logged-in user
    if (!user?.id) return;
  
    const visitedByUser = JSON.parse(localStorage.getItem("visitedAnnouncements") || "{}");
  
    const userVisited = visitedByUser[user.id] || [];
  
    const unread = announcements.some((a) => !userVisited.includes(a.id));
    setHasUnread(unread);
  }, [announcements, user]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      <FacultySidebar
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
            <h1 className="text-lg font-semibold text-gray-800">Faculty  Portal</h1>
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

import React, { useEffect, useState } from "react";
import { BookOpen,  Home, BarChart3,  LogOut, X,  Bell } from "lucide-react";

import { useAuthStore } from "@/store/authStore";
import { useAnnouncementStore } from "@/store/AnnouncementStore";


interface StudentSidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeRoute: string;
  setActiveRoute: (route: string) => void;
}

// Sidebar Component
const StudentSidebar: React.FC<StudentSidebarProps> = ({
  isSidebarOpen,
  setSidebarOpen,
  activeRoute,
  setActiveRoute
}) => {
        const {signOut}=useAuthStore()
  const [hasUnread, setHasUnread] = useState(false);
  const {fetchAnnouncementsForNotfications,announcements}=useAnnouncementStore()
const {user}=useAuthStore()
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "exams", label: "All Exams", icon: BookOpen },
    { id: "results", label: "Results", icon: BarChart3 },
    { id: "Notifications", label: "Notifications", icon: Bell },

  ];

useEffect(() => {
  const fetchData = async () => {
    // Your async logic here
    await fetchAnnouncementsForNotfications('student');
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
    <>
      {/* Sidebar - Fixed on mobile, static on desktop */}
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 
        fixed lg:relative 
        inset-y-0 left-0 
        z-50 
        w-64 
        bg-white/95 backdrop-blur-sm 
        shadow-xl lg:shadow-none
        transform transition-transform duration-300 ease-in-out
        flex flex-col
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">Student Portal</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md lg:hidden hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 mt-8 px-4 overflow-y-auto">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveRoute(item.id);
                    setSidebarOpen(false); // Close mobile sidebar on selection
                  }}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                    activeRoute === item.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                          <div className="relative mr-3">
  <Icon className="w-5 h-5" />
  {item.id === "Notifications" && hasUnread && (
    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
  )}
</div>
                  {item.label}
                </button>
              );
            })}
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <button onClick={()=>signOut()} className="w-full flex items-center px-4 py-3 text-left rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200">
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0  bg-white/20 backdrop-blur-md z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
  
};
 export default StudentSidebar
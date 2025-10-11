

import React, { useState } from "react";
import { Menu, BookOpen, CheckCircle, Clock, Trophy, Calendar, Play, Target, Home, BarChart3, Users, Settings, LogOut, X, Library, FilePlus, Award, GraduationCap, School, ClipboardPlus, FileText, FileQuestion, User, UserPlus, UserCheck, Speaker, Megaphone, LucideMegaphone, MegaphoneOff, MapPinCheckInside, MegaphoneIcon, PlusCircle, ImagePlus, Images, Plus, User2Icon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

// Sidebar Component
const AdminSidebar = ({ isSidebarOpen, setSidebarOpen, activeRoute, setActiveRoute }) => {
        const {signOut}=useAuthStore()

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "facultyCreation", label: "Create Faculty", icon:School },
    
    { id: "studentCreation", label: "Create Student", icon: GraduationCap },
    { id: "examcreation", label: "Create Exam", icon: PlusCircle },
    { id: "questions", label: "Add Questions", icon: ClipboardPlus },
    { id: "exams", label: "All Exams", icon: FileText },
    { id: "allquestions", label: "All Questions", icon: FileQuestion },
    { id: "allstudents", label: "Students", icon: User },
    { id: "allfaculties", label: "Faculties", icon:UserCheck  },
    { id: "questionbank", label: "Question Bank", icon:FileText },
    { id: "announcemnet", label: "Create Announcement", icon:MegaphoneIcon },
    { id: "lsitannouncemnet", label: "Announcements", icon:Megaphone },
    { id: "addevent", label: "Add events", icon:ImagePlus },
    { id: "listevent", label: "Events", icon:Images },
    { id: "facultygallery", label: "Add Faculty Photos", icon:ImagePlus },
    { id: "facultygallerylist", label: "Faculty Gallery", icon:Images },

    { id: "performer", label: "Create Performe", icon:Plus },
    { id: "performerlist", label: "Performers", icon:User2Icon },

  ];

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
    <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0 
     bg-white/30 backdrop-blur-md shadow-sm">
  <h2 className="text-xl font-bold text-gray-800">Admin Portal</h2>
  <button
    onClick={() => setSidebarOpen(false)}
    className="p-2 rounded-md lg:hidden hover:bg-gray-100/40"
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
                  <Icon className="w-5 h-5 mr-3" />
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
            className="fixed inset-0 bg-white/20 backdrop-blur-md z-40 lg:hidden"          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
  
};
 export default AdminSidebar
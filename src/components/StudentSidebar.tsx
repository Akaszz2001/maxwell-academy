
import React, { useState } from "react";
import { Menu, BookOpen, CheckCircle, Clock, Trophy, Calendar, Play, Target, Home, BarChart3, Users, Settings, LogOut, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

// Sidebar Component
const StudentSidebar = ({ isSidebarOpen, setSidebarOpen, activeRoute, setActiveRoute }) => {
        const {signOut}=useAuthStore()

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "exams", label: "All Exams", icon: BookOpen },
    { id: "results", label: "Results", icon: BarChart3 },

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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
  
};
 export default StudentSidebar
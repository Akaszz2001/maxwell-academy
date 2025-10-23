/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { useExamStore, type Exam } from "../../store/examStore";
import { useAuthStore } from "../../store/authStore";
import { Users, BookOpen, UserCog } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const { exams, fetchExamsByUser, isLoading, fetchAllExamsForDash } =
    useExamStore();
  const { user, fetchAllUsers, students ,fetchStudents,noOfStudents,fetchFaculties,faculty} = useAuthStore();
  const [examss, setExams] = useState<Exam | null>(null);
  const fetchedRef = useRef(false);


  useEffect(() => {
    const fetchExamCount = async () => {
      try {
        const examsList = await fetchAllExamsForDash();
        setExams(examsList);
      } catch (err) {
        toast.error("Fecthing exams failed", err);
      }
    };
    fetchExamCount();
  }, [fetchAllExamsForDash]);
 
 
  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
await fetchStudents("student");
 await fetchFaculties()
      } catch (err) {
        toast.error("Fecthing exams failed", err);
      }
    };
    fetchStudentCount();
  }, [fetchStudents,fetchFaculties]);



  useEffect(() => {
    const fetching = async () => {
      await fetchAllUsers();
    };
    fetching();
  }, [fetchAllUsers, noOfStudents]);

  useEffect(() => {
    if (user && !fetchedRef.current) {
      // In admin case, fetch all exams (not just by user)
      fetchExamsByUser(user.id);
      fetchedRef.current = true;
    }
  }, [user]);

  //   const activeExams = exams.filter((exam) => exam.isActive !== false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-100 via-white to-red-50">
      {/* Background Shapes */}
      <div className="absolute top-10 right-20 w-60 h-60 bg-orange-300/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-red-300/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        {/* Hero Section */}
        <div className="bg-blue-500 text-white rounded-2xl shadow-lg p-8 mb-12 flex flex-col md:flex-row items-center justify-between">
          <div>
        <h1 className="text-3xl font-bold">
  {(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 20) return "Good Evening";
    return "Good Night";
  })()}, {user?.name || "Admin"} 
</h1>

            <p className="text-orange-100 mt-2">
              Manage users, exams, and system activity from here
            </p>
          </div>
          <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center text-2xl font-bold">
            {user?.name?.charAt(0) || "A"}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid gap-6 md:grid-cols-4 mb-12">
          <Card className="rounded-xl shadow-md bg-white/80 backdrop-blur border border-orange-100 hover:scale-105 transition">
            <CardContent className="flex flex-col items-center py-6">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                <Users className="w-7 h-7 text-orange-600" />
              </div>
              <p className="text-2xl font-bold">{noOfStudents?.length}</p>
              <span className="text-gray-600">Total Users</span>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-md bg-white/80 backdrop-blur border border-red-100 hover:scale-105 transition">
            <CardContent className="flex flex-col items-center py-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
                <BookOpen className="w-7 h-7 text-red-600" />
              </div>
              <p className="text-2xl font-bold">{examss?.length}</p>
              <span className="text-gray-600">Total Exams</span>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-md bg-white/80 backdrop-blur border border-yellow-100 hover:scale-105 transition">
            <CardContent className="flex flex-col items-center py-6">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                <UserCog className="w-7 h-7 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold">{faculty?.length}</p>
              <span className="text-gray-600">Active Faculty</span>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-md bg-white/80 backdrop-blur border border-green-100 hover:scale-105 transition">
            <CardContent className="flex flex-col items-center py-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <UserCog className="w-7 h-7 text-green-600" />
              </div>
              <p className="text-2xl font-bold">{students?.length}</p>
              <span className="text-gray-600">Active Students</span>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Recent Activity
        </h2>
        {isLoading ? (
          <p className="text-gray-500">Loading activity...</p>
        ) : (
          <div className="bg-white/80 backdrop-blur rounded-xl shadow divide-y divide-gray-200">
            {exams.length === 0 ? (
              <p className="text-gray-500 text-center p-6">
                No exams available
              </p>
            ) : (
              exams.slice(0, 5).map((exam) => (
                <div
                  key={exam.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">{exam.name}</p>
                    <span className="text-sm text-gray-500">
                      {new Date(exam.startTime).toLocaleString()}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      exam.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {exam.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Floating Create Exam Button */}
        {/* <Button
          size="lg"
          className="fixed bottom-8 right-8 rounded-full w-14 h-14 bg--600 hover:bg-orange-700 shadow-lg flex items-center justify-center"
          onClick={() =>
            (window.location.href = "/admin/dashboard/exams/create")
          }
        >
          <Plus className="w-6 h-6 text-white" />
        </Button> */}
      </div>
    </div>
  );
}

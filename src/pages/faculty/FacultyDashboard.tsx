// import React, { useEffect } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useExamStore } from "../../store/examStore";
// import { useAuthStore } from "../../store/authStore";
// import { Calendar, BookOpen, Users, FileText } from "lucide-react";

// export default function FacultyDashboard() {
//   const { exams, fetchExamsByUser, isLoading } = useExamStore();
//   const { user } = useAuthStore();

//   useEffect(() => {
//     if (user) {
//       fetchExamsByUser(user.id);
//     }
//   }, [user, fetchExamsByUser]);

//   const activeExams = exams.filter((exam) => exam.isActive !== false);

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6">
//       {/* Background bubbles */}
//       <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200 rounded-full opacity-30 blur-2xl" />
//       <div className="absolute bottom-20 right-20 w-52 h-52 bg-blue-300 rounded-full opacity-30 blur-3xl" />

//       <div className="relative max-w-7xl mx-auto">
//         {/* Welcome Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
//             Welcome back, {user?.name || "Faculty"}
//           </h1>
//           <p className="text-gray-500 mt-2">Here’s your teaching overview</p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid gap-6 md:grid-cols-3 mb-12">
//           <Card className="shadow-md rounded-xl">
//             <CardContent className="flex flex-col items-center justify-center py-6">
//               <BookOpen className="w-10 h-10 text-blue-600 mb-2" />
//               <p className="text-2xl font-bold">{exams.length}</p>
//               <span className="text-gray-600">Total Exams</span>
//             </CardContent>
//           </Card>

//           <Card className="shadow-md rounded-xl">
//             <CardContent className="flex flex-col items-center justify-center py-6">
//               <FileText className="w-10 h-10 text-green-600 mb-2" />
//               <p className="text-2xl font-bold">{activeExams.length}</p>
//               <span className="text-gray-600">Active Exams</span>
//             </CardContent>
//           </Card>

//           <Card className="shadow-md rounded-xl">
//             <CardContent className="flex flex-col items-center justify-center py-6">
//               <Users className="w-10 h-10 text-purple-600 mb-2" />
//               <p className="text-2xl font-bold">--</p>
//               <span className="text-gray-600">Students</span>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent Exams */}
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Exams</h2>
//         {isLoading ? (
//           <p className="text-gray-500">Loading exams...</p>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {exams.length === 0 ? (
//               <p className="text-gray-500 col-span-full text-center">
//                 No exams created yet
//               </p>
//             ) : (
//               exams.slice(0, 6).map((exam) => (
//                 <Card
//                   key={exam.id}
//                   className="shadow-md rounded-xl hover:shadow-lg transition bg-white/80 backdrop-blur"
//                 >
//                   <CardHeader>
//                     <CardTitle className="text-lg font-semibold text-gray-800">
//                       {exam.name}
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex items-center text-gray-600">
//                       <Calendar className="w-5 h-5 mr-2 text-blue-600" />
//                       <span>{new Date(exam.startTime).toLocaleString()}</span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))
//             )}
//           </div>
//         )}

//         {/* Create Exam Button */}
//         <div className="text-center mt-12">
//           <Button
//             className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl shadow-md"
//             onClick={() => (window.location.href = "/faculty/dashboard/exams/create")}
//           >
//             + Create New Exam
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useExamStore } from "../../store/examStore";
import { useAuthStore } from "../../store/authStore";
import { Calendar, BookOpen, Users, FileText, Plus } from "lucide-react";

export default function FacultyDashboard() {
  const { exams, fetchExamsByUser, isLoading } = useExamStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      fetchExamsByUser(user.id);
    }
  }, [user, fetchExamsByUser]);

  const activeExams = exams.filter((exam) => exam.isActive !== false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      {/* Background Bubbles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl shadow-lg p-8 mb-12 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {user?.name || "Faculty"} 👋
            </h1>
            <p className="text-blue-100 mt-2">Here’s an overview of your teaching activity</p>
          </div>
          <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center text-2xl font-bold">
            {user?.name?.charAt(0) || "F"}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card className="rounded-2xl shadow-lg bg-white/70 backdrop-blur border border-blue-100 hover:scale-105 transition">
            <CardContent className="flex flex-col items-center py-6">
              <BookOpen className="w-10 h-10 text-blue-600 mb-2" />
              <p className="text-3xl font-bold">{exams.length}</p>
              <span className="text-gray-600">Total Exams</span>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-lg bg-white/70 backdrop-blur border border-green-100 hover:scale-105 transition">
            <CardContent className="flex flex-col items-center py-6">
              <FileText className="w-10 h-10 text-green-600 mb-2" />
              <p className="text-3xl font-bold">{activeExams.length}</p>
              <span className="text-gray-600">Active Exams</span>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-lg bg-white/70 backdrop-blur border border-purple-100 hover:scale-105 transition">
            <CardContent className="flex flex-col items-center py-6">
              <Users className="w-10 h-10 text-purple-600 mb-2" />
              <p className="text-3xl font-bold">--</p>
              <span className="text-gray-600">Students</span>
            </CardContent>
          </Card>
        </div>

        {/* Recent Exams */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Exams</h2>
        {isLoading ? (
          <p className="text-gray-500">Loading exams...</p>
        ) : (
          <div className="grid gap-6">
            {exams.length === 0 ? (
              <p className="text-gray-500 text-center">No exams created yet</p>
            ) : (
              exams.slice(0, 5).map((exam) => (
                <Card
                  key={exam.id}
                  className="rounded-xl shadow-md bg-white/70 backdrop-blur hover:shadow-lg hover:scale-[1.01] transition"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      {exam.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                      <span>{new Date(exam.startTime).toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Floating Create Exam Button */}
        <Button
          size="lg"
          className="fixed bottom-8 right-8 rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg flex items-center justify-center"
          onClick={() => (window.location.href = "/faculty/dashboard/exams/create")}
        >
          <Plus className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>
  );
}

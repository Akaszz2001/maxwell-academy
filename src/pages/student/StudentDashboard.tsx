// import React, { useEffect, useState } from "react";
// import StudentSidebar from "@/components/StudentSidebar";
// import { Menu, BookOpen, CheckCircle, Clock, Trophy, Calendar, Play, Target } from "lucide-react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useAuthStore } from "@/store/authStore";
// import { useExamStore } from "@/store/examStore";

// const StudentDashboard = () => {
// const {user}=useAuthStore()

// //   const [stats] = useState({ totalExams: 12, completedExams: 8, upcomingExams: 4, averageScore: 86.5 });
// //   const [upcomingExams] = useState([
// //     { id: 1, name: "Mathematics Final", subject: "Calculus II", date: "2024-12-15", time: "10:00 AM", duration: "3 hours", status: "upcoming" },
// //     { id: 2, name: "Physics Midterm", subject: "Quantum Mechanics", date: "2024-12-18", time: "2:00 PM", duration: "2 hours", status: "upcoming" },
// //     { id: 3, name: "Chemistry Quiz", subject: "Organic Chemistry", date: "2024-12-20", time: "9:00 AM", duration: "1 hour", status: "upcoming" }
// //   ]);
// //   const [completedExams] = useState([
// //     { id: 1, name: "Data Structures Final", subject: "Computer Science", date: "2024-11-28", score: 85, maxScore: 100, grade: "A" },
// //     { id: 2, name: "Linear Algebra Test", subject: "Mathematics", date: "2024-11-25", score: 92, maxScore: 100, grade: "A+" },
// //     { id: 3, name: "Organic Chemistry Quiz", subject: "Chemistry", date: "2024-11-22", score: 78, maxScore: 100, grade: "B+" },
// //     { id: 4, name: "Physics Mechanics", subject: "Physics", date: "2024-11-20", score: 88, maxScore: 100, grade: "A" }
// //   ]);

// //   // Helper functions
// //   const getScoreColor = (score, maxScore) => {
// //     const percentage = (score / maxScore) * 100;
// //     if (percentage >= 90) return "text-green-600 bg-green-50";
// //     if (percentage >= 80) return "text-blue-600 bg-blue-50";
// //     if (percentage >= 70) return "text-yellow-600 bg-yellow-50";
// //     return "text-red-600 bg-red-50";
// //   };

// //   const getStatusBadge = (status) => {
// //     switch (status) {
// //       case "upcoming": return "bg-blue-100 text-blue-600 border border-blue-200";
// //       case "completed": return "bg-green-100 text-green-600 border border-green-200";
// //       case "missed": return "bg-red-100 text-red-600 border border-red-200";
// //       default: return "bg-gray-100 text-gray-600 border border-gray-200";
// //     }
// //   };
// const [upcomingExams, setUpcomingExams] = useState([]);
// const [completedExams, setCompletedExams] = useState([]);
// const [missedExams, setMissedExams] = useState([]);
// const {fetchAndCategorizeExams}=useExamStore()
// useEffect(() => {
//   const loadExams = async () => {
//     try {
//       const { upcomingExams, completedExams, missedExams } = await fetchAndCategorizeExams();
//       setUpcomingExams(upcomingExams);
//       setCompletedExams(completedExams);
//       setMissedExams(missedExams);
//     } catch (err) {
//       console.error("Failed to load exams:", err);
//     }
//   };

//   loadExams();
// }, []);

//   return (
//     <div className="relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-10 left-10 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute top-40 right-20 w-48 h-48 bg-purple-300/15 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }} />
//         <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-indigo-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
//         <div className="absolute bottom-40 right-10 w-56 h-56 bg-pink-300/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
//       </div>

//       <div className="relative px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
//         {/* Hero Section */}
//         <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12">
//           <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
//             <div className="mb-4 lg:mb-0">
//               <h1 className="text-2xl lg:text-4xl font-bold mb-2">
//                 Hello, {user.name} 👋
//               </h1>
//               <p className="text-blue-100 text-sm lg:text-base">
//                 Ready to ace your next exam? Let's see what's coming up!
//               </p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center text-xl lg:text-2xl font-bold">
//                 {user.name.charAt(0)}
//               </div>
//               <div className="text-right hidden sm:block">
//                 <p className="text-sm text-blue-100">Current Average</p>
//                 <p className="text-2xl font-bold">{stats.averageScore}%</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
//           <Card className="rounded-xl lg:rounded-2xl shadow-lg bg-white/70 backdrop-blur-sm border border-blue-100 hover:scale-105 transition-transform duration-200">
//             <CardContent className="flex flex-col items-center py-4 lg:py-6">
//               <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 mb-2" />
//               <p className="text-xl lg:text-2xl font-bold">{stats.totalExams}</p>
//               <span className="text-xs lg:text-sm text-gray-600 text-center">Total Exams</span>
//             </CardContent>
//           </Card>

//           <Card className="rounded-xl lg:rounded-2xl shadow-lg bg-white/70 backdrop-blur-sm border border-green-100 hover:scale-105 transition-transform duration-200">
//             <CardContent className="flex flex-col items-center py-4 lg:py-6">
//               <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-green-600 mb-2" />
//               <p className="text-xl lg:text-2xl font-bold">{stats.completedExams}</p>
//               <span className="text-xs lg:text-sm text-gray-600 text-center">Completed</span>
//             </CardContent>
//           </Card>

//           <Card className="rounded-xl lg:rounded-2xl shadow-lg bg-white/70 backdrop-blur-sm border border-orange-100 hover:scale-105 transition-transform duration-200">
//             <CardContent className="flex flex-col items-center py-4 lg:py-6">
//               <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600 mb-2" />
//               <p className="text-xl lg:text-2xl font-bold">{stats.upcomingExams}</p>
//               <span className="text-xs lg:text-sm text-gray-600 text-center">Upcoming</span>
//             </CardContent>
//           </Card>

//           <Card className="rounded-xl lg:rounded-2xl shadow-lg bg-white/70 backdrop-blur-sm border border-purple-100 hover:scale-105 transition-transform duration-200">
//             <CardContent className="flex flex-col items-center py-4 lg:py-6">
//               <Trophy className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600 mb-2" />
//               <p className="text-xl lg:text-2xl font-bold">{stats.averageScore}%</p>
//               <span className="text-xs lg:text-sm text-gray-600 text-center">Average</span>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Exams Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
//           {/* Upcoming Exams */}
//           <div className="lg:col-span-2">
//             <Card className="rounded-2xl shadow-xl bg-white/80 backdrop-blur-sm border-0">
//               <CardHeader className="pb-4">
//                 <CardTitle className="text-xl lg:text-2xl font-bold text-gray-800 flex items-center">
//                   <Calendar className="w-6 h-6 mr-3 text-blue-600" />
//                   Upcoming Exams
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {upcomingExams.map((exam) => (
//                     <div key={exam.id} className="p-4 lg:p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
//                         <div>
//                           <h3 className="font-semibold text-lg text-gray-800 mb-1">{exam.name}</h3>
//                           <p className="text-sm text-gray-600">{exam.subject}</p>
//                         </div>
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(exam.status)} mt-2 sm:mt-0`}>
//                           {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
//                         </span>
//                       </div>
//                       <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                         <div className="flex items-center">
//                           <Calendar className="w-4 h-4 mr-1" />
//                           {new Date(exam.date).toLocaleDateString()}
//                         </div>
//                         <div className="flex items-center">
//                           <Clock className="w-4 h-4 mr-1" />
//                           {exam.time}
//                         </div>
//                         <div className="flex items-center">
//                           <Target className="w-4 h-4 mr-1" />
//                           {exam.duration}
//                         </div>
//                       </div>
//                       <div className="mt-4">
//                         <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg w-full sm:w-auto">
//                           <Play className="w-4 h-4 mr-2" />
//                           Start Exam
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Completed Exams */}
//           <div>
//             <Card className="rounded-2xl shadow-xl bg-white/80 backdrop-blur-sm border-0">
//               <CardHeader className="pb-4">
//                 <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
//                   <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
//                   Completed Exams
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {completedExams.map((exam) => (
//                     <div key={exam.id} className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 hover:shadow-md transition-all duration-200">
//                       <div className="flex justify-between items-start mb-3">
//                         <div className="flex-1">
//                           <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">{exam.name}</h3>
//                           <p className="text-xs text-gray-600 mb-2">{exam.subject}</p>
//                           <span className="text-xs text-gray-500">{new Date(exam.date).toLocaleDateString()}</span>
//                         </div>
//                         <div className="text-right ml-4">
//                           <div className={`px-2 py-1 rounded-lg text-xs font-bold mb-1 ${getScoreColor(exam.score, exam.maxScore)}`}>
//                             {exam.score}/{exam.maxScore}
//                           </div>
//                           <div className="text-xs font-medium text-gray-700">Grade: {exam.grade}</div>
//                         </div>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${(exam.score / exam.maxScore) * 100}%` }} />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default StudentDashboard

// import React, { useEffect, useState } from "react";
// import { Menu, BookOpen, CheckCircle, Clock, Trophy, Calendar, Play, Target } from "lucide-react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useAuthStore} from "@/store/authStore";

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { useExamStore  , type Exam } from "@/store/examStore";

// const StudentDashboard = () => {
//   const { user } = useAuthStore();
//   const { fetchAndCategorizeExams } = useExamStore();

//   const [upcomingExams, setUpcomingExams] = useState([]);
//   const [completedExams, setCompletedExams] = useState([]);
//   const [missedExams, setMissedExams] = useState([]);
//   const [stats, setStats] = useState({
//     totalExams: 0,
//     completedExams: 0,
//     upcomingExams: 0,
//     averageScore: 0,
//   });

//   useEffect(() => {
//     const loadExams = async () => {
//       try {
//         const { upcomingExams, completedExams, missedExams } = await fetchAndCategorizeExams();
//         setUpcomingExams(upcomingExams);
//         setCompletedExams(completedExams);
//         setMissedExams(missedExams);

//         const total = upcomingExams.length + completedExams.length + missedExams.length;
//         const avg =
//           completedExams.length > 0
//             ? (
//                 (completedExams.reduce((acc, e) => acc + e.score, 0) /
//                   completedExams.reduce((acc, e) => acc + e.maxScore, 0)) *
//                 100
//               ).toFixed(1)
//             : 0;

//         setStats({
//           totalExams: total,
//           completedExams: completedExams.length,
//           upcomingExams: upcomingExams.length,
//           averageScore: avg,
//         });
//       } catch (err) {
//         console.error("Failed to load exams:", err);
//       }
//     };

//     loadExams();
//   }, []);

//   const getScoreColor = (score, maxScore) => {
//     const percentage = (score / maxScore) * 100;
//     if (percentage >= 90) return "text-green-600 bg-green-50";
//     if (percentage >= 80) return "text-blue-600 bg-blue-50";
//     if (percentage >= 70) return "text-yellow-600 bg-yellow-50";
//     return "text-red-600 bg-red-50";
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "upcoming":
//         return "bg-blue-100 text-blue-600 border border-blue-200";
//       case "completed":
//         return "bg-green-100 text-green-600 border border-green-200";
//       case "missed":
//         return "bg-red-100 text-red-600 border border-red-200";
//       default:
//         return "bg-gray-100 text-gray-600 border border-gray-200";
//     }
//   };

//   return (
//     <div className="relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-10 left-10 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
//         <div
//           className="absolute top-40 right-20 w-48 h-48 bg-purple-300/15 rounded-full blur-2xl animate-bounce"
//           style={{ animationDuration: "3s" }}
//         />
//         <div
//           className="absolute bottom-20 left-1/4 w-80 h-80 bg-indigo-300/10 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         />
//         <div
//           className="absolute bottom-40 right-10 w-56 h-56 bg-pink-300/15 rounded-full blur-2xl animate-pulse"
//           style={{ animationDelay: "2s" }}
//         />
//       </div>

//       <div className="relative px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
//         {/* Hero Section */}
//         <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12">
//           <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
//             <div className="mb-4 lg:mb-0">
//               <h1 className="text-2xl lg:text-4xl font-bold mb-2">
//                 Hello, {user.name} 👋
//               </h1>
//               <p className="text-blue-100 text-sm lg:text-base">
//                 Ready to ace your next exam? Let's see what's coming up!
//               </p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center text-xl lg:text-2xl font-bold">
//                 {user.name.charAt(0)}
//               </div>
//               <div className="text-right hidden sm:block">
//                 <p className="text-sm text-blue-100">Current Average</p>
//                 <p className="text-2xl font-bold">{stats.averageScore}%</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
//           <Card className="rounded-xl lg:rounded-2xl shadow-lg bg-white/70 backdrop-blur-sm border border-blue-100 hover:scale-105 transition-transform duration-200">
//             <CardContent className="flex flex-col items-center py-4 lg:py-6">
//               <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 mb-2" />
//               <p className="text-xl lg:text-2xl font-bold">{stats.totalExams}</p>
//               <span className="text-xs lg:text-sm text-gray-600 text-center">Total Exams</span>
//             </CardContent>
//           </Card>

//           <Card className="rounded-xl lg:rounded-2xl shadow-lg bg-white/70 backdrop-blur-sm border border-green-100 hover:scale-105 transition-transform duration-200">
//             <CardContent className="flex flex-col items-center py-4 lg:py-6">
//               <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-green-600 mb-2" />
//               <p className="text-xl lg:text-2xl font-bold">{stats.completedExams}</p>
//               <span className="text-xs lg:text-sm text-gray-600 text-center">Completed</span>
//             </CardContent>
//           </Card>

//           <Card className="rounded-xl lg:rounded-2xl shadow-lg bg-white/70 backdrop-blur-sm border border-orange-100 hover:scale-105 transition-transform duration-200">
//             <CardContent className="flex flex-col items-center py-4 lg:py-6">
//               <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600 mb-2" />
//               <p className="text-xl lg:text-2xl font-bold">{stats.upcomingExams}</p>
//               <span className="text-xs lg:text-sm text-gray-600 text-center">Upcoming</span>
//             </CardContent>
//           </Card>

//           <Card className="rounded-xl lg:rounded-2xl shadow-lg bg-white/70 backdrop-blur-sm border border-purple-100 hover:scale-105 transition-transform duration-200">
//             <CardContent className="flex flex-col items-center py-4 lg:py-6">
//               <Trophy className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600 mb-2" />
//               <p className="text-xl lg:text-2xl font-bold">{stats.averageScore}%</p>
//               <span className="text-xs lg:text-sm text-gray-600 text-center">Average</span>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Exams Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
//           {/* Upcoming Exams */}
//           <div className="lg:col-span-2">
//             <Card className="rounded-2xl shadow-xl bg-white/80 backdrop-blur-sm border-0">
//               <CardHeader className="pb-4">
//                 <CardTitle className="text-xl lg:text-2xl font-bold text-gray-800 flex items-center">
//                   <Calendar className="w-6 h-6 mr-3 text-blue-600" />
//                   Upcoming Exams
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {upcomingExams.map((exam) => (
//                     <div
//                       key={exam.id}
//                       className="p-4 lg:p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
//                     >
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
//                         <div>
//                           <h3 className="font-semibold text-lg text-gray-800 mb-1">{exam.name}</h3>
//                           <p className="text-sm text-gray-600">{exam.subject}</p>
//                         </div>
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
//                             exam.status
//                           )} mt-2 sm:mt-0`}
//                         >
//                           {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
//                         </span>
//                       </div>
//                       <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                         <div className="flex items-center">
//                           <Calendar className="w-4 h-4 mr-1" />
//                           {new Date(exam.date).toLocaleDateString()}
//                         </div>
//                         <div className="flex items-center">
//                           <Clock className="w-4 h-4 mr-1" />
//                           {exam.time}
//                         </div>
//                         <div className="flex items-center">
//                           <Target className="w-4 h-4 mr-1" />
//                           {exam.duration}
//                         </div>
//                       </div>
//                       <div className="mt-4">
//                         <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg w-full sm:w-auto">
//                           <Play className="w-4 h-4 mr-2" />
//                           Start Exam
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Completed Exams */}
//           <div>
//             <Card className="rounded-2xl shadow-xl bg-white/80 backdrop-blur-sm border-0">
//               <CardHeader className="pb-4">
//                 <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
//                   <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
//                   Completed Exams
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {completedExams.map((exam) => (
//                     <div
//                       key={exam.id}
//                       className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 hover:shadow-md transition-all duration-200"
//                     >
//                       <div className="flex justify-between items-start mb-3">
//                         <div className="flex-1">
//                           <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">{exam.name}</h3>
//                           <p className="text-xs text-gray-600 mb-2">{exam.subject}</p>
//                           <span className="text-xs text-gray-500">{new Date(exam.date).toLocaleDateString()}</span>
//                         </div>
//                         <div className="text-right ml-4">
//                           <div
//                             className={`px-2 py-1 rounded-lg text-xs font-bold mb-1 ${getScoreColor(
//                               exam.score,
//                               exam.maxScore
//                             )}`}
//                           >
//                             {exam.score}/{exam.maxScore}
//                           </div>
//                           <div className="text-xs font-medium text-gray-700">Grade: {exam.grade}</div>
//                         </div>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div
//                           className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
//                           style={{ width: `${(exam.score / exam.maxScore) * 100}%` }}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;
import React, { useEffect, useState } from "react";
import {
  Menu,
  BookOpen,
  CheckCircle,
  Clock,
  Trophy,
  Calendar,
  Play,
  Target,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useExamStore, type Exam } from "@/store/examStore";
import pb from "@/services/pocketbase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { Question } from "@/store/questionStore";

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const { fetchAndCategorizeExams } = useExamStore();

  const [upcomingExams, setUpcomingExams] = useState([]);
  const [completedExams, setCompletedExams] = useState([]);
  const [missedExams, setMissedExams] = useState([]);
  const [examAttempts, setExamAttempts] = useState([]);
  const [stats, setStats] = useState({
    totalExams: 0,
    completedExams: 0,
    upcomingExams: 0,
    averageScore: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();




  useEffect(() => {
    const loadExams = async () => {
      try {
        console.log("heloo");

        setLoading(true);

        // Get categorized exams
        const { upcomingExams, completedExams, missedExams } =
          await fetchAndCategorizeExams();
        console.log("HERE", completedExams);

        // Fetch exam attempts to get scores
        const attempts = await pb.collection("exam_attempts").getFullList({
          filter: `studentId="${user?.id}"`,
          expand: "examId",
        });

        setUpcomingExams(upcomingExams);
        setCompletedExams(completedExams);
        setMissedExams(missedExams);
        setExamAttempts(attempts);

        // Calculate stats
        const total =
          upcomingExams.length + completedExams.length + missedExams.length;
        const completedAttempts = attempts.filter((attempt) =>
          attempt.status.includes("completed")
        );

        // Calculate average score from completed attempts
        let averageScore = 0;
        if (completedAttempts.length > 0) {
          const totalScore = completedAttempts.reduce(
            (sum, attempt) => sum + (attempt.score || 0),
            0
          );
          const totalPossible = completedAttempts.length * 100; // Assuming max score is 100
          averageScore = parseFloat(
            (totalScore / completedAttempts.length).toFixed(1)
          );
        }

        setStats({
          totalExams: total,
          completedExams: completedAttempts.length,
          upcomingExams: upcomingExams.length,
          averageScore: averageScore,
        });
      } catch (err) {
        console.error("Failed to load exams:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      loadExams();
    }
  }, [user?.id, fetchAndCategorizeExams]);

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 80) return "text-blue-600 bg-blue-50";
    if (score >= 70) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-600 border border-blue-200";
      case "completed":
        return "bg-green-100 text-green-600 border border-green-200";
      case "missed":
        return "bg-red-100 text-red-600 border border-red-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const getExamAttempt = (examId) => {
    return examAttempts.find((attempt) => attempt.examId === examId);
  };

  if (loading) {
    return (
      <div className="relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  const handleStart = async (examId: string) => {
    const userId = pb.authStore.model?.id;

    // 1. Get active exam_questions
    const examQuestions = await pb.collection("exam_questions").getFullList({
      filter: `examId="${examId}" && isActive=true`,
    });

    if (examQuestions.length === 0) {
      toast.info("Exam is setting, questions are on the way...");
      return;
    }

    // 2. Collect questionIds
    const questionIds = examQuestions.map((eq) => eq.questionId);

    // 3. Fetch questions by their IDs
    const questions = await pb.collection("questions").getFullList<Question>({
      filter: questionIds.map((id) => `id="${id}"`).join(" || "),
    });

    if (questions.length === 0) {
      toast.info("Questions not found for this exam.");
      return;
    }

    if (!userId) {
      alert("Please login first.");
      return;
    }

    try {
      // Check if user already attempted this exam
      const attempt = await pb
        .collection("exam_attempts")
        .getFirstListItem(`examId="${examId}" && studentId="${userId}"`, {
          requestKey: null,
        });

      if (attempt && attempt.status.includes("completed")) {
        toast.dark("You have already completed this exam. Retake not allowed.");
        return;
      }
    } catch (err) {
      // No record found → continue
    }

    // Allow exam
    navigate(`/student/dashboard/allExams/${examId}`);
  };
  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-40 right-20 w-48 h-48 bg-purple-300/15 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-80 h-80 bg-indigo-300/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-40 right-10 w-56 h-56 bg-pink-300/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl lg:text-4xl font-bold mb-2">
                Hello, {user?.name || "Student"} 👋
              </h1>
              <p className="text-blue-100 text-sm lg:text-base">
                Ready to ace your next exam? Let's see what's coming up!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center text-xl lg:text-2xl font-bold">
                {user?.name?.charAt(0) || "S"}
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm text-blue-100">Current Average</p>
                <p className="text-2xl font-bold">{stats.averageScore}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          <Card className="rounded-xl lg:rounded-2xl shadow-lg bg-white/70 backdrop-blur-sm border border-blue-100 hover:scale-105 transition-transform duration-200">
            <CardContent className="flex flex-col items-center py-4 lg:py-6">
              <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 mb-2" />
              <p className="text-xl lg:text-2xl font-bold">
                {stats.totalExams}
              </p>
              <span className="text-xs lg:text-sm text-gray-600 text-center">
                Total Exams
              </span>
            </CardContent>
          </Card>

          <Card className="rounded-xl lg:rounded-2xl shadow-lg bg-white/70 backdrop-blur-sm border border-green-100 hover:scale-105 transition-transform duration-200">
            <CardContent className="flex flex-col items-center py-4 lg:py-6">
              <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-green-600 mb-2" />
              <p className="text-xl lg:text-2xl font-bold">
                {stats.completedExams}
              </p>
              <span className="text-xs lg:text-sm text-gray-600 text-center">
                Completed
              </span>
            </CardContent>
          </Card>

          <Card className="rounded-xl lg:rounded-2xl shadow-lg bg-white/70 backdrop-blur-sm border border-orange-100 hover:scale-105 transition-transform duration-200">
            <CardContent className="flex flex-col items-center py-4 lg:py-6">
              <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600 mb-2" />
              <p className="text-xl lg:text-2xl font-bold">
                {stats.upcomingExams}
              </p>
              <span className="text-xs lg:text-sm text-gray-600 text-center">
                Upcoming
              </span>
            </CardContent>
          </Card>

          <Card className="rounded-xl lg:rounded-2xl shadow-lg bg-white/70 backdrop-blur-sm border border-purple-100 hover:scale-105 transition-transform duration-200">
            <CardContent className="flex flex-col items-center py-4 lg:py-6">
              <Trophy className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600 mb-2" />
              <p className="text-xl lg:text-2xl font-bold">
                {stats.averageScore}%
              </p>
              <span className="text-xs lg:text-sm text-gray-600 text-center">
                Average
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Exams Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Upcoming Exams */}
          <div className="lg:col-span-2">
            <Card className="rounded-2xl shadow-xl bg-white/80 backdrop-blur-sm border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl lg:text-2xl font-bold text-gray-800 flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                  Upcoming Exams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingExams.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No upcoming exams scheduled</p>
                    </div>
                  ) : (
                    upcomingExams.map((exam) => {
                      console.log(exam);

                      const { date, time } = formatDateTime(exam.startTime);
                      return (
                        <div
                          key={exam.id}
                          className="p-4 lg:p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-800 mb-1">
                                {exam.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {exam.subject}
                              </p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600 border border-blue-200 mt-2 sm:mt-0">
                              Upcoming
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {time}
                            </div>
                            <div className="flex items-center">
                              <Target className="w-4 h-4 mr-1" />
                              {exam.duration} mins
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button
                              size="sm" 
                              onClick={()=>handleStart(exam.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg w-full sm:w-auto"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Start Exam
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Completed Exams */}
          <div>
            <Card className="rounded-2xl shadow-xl bg-white/80 backdrop-blur-sm border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                  Completed Exams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedExams.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No completed exams yet</p>
                    </div>
                  ) : (
                    completedExams.map((exam) => {
                      const attempt = getExamAttempt(exam.id);
                      const { date } = formatDateTime(exam.startTime);
                      const score = attempt?.score || 0;
                      const percentage = score;

                      return (
                        <div
                          key={exam.id}
                          className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">
                                {exam.name}
                              </h3>
                              <p className="text-xs text-gray-600 mb-2">
                                {exam.subject}
                              </p>
                              <span className="text-xs text-gray-500">
                                {date}
                              </span>
                            </div>
                            <div className="text-right ml-4">
                              <div
                                className={`px-2 py-1 rounded-lg text-xs font-bold mb-1 ${getScoreColor(
                                  score
                                )}`}
                              >
                                {score}%
                              </div>
                              <div className="text-xs font-medium text-gray-700">
                                {attempt?.status.includes("completed")
                                  ? "Completed"
                                  : "Pending"}
                              </div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Missed Exams Section (if any) */}
        {missedExams.length > 0 && (
          <div className="mt-8">
            <Card className="rounded-2xl shadow-xl bg-white/80 backdrop-blur-sm border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-red-600" />
                  Missed Exams ({missedExams.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {missedExams.map((exam) => {
                    const { date, time } = formatDateTime(exam.startTime);
                    return (
                      <div
                        key={exam.id}
                        className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-100"
                      >
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {exam.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {exam.subject}
                        </p>
                        <div className="text-xs text-gray-500">
                          {date} at {time}
                        </div>
                        <span className="inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600 border border-red-200">
                          Missed
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;

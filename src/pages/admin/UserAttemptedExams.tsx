// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect } from "react";
// import { useExamResultStore } from "@/store/examResultStore";
// import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
// import { Loader2, Calendar, ArrowLeft, Home } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";

// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { useAuthStore } from "@/store/authStore";



// const UserAttemptedExams:  React.FC = () => {
//   const { individualExams, fetchUserAttemptedExams, isLoading, error } = useExamResultStore();
//   const {user}=useAuthStore()
//   const {studentId}=useParams()
// console.log(studentId);
// const navigate=useNavigate()
//   useEffect(() => {
//     if (studentId) fetchUserAttemptedExams(studentId);

 
    
//   }, [fetchUserAttemptedExams, studentId]);

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-600">
//         <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading exam data...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-red-500 text-center mt-10">
//         Error loading exams: {error}
//       </div>
//     );

 
// //   return (
// //     <div className="p-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
// //      <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
// //   <Button
// //     onClick={() => navigate(-1)}
// //     className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 text-sm md:text-base w-auto"
// //   >
// //     <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> Back
// //   </Button>

// //   <Button
// //     asChild
// //     className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm md:text-base w-auto"
// //   >
// //     <Link
// //       to={
// //         user?.role === "admin"
// //           ? "/admin/dashboard"
// //           : "/faculty/dashboard"
// //       }
// //     >
// //       <Home className="w-4 h-4 md:w-5 md:h-5" /> Dashboard
// //     </Link>
// //   </Button>
// // </div>
// //       <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
// //         Your Attempted Exams
// //       </h2>


// // {individualExams.length === 0 &&

// //   <div className="text-center mt-10 text-gray-500 text-lg">
// //         No attempted exams found.
// //       </div>
// // }
// //       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// //         {individualExams.map((exam: any) => {
// //           const percentage = (exam.score/exam.totalMark)*100
// //           const isPassed=percentage>=50
// //             return(
        
// //           <Card
// //           onClick={()=>navigate(`/admin/dashboard/userExams/${studentId}/answers/${exam.id}`)}
// //             key={exam.id}
// //             className="hover:shadow-lg transition-all duration-300 rounded-2xl border border-gray-200 bg-white"
// //           >
// //             <CardHeader>
// //               <CardTitle className="text-xl font-semibold text-gray-800">
// //                 {exam.name}
// //               </CardTitle>
// //               <p className="text-gray-500 text-sm">{exam.subject}</p>
// //             </CardHeader>
// //             <CardContent className="text-sm space-y-2 text-gray-600">
// //               <div className="flex items-center gap-2">
// //                 <Calendar size={16} /> Started:{" "}
// //                 {new Date(exam.startedAt).toLocaleString()}
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <Calendar size={16} /> Ended:{" "}
// //                 {new Date(exam.endedAt).toLocaleString()}
// //               </div>
// //               <div className="mt-2 text-gray-800 font-medium">
// //                 <span className="text-blue-600">Score:</span> {exam.score}/{exam.totalMark}
// //               </div>
           
// //               <div className="mt-2 text-gray-800 font-medium">
// //                 <span className="text-blue-600">Score:</span> {percentage.toFixed(2)}%
// //               </div>
// //             </CardContent>
// //           </Card>
// //           )}
// //         )}
// //       </div>
// //     </div>
// //   );

// return (
//   <div className="p-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//     {/* Top Buttons */}
//     <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
//       <Button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 text-sm md:text-base w-auto"
//       >
//         <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> Back
//       </Button>

//       <Button
//         asChild
//         className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm md:text-base w-auto"
//       >
//         <Link
//           to={user?.role === "admin" ? "/admin/dashboard" : "/faculty/dashboard"}
//         >
//           <Home className="w-4 h-4 md:w-5 md:h-5" /> Dashboard
//         </Link>
//       </Button>
//     </div>

//     {/* Title */}
//     <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
//       Your Attempted Exams
//     </h2>

//     {/* Empty Message */}
//     {individualExams.length === 0 && (
//       <div className="text-center mt-10 text-gray-500 text-lg">
//         No attempted exams found.
//       </div>
//     )}

//     {/* Exam Cards */}
//     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//       {individualExams.map((exam: any) => {
//         const percentage = (exam.score / exam.totalMark) * 100;
//         const isPassed = percentage <= 50;

//         // ✅ Conditional colors
//         const cardBg = isPassed ? "bg-green-50" : "bg-red-50";
//         const btnColor = isPassed
//           ? "bg-green-600 hover:bg-green-700"
//           : "bg-red-600 hover:bg-red-700";

//         return (
//           <Card
//             key={exam.id}
//             className={`transition-all duration-300 rounded-2xl border border-gray-200 hover:shadow-lg ${cardBg} text-black`}
//           >
//             <CardHeader>
//               <CardTitle className="text-xl font-semibold text-gray-800">
//                 {exam.name}
//               </CardTitle>
//               <p className="text-gray-500 text-sm">{exam.subject}</p>
//             </CardHeader>

//             <CardContent className="text-sm space-y-2 text-gray-700">
//               <div className="flex items-center gap-2">
//                 <Calendar size={16} /> Started:{" "}
//                 {new Date(exam.startedAt).toLocaleString()}
//               </div>
//               <div className="flex items-center gap-2">
//                 <Calendar size={16} /> Ended:{" "}
//                 {new Date(exam.endedAt).toLocaleString()}
//               </div>

//               <div className="mt-2 font-medium">
//                 <span className="text-blue-600">Score:</span>{" "}
//                 {exam.score}/{exam.totalMark}
//               </div>

//               <div className="font-medium">
//                 <span className="text-blue-600">Percentage:</span>{" "}
//                 {percentage.toFixed(2)}%
//               </div>

//               {/* ✅ Review Button */}
//               <div className="pt-3">
//                 <Button
//                   onClick={() =>
//                     navigate(
//                       `/admin/dashboard/userExams/${studentId}/answers/${exam.id}`
//                     )
//                   }
//                   className={`${btnColor} text-white font-medium w-full rounded-lg py-2`}
//                 >
//                   Review
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         );
//       })}
//     </div>
//   </div>
// );

// };

// export default UserAttemptedExams;



/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useExamResultStore } from "@/store/examResultStore";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Loader2, Calendar, ArrowLeft, Home, ArrowUp } from "lucide-react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

const UserAttemptedExams: React.FC = () => {
  const { individualExams, fetchUserAttemptedExams, isLoading, error } = useExamResultStore();
  const { user } = useAuthStore();
  const { studentId } = useParams();
  const navigate = useNavigate();
const location=useLocation()
const {name}=location.state 
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ✅ Fetch exams
  useEffect(() => {
    if (studentId) fetchUserAttemptedExams(studentId);
  }, [fetchUserAttemptedExams, studentId]);

  // ✅ Detect when bottom reached
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 100;
      setShowScrollTop(atBottom);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Scroll to top of div with id="top-section"
  const scrollToTop = () => {
    const topElement = document.getElementById("top-section");
    if (topElement) {
      topElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading exam data...
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        Error loading exams: {error}
      </div>
    );

  return (
    <div id="top-section" className="p-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative">
      {/* Top Buttons */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
        <Button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 text-sm md:text-base w-auto"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> Back
        </Button>

        <Button
          asChild
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm md:text-base w-auto"
        >
          <Link
            to={user?.role === "admin" ? "/admin/dashboard" : "/faculty/dashboard"}
          >
            <Home className="w-4 h-4 md:w-5 md:h-5" /> Dashboard
          </Link>
        </Button>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {name} Completed Exams
      </h2>

      {/* Empty Message */}
      {individualExams.length === 0 && (
        <div className="text-center mt-10 text-gray-500 text-lg">
          No attempted exams found.
        </div>
      )}

      {/* Exam Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {individualExams.map((exam: any) => {
          const percentage = (exam.score / exam.totalMark) * 100;
          const isPassed = percentage >= exam.passPercentage;

          const cardBg = isPassed ? "bg-green-50" : "bg-red-50";
          const btnColor = isPassed
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-600 hover:bg-red-700";

          return (
            <Card
              key={exam.id}
              className={`transition-all duration-300 rounded-2xl border border-gray-200 hover:shadow-lg ${cardBg} text-black`}
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {exam.name}
                </CardTitle>
                <p className="text-gray-500 text-sm">{exam.subject}</p>
              </CardHeader>

              <CardContent className="text-sm space-y-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> Started:{" "}
                  {new Date(exam.startedAt).toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> Ended:{" "}
                  {new Date(exam.endedAt).toLocaleString()}
                </div>

                <div className="mt-2 font-medium">
                  <span className="text-blue-600">Score:</span>{" "}
                  {exam.score}/{exam.totalMark}
                </div>

                <div className="font-medium">
                  <span className="text-blue-600">Percentage Scored:</span>{" "}
                  {percentage.toFixed(2)}%
                </div>
                <div className="font-medium">
                  <span className="text-blue-600">Percentage Required:</span>{" "}
                  {exam.passPercentage}%
                </div>

                {/* Review Button */}
                <div className="pt-3">
                  <Button
                    onClick={() =>
                      navigate(
                        `/admin/dashboard/userExams/${studentId}/answers/${exam.id}`
                      )
                    }
                    className={`${btnColor} text-white font-medium w-full rounded-lg py-2`}
                  >
                    Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ✅ Scroll-to-Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default UserAttemptedExams;

// import React, { useEffect } from "react";
// import { useExamStore } from "../../store/examStore";
// import { useAuthStore } from "../../store/authStore";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// export default function FacultyExams() {
//   const { exams, fetchExamsByUser, updateExam, deactivateExam, isLoading } = useExamStore();
//   const { user } = useAuthStore();

//   useEffect(() => {
//     if (user) {
//       fetchExamsByUser(user.id);
//     }
//   }, [user, fetchExamsByUser]);

//   if (isLoading) return <p className="text-center mt-6">Loading exams...</p>;

//   return (
//     <div className="max-w-2xl mx-auto mt-10 space-y-4">
//       {exams.length === 0 && <p className="text-center text-gray-500">No exams found</p>}
//       {exams.map((exam) => (
//         <Card key={exam.id} className="shadow-lg rounded-2xl">
//           <CardContent className="p-5 flex flex-col space-y-3">
//             <h2 className="text-xl font-semibold">{exam.name}</h2>
//             <p className="text-gray-600">📅 {new Date(exam.startTime).toLocaleString()}</p>
//             <div className="flex gap-3">
//               <Button
//                 variant="default"
//                 onClick={() =>
//                   updateExam(exam.id, { name: exam.name + " (Updated)" })
//                 }
//               >
//                 Update
//               </Button>
//               <Button
//                 variant="destructive"
//                 onClick={() => deactivateExam(exam.id)}
//                 disabled={exam.isActive === false}
//               >
//                 {exam.isActive === false ? "Deactivated" : "Deactivate"}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }



// import React, { useEffect } from "react";
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Calendar, Pencil, Power } from "lucide-react";
// import { useExamStore } from "../../store/examStore";
// import { useAuthStore } from "../../store/authStore";
// import { useNavigate } from "react-router-dom";

// export default function FacultyExams() {
//   const { exams, fetchExamsByUser, deactivateExam, isLoading } = useExamStore();
//   const { user } = useAuthStore();
//   const navigate=useNavigate()
//   useEffect(() => {
//     if (user) {
//       fetchExamsByUser(user.id);
//     }
//   }, [user, fetchExamsByUser]);

//   if (isLoading) {
//     return <p className="text-center mt-10 text-gray-600">Loading exams...</p>;
//   }

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6">
//       {/* Background Bubbles / Semi Circles */}
//       <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200 rounded-full opacity-30 blur-2xl" />
//       <div className="absolute bottom-20 right-20 w-52 h-52 bg-blue-300 rounded-full opacity-30 blur-3xl" />

//       <div className="relative max-w-6xl mx-auto">
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
//           Your Exams
//         </h1>

//         {/* Exam Cards Grid */}
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {exams.length === 0 && (
//             <p className="text-center col-span-full text-gray-500">No exams created yet</p>
//           )}

//           {exams.map((exam) => (
//             <Card
//               key={exam.id}
//               className="shadow-md hover:shadow-lg transition rounded-2xl border border-gray-100 bg-white/80 backdrop-blur"
//             >
//               <CardHeader>
//                 <CardTitle className="text-lg font-semibold text-gray-800">
//                   {exam.name}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center text-gray-600">
//                   <Calendar className="w-5 h-5 mr-2 text-blue-600" />
//                   <span>{new Date(exam.startTime).toLocaleString()}</span>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-between gap-3">
//                 <Button
//                   onClick={() => navigate(`/faculty/dashboard/exams/${exam.id}/edit`)}
//                   className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//                 >
//                   <Pencil size={16} />
//                   Update
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => deactivateExam(exam.id)}
//                   className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50 rounded-lg"
//                   disabled={exam.isActive === false}
//                 >
//                   <Power size={16} />
//                   {exam.isActive === false ? "Deactivated" : "Deactivate"}
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect } from "react";
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Calendar, Pencil, Power, Copy } from "lucide-react";
// import { useExamStore } from "../../store/examStore";
// import { useAuthStore } from "../../store/authStore";
// import { useNavigate } from "react-router-dom";

// export default function FacultyExams() {
//   const { exams, fetchExamsByUser, deactivateExam,duplicateExam ,isLoading} = useExamStore();
//   const { user } = useAuthStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       fetchExamsByUser(user.id);
//     }
//   }, [user, fetchExamsByUser]);

//   if (isLoading) {
//     return <p className="text-center mt-10 text-gray-600">Loading exams...</p>;
//   }

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6">
//       {/* Background Bubbles / Semi Circles */}
//       <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200 rounded-full opacity-30 blur-2xl" />
//       <div className="absolute bottom-20 right-20 w-52 h-52 bg-blue-300 rounded-full opacity-30 blur-3xl" />

//       <div className="relative max-w-6xl mx-auto">
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
//           Your Exams
//         </h1>

//         {/* Exam Cards Grid */}
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {exams.length === 0 && (
//             <p className="text-center col-span-full text-gray-500">No exams created yet</p>
//           )}

//           {exams.map((exam) => (
//             <Card
//               key={exam.id}
//               className="shadow-md hover:shadow-lg transition rounded-2xl border border-gray-100 bg-white/80 backdrop-blur"
//             >
//               <CardHeader>
//                 <CardTitle className="text-lg font-semibold text-gray-800">
//                   {exam.name}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center text-gray-600">
//                   <Calendar className="w-5 h-5 mr-2 text-blue-600" />
//                   <span>{new Date(exam.startTime).toLocaleString()}</span>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-between gap-3">
//                 <Button
//                   onClick={() => navigate(`/faculty/dashboard/exams/${exam.id}/edit`)}
//                   className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//                 >
//                   <Pencil size={16} />
              
//                 </Button>

//                 <Button
//                   onClick={() => duplicateExam(exam.id)}
//                   className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
//                 >
//                   <Copy size={16} />
              
//                 </Button>

//                 <Button
//                   variant="outline"
//                   onClick={() => deactivateExam(exam.id)}
//                   className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50 rounded-lg"
//                   disabled={exam.isActive === false}
//                 >
//                   <Power size={16} />
//                   {exam.isActive === false ? "Deactivated" : "Deactivate"}
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Pencil, Power, Copy, PowerOff } from "lucide-react";
import { useExamStore } from "../../store/examStore";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export default function FacultyExams() {
  const { exams, fetchExamsByUser, deactivateExam, duplicateExam, isLoading } =
    useExamStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchExamsByUser(user.id);
    }
  }, [user]);

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-gray-600 animate-pulse">
        Loading exams...
      </p>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6 md:px-12">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-25 blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-300 rounded-full opacity-25 blur-3xl -z-10" />

      <div className="relative max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-14 text-center tracking-tight">
          Your Exams
        </h1>

        {/* Exam Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {exams.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              No exams created yet 🚀
            </p>
          )}

          {exams.map((exam) => (
            <Card
              key={exam.id}
              className="flex flex-col justify-between shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-lg"
            >
              <div>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {exam.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    <span>
                      {new Date(exam.startTime).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </CardContent>
              </div>

              {/* Icon Buttons */}
              <CardFooter className="flex justify-end items-center gap-3 pt-4">
                {/* Edit */}
                <Button
                  size="icon"
                  onClick={() =>
                    navigate(`/faculty/dashboard/exams/${exam.id}/edit`)
                  }
                  className="rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:scale-110 transition"
                >
                  <Pencil size={18} />
                </Button>

                {/* Duplicate */}
                <Button
                  size="icon"
                  onClick={() => duplicateExam(exam.id)}
                  className="rounded-full bg-green-500 text-white hover:bg-green-600 shadow-md hover:scale-110 transition"
                >
                  <Copy size={18} />
                </Button>

                {/* Activate / Deactivate */}
                {/* <Button
                  size="icon"
                  onClick={() => deactivateExam(exam.id)}
                  disabled={exam.isActive === false}
                  className={`rounded-full shadow-md hover:scale-110 transition
                    ${
                      exam.isActive
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  {exam.isActive ? <PowerOff size={18} /> : <Power size={18} />}
                </Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

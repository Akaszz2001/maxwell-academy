// // src/pages/FacultyExams.tsx
// import pb from "@/services/pocketbase";
// import { useExamResultStore } from "@/store/examResultStore";
// import { useEffect, useState } from "react";

// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";



// export default function StudentResults() {
 
//   const facultyId = pb.authStore.model?.id; // faculty logged-in user

// const { facultyExams, fetchFacultyExams, isLoading } = useExamResultStore();
// useEffect(() => {
//   const fetchExams = async () => {
//     try {
//       await fetchFacultyExams(facultyId!);
//     } catch (error: any) {
//       toast.error(error.message || "Something went wrong");
//     }
//   };

//   if (facultyId) {
//     fetchExams();
//   }
// }, [facultyId]);


//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">My Exams</h1>
//       <ul className="space-y-3">
//         {facultyExams.map((exam) => (
//           <li
//             key={exam.id}
//             className="border p-3 rounded hover:bg-gray-100 flex justify-between"
//           >
//             <div>
//               <p className="font-semibold">{exam.name}</p>
//               <p className="text-sm text-gray-500">{exam.subject}</p>
//             </div>
//             <Link
//               to={`/faculty/dashboard/studentResults/${exam.id}/studentList`}
//               className="text-blue-500 underline"
//             >
//               View Details
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// src/pages/FacultyExams.tsx
import pb from "@/services/pocketbase";
import { useExamResultStore } from "@/store/examResultStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button"; // ShadCN Button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // ShadCN Card
import { Typography } from "@mui/material"; // MUI Typography
import { Award } from "lucide-react"; // Result icon

export default function StudentResults() {
  const facultyId = pb.authStore.model?.id; // faculty logged-in user
  const { facultyExams, fetchFacultyExams, isLoading } = useExamResultStore();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        await fetchFacultyExams(facultyId!);
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      }
    };

    if (facultyId) {
      fetchExams();
    }
  }, [facultyId]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Typography variant="h4" className="font-bold mb-6 text-center flex items-center justify-center gap-2">
        <Award className="w-6 h-6 text-blue-600" /> Exam Results
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {facultyExams.map((exam) => (
          <Card key={exam.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{exam.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Typography variant="body2" className="text-gray-500">{exam.subject}</Typography>

              <Button
                asChild
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Link to={`/faculty/dashboard/studentResults/${exam.id}/studentList`}>
                  View Students
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {facultyExams.length === 0 && !isLoading && (
        <Typography variant="body1" className="text-center mt-10 text-gray-500">
          No exams found.
        </Typography>
      )}
    </div>
  );
}

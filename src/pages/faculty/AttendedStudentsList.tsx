// // src/pages/FacultyExamDetails.tsx
// import { useExamResultStore } from "@/store/examResultStore";
// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// // ✅ import store

// interface User {
//   score: number;
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// }



// export default function AttendedStudentsList() {
//   const { examId } = useParams<{ examId: string }>();
//   const { fetchExamParticipants } = useExamResultStore();

//   const [attended, setAttended] = useState<User[]>([]);
//   const [notAttended, setNotAttended] = useState<User[]>([]);

//   useEffect(() => {
//     if (!examId) return;
//     (async () => {
//       try {
//         const { attended, notAttended } = await fetchExamParticipants(examId);
//         console.log("HERE",attended);
        
//         setAttended(attended);
//         setNotAttended(notAttended);
//       } catch (err) {
//         console.error("Failed to fetch participants:", err);
//       }
//     })();

//     console.log("ATTENDED",attended);
    
//   }, [examId, fetchExamParticipants]);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Exam Details</h2>

//       <div className="grid grid-cols-2 gap-6">
//         {/* Attended List */}
//         <div>
//           <h3 className="text-lg font-semibold mb-2">✅ Attended</h3>
//           <ul className="space-y-2">
//             {attended.map((s) => (
//               <li
//                 key={s.id}
//                 className="p-2 border rounded flex justify-between"
//               >
//                 <span>{s.name}</span>
//                 <Link
//                   to={`/faculty/dashboard/studentResults/${examId}/studentList/${s.id}`}
//                   className="text-blue-500 underline"
//                 >
//                   View Result
//                 </Link>
//                 <span className="text-sm text-gray-600">
//                   Score: {s.score}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Not Attended List */}
//         <div>
//           <h3 className="text-lg font-semibold mb-2">❌ Not Attended</h3>
//           <ul className="space-y-2">
//             {notAttended.map((s) => (
//               <li key={s.id} className="p-2 border rounded">
//                 {s.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/FacultyExamDetails.tsx
// src/pages/FacultyExamDetails.tsx
import { useExamResultStore } from "@/store/examResultStore";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Typography } from "@mui/material";
import { ArrowLeft, Home, User } from "lucide-react";

interface User {
  score: number;
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AttendedStudentsList() {
  const { examId } = useParams<{ examId: string }>();
  const { fetchExamParticipants } = useExamResultStore();
  const navigate = useNavigate();

  const [attended, setAttended] = useState<User[]>([]);
  const [notAttended, setNotAttended] = useState<User[]>([]);

  useEffect(() => {
    if (!examId) return;
    (async () => {
      try {
        const { attended, notAttended } = await fetchExamParticipants(examId);
        setAttended(attended);
        setNotAttended(notAttended);
      } catch (err) {
        console.error("Failed to fetch participants:", err);
      }
    })();
  }, [examId, fetchExamParticipants]);

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </Button>

        <Button
          asChild
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Link to="/faculty/dashboard">
            <Home className="w-5 h-5" /> Dashboard
          </Link>
        </Button>
      </div>

      {/* Heading */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-6">
        <User className="w-8 h-8 text-blue-600" />
        <Typography variant="h4" className="font-extrabold text-gray-800 text-center">
          Exam Participants
        </Typography>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attended Students */}
        <div>
          <Typography variant="h6" className="font-semibold mb-3 text-green-600  pb-1">
            ✅ Attended Students ({attended.length})
          </Typography>

          <div className="space-y-4">
            {attended.map((s) => (
              <Card key={s.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-500" /> {s.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <Typography variant="body2" className="text-gray-600">
                    Score: {s.score}
                  </Typography>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                    <Link to={`/faculty/dashboard/studentResults/${examId}/studentList/${s.id}`}>
                      View Result
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}

            {attended.length === 0 && (
              <Typography variant="body2" className="text-gray-500 text-center">
                No students attended yet.
              </Typography>
            )}
          </div>
        </div>

        {/* Not Attended Students */}
        <div>
          <Typography variant="h6" className="font-semibold mb-3 text-red-600  pb-1">
            ❌ Not Attended Students ({notAttended.length})
          </Typography>

          <div className="space-y-4">
            {notAttended.map((s) => (
              <Card key={s.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <Typography variant="body1">{s.name}</Typography>
                </CardContent>
              </Card>
            ))}

            {notAttended.length === 0 && (
              <Typography variant="body2" className="text-gray-500 text-center">
                All students attended.
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


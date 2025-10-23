// /* eslint-disable @typescript-eslint/no-unused-vars */
// // src/pages/student/ExamReview.tsx
// import React, { useEffect, useState } from "react";
// import { useExamResultStore } from "../../store/examResultStore";
// import { useAuthStore } from "../../store/authStore";
// import { useParams } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Chip,
//   Dialog,
// } from "@mui/material";
// import pb from "@/services/pocketbase";

// const StudentExamResults: React.FC = () => {
//   const { examId,studentId } = useParams();
//   const { answers, fetchExamAnswers } = useExamResultStore();
//   const { user } = useAuthStore();

//   // 🔹 state for modal
//   const [openImage, setOpenImage] = useState<string | null>(null);

//   useEffect(() => {
//  const fetchStudentResults=async()=>{
//   if(examId && studentId){
//     try {
//       console.log(answers);
      
//       fetchExamAnswers(examId,studentId)
//     } catch (error) {
//       console.log(error);
      
//     }
//   }

//  }
 
//   fetchStudentResults()
//   }, [examId,studentId,answers]);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" gutterBottom>
//         Exam Review
//       </Typography>

//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Question</TableCell>
//             <TableCell>Options</TableCell>
//             <TableCell>Correct Answer</TableCell>
//             <TableCell>Your Answer</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {answers.map((ans) => {
//             const q = ans.expand?.questionId;
//             if (!q) return null;

//             const isCorrect =
//               ans.answer?.toLowerCase().trim() ===
//               q.answer?.toLowerCase().trim();

//             return (
//               <TableRow key={ans.id}>
//                 <TableCell>
//                   {q.type === "text" ? (
//                     <Typography>{q.questionText}</Typography>
//                   ) : (
//                     <img
//                       src={q.image ? pb.files.getUrl(q, q.image) : ""}
//                       alt="question"
//                       style={{ width: 120, cursor: "pointer" }}
//                       onClick={() =>
//                         setOpenImage(pb.files.getUrl(q, q.image) || null)
//                       }
//                     />
//                   )}
//                 </TableCell>

//                 <TableCell>
//                   {q.type === "text" ? (
//                     <ul>
//                       <li>{q.optionA}</li>
//                       <li>{q.optionB}</li>
//                       <li>{q.optionC}</li>
//                       <li>{q.optionD}</li>
//                     </ul>
//                   ) : (
//                     "N/A"
//                   )}
//                 </TableCell>

//                 <TableCell>
//                   <Chip label={q.answer} color="success" />
//                 </TableCell>

//                 <TableCell>
//                   {ans.answer ? (
//                     <Chip
//                       label={ans.answer}
//                       color={isCorrect ? "success" : "error"}
//                     />
//                   ) : (
//                     <Chip label="No Answer" color="info" />
//                   )}
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>

//       {/* 🔹 Image Preview Modal */}
//       <Dialog open={!!openImage} onClose={() => setOpenImage(null)} maxWidth="md">
//         {openImage && (
//           <img
//             src={openImage}
//             alt="question preview"
//             style={{ maxWidth: "100%", height: "auto" }}
//           />
//         )}
//       </Dialog>
//     </Box>
//   );
// };

// export default StudentExamResults;









 
// src/pages/student/ExamReview.tsx
import React, { useEffect, useState } from "react";
import { useExamResultStore } from "../../store/examResultStore";
import { useAuthStore } from "../../store/authStore";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Dialog,
} from "@mui/material";
import pb from "@/services/pocketbase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, BookOpen } from "lucide-react";

const StudentExamResults: React.FC = () => {
  const params = useParams();
const examId=params.examId
const studentId=params.studentId
  console.log("EXAM",examId);
  
  const { answers, fetchExamAnswers } = useExamResultStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [openImage, setOpenImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentResults = async () => {
      if (examId && studentId) {
        try {
          fetchExamAnswers(examId, studentId);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchStudentResults();
  }, [examId, studentId,fetchExamAnswers]);

  return (
    <Box sx={{ p: 3, w: "100%" }} className="w-full">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
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
          <Link to={user?.role==='admin'?"/admin/dashboard":"/faculty/dashboard"}>
            <Home className="w-5 h-5" /> Dashboard
          </Link>
        </Button>
      </div>

      {/* Heading */}
      <div className="flex items-center gap-2 mb-6 justify-center">
        <BookOpen className="w-8 h-8 text-blue-600" />
        <Typography variant="h4" className="font-bold text-gray-800">
          Exam Review
        </Typography>
      </div>

      <Table className="w-full">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell>Options</TableCell>
            <TableCell>Correct Answer</TableCell>
            <TableCell>Your Answer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {answers.map((ans) => {
            const q = ans.expand?.questionId;
            if (!q) return null;

            const isCorrect =
              ans.answer?.toLowerCase().trim() ===
              q.answer?.toLowerCase().trim();

            return (
              <TableRow
                key={ans.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <TableCell>
                  {q.type === "text" ? (
                    <Typography>{q.questionText}</Typography>
                  ) : (
                    <img
                      src={q.image ? pb.files.getUrl(q, q.image) : ""}
                      alt="question"
                      style={{ width: 120, cursor: "pointer" }}
                      onClick={() =>
                        setOpenImage(pb.files.getUrl(q, q.image) || null)
                      }
                    />
                  )}
                </TableCell>

                <TableCell>
                  {q.type === "text" ? (
                    <ul className="space-y-1">
                      <li>{q.optionA}</li>
                      <li>{q.optionB}</li>
                      <li>{q.optionC}</li>
                      <li>{q.optionD}</li>
                    </ul>
                  ) : (
                    "N/A"
                  )}
                </TableCell>

                <TableCell>
                  <Chip label={q.answer} color="success" />
                </TableCell>

                <TableCell>
                  {ans.answer ? (
                    <Chip
                      label={ans.answer}
                      color={isCorrect ? "success" : "error"}
                    />
                  ) : (
                    <Chip label="No Answer" color="info" />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* 🔹 Image Preview Modal */}
      <Dialog open={!!openImage} onClose={() => setOpenImage(null)} maxWidth="md">
        {openImage && (
          <img
            src={openImage}
            alt="question preview"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}
      </Dialog>
    </Box>
  );
};

export default StudentExamResults;

// // src/pages/student/ExamReview.tsx
// import React, { useEffect, useState } from "react";
// import { useExamResultStore } from "../../store/examResultStore";
// import { useAuthStore } from "../../store/authStore";
// import { useParams, useNavigate } from "react-router-dom";
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
//   Button,
//   Grid,
// } from "@mui/material";
// import pb from "@/services/pocketbase";

// const ExamReview: React.FC = () => {
//   const { examId } = useParams();
//   const { answers, fetchExamAnswers } = useExamResultStore();
//   const { user } = useAuthStore();
//   const navigate = useNavigate();

//   // 🔹 state for modal
//   const [openImage, setOpenImage] = useState<string | null>(null);

//   useEffect(() => {
//     if (examId && user) {
//       fetchExamAnswers(examId, user.id);
//     }
//   }, [examId, user, fetchExamAnswers]);

//   return (
//     <Box sx={{ p: { xs: 2, sm: 3 }, width: "100%", overflowX: "auto" }}>
//       <Grid
//         container
//         justifyContent="space-between"
//         alignItems="center"
//         sx={{ mb: 3 }}
//       >
//         <Grid item>
//           <Typography variant="h5">Exam Review</Typography>
//         </Grid>
//         <Grid item>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/student/dashboard")}
//           >
//             Back to Dashboard
//           </Button>
//         </Grid>
//       </Grid>

//       <Table
//         sx={{
//           minWidth: 300,
//           "& img": { maxWidth: { xs: 100, sm: 120 }, cursor: "pointer" },
//         }}
//       >
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
//                       onClick={() =>
//                         setOpenImage(pb.files.getUrl(q, q.image) || null)
//                       }
//                     />
//                   )}
//                 </TableCell>

//                 <TableCell>
//                   {q.type === "text" ? (
//                     <ul style={{ paddingLeft: "1rem", margin: 0 }}>
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

// export default ExamReview;





// src/pages/student/ExamReview.tsx
import React, { useEffect, useState } from "react";
import { useExamResultStore } from "../../store/examResultStore";
import { useAuthStore } from "../../store/authStore";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import pb from "@/services/pocketbase";
import { Home, ArrowLeft } from "lucide-react";

const ExamReview: React.FC = () => {
  const { examId } = useParams();
  const { answers, fetchExamAnswers } = useExamResultStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // 🔹 state for modal
  const [openImage, setOpenImage] = useState<string | null>(null);

  useEffect(() => {
    if (examId && user) {
      fetchExamAnswers(examId, user.id);
    }
  }, [examId, user, fetchExamAnswers]);

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        width: "100%",
        bgcolor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      {/* 🔹 Top Row (Back + Dashboard) */}
     <Grid
  container
  justifyContent="space-between"
  alignItems="center"
  sx={{ mb: 2 }}
>
  <Grid  component="div">
    <IconButton
      onClick={() => navigate(-1)}
      sx={{
        bgcolor: "white",
        border: "1px solid #e2e8f0",
        "&:hover": { bgcolor: "#f1f5f9" },
      }}
    >
      <ArrowLeft className="w-5 h-5" />
    </IconButton>
  </Grid>
  <Grid  component="div">
    <Button
      asChild
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
    >
      <Link to={user?.role==='admin' ? "/admin/dashboard":"/student/dashboard"}>
        <Home className="w-5 h-5" /> Dashboard
      </Link>
    </Button>
  </Grid>
</Grid>


      {/* 🔹 Heading + Subtitle */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "primary.main" }}
        >
          📘 Exam Review
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review your answers and compare with the correct ones
        </Typography>
      </Box>

      {/* 🔹 Table Container */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          overflowX: "auto",
          p: { xs: 1, sm: 2 },
        }}
      >
        <Table
          sx={{
            minWidth: 320,
            "& th": { fontWeight: "bold", bgcolor: "#f1f5f9" },
            "& td": { verticalAlign: "top" },
            "& img": {
              maxWidth: { xs: 80, sm: 120 },
              borderRadius: 2,
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": { transform: "scale(1.05)" },
            },
          }}
        >
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
                <TableRow key={ans.id} hover>
                  {/* 🔹 Question */}
                  <TableCell sx={{ maxWidth: 200 }}>
                    {q.type === "text" ? (
                      <Typography>{q.questionText}</Typography>
                    ) : (
                      <img
                        src={q.image ? pb.files.getUrl(q, q.image) : ""}
                        alt="question"
                        onClick={() =>
                          setOpenImage(pb.files.getUrl(q, q.image) || null)
                        }
                      />
                    )}
                  </TableCell>

                  {/* 🔹 Options */}
                  <TableCell>
                    {q.type === "text" ? (
                      <Box component="ul" sx={{ pl: 3, m: 0 }}>
                        <li>{q.optionA}</li>
                        <li>{q.optionB}</li>
                        <li>{q.optionC}</li>
                        <li>{q.optionD}</li>
                      </Box>
                    ) : (
                      <Typography color="text.secondary">N/A</Typography>
                    )}
                  </TableCell>

                  {/* 🔹 Correct Answer */}
                  <TableCell>
                    <Chip
                      label={q.answer}
                      color="success"
                      sx={{ fontWeight: "bold" }}
                    />
                  </TableCell>

                  {/* 🔹 Student Answer */}
                  <TableCell>
                    {ans.answer ? (
                      <Chip
                        label={ans.answer}
                        color={isCorrect ? "success" : "error"}
                        sx={{ fontWeight: "bold" }}
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
      </Paper>

      {/* 🔹 Image Preview Modal */}
      <Dialog
        open={!!openImage}
        onClose={() => setOpenImage(null)}
        maxWidth="md"
      >
        {openImage && (
          <img
            src={openImage}
            alt="question preview"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        )}
      </Dialog>
    </Box>
  );
};

export default ExamReview;

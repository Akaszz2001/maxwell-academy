// src/pages/student/ExamResults.tsx
import React, { useEffect } from "react";
import { useExamResultStore } from "../../store/examResultStore";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { Box, Card, Button,Typography } from "@mui/material"

const ExamResults: React.FC = () => {
  const { attempts, fetchStudentAttempts, isLoading } = useExamResultStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("here",user.id);
    
      fetchStudentAttempts(user.id);
    }
  }, [user]);

  if (isLoading) return <p>Loading...</p>;
console.log("EXAM RESULTS ",attempts);

  // return (
  
  //   <Box sx={{ p: 3 }}>
  //     <Typography variant="h5" gutterBottom>
  //       My Exam Results
  //     </Typography>

  //     {attempts.map((attempt) => (
  //       <Card
  //         key={attempt.id}
  //         sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between",backgroundColor:(attempt.score/attempt.totalMark)*100 >=50 ? "#86efac":"#fca5a5", color:(attempt.score/attempt.totalMark)*100 >=50 ?"black":"" }}
  //       >
  //         <Box >
  //           <Typography variant="h6">
  //             {attempt.expand?.examId?.name}
  //           </Typography>
  //           <Typography variant="body2">
  //             Subject: {attempt.expand?.examId?.subject}
  //           </Typography>
  //           <Typography variant="body1">Score: {attempt.score}</Typography>
  //           <Typography variant="body1">Total Mark: {attempt.totalMark}</Typography>
  //           {(attempt.score/attempt.totalMark)*100 >=50 ?
              
  //             <Typography variant="body1">You are passed</Typography>:<Typography variant="body1">You are failed</Typography>}
  //         </Box>
  //         <Button
  //         sx={{backgroundColor: (attempt.score/attempt.totalMark)*100 >=50 ?"#16a34a":"#dc2626", height:"50px"}}
  //           variant="contained"
  //           onClick={() => navigate(`/student/dashboard/attendedExams/${attempt.examId}`)}
  //         >
  //           Review
  //         </Button>
  //       </Card>
  //     ))}
  //   </Box>
  // );


 return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        My Exam Results
      </Typography>

      {attempts.map((attempt) => {
        const percentage = (attempt.score / attempt.totalMark) * 100;
        const isPassed = percentage >= 50;

        return (
          <Card
            key={attempt.id}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              boxShadow: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: isPassed
                ? "linear-gradient(135deg, #bbf7d0, #86efac)"
                : "linear-gradient(135deg, #fecaca, #fca5a5)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 6,
              },
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {attempt.expand?.examId?.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Subject: {attempt.expand?.examId?.subject}
              </Typography>

              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Score:</strong> {attempt.score} / {attempt.totalMark}
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.5 }}>
                <strong>Percentage:</strong> {percentage.toFixed(2)}%
              </Typography>

              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{
                  mt: 1,
                  color: isPassed ? "success.dark" : "error.dark",
                }}
              >
                {isPassed ? "✅ Pass:You have Passed. Congratulations.." : "❌ Failed:“Don’t give up! Keep Trying. Success will be yours.."}
              </Typography>
            </Box>

            <Button
              sx={{
                px: 3,
                py: 1.2,
                fontWeight: "bold",
                borderRadius: 2,
                backgroundColor: isPassed ? "#16a34a" : "#dc2626",
                "&:hover": {
                  backgroundColor: isPassed ? "#15803d" : "#b91c1c",
                },
              }}
              variant="contained"
              onClick={() =>
                navigate(`/student/dashboard/attendedExams/${attempt.examId}`)
              }
            >
              Review
            </Button>
          </Card>
        );
      })}
    </Box>
  );

};

export default ExamResults;

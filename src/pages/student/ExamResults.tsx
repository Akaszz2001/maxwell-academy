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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        My Exam Results
      </Typography>

      {attempts.map((attempt) => (
        <Card
          key={attempt.id}
          sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between" }}
        >
          <Box>
            <Typography variant="h6">
              {attempt.expand?.examId?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Subject: {attempt.expand?.examId?.subject}
            </Typography>
            <Typography variant="body1">Score: {attempt.score}</Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => navigate(`/student/dashboard/attendedExams/${attempt.examId}`)}
          >
            Review
          </Button>
        </Card>
      ))}
    </Box>
  );
};

export default ExamResults;

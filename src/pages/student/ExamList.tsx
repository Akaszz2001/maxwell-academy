import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExamStore } from "../../store/examStore";
import pb from "../../services/pocketbase";
import type { Question } from "../../store/questionStore";
import { toast } from "react-toastify";


export default function ExamList() {
  const { exams, fetchAllExamsByActive, isLoading, error } = useExamStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllExamsByActive();
  }, [fetchAllExamsByActive]);

  // const handleStart = async (examId: string) => {
  //   const userId = pb.authStore.model?.id;
  //   const questions = await pb.collection("questions").getFullList<Question>({
  //       filter: `examId="${examId}"`,
  //     });

     
  // if(questions.length==0){
  //   console.log("hello");
  //   toast.info("Exam is setting questions are on the way...")
  //    return
  //     }
  //   if (!userId) {
  //     alert("Please login first.");
  //     return;
  //   }

  //   try {
  //     // Check if user already attempted this exam
  //     const attempt = await pb.collection("exam_attempts").getFirstListItem(
  //       `examId="${examId}" && studentId="${userId}"`,
  //       { requestKey: null } // prevent cache
  //     );

  //     console.log("ExamList",attempt.status);
      

  //     if (attempt && attempt.status.includes("completed")) {
  //       toast.dark("You have already completed this exam. Retake not allowed.");
      
  //       return;
  //     }
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (err) {
  //     // If no record, it's fine → continue
  //   }

  //   // If not attempted → allow exam
  //   navigate(`/student/dashboard/allExams/${examId}`);
  // };

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
    const attempt = await pb.collection("exam_attempts").getFirstListItem(
      `examId="${examId}" && studentId="${userId}"`,
      { requestKey: null }
    );

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

  if (isLoading) return <div className="p-6">Loading exams...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Exams</h1>

      {exams.length === 0 ? (
        <p>No exams available right now.</p>
      ) : (
        <div className="space-y-4">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="flex justify-between items-center p-4 border rounded-lg shadow"
            >
              <div>
                <h2 className="text-lg font-semibold">{exam.name}</h2>
                <p className="text-sm text-gray-600">{exam.subject}</p>
                <p className="text-sm text-gray-500">
                  Duration: {exam.duration} mins
                </p>
              </div>
              <button
                onClick={() => handleStart(exam.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Start Exam
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

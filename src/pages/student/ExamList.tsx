/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useEffect } from "react";
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
  <div className="p-6 bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-extrabold mb-10 text-gray-800 text-center">
      🎓 Available Exams
    </h1>

    {exams.length === 0 ? (
      <p className="text-center text-gray-500 text-lg">No exams available right now.</p>
    ) : (
      <div className="space-y-6 max-w-4xl mx-auto">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 p-6 border border-gray-200 rounded-3xl shadow-md bg-white hover:shadow-xl transition-all duration-300"
          >
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900">{exam.name}</h2>
              <p className="text-sm text-gray-600 mt-1">{exam.subject}</p>
              <div className="flex flex-wrap gap-3 mt-4 text-sm">
                <span className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full font-semibold flex items-center gap-1">
                  ⏱ Duration: {exam.duration} mins
                </span>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-800 rounded-full font-semibold flex items-center gap-1">
                  📝 Questions: {exam.activeQuestionCount}
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-800 rounded-full font-semibold flex items-center gap-1">
                  🏅 Total Marks: {exam.activeQuestionCount * exam.mark}
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-900 rounded-full font-semibold flex items-center gap-1">
                  🎯 Pass: {exam.passPercentage}%
                </span>
              </div>
            </div>

            <button
              onClick={() => handleStart(exam.id)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-transform hover:scale-105"
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

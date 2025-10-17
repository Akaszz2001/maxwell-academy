import React, { useEffect } from "react";
import { useExamResultStore } from "@/store/examResultStore";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Loader2, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";



const UserAttemptedExams:  React.FC = () => {
  const { individualExams, fetchUserAttemptedExams, isLoading, error } = useExamResultStore();
  const {studentId}=useParams()
console.log(studentId);
const navigate=useNavigate()
  useEffect(() => {
    if (studentId) fetchUserAttemptedExams(studentId);
  }, [studentId]);

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

  if (individualExams.length === 0)
    return (
      <div className="text-center mt-10 text-gray-500 text-lg">
        No attempted exams found.
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Your Attempted Exams
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {individualExams.map((exam: any) => (
          
          <Card
          onClick={()=>navigate(`/admin/dashboard/userExams/:${studentId}/answers/:${exam.id}`)}
            key={exam.id}
            className="hover:shadow-lg transition-all duration-300 rounded-2xl border border-gray-200 bg-white"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                {exam.name}
              </CardTitle>
              <p className="text-gray-500 text-sm">{exam.subject}</p>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} /> Started:{" "}
                {new Date(exam.startedAt).toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} /> Ended:{" "}
                {new Date(exam.endedAt).toLocaleString()}
              </div>
              <div className="mt-2 text-gray-800 font-medium">
                <span className="text-blue-600">Score:</span> {exam.score}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserAttemptedExams;

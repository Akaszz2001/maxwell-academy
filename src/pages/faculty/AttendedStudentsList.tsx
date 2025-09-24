// src/pages/FacultyExamDetails.tsx
import { useExamResultStore } from "@/store/examResultStore";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// ✅ import store

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

  const [attended, setAttended] = useState<User[]>([]);
  const [notAttended, setNotAttended] = useState<User[]>([]);

  useEffect(() => {
    if (!examId) return;
    (async () => {
      try {
        const { attended, notAttended } = await fetchExamParticipants(examId);
        console.log("HERE",attended);
        
        setAttended(attended);
        setNotAttended(notAttended);
      } catch (err) {
        console.error("Failed to fetch participants:", err);
      }
    })();

    console.log("ATTENDED",attended);
    
  }, [examId, fetchExamParticipants]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Exam Details</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Attended List */}
        <div>
          <h3 className="text-lg font-semibold mb-2">✅ Attended</h3>
          <ul className="space-y-2">
            {attended.map((s) => (
              <li
                key={s.id}
                className="p-2 border rounded flex justify-between"
              >
                <span>{s.name}</span>
                <Link
                  to={`/faculty/dashboard/studentResults/${examId}/studentList/${s.id}`}
                  className="text-blue-500 underline"
                >
                  View Result
                </Link>
                <span className="text-sm text-gray-600">
                  Score: {s.score}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not Attended List */}
        <div>
          <h3 className="text-lg font-semibold mb-2">❌ Not Attended</h3>
          <ul className="space-y-2">
            {notAttended.map((s) => (
              <li key={s.id} className="p-2 border rounded">
                {s.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

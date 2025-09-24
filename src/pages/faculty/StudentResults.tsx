// src/pages/FacultyExams.tsx
import pb from "@/services/pocketbase";
import { useExamResultStore } from "@/store/examResultStore";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";



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
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Exams</h1>
      <ul className="space-y-3">
        {facultyExams.map((exam) => (
          <li
            key={exam.id}
            className="border p-3 rounded hover:bg-gray-100 flex justify-between"
          >
            <div>
              <p className="font-semibold">{exam.name}</p>
              <p className="text-sm text-gray-500">{exam.subject}</p>
            </div>
            <Link
              to={`/faculty/dashboard/studentResults/${exam.id}/studentList`}
              className="text-blue-500 underline"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Pencil, Power, Copy, PowerOff } from "lucide-react";
import { useExamStore } from "../../store/examStore";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export default function AllExams() {
  const { exams, fetchAllExams, deactivateExam,activateExam, duplicateExam, isLoading } =
    useExamStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchAllExams();
    }
  }, [user]);

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-gray-600 animate-pulse">
        Loading exams...
      </p>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6 md:px-12">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-25 blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-300 rounded-full opacity-25 blur-3xl -z-10" />

      <div className="relative max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-14 text-center tracking-tight">
          Your Exams
        </h1>

        {/* Exam Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {exams.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              No exams created yet 🚀
            </p>
          )}

          {exams.map((exam) => (
            <Card
              key={exam.id}
              className="flex flex-col justify-between shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-lg"
            >
              <div>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-900">
                    {exam.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    <span>
                      {new Date(exam.startTime).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                  
                </CardContent>
            <CardContent>
  <div className="flex items-center text-lg mt-4">
    {/* Dot */}
    <span
      className={`w-3 h-3 rounded-full mr-2 ${
        exam.isActive ? "bg-green-500" : "bg-red-500"
      }`}
    ></span>

    {/* Text */}
    <span className={exam.isActive ? "text-green-600" : "text-red-600"}>
      {exam.isActive ? "Active" : "Deactivated"}
    </span>
  </div>
</CardContent>

              </div>

              {/* Icon Buttons */}
              <CardFooter className="flex justify-end items-center gap-3 pt-4">
                {/* Edit */}
                <Button
                  size="icon"
                  title="Edit exam"
                  onClick={() =>
                    navigate(`/faculty/dashboard/exams/${exam.id}/edit`)
                  }
                  className="rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:scale-110 transition"
                >
                  <Pencil size={18} />
                </Button>

                {/* Duplicate */}
                <Button
                  size="icon"
                  title="Duplicate Exam"
                  onClick={() => duplicateExam(exam.id)}
                  className="rounded-full bg-yellow-500 text-white hover:bg-yellow-600  shadow-md hover:scale-110 transition"
                >
                  <Copy size={18} />
                </Button>

                {/* Activate / Deactivate */}
 <div className="flex gap-2">
  {/* Deactivate Button */}
  {exam.isActive && (
<Button
  size="icon"

  onClick={() => {
    if (exam.isActive) {
      deactivateExam(exam.id);
    } else {
      activateExam(exam.id); // make sure activateExam exists
    }
  }}
  className={`rounded-full shadow-md hover:scale-110 transition
    ${exam.isActive
      ? "bg-red-500 text-white hover:bg-red-600"
      : "bg-green-500 text-white hover:bg-green-600"
    }`}
>
  <PowerOff size={18} />
</Button>


  )}

  {/* Activate Button */}
  {!exam.isActive && (
    <Button
      size="icon"
      onClick={() => activateExam(exam.id)}
      className={`rounded-full shadow-md hover:scale-110 transition
        ${!exam.isActive
          ? "bg-green-500 text-white hover:bg-green-600"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
    >
      <Power size={18} />
    </Button>
  )}
</div>

              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

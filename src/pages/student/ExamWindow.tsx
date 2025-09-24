/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import { useExamSessionStore } from "../../store/examSessionStore";
import pb from "../../services/pocketbase";
import { useNavigationBlocker } from "../../services/useNavigationBlocker";
import { toast } from "react-toastify";

// ---------------------- TYPES ----------------------
type Question = {
  id: string;
  type: "image" | "text";
  questionText?: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;  
  image?: string;
};
type ExamAttempt = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  examId: string;
  studentId: string;
  status: string[];   // array of statuses
  startedAt: string;
  endedAt: string;
  score: number;
};

type Exam = {
  id: string;
  name: string;
  subject: string;
  duration: number;
};

// ---------------------- COMPONENT ----------------------
export default function ExamWindow() {
  const { examId } = useParams<{ examId: string }>();
  const { answers, saveAnswer, finishExam, setExam } = useExamSessionStore();

  const [exam, setExamData] = useState<Exam | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const userId = pb.authStore.model?.id;
const navigate=useNavigate()


useEffect(() => {
  const handlePageShow = async (e: PageTransitionEvent) => {
    if (examId && userId) {
      try {
        const attempt = await pb
          .collection("exam_attempts")
          .getFirstListItem(
            `examId="${examId}" && studentId="${userId}"`,
            { $autoCancel: false } // prevent auto cancel
          );

        console.log("Attempt:", attempt);

        if (attempt.status.includes("completed")) {
          navigate("/student/dashboard/", { replace: true });
        }
      } catch (err) {
      console.log(err)
      
      }
    }
  };

  window.addEventListener("pageshow", handlePageShow);
  return () => window.removeEventListener("pageshow", handlePageShow);
}, [examId, userId, navigate]);

  // Fetch exam + questions
  useEffect(() => {
    const fetchExamData = async () => {
    
      console.log("EXXAM WINDOW",userId);
      
      // 1️⃣ check if student already finished this exam
      try {
        const existing = await pb
          .collection("exam_attempts")
          .getFirstListItem(`examId="${examId}" && studentId="${userId}"`);
     
        setAttempt(existing as ExamAttempt)
    
        console.log(existing);
       if (existing.status.includes("completed")) {
          toast.dark("You have already completed this exam. Retake not allowed.");
          navigate("/student/dashboard/"); // 👈 redirect
          return;
        }
      } catch {
        // no previous attempt → continue normally
      }
  
      // 2️⃣ load exam + questions
      const exam = await pb.collection("exams").getOne<Exam>(examId!);
       const examQuestions = await pb.collection("exam_questions").getFullList({
          filter: `examId="${examId}" && isActive=true`,
        });
       const questionIds = examQuestions.map((eq) => eq.questionId);

      const questions = await pb.collection("questions").getFullList<Question>({
    filter: questionIds.map((id) => `id="${id}"`).join(" || "),
  });

   
    

  
      setExamData(exam);
      setQuestions(questions);
      setTimeLeft(exam.duration * 60);
  
      setExam(exam.id, exam.duration, exam.name);
    };
  
    fetchExamData();
  }, [examId]);
  





useNavigationBlocker(() => {
  const confirmLeave = window.confirm(
    "Are you sure you want to leave? Your exam will be submitted."
  );
  if (confirmLeave) {
    handleFinish(); // ✅ submit exam before leaving
    return true; // allow navigation
  }
  return false; // block navigation
});

 useEffect(() => {
    const handlePopState = async (event: PopStateEvent) => {
      event.preventDefault();

      const confirmLeave = window.confirm(
        "Are you sure you want to leave? Your exam will be submitted."
      );

      if (confirmLeave && examId) {
        await finishExam(examId); // ✅ submit exam
        navigate("/student/dashboard/", { replace: true });
      } else {
        // stay on page
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    // Push state so that back button triggers popstate
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [examId, finishExam, navigate]);
// Auto fullscreen


// Disable inspect + right click
// useEffect(() => {
//   const handleContextMenu = (e: MouseEvent) => e.preventDefault();
//   const handleKeyDown = (e: KeyboardEvent) => {
//     if (
//       e.key === "F12" ||
//       (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
//       (e.ctrlKey && e.key === "U")
//     ) {
//       e.preventDefault();
//       e.stopPropagation();
//     }
//   };

//   document.addEventListener("contextmenu", handleContextMenu);
//   document.addEventListener("keydown", handleKeyDown);

//   return () => {
//     document.removeEventListener("contextmenu", handleContextMenu);
//     document.removeEventListener("keydown", handleKeyDown);
//   };
// }, []);


  const getFileUrl = (collection: string, recordId: string, fileName: string) => {
    return `${pb.baseUrl}/api/files/${collection}/${recordId}/${fileName}`;
  };
// Auto fullscreen on load
useEffect(() => {
  const handleFullscreenChange = async () => {
    if (!document.fullscreenElement) {
      try {
        const examSts = await pb
          .collection("exam_attempts")
          .getFirstListItem(`examId="${examId}" && studentId="${userId}"`);

        console.log("EXAM STATUS", examSts?.status);

        if (examSts?.status.includes("in_progress")) {
          // ⚠️ This will still throw if no prior user gesture triggered fullscreen
          await document.documentElement.requestFullscreen().catch(() => {
            console.warn("Fullscreen re-entry blocked by browser");
          });
        }
      } catch (err) {
        console.error("Error checking exam status:", err);
      }
    }
  };

  document.addEventListener("fullscreenchange", handleFullscreenChange);
  return () => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
  };
}, [examId]);


  
  // Timer + auto finish
  useEffect(() => {
    if (!exam) return;

    const savedTime = localStorage.getItem(`exam_${exam.id}_time`);
    if (savedTime) setTimeLeft(parseInt(savedTime));

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinish();
          return 0;
        }
        localStorage.setItem(`exam_${exam.id}_time`, (prev - 1).toString());
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [exam]);

  // Save offline answers
  useEffect(() => {
    if (exam) {
      localStorage.setItem(`exam_${exam.id}_answers`, JSON.stringify(answers));
    }
  }, [answers, exam]);

  const q = questions[current];
  const selected = answers[q?.id] || "";

  const handleFinish = () => {
    if (!exam) return;
    finishExam(exam.id).then(() => {
      localStorage.removeItem(`exam_${exam.id}_answers`);
      localStorage.removeItem(`exam_${exam.id}_time`);
      alert("Exam submitted successfully!");
      navigate("/student/dashboard/")
    });
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  if (!exam) return <p>Loading exam...</p>;

  return (
    
//     <div className="flex h-screen">
//       {/* Left Sidebar - Question Navigator */}
//       <div className="w-1/5 p-4 border-r overflow-y-auto">
//         <h2 className="text-lg font-bold mb-4">Questions</h2>
//         <div className="grid grid-cols-4 gap-2">
//           {questions.map((q, idx) => (
//             <button
//               key={q.id}
//               onClick={() => setCurrent(idx)}
//               className={`p-2 rounded text-sm ${
//                 idx === current
//                   ? "bg-blue-500 text-white"
//                   : answers[q.id]
//                   ? "bg-green-400 text-white"
//                   : "bg-gray-200"
//               }`}
//             >
//               {idx + 1}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex-1 p-6 flex flex-col">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-xl font-bold">{exam.name}</h1>
//           <span className="text-lg font-mono bg-black text-white px-4 py-1 rounded">
//             {formatTime(timeLeft)}
//           </span>
//         </div>

//         <div className="flex-1">
//         {q?.type === "image" ? (
//   <img
//     src={getFileUrl("questions", q.id, q.image!)} 
//     alt="Question"
//     className="max-w-md mx-auto mb-4"
//   />
// ) : (
//   <p className="text-lg mb-4">{q?.questionText}</p>
// )}


//           <div className="space-y-2">
//             {["A", "B", "C", "D"].map((opt) => (
//               <label key={opt} className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   name={q.id}
//                   value={opt.toLowerCase()}
//                   checked={selected === opt.toLowerCase()}
//                   onChange={() => saveAnswer(q.id, opt.toLowerCase())}
//                 />
//                 <span>{q[`option${opt}` as keyof Question]}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="mt-6 flex justify-between">
//           <button
//             disabled={current === 0}
//             onClick={() => setCurrent((prev) => prev - 1)}
//             className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             disabled={current === questions.length - 1}
//             onClick={() => setCurrent((prev) => prev + 1)}
//             className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//           <button
//             onClick={handleFinish}
//             className="px-6 py-2 bg-red-500 text-white rounded"
//           >
//             Finish Exam
//           </button>
//         </div>
//       </div>
//     </div>

<div className="flex flex-col md:flex-row h-screen">
  {/* Left Sidebar - Question Navigator */}
  <div className="w-full md:w-1/5 p-4 border-b md:border-b-0 md:border-r overflow-y-auto">
    <h2 className="text-lg font-bold mb-4 text-center md:text-left">
      Questions
    </h2>
    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-4 gap-2">
      {questions.map((q, idx) => (
        <button
          key={q.id}
          onClick={() => setCurrent(idx)}
          className={`p-2 rounded text-sm transition ${
            idx === current
              ? "bg-blue-500 text-white shadow"
              : answers[q.id]
              ? "bg-green-400 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  </div>

  {/* Right Section */}
  <div className="flex-1 p-4 sm:p-6 flex flex-col">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
      <h1 className="text-lg sm:text-xl font-bold text-center sm:text-left">
        {exam.name}
      </h1>
      <span className="text-base sm:text-lg font-mono bg-black text-white px-3 sm:px-4 py-1 rounded">
        {formatTime(timeLeft)}
      </span>
    </div>

    <div className="flex-1">
      {q?.type === "image" ? (
        <img
          src={getFileUrl("questions", q.id, q.image!)}
          alt="Question"
          className="w-full max-w-md mx-auto mb-4 rounded-lg shadow"
        />
      ) : (
        <p className="text-base sm:text-lg mb-4 text-center sm:text-left">
          {q?.questionText}
        </p>
      )}
<div className="space-y-2">
  {["A", "B", "C", "D"].map((opt) => (
    <label
      key={opt}
      className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100 cursor-pointer"
    >
      <input
        type="radio"
        name={q.id}
        value={opt.toLowerCase()}
        checked={selected === opt.toLowerCase()}
        onChange={() => saveAnswer(q.id, opt.toLowerCase())}
        className="accent-blue-500"
      />
      {q?.type === "image" ? (
        <span className="font-bold">{opt}</span>
      ) : null}
      <span>{q[`option${opt}` as keyof Question]}</span>
    </label>
  ))}
</div>

    </div>

    <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3">
      <button
        disabled={current === 0}
        onClick={() => setCurrent((prev) => prev - 1)}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 transition"
      >
        Previous
      </button>
      <button
        disabled={current === questions.length - 1}
        onClick={() => setCurrent((prev) => prev + 1)}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 transition"
      >
        Next
      </button>
      <button
        onClick={handleFinish}
        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Finish Exam
      </button>
    </div>
  </div>
</div>

  );
}

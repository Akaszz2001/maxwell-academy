 
/* eslint-disable @typescript-eslint/no-explicit-any */
// // src/store/examResultStore.ts
// import { create } from "zustand";
// import pb from "../services/pocketbase";

// interface ExamAttempt {
//   id: string;
//   examId: string;
//   studentId: string;
//   startedAt: string;
//   endedAt: string;
//   score: number;
//   status: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   expand?: { examId: any };
// }

// interface ExamAnswer {
//   id: string;
//   examId: string;
//   studentId: string;
//   questionId: string;
//   answer: string;
//   submittedAt: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   expand?: { questionId: any };
// }

// interface ExamResultState {
//   attempts: ExamAttempt[];
//   answers: ExamAnswer[];
//   isLoading: boolean;
//   error: string | null;

//   fetchStudentAttempts: (studentId: string) => Promise<void>;
//   fetchExamAnswers: (examId: string, studentId: string) => Promise<void>;
// }

// export const useExamResultStore = create<ExamResultState>((set) => ({
//   attempts: [],
//   answers: [],
//   isLoading: false,
//   error: null,

//   fetchStudentAttempts: async (studentId) => {
//     console.log("ID",studentId);
    
//     try {
//       set({ isLoading: true, error: null });
//    const result = await pb.collection("exam_attempts").getFullList({
//   filter: `studentId="${studentId}" && status~"completed"`,
//   expand: "examId",
//   sort: "-endedAt",
// });

//       console.log("EXAM RESULT STORE FETCH STUDENT ATTEMPST",result);
      
//       set({ attempts: result as unknown as ExamAttempt[], isLoading: false });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//     }
//   },

//   fetchExamAnswers: async (examId, studentId) => {
//     try {
//       set({ isLoading: true, error: null });
//       const result = await pb.collection("exam_answers").getFullList({
//         filter: `examId="${examId}" && studentId="${studentId}"`,
//         expand: "questionId",
//       });
//       console.log("FETCH EXAM ANSWERS",result);
      
//       set({ answers: result as unknown as ExamAnswer[], isLoading: false });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//     }
//   },
// }));


// src/store/examResultStore.ts
import { create } from "zustand";
import pb from "../services/pocketbase";

interface Exam {
  id: string;
  name: string;
  subject: string;
  startTime: string;
  duration: number;
  createdBy: string;
  isActive: boolean;
}

interface ExamAttempt {
  id: string;
  examId: string;
  studentId: string;
  startedAt: string;
  endedAt: string;
  score: number;
  status: string;
  expand?: { examId: any; studentId: any };
    totalMark: number;
}

interface ExamAnswer {
  id: string;
  examId: string;
  studentId: string;
  questionId: string;
  answer: string;
  submittedAt: string;
  expand?: { questionId: any };
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  score:number
}

interface ExamResultState {
  attempts: ExamAttempt[];
  individualExams:ExamAttempt[]
  answers: ExamAnswer[];
  facultyExams: Exam[];
  students: User[];
  isLoading: boolean;
  error: string | null;

  fetchStudentAttempts: (studentId: string) => Promise<void>;
  fetchExamAnswers: (examId: string, studentId: string) => Promise<void>;
  fetchFacultyExams: (facultyId: string) => Promise<void>;
  fetchExamParticipants: (examId: string) => Promise<{ attended: User[]; notAttended: User[] }>;
  fetchUserAttemptedExams:(userId:string)=>Promise<void>
}

export const useExamResultStore = create<ExamResultState>((set) => ({
  attempts: [],
  answers: [],
  facultyExams: [],
  students: [],
  individualExams:[],
  isLoading: false,
  error: null,

  /** 🔹 Student attempts (already present) */
  // fetchStudentAttempts: async (studentId) => {
  //   try {
  //     set({ isLoading: true, error: null });
  //     const result = await pb.collection("exam_attempts").getFullList({
  //       filter: `studentId="${studentId}" && status~"completed"`,
  //       expand: "examId",
  //       sort: "-endedAt",
  //     });
 
  //     set({ attempts: result as unknown as ExamAttempt[], isLoading: false });
  //   } catch (err: any) {
  //     set({ error: err.message, isLoading: false });
  //   }
  // },
fetchStudentAttempts: async (studentId) => {
  try {
    set({ isLoading: true, error: null });

    // get all completed attempts with exam details expanded
    const result = await pb.collection("exam_attempts").getFullList({
      filter: `studentId="${studentId}" && status~"completed"`,
      expand: "examId",
      sort: "-endedAt",
    });


    // enrich each attempt with totalMark
    const enrichedAttempts = await Promise.all(
      result.map(async (attempt: any) => {
        const exam = attempt.expand?.examId;
        if (!exam) return attempt;

        const examMark = Number(exam.mark) || 0;

        // count active questions for this exam
        const activeQuestions = await pb.collection("exam_questions").getFullList({
          filter: `examId="${exam.id}" && isActive=true`,
        });

        const totalMark = examMark * activeQuestions.length;

        return {
          ...attempt,
          totalMark,
        } as ExamAttempt;
      })
    );

    set({ attempts: enrichedAttempts, isLoading: false });
  } catch (err: any) {
    console.log(err);
    
    set({ error: err.message, isLoading: false });
  }
},
  /** 🔹 Student answers (already present) */
  fetchExamAnswers: async (examId, studentId) => {
    console.log('hi',studentId);
    
    try {
      set({ isLoading: true, error: null });
      const result = await pb.collection("exam_answers").getFullList({
        filter: `examId="${examId}" && studentId="${studentId}"`,
        expand: "questionId",
      });
      console.log(result);
      
      set({ answers: result as unknown as ExamAnswer[], isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  /** 🔹 Faculty’s created exams */
  fetchFacultyExams: async (facultyId) => {
    try {
      set({ isLoading: true, error: null });
      const result = await pb.collection("exams").getFullList({
        filter: `createdBy="${facultyId}"`,
        sort: "-created",
      });
      set({ facultyExams: result as unknown as Exam[], isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  /** 🔹 Who attended / not attended a given exam */
  // fetchExamParticipants: async (examId) => {
  //   try {
  //     set({ isLoading: true, error: null });

  //     // Get all students
  //     const allStudents = await pb.collection("users").getFullList({
  //       filter: `role = "student"`,
  //     });
  //     console.log("HERE",allStudents);
      

  //     // Get attempts for this exam
  //     const attempts = await pb.collection("exam_attempts").getFullList({
  //       filter: `examId="${examId}" && status~"completed"`,
  //       expand: "studentId",
  //     });

  //     const attendedIds = attempts.map((a: any) => a.studentId);
  //     const attended = allStudents.filter((s: any) =>
  //       attendedIds.includes(s.id)
  //     );
  //     const notAttended = allStudents.filter(
  //       (s: any) => !attendedIds.includes(s.id)
  //     );

  //     set({ attempts: attempts as unknown as ExamAttempt[], students: allStudents as unknown as User[], isLoading: false });

  //     return { attended: attended as unknown as User[], notAttended: notAttended as unknown as User[] };
  //   } catch (err: any) {
  //     set({ error: err.message, isLoading: false });
  //     return { attended: [], notAttended: [] };
  //   }
  // },
//   fetchExamParticipants: async (examId) => {
//   try {
//     set({ isLoading: true, error: null });

//     // ✅ Get all students
//     const allStudents = await pb.collection("users").getFullList({
//       filter: `role = "student"`,
//     });

//     // ✅ Get attempts for this exam
// const attempts = await pb.collection("exam_attempts").getFullList({
//   filter: `examId="${examId}" && status~"completed"`,
//   expand: "studentId,examId", // 👈 expand multiple relations
// });
// console.log("CHECKING",attempts);

//     // Map attempts by studentId for quick lookup
//     const attemptMap: Record<string, any> = {};
//     attempts.forEach(async(a: any) => {
//       const exam =a.expand?.examId
//       const examMark=Number(exam.mark)||0

//     const activeQuestions = await pb.collection("exam_questions").getFullList({
//           filter: `examId="${examId}" && isActive=true`,
//         });
//       const totalMark=examMark*activeQuestions.length

//       console.log("EXAM",totalMark);
      
//       attemptMap[a.studentId] = a; // store the full attempt (contains score, status, etc.)
//     });


//     console.log("ATTEMPT MAP",attemptMap);
    

//     // ✅ Attended: add score into user object
//     const attended = allStudents
//       .filter((s: any) => attemptMap[s.id])
//       .map((s: any) => ({
//         ...s,
//         score: attemptMap[s.id]?.score ?? 0,
//         attemptId: attemptMap[s.id]?.id, // optional if you want to link attempt
//       }));


//       console.log(attended);
      

//     // ✅ Not Attended
//     const notAttended = allStudents.filter((s: any) => !attemptMap[s.id]);

//     // Save to store
//     set({
//       attempts: attempts as unknown as ExamAttempt[],
//       students: allStudents as unknown as User[],
//       isLoading: false,
//     });

//     return {
//       attended: attended as unknown as (User & { score: number })[],
//       notAttended: notAttended as unknown as User[],
//     };
//   } catch (err: any) {
//     set({ error: err.message, isLoading: false });
//     return { attended: [], notAttended: [] };
//   }
// },


fetchExamParticipants: async (examId) => {
  try {
    set({ isLoading: true, error: null });

    // ✅ Get all students
    const allStudents = await pb.collection("users").getFullList({
      filter: `role = "student"`,
    });

    // ✅ Get attempts for this exam (with expanded relations)
    const attempts = await pb.collection("exam_attempts").getFullList({
      filter: `examId="${examId}" && status~"completed"`,
      expand: "studentId,examId",
    });

    console.log("CHECKING", attempts);

    // ✅ Fetch active questions once (not per student)
    const activeQuestions = await pb.collection("exam_questions").getFullList({
      filter: `examId="${examId}" && isActive=true`,
    });

    // ✅ Create a map for quick lookup
    const attemptMap: Record<string, any> = {};

    // Use a normal for...of to await async operations safely
    for (const a of attempts) {
      const exam = a.expand?.examId;
      const examMark = Number(exam?.mark) || 0;
      const totalMark = examMark * activeQuestions.length;

      attemptMap[a.studentId] = {
        ...a,
        totalMark, // ✅ attach total mark to attempt
      };
    }

    console.log("ATTEMPT MAP", attemptMap);

    // ✅ Attended students
    const attended = allStudents
      .filter((s: any) => attemptMap[s.id])
      .map((s: any) => ({
        ...s,
        score: attemptMap[s.id]?.score ?? 0,
        totalMark: attemptMap[s.id]?.totalMark ?? 0, // ✅ include totalMark
        attemptId: attemptMap[s.id]?.id,
      }));

    // ✅ Not Attended students
    const notAttended = allStudents.filter((s: any) => !attemptMap[s.id]);

    // ✅ Update store
    set({
      attempts: attempts as unknown as ExamAttempt[],
      students: allStudents as unknown as User[],
      isLoading: false,
    });

    return {
      attended: attended as unknown as (User & { score: number; totalMark: number })[],
      notAttended: notAttended as unknown as User[],
    };
  } catch (err: any) {
    set({ error: err.message, isLoading: false });
    return { attended: [], notAttended: [] };
  }
},


// fetchUserAttemptedExams: async (userId: string) => {
//   try {
//     set({ isLoading: true, error: null });

//     // ✅ Fetch all exams
//     const exams = await pb.collection("exams").getFullList({
//       sort: "-created",
//     });

//     // ✅ Fetch attempts by this user
//     const attempts = await pb.collection("exam_attempts").getFullList({
//       filter: `studentId="${userId}" && status~"completed"`,
//       expand: "examId",
//       sort: "-endedAt",
//     });

//     // ✅ Filter the exams that match attempted ones
//     const attemptedExamIds = attempts.map((a: any) => a.examId);
//     const attemptedExams = exams.filter((exam: any) =>
//       attemptedExamIds.includes(exam.id)
//     );

//     // ✅ Enrich with attempt info (score, startedAt, endedAt)
//     const detailedAttempts = attemptedExams.map((exam: any) => {
//       const attempt = attempts.find((a: any) => a.examId === exam.id);
//       return {
//         ...exam,
//         score: attempt?.score ?? 0,
//         startedAt: attempt?.startedAt,
//         endedAt: attempt?.endedAt,
//         attemptId: attempt?.id,
//       };
//     });

//     set({ individualExams: detailedAttempts as ExamAttempt[], isLoading: false });
//   } catch (err: any) {
//     console.error(err);
//     set({ error: err.message, isLoading: false });
//   }
// },

fetchUserAttemptedExams: async (userId: string) => {
  try {
    set({ isLoading: true, error: null });

    // ✅ Fetch all exams
    const exams = await pb.collection("exams").getFullList({
      sort: "-created",
    });

    // ✅ Fetch attempts by this user
    const attempts = await pb.collection("exam_attempts").getFullList({
      filter: `studentId="${userId}" && status~"completed"`,
      expand: "examId",
      sort: "-endedAt",
    });

    // ✅ Fetch all active questions (for total mark calculation)
    const allActiveQuestions = await pb.collection("exam_questions").getFullList({
      filter: `isActive=true`,
    });

    // ✅ Count active questions per exam
    const questionCountMap: Record<string, number> = {};
    for (const q of allActiveQuestions) {
      questionCountMap[q.examId] = (questionCountMap[q.examId] || 0) + 1;
    }

    // ✅ Filter the exams that match attempted ones
    const attemptedExamIds = attempts.map((a: any) => a.examId);
    const attemptedExams = exams.filter((exam: any) =>
      attemptedExamIds.includes(exam.id)
    );

    // ✅ Enrich with attempt info (score, startedAt, endedAt, totalMark)
    const detailedAttempts = attemptedExams.map((exam: any) => {
      const attempt = attempts.find((a: any) => a.examId === exam.id);
      const totalMark =
        (Number(exam.mark) || 0) * (questionCountMap[exam.id] || 0);

      return {
        ...exam,
        score: attempt?.score ?? 0,
        startedAt: attempt?.startedAt,
        endedAt: attempt?.endedAt,
        attemptId: attempt?.id,
        totalMark, // ✅ Attach total mark for each exam
      };
    });

    // ✅ Update store
    set({
      individualExams: detailedAttempts as ExamAttempt[],
      isLoading: false,
    });
  } catch (err: any) {
    console.error(err);
    set({ error: err.message, isLoading: false });
  }
},

}));

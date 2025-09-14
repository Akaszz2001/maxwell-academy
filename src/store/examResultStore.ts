// src/store/examResultStore.ts
import { create } from "zustand";
import pb from "../services/pocketbase";

interface ExamAttempt {
  id: string;
  examId: string;
  studentId: string;
  startedAt: string;
  endedAt: string;
  score: number;
  status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expand?: { examId: any };
}

interface ExamAnswer {
  id: string;
  examId: string;
  studentId: string;
  questionId: string;
  answer: string;
  submittedAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expand?: { questionId: any };
}

interface ExamResultState {
  attempts: ExamAttempt[];
  answers: ExamAnswer[];
  isLoading: boolean;
  error: string | null;

  fetchStudentAttempts: (studentId: string) => Promise<void>;
  fetchExamAnswers: (examId: string, studentId: string) => Promise<void>;
}

export const useExamResultStore = create<ExamResultState>((set) => ({
  attempts: [],
  answers: [],
  isLoading: false,
  error: null,

  fetchStudentAttempts: async (studentId) => {
    console.log("ID",studentId);
    
    try {
      set({ isLoading: true, error: null });
   const result = await pb.collection("exam_attempts").getFullList({
  filter: `studentId="${studentId}" && status~"completed"`,
  expand: "examId",
  sort: "-endedAt",
});

      console.log("EXAM RESULT STORE FETCH STUDENT ATTEMPST",result);
      
      set({ attempts: result as unknown as ExamAttempt[], isLoading: false });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchExamAnswers: async (examId, studentId) => {
    try {
      set({ isLoading: true, error: null });
      const result = await pb.collection("exam_answers").getFullList({
        filter: `examId="${examId}" && studentId="${studentId}"`,
        expand: "questionId",
      });
      console.log("FETCH EXAM ANSWERS",result);
      
      set({ answers: result as unknown as ExamAnswer[], isLoading: false });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

// src/store/examStore.ts
import { create } from "zustand";
import pb from "../services/pocketbase";
import { useAuthStore } from "./authStore";

export interface Exam {
  id: string;
  name: string;
  subject: string;
  startTime: string;
  duration: number;
  createdBy: string;
  created: string;
  updated: string;
}

interface ExamState {
  exams: Exam[];
  isLoading: boolean;
  error: string | null;

  createExam: (
    exam: Omit<Exam, "id" | "created" | "updated" | "createdBy">,
    navigate: (path: string) => void
  ) => Promise<void>;

  fetchExamsByUser: (userId: string) => Promise<void>;
  fetchAllExams: () => Promise<void>;   // ✅
}

export const useExamStore = create<ExamState>((set) => ({
  exams: [],
  isLoading: false,
  error: null,

  // ✅ create exam and auto-redirect
  createExam: async (examData, navigate) => {
    try {
      set({ isLoading: true, error: null });

      const { user } = useAuthStore.getState();
      console.log("EXAM STORE USER CHECKING",user);
      
      if (!user) throw new Error("Not authenticated");

      const newExam = await pb.collection("exams").create({
        ...examData,
        createdBy: user.id, // ✅ auto store current faculty ID
      });
      console.log("EXAM STORE",newExam);
      

      set((state) => ({
        exams: [...state.exams, newExam as unknown as Exam],
        isLoading: false,
      }));

      // redirect to AddQuestions after save
      navigate(`/faculty/dashboard/exams/${newExam.id}/questions/add`);

    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  // ✅ fetch only current faculty exams
  fetchExamsByUser: async (userId) => {
    try {
      set({ isLoading: true, error: null });
      const result = await pb.collection("exams").getFullList<Exam>({
        filter: `createdBy="${userId}"`,
        sort: "-created",
      });
      set({ exams: result, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  fetchAllExams: async () => {
    try {
      set({ isLoading: true, error: null });
      const result = await pb.collection("exams").getFullList<Exam>({
        sort: "-created",
      });
      set({ exams: result, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

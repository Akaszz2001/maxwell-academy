

// src/store/examStore.ts
import { create } from "zustand";
import pb from "../services/pocketbase";
import { useAuthStore } from "./authStore";
import { toast } from "react-toastify";

export interface Exam {
  id: string;
  name: string;
  subject: string;
  mark:number;
  negMark:number;
  startTime: string;
  duration: number;
  createdBy: string;
  created: string;
  updated: string;
  classs:string
  isActive?: boolean; // ✅ to support deactivate
}
export interface CategorizedExams {
  upcomingExams: Exam[];
  completedExams: Exam[];
  missedExams: Exam[];
}
interface ExamState {
  exams: Exam[];
  isLoading: boolean;
  error: string | null;

createExam: (
  exam: Omit<Exam, "id" | "created" | "updated" | "createdBy">,
  navigate: (path: string, options?: { replace?: boolean; state?: any }) => void
) => Promise<void>;

  fetchExamsByUser: (userId: string) => Promise<void>;
  fetchAllExams: () => Promise<void>;
  fetchAllExamsByActive: () => Promise<void>;
getExamById: (id: string) => Promise<Exam | null>;
fetchAllExamsForDash: () => Promise<Exam | null>;
updateExam: (id: string, data: Partial<Exam>) => Promise<{
  success: boolean;
  data?: Exam;
  error?: string;
}>;
duplicateExam: (
  examId: string,
  newExamData?: Partial<Exam>
) => Promise<Exam | null>;

  deactivateExam: (id: string) => Promise<void>;
  activateExam: (id: string) => Promise<void>;
  fetchAndCategorizeExams: () => Promise<CategorizedExams>;
}

export const useExamStore = create<ExamState>((set) => ({
  exams: [],
  isLoading: false,
  error: null,

  createExam: async (examData, navigate) => {
    try {
      console.log("CREATE EXAM ",examData);
      
      set({ isLoading: true, error: null });

      const { user } = useAuthStore.getState();
      if (!user) throw new Error("Not authenticated");

      const newExam = await pb.collection("exams").create({
        ...examData,
        createdBy: user.id,
        isActive: true, // default active
      });

      set((state) => ({
        exams: [...state.exams, newExam as unknown as Exam],
        isLoading: false,
      }));
         toast.success("Successfully created exam")
         toast.info("Please add some questions")
      navigate(`/faculty/dashboard/exams/${newExam.id}/questions/add`,{state:{subject:newExam.subject,topic:newExam.name,classs:newExam.classs}});
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  fetchExamsByUser: async (userId) => {
    console.log("FACULTY EXAMS ID",userId)
    try {
      set({ isLoading: true, error: null });
      const result = await pb.collection("exams").getFullList<Exam>({
        filter: `createdBy="${userId}"`,
        sort: "-created",
      });
        console.log("FACULTY EXAMS results",result)
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
  fetchAllExamsForDash: async () => {
    try {
      set({ isLoading: true, error: null });
      const result = await pb.collection("exams").getFullList<Exam>({
        sort: "-created",
      });
      set({  isLoading: false });
      return result
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      return err
    }
  },
  fetchAllExamsByActive: async () => {
    try {
      set({ isLoading: true, error: null });
      const result = await pb.collection("exams").getFullList<Exam>({
        sort: "-created",
        filter: "isActive = true",
      });
      set({ exams: result, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  // ✅ update exam details
 updateExam: async (id, data) => {
  try {
    set({ isLoading: true, error: null });
    const updated = await pb.collection("exams").update(id, data);
console.log("UPDATED EXAM",updated);

    const exam = updated as unknown as Exam; // 👈 cast to Exam

    set((state) => ({
      exams: state.exams.map((ex) =>
        ex.id === id ? { ...ex, ...exam } : ex
      ),
      isLoading: false,
    }));

    return { success: true as const, data: exam };
  } catch (err: any) {
    set({ error: err.message, isLoading: false });
    return { success: false as const, error: err.message };
  }
},

  // ✅ deactivate exam (soft delete)
  deactivateExam: async (id) => {
    try {
      console.log(id);
      
      set({ isLoading: true, error: null });
      const updated = await pb.collection("exams").update(id, { isActive: false });
      console.log(updated);
      
      set((state) => ({
        exams: state.exams.map((exam) =>
          exam.id === id ? { ...exam, isActive: false } : exam
        ),
        isLoading: false,
      }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      
      set({ error: err.message, isLoading: false });
    }
  },
  activateExam: async (id) => {
    try {
      console.log(id);
      
      set({ isLoading: true, error: null });
      const updated = await pb.collection("exams").update(id, { isActive: true });
      console.log(updated);
      
      set((state) => ({
        exams: state.exams.map((exam) =>
          exam.id === id ? { ...exam, isActive: true } : exam
        ),
        isLoading: false,
      }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      
      set({ error: err.message, isLoading: false });
    }
  },

  getExamById: async (id) => {
  try {
    set({ isLoading: true, error: null });

    const exam = await pb.collection("exams").getOne<Exam>(id);
    console.log("GET EXMA BY ID ",exam);
    
    set({ isLoading: false });
    return exam;
  } catch (err: any) {
    set({ error: err.message, isLoading: false });
    console.log("GET EXMA BY ID ERROR",err);
    
    return null;
  }
},

// duplicateExam: async (examId: string, newExamData?: Partial<Exam>) => {
//   try {
//     set({ isLoading: true, error: null });

//     const originalExam = await pb.collection("exams").getOne<Exam>(examId);

//     const { user } = useAuthStore.getState();
//     if (!user) throw new Error("Not authenticated");

//     const newExam = await pb.collection("exams").create({
//       ...originalExam,
//       ...newExamData,
//       createdBy: user.id,
//       isActive: true,
//     });

//     const exam = newExam as unknown as Exam;

//     // copy exam_questions
//     const mappings = await pb.collection("exam_questions").getFullList({
//       filter: `examId="${examId}"`,
//     });

//     for (const m of mappings) {
//       await pb.collection("exam_questions").create({
//         examId: exam.id,
//         questionId: m.questionId,
//         isActive: m.isActive,
//       });
//     }

//     set((state) => ({
//       exams: [...state.exams, exam],
//       isLoading: false,
//     }));

//     return exam;
//   } catch (err: any) {
//     console.log("duplicate exam error ",err);
    
//     set({ error: err.message, isLoading: false });
//     return null; // 🔥 matches return type
//   }
// },
duplicateExam: async (examId: string, newExamData?: Partial<Exam>) => {
  try {
    set({ isLoading: true, error: null });

    const originalExam = await pb.collection("exams").getOne<Exam>(examId);

    const { user } = useAuthStore.getState();
    if (!user) throw new Error("Not authenticated");

    // Remove system fields PocketBase won’t accept
    const { id, created, updated, expand, ...cleanExam } = originalExam;

    const newExam = await pb.collection("exams").create({
      ...cleanExam,
      ...newExamData,
      createdBy: user.id,
      isActive: true,
      name: `${originalExam.name} (Copy)`, // make sure name is unique
    });

    const exam = newExam as unknown as Exam;

    // copy exam_questions
    const mappings = await pb.collection("exam_questions").getFullList({
      filter: `examId="${examId}"`,
    });

    for (const m of mappings) {
       console.log("Copying question mapping:", m);
      
     await pb.collection("exam_questions").create({
  examId: exam.id,
  questionId: m.questionId,
  isActive: m.isActive,
});
    }

    set((state) => ({
      exams: [...state.exams, exam],
      isLoading: false,
    }));

    return exam;
  } catch (err: any) {
    console.log("duplicate exam error", err);
    set({ error: err.message, isLoading: false });
    return null;
  }
},
  fetchAndCategorizeExams: async () => {
    try {
      set({ isLoading: true, error: null });

      const { user } = useAuthStore.getState();
      if (!user) throw new Error("Not logged in");

      // fetch all exams
      const allExams = await pb.collection("exams").getFullList<Exam>({
        sort: "startTime",
        filter:"isActive=true"
      });

      // fetch all attempts by this user
      const attempts = await pb.collection("exam_attempts").getFullList({
        filter: `studentId="${user.id}"`,
      });

      const now = new Date();
      const upcomingExams: Exam[] = [];
      const completedExams: Exam[] = [];
      const missedExams: Exam[] = [];

      allExams.forEach((exam) => {
        const examDate = new Date(exam.startTime);
        const attempt = attempts.find((a) => a.examId === exam.id);

        if (attempt && attempt.status.includes('completed')) {
          completedExams.push(exam);
        } else if (examDate > now) {
          upcomingExams.push(exam);
        } else {
          missedExams.push(exam);
        }
      });

      set({ isLoading: false });
      return { upcomingExams, completedExams, missedExams };
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },
}));

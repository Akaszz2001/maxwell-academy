/* eslint-disable @typescript-eslint/no-explicit-any */
// // src/store/examStore.ts
// import { create } from "zustand";
// import pb from "../services/pocketbase";
// import { useAuthStore } from "./authStore";

// export interface Exam {
//   id: string;
//   name: string;
//   subject: string;
//   startTime: string;
//   duration: number;
//   createdBy: string;
//   created: string;
//   updated: string;
// }

// interface ExamState {
//   exams: Exam[];
//   isLoading: boolean;
//   error: string | null;

//   createExam: (
//     exam: Omit<Exam, "id" | "created" | "updated" | "createdBy">,
//     navigate: (path: string) => void
//   ) => Promise<void>;

//   fetchExamsByUser: (userId: string) => Promise<void>;
//   fetchAllExams: () => Promise<void>;   // ✅
// }

// export const useExamStore = create<ExamState>((set) => ({
//   exams: [],
//   isLoading: false,
//   error: null,

//   // ✅ create exam and auto-redirect
//   createExam: async (examData, navigate) => {
//     try {
//       set({ isLoading: true, error: null });

//       const { user } = useAuthStore.getState();
//       console.log("EXAM STORE USER CHECKING",user);
      
//       if (!user) throw new Error("Not authenticated");

//       const newExam = await pb.collection("exams").create({
//         ...examData,
//         createdBy: user.id, // ✅ auto store current faculty ID
//       });
//       console.log("EXAM STORE",newExam);
      

//       set((state) => ({
//         exams: [...state.exams, newExam as unknown as Exam],
//         isLoading: false,
//       }));

//       // redirect to AddQuestions after save
//       navigate(`/faculty/dashboard/exams/${newExam.id}/questions/add`);

//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//       throw err;
//     }
//   },

//   // ✅ fetch only current faculty exams
//   fetchExamsByUser: async (userId) => {
//     try {
//       set({ isLoading: true, error: null });
//       const result = await pb.collection("exams").getFullList<Exam>({
//         filter: `createdBy="${userId}"`,
//         sort: "-created",
//       });
//       set({ exams: result, isLoading: false });
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//     }
//   },
//   fetchAllExams: async () => {
//     try {
//       set({ isLoading: true, error: null });
//       const result = await pb.collection("exams").getFullList<Exam>({
//         sort: "-created",
//       });
//       set({ exams: result, isLoading: false });
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//     }
//   },
// }));



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
  isActive?: boolean; // ✅ to support deactivate
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
  fetchAllExams: () => Promise<void>;
getExamById: (id: string) => Promise<Exam | null>;
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

      navigate(`/faculty/dashboard/exams/${newExam.id}/questions/add`);
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
  examId: [exam.id],
  questionId: [m.questionId],
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
}

}));

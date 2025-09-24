/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/questionStore.ts
import { create } from "zustand";
import pb from "../services/pocketbase";

export interface Question {
  id: string;
  examId: string;
  type: "text" | "image";
  questionText?: string; // for text questions
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  answer: string;
  image?: string; // PocketBase file url
  created: string;
  updated: string;
}

interface QuestionState {
  questions: Question[];
  isLoading: boolean;
  error: string | null;

  fetchQuestions: (examId: string) => Promise<void>;
  // inside QuestionState
getQuestionsByExam: (
    examId: string
  ) => Promise<{ active: Question[]; others: Question[] }>;

  addBulkQuestions: (examId: string, newQuestions: any[]) => Promise<void>;
   updateQuestion: (id: string, data: Partial<Question>) => Promise<Question>;
    deactivateQuestion: (examId: string, questionId: string) => Promise<void>;
  }

export const useQuestionStore = create<QuestionState>((set) => ({
  questions: [],
  isLoading: false,
  error: null,

  // ✅ Get all questions for an exam
//   fetchQuestions: async (examId: string) => {
//     try {
//       set({ isLoading: true, error: null });
//       const records = await pb.collection("questions").getFullList({
//         filter: `examId="${examId}"`,
//         sort: "-created",
//       });
// console.log("records",records);

//       const mapped = records.map((rec: any) => ({
//         id: rec.id,
//         examId: rec.examId,
//         type: rec.type,
//         questionText: rec.questionText,
//         optionA: rec.optionA,
//         optionB: rec.optionB,
//         optionC: rec.optionC,
//         optionD: rec.optionD,
//         answer: rec.answer,
//         image: rec.image
//           ? pb.files.getUrl(rec, rec.image) // ✅ generate file URL
//           : undefined,
//         created: rec.created,
//         updated: rec.updated,
//       }));

//       set({ questions: mapped, isLoading: false });
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//     }
//   },

fetchQuestions: async (examId: string) => {
  try {
    set({ isLoading: true, error: null });

    const records = await pb.collection("exam_questions").getFullList({
      filter: `examId="${examId}" && isActive=true`,
      expand: "questionId", // expand pulls full question data
    });

    const mapped = records.map((rec: any) => {
      const q = rec.expand?.questionId;
      return {
        id: q.id,
        examId: rec.examId,
        type: q.type,
        questionText: q.questionText,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        answer: q.answer,
        image: q.image ? pb.files.getUrl(q, q.image) : undefined,
        created: q.created,
        updated: q.updated,
        isActive: rec.isActive,
      };
    });

    set({ questions: mapped, isLoading: false });
  } catch (err: any) {
    set({ error: err.message, isLoading: false });
  }
},




  addBulkQuestions: async (examId: string, newQuestions: any[]) => {
    console.log(newQuestions);
    
  try {
    set({ isLoading: true, error: null });

    for (const q of newQuestions) {
      console.log("BUK quetsions ",q);
      
      let createdQuestion;

      if (q.type === "text") {
        // insert into questions
        createdQuestion = await pb.collection("questions").create({
          examId,
          type: "text",
          questionText: q.questionText,
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
          answer: q.answer?.toLowerCase(),
        });
      } else if (q.type === "image" && q.imageFile) {
        const formData = new FormData();
           formData.append("examId", examId);
        formData.append("type", "image");
        formData.append("answer", q.answer?.toLowerCase() || "");
        formData.append("image", q.imageFile);

        createdQuestion = await pb.collection("questions").create(formData);
      }

      // ⬇️ create mapping in exam_questions
      if (createdQuestion) {
        console.log("QUESTION CREATION",createdQuestion);
        
        await pb.collection("exam_questions").create({
          examId,
          questionId: createdQuestion.id,
          isActive: true,
        });
      }
    }

    // 🔄 refresh questions via exam_questions (with expand)
    const mappings = await pb.collection("exam_questions").getFullList({
      filter: `examId="${examId}" && isActive=true`,
      expand: "questionId",
      sort: "-created",
    });

    const mapped = mappings.map((rec: any) => {
      const q = rec.expand?.questionId;
      return {
        id: q.id,
        examId: rec.examId,
        type: q.type,
        questionText: q.questionText,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        answer: q.answer,
        image: q.image ? pb.files.getURL(q, q.image) : undefined,
        created: q.created,
        updated: q.updated,
      };
    });

    set({ questions: mapped, isLoading: false });
  } catch (err: any) {
    set({ error: err.message, isLoading: false });
    throw err;
  }
},
// getQuestionsByExam: async (examId: string): Promise<Question[]> => {
//   try {
//     const records = await pb.collection("exam_questions").getFullList({
//       filter: `examId="${examId}" && isActive=true`,
//       expand: "questionId",
//       sort: "-created",
//     });

//     const mapped: Question[] = records
//       .filter((rec: any) => rec.expand?.questionId) 
//       .map((rec: any) => {
//         const q = rec.expand.questionId;
//         return {
//           id: q.id,
//           examId: rec.examId,
//           type: q.type,
//           questionText: q.questionText,
//           optionA: q.optionA,
//           optionB: q.optionB,
//           optionC: q.optionC,
//           optionD: q.optionD,
//           answer: q.answer,
//           image: q.image ? pb.files.getURL(q, q.image) : undefined,
//           created: q.created,
//           updated: q.updated,
//           isActive: rec.isActive,
//         };
//       });

//     return mapped;
//   } catch (err: any) {
//     console.error("Error fetching questions:", err.message);
//     throw err;
//   }
// },


// ✅ Update an existing question


getQuestionsByExam: async (examId: string): Promise<{ active: Question[]; others: Question[] }> => {
  try {
    // 1️⃣ Get all mappings for this exam
    const mappings = await pb.collection("exam_questions").getFullList({
      filter: `examId="${examId}"`,
      expand: "questionId",
    });

    const activeIds = mappings.filter(m => m.isActive).map(m => m.questionId);

    // 2️⃣ Active questions
    const active: Question[] = mappings
      .filter((rec: any) => rec.expand?.questionId && rec.isActive)
      .map((rec: any) => {
        const q = rec.expand.questionId;
        return {
          id: q.id,
          examId: rec.examId,
          type: q.type,
          questionText: q.questionText,
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
          answer: q.answer,
          image: q.image ? pb.files.getURL(q, q.image) : undefined,
          created: q.created,
          updated: q.updated,
          isActive: rec.isActive,
        };
      });

    // 3️⃣ Fetch ALL questions from main "questions" collection
    const allQuestions = await pb.collection("questions").getFullList();

    // 4️⃣ Filter out ones already active
    const others: Question[] = allQuestions
      .filter((q: any) => !activeIds.includes(q.id))
      .map((q: any) => ({
        id: q.id,
        examId, // not mapped yet
        type: q.type,
        questionText: q.questionText,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        answer: q.answer,
        image: q.image ? pb.files.getURL(q, q.image) : undefined,
        created: q.created,
        updated: q.updated,
        isActive: false,
      }));

    return { active, others };
  } catch (err: any) {
    console.error("Error fetching questions:", err.message);
    throw err;
  }
},




updateQuestion: async (id, data) => {
  try {
    set({ isLoading: true, error: null });

    // update in PocketBase
    const updated = await pb.collection("questions").update(id, data);

    const mapped: Question = {
      id: updated.id,
      examId: updated.examId,
      type: updated.type,
      questionText: updated.questionText,
      optionA: updated.optionA,
      optionB: updated.optionB,
      optionC: updated.optionC,
      optionD: updated.optionD,
      answer: updated.answer,
      image: updated.image ? pb.files.getUrl(updated, updated.image) : undefined,
      created: updated.created,
      updated: updated.updated,
    };

    // update local store
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, ...mapped } : q
      ),
      isLoading: false,
    }));

    return mapped; // ✅ return Question type
  } catch (err: any) {
    set({ error: err.message, isLoading: false });
    throw err;
  }
},
// ✅ Deactivate a question in exam_questions
deactivateQuestion: async (examId: string, questionId: string) => {
  try {
    set({ isLoading: true, error: null });

    // 1️⃣ Find the mapping record
    const mapping = await pb.collection("exam_questions").getFirstListItem(
      `examId="${examId}" && questionId="${questionId}"`,
      { requestKey: null }
    );

    // 2️⃣ Update isActive=false
    await pb.collection("exam_questions").update(mapping.id, {
      isActive: false,
    });

    // 3️⃣ Reflect locally by marking inactive
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === questionId && q.examId === examId
          ? { ...q, isActive: false }
          : q
      ),
      isLoading: false,
    }));
  } catch (err: any) {
    set({ error: err.message, isLoading: false });
    throw err;
  }
},


}));

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
  addBulkQuestions: (examId: string, newQuestions: any[]) => Promise<void>;
}

export const useQuestionStore = create<QuestionState>((set) => ({
  questions: [],
  isLoading: false,
  error: null,

  // ✅ Get all questions for an exam
  fetchQuestions: async (examId: string) => {
    try {
      set({ isLoading: true, error: null });
      const records = await pb.collection("questions").getFullList({
        filter: `examId="${examId}"`,
        sort: "-created",
      });
console.log("records",records);

      const mapped = records.map((rec: any) => ({
        id: rec.id,
        examId: rec.examId,
        type: rec.type,
        questionText: rec.questionText,
        optionA: rec.optionA,
        optionB: rec.optionB,
        optionC: rec.optionC,
        optionD: rec.optionD,
        answer: rec.answer,
        image: rec.image
          ? pb.files.getUrl(rec, rec.image) // ✅ generate file URL
          : undefined,
        created: rec.created,
        updated: rec.updated,
      }));

      set({ questions: mapped, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  // ✅ Bulk insert for both text & image questions
  addBulkQuestions: async (examId: string, newQuestions: any[]) => {
    try {
      set({ isLoading: true, error: null });

      for (const q of newQuestions) {
        if (q.type === "text") {
          // ⬇ normal JSON insert
          await pb.collection("questions").create({
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
          // ⬇ file upload with FormData
          const formData = new FormData();
          formData.append("examId", examId);
          formData.append("type", "image");
          formData.append("answer", q.answer?.toLowerCase() || "");
          formData.append("image", q.imageFile);

          await pb.collection("questions").create(formData);
        }
      }

      // refresh after adding
      const records = await pb.collection("questions").getFullList({
        filter: `examId="${examId}"`,
        sort: "-created",
      });

      const mapped = records.map((rec: any) => ({
        id: rec.id,
        examId: rec.examId,
        type: rec.type,
        questionText: rec.questionText,
        optionA: rec.optionA,
        optionB: rec.optionB,
        optionC: rec.optionC,
        optionD: rec.optionD,
        answer: rec.answer,
        image: rec.image
          ? pb.files.getURL(rec, rec.image)
          : undefined,
        created: rec.created,
        updated: rec.updated,
      }));

      set({ questions: mapped, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },
}));

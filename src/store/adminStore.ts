/* eslint-disable @typescript-eslint/no-explicit-any */
 
// src/store/adminQuestionStore.ts
import { create } from "zustand";
import pb from "@/services/pocketbase"; // your PocketBase instance

type Question = {
  id: string;
  examId?: string | null;
  type: "text" | "image";
  questionText?: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  answer?: string;
  image?: string;
  topic?:string;
  class?:string;
  created?: string;
  updated?: string;
};

type AdminQuestionState = {
  questions: Question[];
  isLoading: boolean;
  error: string | null;
  addQuestionsBulk: (examId: string | null, newQuestions: any[]) => Promise<void>;
  clearQuestions: () => void;
};

export const useAdminQuestionStore = create<AdminQuestionState>((set) => ({
  questions: [],
  isLoading: false,
  error: null,

  // ✅ add multiple questions (examId optional)
  addQuestionsBulk: async (examId, newQuestions) => {
    console.log(examId);
    
    try {
      set({ isLoading: true, error: null });

      for (const q of newQuestions) {
        let createdQuestion;

        if (q.type === "text") {
          createdQuestion = await pb.collection("questions").create({
            examId: examId || null, // optional
            type: "text",
            questionText: q.questionText,
            optionA: q.optionA,
            optionB: q.optionB,
            optionC: q.optionC,
            optionD: q.optionD,
            answer: q.answer?.toLowerCase(),
            subject:q.subject?.toLowerCase(),
            topic:q.topic?.toLowerCase(),
            classs:q.classs?.toLowerCase(),

          });
        } else if (q.type === "image" && q.imageFile) {
            try{
  const formData = new FormData();
        
          formData.append("type", "image");
          formData.append("answer", q.answer?.toLowerCase() || "");
          formData.append("image", q.imageFile);
          formData.append('subject',q.subject?.toLowerCase()||"")
          formData.append('topic',q.topic?.toLowerCase()||"")
          formData.append('classs',q.classs?.toLowerCase()||"")

          createdQuestion = await pb.collection("questions").create(formData);
            }catch(err){
                    console.log("ADMIN IMAGE QUESTIONS",err);
                    
            }
        
        }

        // 🔗 if examId exists → link to exam_questions
        if (createdQuestion && examId) {
          await pb.collection("exam_questions").create({
            examId,
            questionId: createdQuestion.id,
            isActive: true,
          });
        }
      }

      // 🔄 refresh only if examId exists
      if (examId) {
        const mappings = await pb.collection("exam_questions").getFullList({
          filter: `examId="${examId}" && isActive=true`,
          expand: "questionId",
          sort: "-created",
        });

        const mapped: Question[] = mappings.map((rec: any) => {
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
      } else {
        // if no examId, just stop loading
        set({ isLoading: false });
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  clearQuestions: () => set({ questions: [] }),
}));

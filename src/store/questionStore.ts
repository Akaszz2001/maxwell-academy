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
  subject: string
  image?: string; // PocketBase file url
   topic?:string;
  classs?:string;
  created: string;
  updated: string;
}

interface QuestionState {
  questions: Question[];
  isLoading: boolean;
  error: string | null;

  fetchQuestions: (examId: string) => Promise<void>;
  deleteQuestion: (questionId: string) => Promise<void>;

  getUniqueSubjects: () => Promise<string[]>;
getQuestionsBySubject: (subject: string) => Promise<Question[]>;
getQuestionsBySubjectClassTopic: (subject: string,topic:string,classs:string) => Promise<Question[]>;
  // inside QuestionState

getAllQuestionsByExam: () => Promise<{ allQuestions: Question[]}>;
 getUniqueClassesBySubject: (subject: string) => Promise<string[]>; // ✅ new
  getUniqueTopics: (subject: string, className: string) => Promise<string[]>; // ✅ new
  addBulkQuestions: (examId: string, newQuestions: any[]) => Promise<void>;
   updateQuestion: (id: string, data: Partial<Question>) => Promise<Question>;
    deactivateQuestion: (examId: string, questionId: string) => Promise<void>;
    getQuestionsByExam: (
    examId: string
  ) => Promise<{ active: Question[]; others: Question[] }>;
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
        subject:q.subject,
        image: q.image ? pb.files.getURL(q, q.image) : undefined,
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

getQuestionsBySubject: async (subject: string): Promise<Question[]> => {
  try {
    const records = await pb.collection("questions").getFullList({
      filter: `subject="${subject}"`,
      sort: "-created",
    });

    const questions: Question[] = records.map((q: any) => ({
      id: q.id,
      examId: q.examId,
      type: q.type,
      questionText: q.questionText,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      subject: q.subject,
      answer: q.answer,
      image: q.image ? pb.files.getURL(q, q.image) : undefined,
      created: q.created,
      updated: q.updated,
      isActive: q.isActive,
    }));

    return questions;
  } catch (err: any) {
    console.error("Error fetching questions by subject:", err.message);
    throw err;
  }
},
getUniqueSubjects: async (): Promise<string[]> => {
  try {
    const records = await pb.collection("questions").getFullList({
      fields: "subject",
    });

    const subjects = records
      .map((q: any) => q.subject)
      .filter((s: string | null | undefined) => !!s); // remove null/empty

    const uniqueSubjects = Array.from(new Set(subjects));

    return uniqueSubjects;
  } catch (err: any) {
    console.error("Error fetching subjects:", err.message);
    throw err;
  }
},


getUniqueClassesBySubject: async (subject: string): Promise<string[]> => {
  try {
    const records = await pb.collection("questions").getFullList({
      filter: `subject="${subject}"`,
      fields: "classs",
    });

    const classes = records.map((q: any) => q.classs).filter(Boolean);
    return Array.from(new Set(classes));
  } catch (err: any) {
    console.error("Error fetching classes:", err.message);
    throw err;
  }
},

getUniqueTopics: async (subject: string, classs: string): Promise<string[]> => {
  try {
    const records = await pb.collection("questions").getFullList({
      filter: `subject="${subject}" && classs="${classs}"`,
      fields: "topic",
    });

    const topics = records.map((q: any) => q.topic).filter(Boolean);
    return Array.from(new Set(topics));
  } catch (err: any) {
    console.error("Error fetching topics:", err.message);
    throw err;
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
          subject:q.subject?.toLowerCase(),
          topic:q.topic?.toLowerCase(),
          classs:q.classs?.toLowerCase()
        });
      } else if (q.type === "image" && q.imageFile) {
        const formData = new FormData();
           formData.append("examId", examId);
           formData.append("subject",q.subject)
        formData.append("type", "image");
        formData.append("answer", q.answer?.toLowerCase() || "");
        formData.append("classs", q.classs?.toLowerCase() || "");
        formData.append("topic", q.topic?.toLowerCase() || "");
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
        subject:q.subject,
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
}
,
getQuestionsBySubjectClassTopic: async (
  subject: string,
  className: string,
  topic: string
): Promise<Question[]> => {
  try {
    const records = await pb.collection("questions").getFullList({
      filter: `subject="${subject}" && classs="${className}" && topic="${topic}"`,
      sort: "-created",
    });

    const questions: Question[] = records.map((q: any) => ({
      id: q.id,
      examId: q.examId,
      type: q.type,
      questionText: q.questionText,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      subject: q.subject,
      class: q.class,
      topic: q.topic,
      answer: q.answer,
      image: q.image ? pb.files.getURL(q, q.image) : undefined,
      created: q.created,
      updated: q.updated,
      isActive: q.isActive,
    }));

    return questions;
  } catch (err: any) {
    console.error("Error fetching questions:", err.message);
    throw err;
  }
},

getAllQuestionsByExam: async (): Promise<{ allQuestions: Question[] }> => {
  try {
    const records = await pb.collection("questions").getFullList<Question>();

    const allQuestions: Question[] = records.map((q: any) => ({
      id: q.id,
      examId: q.examId,   // make sure you actually have this field in the "questions" collection
      type: q.type,
      questionText: q.questionText,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      subject: q.subject,
      answer: q.answer,
      image: q.image ? pb.files.getURL(q, q.image) : undefined,
      created: q.created,
      updated: q.updated,
      isActive: q.isActive,
    }));

    console.log(allQuestions);
    return { allQuestions };
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
      subject:updated.subject,
      answer: updated.answer,
      image: updated.image ? pb.files.getURL(updated, updated.image) : undefined,
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
          subject:q.subject,
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
          subject:q.subject,
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

deleteQuestion: async (questionId: string) => {
  try {
    set({ isLoading: true, error: null });

    // 1️⃣ Delete the question from "questions" collection
    await pb.collection("questions").delete(questionId);

    // 2️⃣ Also delete any mappings in "exam_questions"
    const mappings = await pb.collection("exam_questions").getFullList({
      filter: `questionId="${questionId}"`,
    });

    for (const mapping of mappings) {
      await pb.collection("exam_questions").delete(mapping.id);
    }

    // 3️⃣ Update local store
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== questionId),
      isLoading: false,
    }));

  } catch (err: any) {
    set({ error: err.message, isLoading: false });
    throw err;
  }
},



}));

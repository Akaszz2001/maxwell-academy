import { create } from "zustand";
import pb from "../services/pocketbase";

type AnswerMap = Record<string, string>; // { questionId: "a" }

interface ExamSessionState {
  examId: string | null;
  examName: string | null;
  duration: number;
  answers: AnswerMap;
  setExam: (id: string, duration: number, name: string) => void;
  saveAnswer: (qId: string, ans: string) => void;
  finishExam: (examId: string) => Promise<void>;
}

export const useExamSessionStore = create<ExamSessionState>((set, get) => ({
  examId: null,
  examName: null,
  duration: 0,
  answers: {},

  setExam: (id, duration, name) => {
    // Try to restore saved answers from localStorage
    const saved = localStorage.getItem(`exam_${id}_answers`);
    const restoredAnswers = saved ? JSON.parse(saved) : {};
  
    set({
      examId: id,
      duration,
      examName: name,
      answers: restoredAnswers, // ✅ restore instead of {}
    });
  },
  
  saveAnswer: (qId, ans) =>
    set((state) => ({
      answers: { ...state.answers, [qId]: ans },
    })),

  // ✅ FINISH exam & save to DB
  finishExam: async (examId) => {
    const { answers } = get();
    const userId = pb.authStore.model?.id;
    if (!userId) throw new Error("Not logged in");

    // 1️⃣ ensure attempt exists
    let attempt;
    try {
      attempt = await pb
        .collection("exam_attempts")
        .getFirstListItem(`examId="${examId}" && studentId="${userId}"`);
    } catch {
      attempt = await pb.collection("exam_attempts").create({
        examId,
        studentId: userId,
        startedAt: new Date(),
        status: "in_progress",
      });
    }

    // 2️⃣ insert/update answers
    for (const [qId, ans] of Object.entries(answers)) {
      try {
        // if answer exists update else create
        const existing = await pb
          .collection("exam_answers")
          .getFirstListItem(
            `examId="${examId}" && studentId="${userId}" && questionId="${qId}"`
          );
        await pb.collection("exam_answers").update(existing.id, {
          answer: ans,
          submittedAt: new Date(),
          isFinal: true,
        });
      } catch {
        await pb.collection("exam_answers").create({
          examId,
          studentId: userId,
          questionId: qId,
          answer: ans,
          submittedAt: new Date(),
          isFinal: true,
        });
      }
    }

    // 3️⃣ mark attempt finished
    await pb.collection("exam_attempts").update(attempt.id, {
      status: "completed",
      endedAt: new Date(),
    });

    // clear local state
    set({ examId: null, examName: null, duration: 0, answers: {} });
  },
}));

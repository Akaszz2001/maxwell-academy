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
  // finishExam: async (examId) => {
  //   const { answers } = get();
  //   const userId = pb.authStore.model?.id;
  //   if (!userId) throw new Error("Not logged in");

  //   // 1️⃣ ensure attempt exists
  //   let attempt;
  //   try {
  //     attempt = await pb
  //       .collection("exam_attempts")
  //       .getFirstListItem(`examId="${examId}" && studentId="${userId}"`);
  //   } catch {
  //     attempt = await pb.collection("exam_attempts").create({
  //       examId,
  //       studentId: userId,
  //       startedAt: new Date(),
  //       status: "in_progress",
  //     });
  //   }

  //   // 2️⃣ insert/update answers
  //   for (const [qId, ans] of Object.entries(answers)) {
  //     try {
  //       // if answer exists update else create
  //       const existing = await pb
  //         .collection("exam_answers")
  //         .getFirstListItem(
  //           `examId="${examId}" && studentId="${userId}" && questionId="${qId}"`
  //         );
  //       await pb.collection("exam_answers").update(existing.id, {
  //         answer: ans,
  //         submittedAt: new Date(),
  //         isFinal: true,
  //       });
  //     } catch {
  //       await pb.collection("exam_answers").create({
  //         examId,
  //         studentId: userId,
  //         questionId: qId,
  //         answer: ans,
  //         submittedAt: new Date(),
  //         isFinal: true,
  //       });
  //     }
  //   }

  //   // 3️⃣ mark attempt finished
  //   await pb.collection("exam_attempts").update(attempt.id, {
  //     status: "completed",
  //     endedAt: new Date(),
  //   });

  //   // clear local state
  //   set({ examId: null, examName: null, duration: 0, answers: {} });
  // },

  // ✅ FINISH exam & save to DB with scoring
// finishExam: async (examId) => {
//   const { answers } = get();
//   const userId = pb.authStore.model?.id;
//   if (!userId) throw new Error("Not logged in");

//   // 1️⃣ ensure attempt exists
//   let attempt;
//   try {
//     attempt = await pb
//       .collection("exam_attempts")
//       .getFirstListItem(`examId="${examId}" && studentId="${userId}"`);
//   } catch {
//     attempt = await pb.collection("exam_attempts").create({
//       examId,
//       studentId: userId,
//       startedAt: new Date(),
//       status: "in_progress",
//     });
//   }

//   let score = 0;

//   // 2️⃣ insert/update answers + calculate score
//   for (const [qId, ans] of Object.entries(answers)) {
//     // 🔍 fetch correct answer from questions collection
//     const question = await pb.collection("questions").getOne(qId);

//     // compare ignoring case & spaces
//     if (question.answer?.toLowerCase().trim() === ans.toLowerCase().trim()) {
//       score++;
//     }

//     try {
//       // if answer exists update else create
//       const existing = await pb
//         .collection("exam_answers")
//         .getFirstListItem(
//           `examId="${examId}" && studentId="${userId}" && questionId="${qId}"`
//         );
//       await pb.collection("exam_answers").update(existing.id, {
//         answer: ans,
//         submittedAt: new Date(),
//         isFinal: true,
//       });
//     } catch {
//       await pb.collection("exam_answers").create({
//         examId,
//         studentId: userId,
//         questionId: qId,
//         answer: ans,
//         submittedAt: new Date(),
//         isFinal: true,
//       });
//     }
//   }

//   // 3️⃣ mark attempt finished + save score
//   await pb.collection("exam_attempts").update(attempt.id, {
//     status: "completed",
//     endedAt: new Date(),
//     score, // ✅ total correct answers
//   });

//   // clear local state
//   set({ examId: null, examName: null, duration: 0, answers: {} });
// }


// finishExam: async (examId) => {
//   const { answers } = get();
//   const userId = pb.authStore.model?.id;
//   if (!userId) throw new Error("Not logged in");

//   // 1️⃣ ensure attempt exists
//   let attempt;
//   try {
//     attempt = await pb
//       .collection("exam_attempts")
//       .getFirstListItem(`examId="${examId}" && studentId="${userId}"`);
//   } catch {
//     attempt = await pb.collection("exam_attempts").create({
//       examId,
//       studentId: userId,
//       startedAt: new Date(),
//       status: "in_progress",
//     });
//   }
  
//   let score = 0;

//   // 🔍 fetch all exam questions first
//   const allQuestions = await pb.collection("questions").getFullList({
//     filter: `examId="${examId}"`,
//   });

//   // 2️⃣ iterate over every question
//   for (const question of allQuestions) {
//     const qId = question.id;
//     const ans = answers[qId] || "not answered"; // 👈 default if skipped

//     // compare ignoring case & spaces
//     if (
//       ans !== "not answered" &&
//       question.answer?.toLowerCase().trim() === ans.toLowerCase().trim()
//     ) {
//       score++;
//     }

//     try {
//       // if answer exists update else create
//       const existing = await pb
//         .collection("exam_answers")
//         .getFirstListItem(
//           `examId="${examId}" && studentId="${userId}" && questionId="${qId}"`
//         );
//       await pb.collection("exam_answers").update(existing.id, {
//         answer: ans,
//         submittedAt: new Date(),
//         isFinal: true,
//       });
//     } catch {
//       await pb.collection("exam_answers").create({
//         examId,
//         studentId: userId,
//         questionId: qId,
//         answer: ans,
//         submittedAt: new Date(),
//         isFinal: true,
//       });
//     }
//   }

//   // 3️⃣ mark attempt finished + save score
//   await pb.collection("exam_attempts").update(attempt.id, {
//     status: "completed",
//     endedAt: new Date(),
//     score,
//   });

//   // clear local state
//   set({ examId: null, examName: null, duration: 0, answers: {} });
// }

  // finishExam: async (examId) => {
  //   const { answers } = get();
  //   const userId = pb.authStore.model?.id;
  //   if (!userId) throw new Error("Not logged in");

  //   // 1️⃣ ensure attempt exists
  //   let attempt;
  //   try {
  //     attempt = await pb
  //       .collection("exam_attempts")
  //       .getFirstListItem(`examId="${examId}" && studentId="${userId}"`);
  //   } catch {
  //     attempt = await pb.collection("exam_attempts").create({
  //       examId,
  //       studentId: userId,
  //       startedAt: new Date(),
  //       status: "in_progress",
  //     });
  //   }

  //   let score = 0;

  //   // 🔍 fetch all active exam_questions for this exam
  //   const examQuestions = await pb.collection("exam_questions").getFullList({
  //     filter: `examId="${examId}" && isActive=true`,
  //   });

  //   const questionIds = examQuestions.map((eq) => eq.questionId);

  //   if (questionIds.length === 0) {
  //     throw new Error("No active questions found for this exam");
  //   }

  //   // get the actual questions by IDs
  //   const allQuestions = await pb.collection("questions").getFullList({
  //     filter: questionIds.map((id) => `id="${id}"`).join(" || "),
  //   });

  //   // 2️⃣ iterate over every question
  //   for (const question of allQuestions) {
  //     const qId = question.id;
  //     const ans = answers[qId] || "not answered"; // default if skipped

  //     if (
  //       ans !== "not answered" &&
  //       question.answer?.toLowerCase().trim() === ans.toLowerCase().trim()
  //     ) {
  //       score++;
  //     }

  //     try {
  //       const existing = await pb
  //         .collection("exam_answers")
  //         .getFirstListItem(
  //           `examId="${examId}" && studentId="${userId}" && questionId="${qId}"`
  //         );

  //       await pb.collection("exam_answers").update(existing.id, {
  //         answer: ans,
  //         submittedAt: new Date(),
  //         isFinal: true,
  //       });
  //     } catch {
  //       await pb.collection("exam_answers").create({
  //         examId,
  //         studentId: userId,
  //         questionId: qId,
  //         answer: ans,
  //         submittedAt: new Date(),
  //         isFinal: true,
  //       });
  //     }
  //   }

  //   // 3️⃣ mark attempt finished + save score
  //   await pb.collection("exam_attempts").update(attempt.id, {
  //     status: "completed",
  //     endedAt: new Date(),
  //     score,
  //   });

  //   // clear local state
  //   set({ examId: null, examName: null, duration: 0, answers: {} });
  // }


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

  // 🔍 fetch exam details to get mark & negMark
  const exam = await pb.collection("exams").getOne(examId);
  const mark = Number(exam.mark) || 0;
  const negMark = Number(exam.negMark) || 0;

  let score = 0;

  // 🔍 fetch all active exam_questions for this exam
  const examQuestions = await pb.collection("exam_questions").getFullList({
    filter: `examId="${examId}" && isActive=true`,
  });

  const questionIds = examQuestions.map((eq) => eq.questionId);

  if (questionIds.length === 0) {
    throw new Error("No active questions found for this exam");
  }

  // get the actual questions by IDs
  const allQuestions = await pb.collection("questions").getFullList({
    filter: questionIds.map((id) => `id="${id}"`).join(" || "),
  });

  // 2️⃣ iterate over every question
  for (const question of allQuestions) {
    const qId = question.id;
    const ans = answers[qId] || "not answered"; // default if skipped

    if (
      ans !== "not answered" &&
      question.answer?.toLowerCase().trim() === ans.toLowerCase().trim()
    ) {
      score += mark; // ✅ correct answer
    } else {
      score -= negMark; // ❌ wrong or unanswered
    }

    try {
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

  // 3️⃣ mark attempt finished + save score
  await pb.collection("exam_attempts").update(attempt.id, {
    status: "completed",
    endedAt: new Date(),
    score,
  });

  // clear local state
  set({ examId: null, examName: null, duration: 0, answers: {} });
}

}));

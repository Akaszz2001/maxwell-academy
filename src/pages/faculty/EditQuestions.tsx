// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// import { toast } from "react-toastify";
// import { useQuestionStore } from "@/store/questionStore";
// import pb from "@/services/pocketbase";

// export default function EditQuestions() {
//   const { examId } = useParams<{ examId: string }>();
//   const navigate = useNavigate();

//   const { getQuestionsByExam,updateQuestion,deactivateQuestion  } =
//     useQuestionStore()

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const [activeQuestions, setActiveQuestions] = useState<any[]>([]);
// const [otherQuestions, setOtherQuestions] = useState<any[]>([]);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [questions, setQuestions] = useState<any[]>([]);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);


// //   if (examId) {
// //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
// //     getQuestionsByExam(examId).then(setQuestions).catch((err) => {
// //       toast.error("Failed to load questions");
// //     });

// //     console.log("QUESTIONS EDITING ",questions);
    
// //   }
// // }, [examId, getQuestionsByExam]);

// const fetchQuestions = async () => {
//   if (!examId) return;
//   try {
//     const { active, others } = await getQuestionsByExam(examId);
//     setActiveQuestions(active);
//     setOtherQuestions(others);
//   } catch {
//     toast.error("Failed to load questions");
//   }
// };

// useEffect(() => {
//   fetchQuestions();
// }, [examId, getQuestionsByExam]);




// // const handleDeactivate = async (id: string) => {
// //   try {
// //     await deactivateQuestion(examId!, id);
// //     setActiveQuestions(prev => prev.filter(q => q.id !== id));
// //     toast.success("Deactivated ✅");
// //   } catch (error) {
// //     toast.error("Failed ❌");
// //   }
// // };

// const handleDeactivate = async (id: string) => {
//   try {
//     await deactivateQuestion(examId!, id);
//     toast.success("Deactivated ✅");
//     await fetchQuestions(); // 🔄 refresh
//   } catch {
//     toast.error("Failed ❌");
//   }
// };


// // const handleActivate = async (id: string) => {
// //   try {
// //     await pb.collection("exam_questions").create({
// //       examId,
// //       questionId: id,
// //       isActive: true,
// //     });
// //     toast.success("Activated ✅");
// //     // move it into activeQuestions list
// //     setOtherQuestions(prev => prev.filter(q => q.id !== id));
// //   } catch (error) {
// //     toast.error("Failed ❌");
// //   }
// // };


// const handleActivate = async (id: string) => {
//   try {
//     await pb.collection("exam_questions").create({
//       examId,
//       questionId: id,
//       isActive: true,
//     });
//     toast.success("Activated ✅");
//     await fetchQuestions(); // 🔄 refresh
//   } catch {
//     toast.error("Failed ❌");
//   }
// };

//   // const handleOptionChange = (
//   //   qIndex: number,
//   //   optIndex: number,
//   //   value: string
//   // ) => {
//   //   setQuestions((prev) =>
//   //     prev.map((q, i) =>
//   //       i === qIndex
//   //         ? {
//   //             ...q,
//   //             options: q.options.map((opt: string, oi: number) =>
//   //               oi === optIndex ? value : opt
//   //             ),
//   //           }
//   //         : q
//   //     )
//   //   );
//   // };
// const handleChange = (
//   qIndex: number,
//   field: string,
//   value: string
// ) => {
//   setActiveQuestions((prev) =>
//     prev.map((q, i) =>
//       i === qIndex ? { ...q, [field]: value } : q
//     )
//   );
// };

// const handleOptionChange = (
//   qIndex: number,
//   optIndex: number,
//   value: string
// ) => {
//   setActiveQuestions((prev) =>
//     prev.map((q, i) =>
//       i === qIndex
//         ? {
//             ...q,
//             [`option${String.fromCharCode(65 + optIndex)}`]: value,
//           }
//         : q
//     )
//   );
// };

// // const handleSave = async () => {
// //   try {
// //     for (const q of questions) {
// //       await updateQuestion(q.id, {
// //         questionText: q.questionText,
// //         optionA: q.optionA,
// //         optionB: q.optionB,
// //         optionC: q.optionC,
// //         optionD: q.optionD,
// //         answer: q.answer,
// //       });
// //     }
// //     toast.success("All changes saved ✅");
// //   } catch (err) {
// //     toast.error("Failed to save changes ❌");
// //   }
// // };

// // const handleSave = async () => {
// //   try {
// //     for (const q of activeQuestions) {
// //       await updateQuestion(q.id, {
// //         questionText: q.questionText,
// //         optionA: q.optionA,
// //         optionB: q.optionB,
// //         optionC: q.optionC,
// //         optionD: q.optionD,
// //         answer: q.answer,
// //       });
// //     }
// //     toast.success("All changes saved ✅");
// //   } catch (err) {
// //     toast.error("Failed to save changes ❌");
// //   }
// // };

// const handleSave = async () => {
//   try {
//     for (const q of activeQuestions) {
//       await updateQuestion(q.id, {
//         questionText: q.questionText,
//         optionA: q.optionA,
//         optionB: q.optionB,
//         optionC: q.optionC,
//         optionD: q.optionD,
//         answer: q.answer,
//       });
//     }
//     toast.success("All changes saved ✅");
//     await fetchQuestions(); // 🔄 refresh
//   } catch {
//     toast.error("Failed to save changes ❌");
//   }
// };


// return (
//   <div className="p-6 bg-gray-50 min-h-screen">
//     <h2 className="text-2xl font-bold mb-6 text-center">
//       Edit Questions
//     </h2>

//     {/* ✅ Active Questions */}
//     <h3 className="text-lg font-semibold mb-2">Active Questions</h3>
//     <div className="overflow-x-auto mb-8">
//       <table className="min-w-full border rounded-lg bg-white">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="px-4 py-2 text-left">Question</th>
//             <th className="px-4 py-2 text-left">Options</th>
//             <th className="px-4 py-2 text-left">Answer</th>
//             <th className="px-4 py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {activeQuestions.map((q, qIndex) => (
//             <tr key={q.id} className="border-t">
//               {/* Question */}
//               <td className="px-4 py-2 align-top">
//                 {q.type === "image" ? (
//                   <img
//                     src={q.image}
//                     alt="question"
//                     className="h-20 w-20 object-cover cursor-pointer"
//                     onClick={() => setSelectedImage(q.image)}
//                   />
//                 ) : (
//                   <input
//                     type="text"
//                     value={q.questionText}
//                     onChange={(e) =>
//                       handleChange(qIndex, "question", e.target.value)
//                     }
//                     className="border p-2 w-full rounded"
//                   />
//                 )}
//               </td>

//               {/* Options */}
//               <td className="px-4 py-2 align-top">
//                 {q.type === "image" ? (
//                   <div className="text-gray-500">N/A</div>
//                 ) : (
//                   <div className="space-y-2">
//                     {[q.optionA, q.optionB, q.optionC, q.optionD].map(
//                       (opt, oi) => (
//                         <input
//                           key={oi}
//                           type="text"
//                           value={opt}
//                           onChange={(e) =>
//                             handleOptionChange(qIndex, oi, e.target.value)
//                           }
//                           className="border p-2 w-full rounded"
//                         />
//                       )
//                     )}
//                   </div>
//                 )}
//               </td>

//               {/* Answer */}
//               <td className="px-4 py-2 align-top">
//                 <input
//                   type="text"
//                   value={q.answer}
//                   onChange={(e) =>
//                     handleChange(qIndex, "answer", e.target.value)
//                   }
//                   className="border p-2 w-full rounded"
//                 />
//               </td>

//               {/* Action */}
//               <td className="px-4 py-2 text-center">
//                 <button
//                   onClick={() => handleDeactivate(q.id)}
//                   className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                 >
//                   Deactivate
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>

//     {/* ✅ Other Questions */}
//     <h3 className="text-lg font-semibold mb-2">Other Questions</h3>
//     <div className="overflow-x-auto">
//       <table className="min-w-full border rounded-lg bg-white">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="px-4 py-2 text-left">Question</th>
//             <th className="px-4 py-2 text-left">Options</th>
//             <th className="px-4 py-2 text-left">Answer</th>
//             <th className="px-4 py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {otherQuestions.map((q) => (
//             <tr key={q.id} className="border-t">
//               {/* Question */}
//               <td className="px-4 py-2 align-top">
//                 {q.type === "image" ? (
//                   <img
//                     src={q.image}
//                     alt="question"
//                     className="h-20 w-20 object-cover cursor-pointer"
//                     onClick={() => setSelectedImage(q.image)}
//                   />
//                 ) : (
//                   <span>{q.questionText}</span>
//                 )}
//               </td>

//               {/* Options */}
//               <td className="px-4 py-2 align-top">
//                 {q.type === "image" ? (
//                   <div className="text-gray-500">N/A</div>
//                 ) : (
//                   <div className="space-y-1 text-gray-700">
//                     <div>{q.optionA}</div>
//                     <div>{q.optionB}</div>
//                     <div>{q.optionC}</div>
//                     <div>{q.optionD}</div>
//                   </div>
//                 )}
//               </td>

//               {/* Answer */}
//               <td className="px-4 py-2 align-top">{q.answer}</td>

//               {/* Action */}
//               <td className="px-4 py-2 text-center">
//                 <button
//                   onClick={() => handleActivate( q.id)}
//                   className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   Activate
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>

//     {/* Modal for Image Preview */}
//     {selectedImage && (
//       <div
//         className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
//         onClick={() => setSelectedImage(null)}
//       >
//         <img
//           src={selectedImage}
//           alt="preview"
//           className="max-w-3xl max-h-[80vh] rounded shadow-lg"
//         />
//       </div>
//     )}

//     {/* Footer Buttons */}
//     <div className="mt-6 flex justify-between">
//       <button
//         onClick={() =>
//           navigate(`/faculty/dashboard/exams/${examId}/questions/add`)
//         }
//         className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//       >
//         Add Question
//       </button>

//       <div className="flex gap-3">
//         <button
//           onClick={handleSave}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Save Changes
//         </button>
//         <button
//           onClick={() => navigate("/faculty/dashboard/")}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           Finish
//         </button>
//       </div>
//     </div>
//   </div>
// );



// }





/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// import { toast } from "react-toastify";
// import { useQuestionStore } from "@/store/questionStore";
// import pb from "@/services/pocketbase";
// import { Button } from "@/components/ui/button";

// export default function EditQuestions() {
//   const { examId } = useParams<{ examId: string }>();
//   const navigate = useNavigate();

//   const { getQuestionsByExam, updateQuestion, deactivateQuestion } =
//     useQuestionStore();

//   const [activeQuestions, setActiveQuestions] = useState<any[]>([]);
//   const [otherQuestions, setOtherQuestions] = useState<any[]>([]);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   const fetchQuestions = async () => {
//     if (!examId) return;
//     try {
//       const { active, others } = await getQuestionsByExam(examId);
//       setActiveQuestions(active);
//       setOtherQuestions(others);
//     } catch {
//       toast.error("Failed to load questions");
//     }
//   };

//   useEffect(() => {
//     fetchQuestions();
//   }, [examId, getQuestionsByExam]);

//   const handleDeactivate = async (id: string) => {
//     try {
//       await deactivateQuestion(examId!, id);
//       toast.success("Deactivated ✅");
//       await fetchQuestions();
//     } catch {
//       toast.error("Failed ❌");
//     }
//   };

//   const handleActivate = async (id: string) => {
//     try {
//       await pb.collection("exam_questions").create({
//         examId,
//         questionId: id,
//         isActive: true,
//       });
//       toast.success("Activated ✅");
//       await fetchQuestions();
//     } catch {
//       toast.error("Failed ❌");
//     }
//   };

//   const handleChange = (qIndex: number, field: string, value: string) => {
//     setActiveQuestions((prev) =>
//       prev.map((q, i) => (i === qIndex ? { ...q, [field]: value } : q))
//     );
//   };

//   const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
//     setActiveQuestions((prev) =>
//       prev.map((q, i) =>
//         i === qIndex
//           ? {
//               ...q,
//               [`option${String.fromCharCode(65 + optIndex)}`]: value,
//             }
//           : q
//       )
//     );
//   };

//   const handleSave = async () => {
//     try {
//       for (const q of activeQuestions) {
//         await updateQuestion(q.id, {
//           questionText: q.questionText,
//           optionA: q.optionA,
//           optionB: q.optionB,
//           optionC: q.optionC,
//           optionD: q.optionD,
//           answer: q.answer,
//         });
//       }
//       toast.success("All changes saved ✅");
//       await fetchQuestions();
//     } catch {
//       toast.error("Failed to save changes ❌");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen max-w-7xl mx-auto">
//       <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
//         Edit Questions
//       </h2>

//       {/* Active Questions */}
//       <section className="mb-12">
//         <h3 className="text-xl font-semibold mb-4">Active Questions</h3>
//         <div className="overflow-x-auto rounded-lg shadow-md bg-white">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 text-left">Question</th>
//                 <th className="px-4 py-2 text-left">Options</th>
//                 <th className="px-4 py-2 text-left">Answer</th>
//                 <th className="px-4 py-2 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {activeQuestions.map((q, qIndex) => (
//                 <tr key={q.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-4 py-2 align-top">
//                     {q.type === "image" ? (
//                       <img
//                         src={q.image}
//                         alt="question"
//                         className="h-24 w-24 object-cover rounded-lg cursor-pointer shadow-sm hover:scale-105 transition-transform"
//                         onClick={() => setSelectedImage(q.image)}
//                       />
//                     ) : (
//                       <input
//                         type="text"
//                         value={q.questionText}
//                         onChange={(e) =>
//                           handleChange(qIndex, "questionText", e.target.value)
//                         }
//                         className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
//                       />
//                     )}
//                   </td>
//                   <td className="px-4 py-2 align-top">
//                     {q.type === "image" ? (
//                       <span className="text-gray-500">N/A</span>
//                     ) : (
//                       <div className="space-y-2">
//                         {[q.optionA, q.optionB, q.optionC, q.optionD].map(
//                           (opt, oi) => (
//                             <input
//                               key={oi}
//                               type="text"
//                               value={opt}
//                               onChange={(e) =>
//                                 handleOptionChange(qIndex, oi, e.target.value)
//                               }
//                               className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
//                             />
//                           )
//                         )}
//                       </div>
//                     )}
//                   </td>
//                   <td className="px-4 py-2 align-top">
//                     <input
//                       type="text"
//                       value={q.answer}
//                       onChange={(e) =>
//                         handleChange(qIndex, "answer", e.target.value)
//                       }
//                       className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
//                     />
//                   </td>
//                   <td className="px-4 py-2 text-center">
//                     <button
//                       onClick={() => handleDeactivate(q.id)}
//                       className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//                     >
//                       Deactivate
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       {/* Other Questions */}
//       <section className="mb-12">
//         <h3 className="text-xl font-semibold mb-4">Other Questions</h3>
//         <div className="overflow-x-auto rounded-lg shadow-md bg-white">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 text-left">Question</th>
//                 <th className="px-4 py-2 text-left">Options</th>
//                 <th className="px-4 py-2 text-left">Answer</th>
//                 <th className="px-4 py-2 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {otherQuestions.map((q) => (
//                 <tr key={q.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-4 py-2 align-top">
//                     {q.type === "image" ? (
//                       <img
//                         src={q.image}
//                         alt="question"
//                         className="h-24 w-24 object-cover rounded-lg cursor-pointer shadow-sm hover:scale-105 transition-transform"
//                         onClick={() => setSelectedImage(q.image)}
//                       />
//                     ) : (
//                       <span>{q.questionText}</span>
//                     )}
//                   </td>
//                   <td className="px-4 py-2 align-top">
//                     {q.type === "image" ? (
//                       <span className="text-gray-500">N/A</span>
//                     ) : (
//                       <div className="space-y-1 text-gray-700">
//                         <div>{q.optionA}</div>
//                         <div>{q.optionB}</div>
//                         <div>{q.optionC}</div>
//                         <div>{q.optionD}</div>
//                       </div>
//                     )}
//                   </td>
//                   <td className="px-4 py-2 align-top">{q.answer}</td>
//                   <td className="px-4 py-2 text-center">
//                     <button
//                       onClick={() => handleActivate(q.id)}
//                       className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//                     >
//                       Activate
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       {/* Image Preview Modal */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50"
//           onClick={() => setSelectedImage(null)}
//         >
//           <img
//             src={selectedImage}
//             alt="preview"
//             className="max-w-3xl max-h-[80vh] rounded-lg shadow-lg"
//           />
//         </div>
//       )}

//       {/* Footer Buttons */}
//       <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
//         <button
//           onClick={() =>
//             navigate(`/faculty/dashboard/exams/${examId}/questions/add`)
//           }
//           className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition w-full md:w-auto"
//         >
//           Add Question
//         </button>

//         <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
//           <button
//             onClick={handleSave}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full md:w-auto"
//           >
//             Save Changes
//           </button>
//           <button
//             onClick={() => navigate("/faculty/dashboard/")}
//             className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full md:w-auto"
//           >
//             Finish
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useQuestionStore } from "@/store/questionStore";
import pb from "@/services/pocketbase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function EditQuestions() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();

  const { getQuestionsByExam, updateQuestion, deactivateQuestion } =
    useQuestionStore();

  const [activeQuestions, setActiveQuestions] = useState<any[]>([]);
  const [otherQuestions, setOtherQuestions] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fetchQuestions = async () => {
    if (!examId) return;
    try {
      const { active, others } = await getQuestionsByExam(examId);
      setActiveQuestions(active);
      setOtherQuestions(others);
    } catch {
      toast.error("Failed to load questions");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [examId, getQuestionsByExam]);

  const handleDeactivate = async (id: string) => {
    try {
      await deactivateQuestion(examId!, id);
      toast.success("Deactivated ✅");
      await fetchQuestions();
    } catch {
      toast.error("Failed ❌");
    }
  };

  const handleActivate = async (id: string) => {
    try {
      await pb.collection("exam_questions").create({
        examId,
        questionId: id,
        isActive: true,
      });
      toast.success("Activated ✅");
      await fetchQuestions();
    } catch {
      toast.error("Failed ❌");
    }
  };

  const handleChange = (qIndex: number, field: string, value: string) => {
    setActiveQuestions((prev) =>
      prev.map((q, i) => (i === qIndex ? { ...q, [field]: value } : q))
    );
  };

  const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
    setActiveQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              [`option${String.fromCharCode(65 + optIndex)}`]: value,
            }
          : q
      )
    );
  };

  const handleSave = async () => {
    try {
      for (const q of activeQuestions) {
        await updateQuestion(q.id, {
          questionText: q.questionText,
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
          answer: q.answer,
        });
      }
      toast.success("All changes saved ✅");
      await fetchQuestions();
    } catch {
      toast.error("Failed to save changes ❌");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-7xl mx-auto">
      {/* Header with Back & Dashboard */}
      <div className="flex justify-between items-center mb-6">
        {/* <button
          onClick={() => navigate(-1)}
          className="px-3 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        >
        <ArrowLeft/>  Back
        </button> */}
            <Button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  <ArrowLeft className="w-5 h-5" /> Back
                </Button>
        
         <Button
          asChild
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Link to="/faculty/dashboard">
            <Home className="w-5 h-5" /> Dashboard
          </Link>
        </Button>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Edit Questions
      </h2>

      {/* Active Questions */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Active Questions</h3>
        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Question</th>
                <th className="px-4 py-2 text-left">Options</th>
                <th className="px-4 py-2 text-left">Answer</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activeQuestions.map((q, qIndex) => (
                <tr key={q.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2 align-top">
                    {q.type === "image" ? (
                      <img
                        src={q.image}
                        alt="question"
                        className="h-24 w-24 object-cover rounded-lg cursor-pointer shadow-sm hover:scale-105 transition-transform"
                        onClick={() => setSelectedImage(q.image)}
                      />
                    ) : (
                      <input
                        type="text"
                        value={q.questionText}
                        onChange={(e) =>
                          handleChange(qIndex, "questionText", e.target.value)
                        }
                        className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 align-top">
                    {q.type === "image" ? (
                      <span className="text-gray-500">N/A</span>
                    ) : (
                      <div className="space-y-2">
                        {[q.optionA, q.optionB, q.optionC, q.optionD].map(
                          (opt, oi) => (
                            <input
                              key={oi}
                              type="text"
                              value={opt}
                              onChange={(e) =>
                                handleOptionChange(qIndex, oi, e.target.value)
                              }
                              className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
                            />
                          )
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 align-top">
                    <input
                      type="text"
                      value={q.answer}
                      onChange={(e) =>
                        handleChange(qIndex, "answer", e.target.value)
                      }
                      className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeactivate(q.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Other Questions */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Other Questions</h3>
        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Question</th>
                <th className="px-4 py-2 text-left">Options</th>
                <th className="px-4 py-2 text-left">Answer</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {otherQuestions.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2 align-top">
                    {q.type === "image" ? (
                      <img
                        src={q.image}
                        alt="question"
                        className="h-24 w-24 object-cover rounded-lg cursor-pointer shadow-sm hover:scale-105 transition-transform"
                        onClick={() => setSelectedImage(q.image)}
                      />
                    ) : (
                      <span>{q.questionText}</span>
                    )}
                  </td>
                  <td className="px-4 py-2 align-top">
                    {q.type === "image" ? (
                      <span className="text-gray-500">N/A</span>
                    ) : (
                      <div className="space-y-1 text-gray-700">
                        <div>{q.optionA}</div>
                        <div>{q.optionB}</div>
                        <div>{q.optionC}</div>
                        <div>{q.optionD}</div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 align-top">{q.answer}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleActivate(q.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Activate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="preview"
            className="max-w-3xl max-h-[80vh] rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Footer Buttons */}
      <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
        <button
          onClick={() =>
            navigate(`/faculty/dashboard/exams/${examId}/questions/add`)
          }
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition w-full md:w-auto"
        >
          Add Question
        </button>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full md:w-auto"
          >
            Save Changes
          </button>
          <button
            onClick={() => navigate("/faculty/dashboard/")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full md:w-auto"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}

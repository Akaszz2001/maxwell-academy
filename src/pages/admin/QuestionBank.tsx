



// import { useState, useEffect } from "react";
// import { useQuestionStore } from "@/store/questionStore";
// import { FileDown } from "lucide-react";
// import { generatePDF } from "@/services/pdfGenerator";

// export default function QuestionBank() {
//   const {
//     getUniqueSubjects,
//     getUniqueClassesBySubject,
//     getUniqueTopics,
//     getQuestionsBySubjectClassTopic, // <-- New store function
//   } = useQuestionStore();

//   const [subjects, setSubjects] = useState<string[]>([]);
//   const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
//   const [classes, setClasses] = useState<string[]>([]);
//   const [selectedClass, setSelectedClass] = useState<string | null>(null);
//   const [topics, setTopics] = useState<string[]>([]);
//   const [loadingTopic, setLoadingTopic] = useState<string | null>(null);

//   useEffect(() => {
//     getUniqueSubjects().then(setSubjects);
//   }, [getUniqueSubjects]);

//   const handleSubjectClick = async (subject: string) => {
//     setSelectedSubject(subject);
//     setSelectedClass(null);
//     setTopics([]);
//     const cls = await getUniqueClassesBySubject(subject);
//     setClasses(cls);
//   };

//   const handleClassClick = async (cls: string) => {
//     setSelectedClass(cls);
//     const tps = await getUniqueTopics(selectedSubject!, cls);
//     setTopics(tps);
//   };

//   const handleDownload = async (topic: string) => {
//     if (!selectedSubject || !selectedClass) return;
//     setLoadingTopic(topic);

//     try {
//       const questions = await getQuestionsBySubjectClassTopic(
//         selectedSubject,
//         selectedClass,
//         topic
//       );
//       await generatePDF(selectedSubject,topic,selectedClass,questions)
//     } catch (err) {
//       console.error("Error generating PDF:", err);
//     } finally {
//       setLoadingTopic(null);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Subjects</h1>

//       {/* Subjects */}
//       <ul className="space-y-2 mb-6">
//         {subjects.map((subj) => (
//           <li
//             key={subj}
//             onClick={() => handleSubjectClick(subj)}
//             className={`cursor-pointer p-3 rounded ${
//               selectedSubject === subj
//                 ? "bg-blue-100 border border-blue-400"
//                 : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             {subj}
//           </li>
//         ))}
//       </ul>

//       {/* Classes */}
//       {selectedSubject && (
//         <>
//           <h2 className="text-xl font-semibold mb-3">
//             Classes for {selectedSubject}
//           </h2>
//           <ul className="space-y-2 mb-6">
//             {classes.map((cls) => (
//               <li
//                 key={cls}
//                 onClick={() => handleClassClick(cls)}
//                 className={`cursor-pointer p-3 rounded ${
//                   selectedClass === cls
//                     ? "bg-green-100 border border-green-400"
//                     : "bg-gray-100 hover:bg-gray-200"
//                 }`}
//               >
//                 {cls}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {/* Topics with download button */}
//       {selectedClass && (
//         <>
//           <h3 className="text-lg font-semibold mb-3">
//             Topics for {selectedClass}
//           </h3>
//           <ul className="space-y-2">
//             {topics.map((tp) => (
//               <li
//                 key={tp}
//                 className="flex justify-between items-center bg-gray-100 p-3 rounded"
//               >
//                 <span>{tp}</span>
//                 <button
//                   onClick={() => handleDownload(tp)}
//                   className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
//                   disabled={loadingTopic === tp}
//                 >
//                   <FileDown size={18} />
//                   {loadingTopic === tp ? "Downloading..." : "Download"}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { useQuestionStore } from "@/store/questionStore";
import { FileDown } from "lucide-react";
import { generatePDF } from "@/services/pdfGenerator";

export default function QuestionBank() {
  const {
    getUniqueSubjects,
    getUniqueClassesBySubject,
    getUniqueTopics,
    getQuestionsBySubjectClassTopic,
  } = useQuestionStore();

  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [classes, setClasses] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [loadingTopic, setLoadingTopic] = useState<string | null>(null);

  useEffect(() => {
    getUniqueSubjects().then(setSubjects);
  }, [getUniqueSubjects]);

  const handleSubjectClick = async (subject: string) => {
    setSelectedSubject(subject);
    setSelectedClass(null);
    setTopics([]);
    const cls = await getUniqueClassesBySubject(subject);
    setClasses(cls);
  };

  const handleClassClick = async (cls: string) => {
    setSelectedClass(cls);
    const tps = await getUniqueTopics(selectedSubject!, cls);
    setTopics(tps);
  };

  const handleDownload = async (topic: string) => {
    if (!selectedSubject || !selectedClass) return;
    setLoadingTopic(topic);
    try {
      const questions = await getQuestionsBySubjectClassTopic(
        selectedSubject,
        selectedClass,
        topic
      );
      await generatePDF(selectedSubject, topic, selectedClass, questions);
    } catch (err) {
      console.error("Error generating PDF:", err);
    } finally {
      setLoadingTopic(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Question Bank
        </h1>

        {/* Subjects */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Subjects</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {subjects.map((subj) => (
              <div
                key={subj}
                onClick={() => handleSubjectClick(subj)}
                className={`cursor-pointer rounded-xl p-4 text-center font-medium shadow-sm transition transform hover:scale-105 ${
                  selectedSubject === subj
                    ? "bg-blue-100 text-blue-700 border border-blue-400"
                    : "bg-gray-50 text-gray-700 hover:bg-blue-50"
                }`}
              >
                {subj}
              </div>
            ))}
          </div>
        </div>

        {/* Classes */}
        {selectedSubject && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Classes for <span className="text-blue-700">{selectedSubject}</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {classes.map((cls) => (
                <div
                  key={cls}
                  onClick={() => handleClassClick(cls)}
                  className={`cursor-pointer px-5 py-2 rounded-full text-sm font-medium shadow-md transition ${
                    selectedClass === cls
                      ? "bg-green-100 text-green-700 border border-green-400"
                      : "bg-gray-100 hover:bg-green-50 text-gray-700"
                  }`}
                >
                  Class {cls}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Topics */}
        {selectedClass && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Topics for{" "}
              <span className="text-green-700">
                {selectedClass} ({selectedSubject})
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topics.map((tp) => (
                <div
                  key={tp}
                  className="flex justify-between items-center bg-gray-50 border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <span className="font-medium text-gray-700">{tp}</span>
                  <button
                    onClick={() => handleDownload(tp)}
                    disabled={loadingTopic === tp}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition ${
                      loadingTopic === tp
                        ? "bg-blue-300 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    <FileDown size={18} />
                    {loadingTopic === tp ? "Downloading..." : "Download"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

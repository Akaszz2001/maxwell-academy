/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useQuestionStore } from "@/store/questionStore";

export default function EditQuestions() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();

  const { getQuestionsByExam,updateQuestion  } =
    useQuestionStore()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
  if (examId) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getQuestionsByExam(examId).then(setQuestions).catch((err) => {
      toast.error("Failed to load questions");
    });

    console.log("QUESTIONS EDITING ",questions);
    
  }
}, [examId, getQuestionsByExam]);


  const handleChange = (
    qIndex: number,
    field: string,
    value: string
  ) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex ? { ...q, [field]: value } : q
      )
    );
  };

  const handleOptionChange = (
    qIndex: number,
    optIndex: number,
    value: string
  ) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((opt: string, oi: number) =>
                oi === optIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

const handleSave = async () => {
  try {
    for (const q of questions) {
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
  } catch (err) {
    toast.error("Failed to save changes ❌");
  }
};


  // const handleDeactivate = async (qid: string) => {
  //   await deactivateQuestion(qid);
  //   setQuestions((prev) => prev.filter((q) => q.id !== qid));
  // };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Edit Questions
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Question</th>
              <th className="px-4 py-2 text-left">Options</th>
              <th className="px-4 py-2 text-left">Answer</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, qIndex) => (
              <tr key={q.id} className="border-t">
                {/* Question */}
                <td className="px-4 py-2 align-top">
                  {q.type === "image" ? (
                    <img
                      src={q.image}
                      alt="question"
                      className="h-20 w-20 object-cover cursor-pointer"
                      onClick={() => setSelectedImage(q.image)}
                    />
                  ) : (
                    <input
                      type="text"
                      value={q.questionText}
                      onChange={(e) =>
                        handleChange(qIndex, "question", e.target.value)
                      }
                      className="border p-2 w-full rounded"
                    />
                  )}
                </td>

                {/* Options */}
                <td className="px-4 py-2 align-top">
                  {q.type === "image" ? (
                    <div className="text-gray-500">N/A</div>
                  ) : (
              <div className="space-y-2">
  {[q.optionA, q.optionB, q.optionC, q.optionD].map((opt, oi) => (
    <input
      key={oi}
      type="text"
      value={opt}
      onChange={(e) =>
        handleOptionChange(qIndex, oi, e.target.value)
      }
      className="border p-2 w-full rounded"
    />
  ))}
</div>

                  )}
                </td>

                {/* Answer */}
                <td className="px-4 py-2 align-top">
                  <input
                    type="text"
                    value={q.answer}
                    onChange={(e) =>
                      handleChange(qIndex, "answer", e.target.value)
                    }
                    className="border p-2 w-full rounded"
                  />
                </td>

                {/* Action */}
                <td className="px-4 py-2 text-center">
                  <button
                    // onClick={() => handleDeactivate(q.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Image Preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="preview"
            className="max-w-3xl max-h-[80vh] rounded shadow-lg"
          />
        </div>
      )}

      {/* Footer Buttons */}
      <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate(`/faculty/dashboard/exams/${examId}/questions/add`)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Add Question
          </button>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            onClick={() => navigate("/faculty/dashboard/myExams")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}

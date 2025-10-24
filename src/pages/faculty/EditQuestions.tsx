/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuestionStore } from "@/store/questionStore";
import pb from "@/services/pocketbase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function EditQuestions() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { getQuestionsByExam, updateQuestion, deactivateQuestion } =
    useQuestionStore();
  const { subject, topic, classs } = location.state || null;


  const [activeQuestions, setActiveQuestions] = useState<any[]>([]);
  const [otherQuestions, setOtherQuestions] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null
  );

  // search states
  const [activeSearch, setActiveSearch] = useState("");
  const [otherSearch, setOtherSearch] = useState("");
  const { user } = useAuthStore();
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
  }, [ getQuestionsByExam]);

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
    prev.map((q, i) => {
      if (i !== qIndex) return q;
      return { ...q, [field]: value ?? "" };
    })
  );
};

const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
  setActiveQuestions((prev) =>
    prev.map((q, i) => {
      if (i !== qIndex) return q;
      return {
        ...q,
        [`option${String.fromCharCode(65 + optIndex)}`]: value ?? "",
      };
    })
  );
};

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
  //     await fetchQuestions();
  //   } catch {
  //     toast.error("Failed to save changes ❌");
  //   }
  // };

  const handleSave = async (q: any) => {
    try {
      await updateQuestion(q.id, {
        questionText: q.questionText,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        subject: q.subject,
        answer: q.answer,
      });
      toast.success("Question saved ✅");
      await fetchQuestions();
    } catch {
      toast.error("Failed to save ❌");
    }
  };

  // filter functions (case-insensitive, prefix match)
  const filteredActive = activeQuestions.filter((q) =>
    q.subject?.toLowerCase().startsWith(activeSearch.toLowerCase())
  );
  const filteredOther = otherQuestions.filter((q) =>
    q.subject?.toLowerCase().startsWith(otherSearch.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
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
          <Link
            to={
              user?.role === "admin" ? "/admin/dashboard" : "/faculty/dashboard"
            }
          >
            <Home className="w-5 h-5" /> Dashboard
          </Link>
        </Button>
      </div>

      {/* Top buttons */}
      <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
        <button
          onClick={() =>
            user?.role === "admin"
              ? navigate(`/admin/dashboard/exams/${examId}/questions/add`, {
                  state: { subject: subject, topic: topic, classs: classs },
                })
              : navigate(`/faculty/dashboard/exams/${examId}/questions/add`, {
                  state: { subject: subject, topic: topic, classs: classs },
                })
          }
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition w-full md:w-auto"
        >
          Add Question
        </button>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          {/* <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full md:w-auto"
          >
            Save Changes
          </button> */}
          <button
            onClick={() =>
              navigate(
                user?.role === "admin"
                  ? "/admin/dashboard"
                  : "/faculty/dashboard"
              )
            }
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full md:w-auto"
          >
            Finish
          </button>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Edit Questions
      </h2>

      {/* Active Questions */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Active Questions</h3>

        {/* Search bar for Active */}
        <input
          type="text"
          placeholder="Search by subject..."
          value={activeSearch}
          onChange={(e) => setActiveSearch(e.target.value)}
          className="mb-4 w-full md:w-1/2 border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Question</th>
                <th className="px-4 py-2 text-left">Options</th>
                <th className="px-4 py-2 text-left">Answer</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredActive.map((q, qIndex) => (
                <tr key={q.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2 align-top">
                    {editingQuestionId === q.id ? (
                      <input
                        type="text"
                        value={q.subject}
                        onChange={(e) =>
                          handleChange(qIndex, "subject", e.target.value)
                        }
                        className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
                      />
                    ) : (
                      <span>{q.subject}</span>
                    )}
                  </td>

                  <td className="px-4 py-2 align-top">
                    {q.type === "image" ? (
                      <img
                        src={q.image}
                        alt="question"
                        className="h-24 w-24 object-cover rounded-lg cursor-pointer shadow-sm hover:scale-105 transition-transform"
                        onClick={() => setSelectedImage(q.image)}
                      />
                    ) : (
                      <td className="px-4 py-2 align-top">
                        {editingQuestionId === q.id ? (
                          <input
                            type="text"
                            value={q.questionText}
                            onChange={(e) =>
                              handleChange(
                                qIndex,
                                "questionText",
                                e.target.value
                              )
                            }
                            className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
                          />
                        ) : (
                          <span>{q.questionText}</span>
                        )}
                      </td>
                    )}
                  </td>
                  <td className="px-4 py-2 align-top">
                    {q.type === "image" ? (
                      <span className="text-gray-500">N/A</span>
                    ) : (
                      <td className="px-4 py-2 align-top">
                        {editingQuestionId === q.id ? (
                          <div className="space-y-2">
                            {[q.optionA, q.optionB, q.optionC, q.optionD].map(
                              (opt, oi) => (
                                <input
                                  key={oi}
                                  type="text"
                                  value={opt}
                                  onChange={(e) =>
                                    handleOptionChange(
                                      qIndex,
                                      oi,
                                      e.target.value
                                    )
                                  }
                                  className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
                                />
                              )
                            )}
                          </div>
                        ) : q.type === "image" ? (
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
                    )}
                  </td>
                  <td className="px-4 py-2 align-top">
                    {editingQuestionId === q.id ? (
                      <input
                        type="text"
                        value={q.answer}
                        onChange={(e) =>
                          handleChange(qIndex, "answer", e.target.value)
                        }
                        className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
                      />
                    ) : (
                      <span>{q.answer}</span>
                    )}
                  </td>

                  <td className="px-4 py-2 text-center flex flex-col gap-2">
                    {editingQuestionId === q.id ? (
                      <button
                        onClick={async () => {
                          await handleSave(q);
                          setEditingQuestionId(null); // exit edit mode after saving
                        }}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingQuestionId(q.id)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => handleDeactivate(q.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
              {filteredActive.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No matching active questions
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Other Questions */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Other Questions</h3>

        {/* Search bar for Other */}
        <input
          type="text"
          placeholder="Search by subject..."
          value={otherSearch}
          onChange={(e) => setOtherSearch(e.target.value)}
          className="mb-4 w-full md:w-1/2 border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Question</th>
                <th className="px-4 py-2 text-left">Options</th>
                <th className="px-4 py-2 text-left">Answer</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOther.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2 align-top">{q.subject}</td>
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
              {filteredOther.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No matching questions
                  </td>
                </tr>
              )}
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
    </div>
  );
}



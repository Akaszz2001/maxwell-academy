// src/pages/CreateExam.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExamStore } from "../../store/examStore";

export default function CreateExam() {
  const navigate = useNavigate();
  const { createExam, isLoading, error } = useExamStore();

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    startTime: "",
    duration: 60, // default minutes
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await createExam(formData, navigate);
  };

  const handleCancel = () => {
    navigate("/faculty/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create New Exam
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Exam Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="duration"
            placeholder="Duration (minutes)"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            min={1}
            required
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

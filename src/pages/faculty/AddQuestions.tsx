// src/pages/AddQuestions.tsx
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuestionStore } from "../../store/questionStore";

export default function AddQuestions() {
  const { examId } = useParams<{ examId: string }>();
  const { addBulkQuestions, isLoading } = useQuestionStore();

  const [activeTab, setActiveTab] = useState<"image" | "csv" | "xlsx" | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [xlsxFile, setXlsxFile] = useState<File | null>(null);


  const makeUniqueFile = (file: File) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
    return new File([file], uniqueName, { type: file.type });
  };
  
// ✅ Handle paste (Ctrl+V to paste images)
useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile();
          if (file) {
            const uniqueFile = makeUniqueFile(file);
            setImageFiles((prev) => [...prev, uniqueFile]);
          }
          
        }
      }
    };
  
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);
  
 
  // ✅ Handle drag & drop image upload
  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImageFiles((prev) => [...prev, ...files]);
  };

  // ✅ Save image questions
  const handleSaveImages = async () => {
    console.log("EXAM",examId);
    
    if (!examId) return;
    const newQuestions = imageFiles.map((file) => ({
      type: "image",
      imageFile: file,
      answer: answers[file.name]?.toLowerCase(),
    }));
    await addBulkQuestions(examId, newQuestions);
    setImageFiles([]);
    setAnswers({});
  };

  // ✅ Save CSV
  const handleSaveCSV = async () => {
    if (!examId || !csvFile) return;
    const text = await csvFile.text();
    const rows = text.split("\n").slice(1); // skip header
    const newQuestions = rows
      .map((row) => {
        const [q, a, b, c, d, ans] = row.split(",");
        return {
          type: "text",
          questionText: q,
          optionA: a,
          optionB: b,
          optionC: c,
          optionD: d,
          answer: ans?.trim().toLowerCase(),
        };
      })
      .filter((q) => q.questionText);
    await addBulkQuestions(examId, newQuestions);
    setCsvFile(null);
  };

  // ✅ Save XLSX (we’ll parse via SheetJS or similar lib)
  const handleSaveXLSX = async () => {
    if (!examId || !xlsxFile) return;

    const XLSX = await import("xlsx");
    const data = await xlsxFile.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet);

    const newQuestions = rows.map((row) => ({
      type: "text",
      questionText: row.question,
      optionA: row["opt A"],
      optionB: row["opt B"],
      optionC: row["opt C"],
      optionD: row["opt D"],
      answer: row.ans?.toString().toLowerCase(),
    }));
    await addBulkQuestions(examId, newQuestions);
    setXlsxFile(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Questions</h1>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("image")}
          className={`px-4 py-2 rounded-lg ${activeTab === "image" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Upload Images
        </button>
        <button
          onClick={() => setActiveTab("csv")}
          className={`px-4 py-2 rounded-lg ${activeTab === "csv" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Upload CSV
        </button>
        <button
          onClick={() => setActiveTab("xlsx")}
          className={`px-4 py-2 rounded-lg ${activeTab === "xlsx" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Upload XLSX
        </button>
      </div>

      {/* IMAGE UPLOAD */}
      {activeTab === "image" && (
        <div>
          <div
            onDrop={handleImageDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center"
          >
            Drag & Drop images here or click to select
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                    const uniqueFiles = Array.from(e.target.files).map((f) => makeUniqueFile(f));
                    setImageFiles([...imageFiles, ...uniqueFiles]);
                  }
              }}
            />
          </div>

          <div className="mt-4 space-y-4">
            {imageFiles.map((file) => (
              <div key={file.name} className="flex items-center gap-4 p-2 border rounded">
                <span className="flex-1">{file.name}</span>
                <input
                  type="text"
                  placeholder="Answer (a/b/c/d)"
                  className="border px-2 py-1 rounded"
                  value={answers[file.name] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, [file.name]: e.target.value }))
                  }
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSaveImages}
            disabled={isLoading}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            {isLoading ? "Saving..." : "Save Image Questions"}
          </button>
        </div>
      )}

      {/* CSV UPLOAD */}
      {activeTab === "csv" && (
        <div>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
          />
          <button
            onClick={handleSaveCSV}
            disabled={!csvFile || isLoading}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            {isLoading ? "Saving..." : "Save CSV Questions"}
          </button>
        </div>
      )}

      {/* XLSX UPLOAD */}
      {activeTab === "xlsx" && (
        <div>
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => setXlsxFile(e.target.files?.[0] || null)}
          />
          <button
            onClick={handleSaveXLSX}
            disabled={!xlsxFile || isLoading}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            {isLoading ? "Saving..." : "Save XLSX Questions"}
          </button>
        </div>
      )}
    </div>
  );
}

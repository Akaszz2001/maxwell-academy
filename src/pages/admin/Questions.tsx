
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ArrowLeft, FileText, ImageIcon, FileSpreadsheet, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useAdminQuestionStore } from "@/store/adminStore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


export default function Questions() {
  
  const {addQuestionsBulk,isLoading}=useAdminQuestionStore()
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"image" | "csv" | "xlsx" | null>(
    null
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
   const [subjects, setSubjects] = useState<{ [key: string]: string }>({});
   const [topic, setTopic] = useState<{ [key: string]: string }>({});
   const [classs, setClasss] = useState<{ [key: string]: string }>({});
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<string[][]>([]);
  const [xlsxFile, setXlsxFile] = useState<File | null>(null);
  const [xlsxPreview, setXlsxPreview] = useState<any[]>([]);
  // Only for images
const [sharedSubject, setSharedSubject] = useState("");
const [sharedTopic, setSharedTopic] = useState("");
const [sharedClass, setSharedClass] = useState("");

const {user}=useAuthStore()
  const makeUniqueFile = (file: File) => {
    const uniqueName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}-${file.name}`;
    return new File([file], uniqueName, { type: file.type });
  };

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

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImageFiles((prev) => [...prev, ...files]);
  };

  // const handleSaveImages = async () => {
  //   if (user?.role!='admin') return;
  //   const newQuestions = imageFiles.map((file) => ({
  //     type: "image",
  //     imageFile: file,
  //     answer: answers[file.name]?.toLowerCase(),
  //   }));
  //   await addQuestionsBulk("",newQuestions);
  //   setImageFiles([]);
  //   setAnswers({});
  // };

const handleSaveImages = async () => {
  try {
    if (user?.role !== "admin") {
      toast.error("You are not authorized to perform this action.");
      return;
    }

    if (imageFiles.length === 0) {
      toast.error("Please upload at least one image before saving.");
      return;
    }

    if (!sharedSubject || !sharedTopic || !sharedClass) {
      toast.error("Please provide Subject, Topic, and Class.");
      return;
    }

    // Validate answers
    const missingAnswers = imageFiles.filter((file) => !answers[file.name]?.trim());
    if (missingAnswers.length > 0) {
      toast.error("Please provide answers for all uploaded images.");
      return;
    }

    const newQuestions = imageFiles.map((file) => ({
      type: "image",
      imageFile: file,
      answer: answers[file.name].toLowerCase(),
      subject: sharedSubject.toLowerCase(),
      topic: sharedTopic.toLowerCase(),
      classs: sharedClass.toLowerCase(),
    }));

    await addQuestionsBulk("", newQuestions);

    // Reset state after success
    setImageFiles([]);
    setAnswers({});
    setSharedSubject("");
    setSharedTopic("");
    setSharedClass("");
    toast.success("Image questions saved successfully!");
  } catch (error) {
    console.error("Error saving image questions:", error?.response?.data?.message);
    alert("Something went wrong while saving. Please try again.");
  }
};


  const handleCsvChange = async (file: File) => {
    setCsvFile(file);
    const text = await file.text();
    const rows = text.split("\n").map((r) => r.split(","));
    setCsvPreview(rows);
  };

  const handleSaveCSV = async () => {
    if (user?.role!='admin' || !csvFile) return;
    const newQuestions = csvPreview
      .slice(1)
      .map((row) => {
        const [q, a, b, c, d, ans,subject,topic,classs] = row;
        return {
          type: "text",
          questionText: q,
          optionA: a,
          optionB: b,
          optionC: c,
          optionD: d,
          answer: ans?.trim().toLowerCase(),
          subject:subject?.trim().toLowerCase(),
          class:classs?.trim().toLowerCase(),
          topic:topic?.trim().toLowerCase()
        };
      })
      .filter((q) => q.questionText);
    await addQuestionsBulk(null, newQuestions);
        toast.success("Image questions saved successfully!");
    setCsvFile(null);
    setCsvPreview([]);
  };

  const handleXlsxChange = async (file: File) => {
    setXlsxFile(file);
    const XLSX = await import("xlsx");
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    setXlsxPreview(rows);
  };

  const handleSaveXLSX = async () => {
    if (user?.role!='admin' || !xlsxFile) return;
    const newQuestions = xlsxPreview.map((row) => ({
      type: "text",
      questionText: row.questionText,
      optionA: row["optionA"],
      optionB: row["optionB"],
      optionC: row["optionC"],
      optionD: row["optionD"],
      answer: row.answer?.toString().toLowerCase(),
      subject:row.subject?.toString().toLowerCase(),
      class:row.classs?.toString().toLowerCase(),
      topic:row.topic?.toString().toLowerCase()
    }));
    await addQuestionsBulk(null,newQuestions);
        toast.success("Image questions saved successfully!");
    setXlsxFile(null);
    setXlsxPreview([]);
  };

  return (
    // <div className="p-6 max-w-7xl mx-auto">
    //   {/* Top Bar */}
    //   <div className="flex justify-between items-center mb-6">
    //     <Button
    //       onClick={() => navigate(-1)}
    //       className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
    //     >
    //       <ArrowLeft className="w-5 h-5" /> Back
    //     </Button>
    //     <h1 className="text-3xl font-bold text-center flex-1 text-gray-800">
    //       Add Questions
    //     </h1>
    //     <div className="w-24"></div>
    //   </div>

    //   {/* Tabs */}
    //   <div className="flex flex-wrap justify-center gap-4 mb-8">
    //     <button
    //       onClick={() => setActiveTab("image")}
    //       className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold shadow-md transition ${
    //         activeTab === "image"
    //           ? "bg-blue-600 text-white"
    //           : "bg-gray-100 hover:bg-gray-200"
    //       }`}
    //     >
    //       <ImageIcon className="w-5 h-5" /> Upload Images
    //     </button>
    //     <button
    //       onClick={() => setActiveTab("csv")}
    //       className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold shadow-md transition ${
    //         activeTab === "csv"
    //           ? "bg-blue-600 text-white"
    //           : "bg-gray-100 hover:bg-gray-200"
    //       }`}
    //     >
    //       <FileText className="w-5 h-5" /> Upload CSV
    //     </button>
    //     <button
    //       onClick={() => setActiveTab("xlsx")}
    //       className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold shadow-md transition ${
    //         activeTab === "xlsx"
    //           ? "bg-blue-600 text-white"
    //           : "bg-gray-100 hover:bg-gray-200"
    //       }`}
    //     >
    //       <FileSpreadsheet className="w-5 h-5" /> Upload XLSX
    //     </button>
    //   </div>

    //   {/* IMAGE UPLOAD */}
    //   {activeTab === "image" && (
    //     <div>
    //       <div
    //         onDrop={handleImageDrop}
    //         onDragOver={(e) => e.preventDefault()}
    //         className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
    //       >
    //         Drag & Drop images here or paste (Ctrl+V)
    //         <input
    //           type="file"
    //           multiple
    //           accept="image/*"
    //           className="hidden"
    //           onChange={(e) => {
    //             if (e.target.files) {
    //               const uniqueFiles = Array.from(e.target.files).map((f) =>
    //                 makeUniqueFile(f)
    //               );
    //               setImageFiles([...imageFiles, ...uniqueFiles]);
    //             }
    //           }}
    //         />
    //       </div>

    //       {imageFiles.length > 0 && (
    //         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    //           {imageFiles.map((file) => (
    //             <div
    //               key={file.name}
    //               className="p-4 border rounded-lg shadow-sm bg-white flex flex-col"
    //             >
    //               <img
    //                 src={URL.createObjectURL(file)}
    //                 alt={file.name}
    //                 className="w-full h-40 object-contain rounded mb-3"
    //               />
    //               <p className="text-sm truncate mb-2">{file.name}</p>
    //               <input
    //                 type="text"
    //                 placeholder="Answer (a/b/c/d)"
    //                 className="border px-2 py-1 rounded w-full"
    //                 value={answers[file.name] || ""}
    //                 onChange={(e) =>
    //                   setAnswers((prev) => ({
    //                     ...prev,
    //                     [file.name]: e.target.value,
    //                   }))
    //                 }
    //               />
    //             </div>
    //           ))}
    //         </div>
    //       )}

    //       {imageFiles.length > 0 && (
    //         <div className="text-center mt-6">
    //           <button
    //             onClick={handleSaveImages}
    //             disabled={isLoading}
    //             className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
    //           >
    //             {isLoading ? "Saving..." : "Save Image Questions"}
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //   )}

    //   {/* CSV UPLOAD */}
    //   {activeTab === "csv" && (
    //     <div className="space-y-4">
    //       <input
    //         type="file"
    //         accept=".csv"
    //         className="p-2 border rounded-lg"
    //         onChange={(e) => {
    //           if (e.target.files?.[0]) handleCsvChange(e.target.files[0]);
    //         }}
    //       />
    //       {csvPreview.length > 0 && (
    //         <div className="overflow-x-auto border rounded-lg shadow-sm">
    //           <table className="min-w-full text-sm">
    //             <thead className="bg-gray-100">
    //               <tr>
    //                 {csvPreview[0].map((header, idx) => (
    //                   <th key={idx} className="px-3 py-2 border">
    //                     {header}
    //                   </th>
    //                 ))}
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {csvPreview.slice(1).map((row, i) => (
    //                 <tr key={i} className="hover:bg-gray-50 transition-colors">
    //                   {row.map((cell, j) => (
    //                     <td key={j} className="px-3 py-2 border">
    //                       {cell}
    //                     </td>
    //                   ))}
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </div>
    //       )}
    //       <button
    //         onClick={handleSaveCSV}
    //         disabled={!csvFile || isLoading}
    //         className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
    //       >
    //         {isLoading ? "Saving..." : "Save CSV Questions"}
    //       </button>
    //     </div>
    //   )}

    //   {/* XLSX UPLOAD */}
    //   {activeTab === "xlsx" && (
    //     <div className="space-y-4">
    //       <input
    //         type="file"
    //         accept=".xlsx"
    //         className="p-2 border rounded-lg"
    //         onChange={(e) => {
    //           if (e.target.files?.[0]) handleXlsxChange(e.target.files[0]);
    //         }}
    //       />
    //       {xlsxPreview.length > 0 && (
    //         <div className="overflow-x-auto border rounded-lg shadow-sm">
    //           <table className="min-w-full text-sm">
    //             <thead className="bg-gray-100">
    //               <tr>
    //                 {Object.keys(xlsxPreview[0]).map((header, idx) => (
    //                   <th key={idx} className="px-3 py-2 border">
    //                     {header}
    //                   </th>
    //                 ))}
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {xlsxPreview.map((row, i) => (
    //                 <tr key={i} className="hover:bg-gray-50 transition-colors">
    //                   {Object.values(row).map((cell, j) => (
    //                     <td key={j} className="px-3 py-2 border">
    //                       {cell as string}
    //                     </td>
    //                   ))}
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </div>
    //       )}
    //       <button
    //         onClick={handleSaveXLSX}
    //         disabled={!xlsxFile || isLoading}
    //         className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
    //       >
    //         {isLoading ? "Saving..." : "Save XLSX Questions"}
    //       </button>
    //     </div>
    //   )}

    //   {/* Finish Button */}
    //   {activeTab && (
    //     <div className="text-center mt-8">
    //       <button
    //         onClick={() => navigate("/faculty/dashboard")}
    //         className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold"
    //       >
    //         Finish
    //       </button>
    //     </div>
    //   )}
    // </div>

    <div className="p-6 max-w-6xl mx-auto space-y-8">
  {/* Top Bar */}
  <div className="flex justify-between items-center">
    <Button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-xl shadow-sm"
    >
      <ArrowLeft className="w-5 h-5" /> Back
    </Button>
    <h1 className="text-3xl font-extrabold text-gray-800 text-center">
      Add Questions
    </h1>
    <div className="w-24">
             <Button
                  asChild
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Link to="/admin/dashboard">
                    <Home className="w-5 h-5" /> Dashboard
                  </Link>
                </Button>
    </div>
  </div>

  {/* Tabs */}
  <div className="flex flex-wrap justify-center gap-4">
    <button
      onClick={() => setActiveTab("image")}
      className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition shadow-md ${
        activeTab === "image"
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      <ImageIcon className="w-5 h-5" /> Upload Images
    </button>
    <button
      onClick={() => setActiveTab("csv")}
      className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition shadow-md ${
        activeTab === "csv"
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      <FileText className="w-5 h-5" /> Upload CSV
    </button>
    <button
      onClick={() => setActiveTab("xlsx")}
      className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition shadow-md ${
        activeTab === "xlsx"
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      <FileSpreadsheet className="w-5 h-5" /> Upload XLSX
    </button>
  </div>

  {/* IMAGE UPLOAD */}
  {activeTab === "image" && (
    <div className="space-y-6">
      <div
        onDrop={handleImageDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-400 rounded-xl p-10 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
      >
        <p className="text-gray-600 font-medium">
          Drag & Drop images here or <span className="text-blue-600">Click to Upload</span>
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              const uniqueFiles = Array.from(e.target.files).map((f) =>
                makeUniqueFile(f)
              );
              setImageFiles([...imageFiles, ...uniqueFiles]);
            }
          }}
        />
      </div>
      {activeTab === "image" && imageFiles.length > 0 && (
  <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
    <input
      type="text"
      placeholder="Subject"
      className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
      value={sharedSubject}
      onChange={(e) => setSharedSubject(e.target.value)}
    />
    <input
      type="text"
      placeholder="Topic"
      className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
      value={sharedTopic}
      onChange={(e) => setSharedTopic(e.target.value)}
    />
    <input
      type="text"
      placeholder="Class"
      className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
      value={sharedClass}
      onChange={(e) => setSharedClass(e.target.value)}
    />
  </div>
)}


      {imageFiles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {imageFiles.map((file) => (
            <div
              key={file.name}
              className="p-4 border rounded-xl shadow-sm bg-white flex flex-col hover:shadow-md transition"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-44 object-contain rounded mb-3"
              />
              <p className="text-sm truncate mb-2 text-gray-700">{file.name}</p>
              <input
                type="text"
                placeholder="Answer (a/b/c/d)"
                className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
                value={answers[file.name] || ""}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [file.name]: e.target.value,
                  }))
                }
              />
            {/* <input
                    type="text"
                    placeholder="Subject"
                      className="mt-2 border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"

                    value={subjects[file.name] || ""}
                    onChange={(e) =>
                      setSubjects((prev) => ({
                        ...prev,
                        [file.name]: e.target.value,
                      }))
                    }
                  />
            <input
                    type="text"
                    placeholder="Topic"
                   className="mt-2 border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"

                    value={topic[file.name] || ""}
                    onChange={(e) =>
                      setTopic((prev) => ({
                        ...prev,
                        [file.name]: e.target.value,
                      }))
                    }
                  />
            <input
                    type="text"
                    placeholder="Class"
                    className="mt-2 border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"

                    value={classs[file.name] || ""}
                    onChange={(e) =>
                      setClasss((prev) => ({
                        ...prev,
                        [file.name]: e.target.value,
                      }))
                    }
                  /> */}
            </div>
          ))}
        </div>
      )}

      {imageFiles.length > 0 && (
        <div className="text-center">
          <button
            onClick={handleSaveImages}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition"
          >
            {isLoading ? "Saving..." : "Save Image Questions"}
          </button>
        </div>
      )}
    </div>
  )}

  {/* CSV UPLOAD */}
  {activeTab === "csv" && (
    <div className="space-y-6">
      <label className="flex items-center justify-center w-full px-6 py-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-400 cursor-pointer hover:bg-gray-100 transition">
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handleCsvChange(e.target.files[0]);
          }}
        />
        <span className="text-gray-600 font-medium">Click or Drag & Drop CSV File</span>
      </label>

      {csvPreview.length > 0 && (
        <div className="overflow-x-auto border rounded-xl shadow-sm bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                {csvPreview[0].map((header, idx) => (
                  <th key={idx} className="px-4 py-2 border text-left">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvPreview.slice(1).map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2 border">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={handleSaveCSV}
          disabled={!csvFile || isLoading}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition"
        >
          {isLoading ? "Saving..." : "Save CSV Questions"}
        </button>
      </div>
    </div>
  )}

  {/* XLSX UPLOAD */}
  {activeTab === "xlsx" && (
    <div className="space-y-6">
      <label className="flex items-center justify-center w-full px-6 py-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-400 cursor-pointer hover:bg-gray-100 transition">
        <input
          type="file"
          accept=".xlsx"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handleXlsxChange(e.target.files[0]);
          }}
        />
        <span className="text-gray-600 font-medium">Click or Drag & Drop XLSX File</span>
      </label>

      {xlsxPreview.length > 0 && (
        <div className="overflow-x-auto border rounded-xl shadow-sm bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(xlsxPreview[0]).map((header, idx) => (
                  <th key={idx} className="px-4 py-2 border text-left">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {xlsxPreview.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  {Object.values(row).map((cell, j) => (
                    <td key={j} className="px-4 py-2 border">
                      {cell as string}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={handleSaveXLSX}
          disabled={!xlsxFile || isLoading}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition"
        >
          {isLoading ? "Saving..." : "Save XLSX Questions"}
        </button>
      </div>
    </div>
  )}

  {/* Finish Button */}
  {activeTab && (
    <div className="text-center">
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-3 rounded-xl font-semibold shadow-md transition"
      >
        Finish
      </button>
    </div>
  )}
</div>

  );
}

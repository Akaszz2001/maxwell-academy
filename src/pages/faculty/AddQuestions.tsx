// // src/pages/AddQuestions.tsx
// import { useState,useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useQuestionStore } from "../../store/questionStore";

// export default function AddQuestions() {
//   const { examId } = useParams<{ examId: string }>();
//   const { addBulkQuestions, isLoading } = useQuestionStore();

//   const [activeTab, setActiveTab] = useState<"image" | "csv" | "xlsx" | null>(null);
//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [csvFile, setCsvFile] = useState<File | null>(null);
//   const [xlsxFile, setXlsxFile] = useState<File | null>(null);


//   const makeUniqueFile = (file: File) => {
//     const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
//     return new File([file], uniqueName, { type: file.type });
//   };
  
// // ✅ Handle paste (Ctrl+V to paste images)
// useEffect(() => {
//     const handlePaste = (e: ClipboardEvent) => {
//       if (!e.clipboardData) return;
//       const items = e.clipboardData.items;
//       for (let i = 0; i < items.length; i++) {
//         const item = items[i];
//         if (item.type.indexOf("image") !== -1) {
//           const file = item.getAsFile();
//           if (file) {
//             const uniqueFile = makeUniqueFile(file);
//             setImageFiles((prev) => [...prev, uniqueFile]);
//           }
          
//         }
//       }
//     };
  
//     window.addEventListener("paste", handlePaste);
//     return () => window.removeEventListener("paste", handlePaste);
//   }, []);
  
 
//   // ✅ Handle drag & drop image upload
//   const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const files = Array.from(e.dataTransfer.files);
//     setImageFiles((prev) => [...prev, ...files]);
//   };

//   // ✅ Save image questions
//   const handleSaveImages = async () => {
//     console.log("EXAM",examId);
    
//     if (!examId) return;
//     const newQuestions = imageFiles.map((file) => ({
//       type: "image",
//       imageFile: file,
//       answer: answers[file.name]?.toLowerCase(),
//     }));
//     await addBulkQuestions(examId, newQuestions);
//     setImageFiles([]);
//     setAnswers({});
//   };

//   // ✅ Save CSV
//   const handleSaveCSV = async () => {
//     if (!examId || !csvFile) return;
//     const text = await csvFile.text();
//     const rows = text.split("\n").slice(1); // skip header
//     const newQuestions = rows
//       .map((row) => {
//         const [q, a, b, c, d, ans] = row.split(",");
//         return {
//           type: "text",
//           questionText: q,
//           optionA: a,
//           optionB: b,
//           optionC: c,
//           optionD: d,
//           answer: ans?.trim().toLowerCase(),
//         };
//       })
//       .filter((q) => q.questionText);
//       console.log("ADD QUESTION JSX",newQuestions);
      
//     await addBulkQuestions(examId, newQuestions);
//     setCsvFile(null);
//   };

//   // ✅ Save XLSX (we’ll parse via SheetJS or similar lib)
//   const handleSaveXLSX = async () => {
//     if (!examId || !xlsxFile) return;

//     const XLSX = await import("xlsx");
//     const data = await xlsxFile.arrayBuffer();
//     const workbook = XLSX.read(data);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const rows: any[] = XLSX.utils.sheet_to_json(sheet);

//     const newQuestions = rows.map((row) => ({
//       type: "text",
//       questionText: row.questionText,
//       optionA: row["optionA"],
//       optionB: row["optionB"],
//       optionC: row["optionC"],
//       optionD: row["optionD"],
//       answer: row.answer?.toString().toLowerCase(),
//     }));

//     console.log(newQuestions);
    
//     await addBulkQuestions(examId, newQuestions);
//     setXlsxFile(null);
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Add Questions</h1>

//       {/* Buttons */}
//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={() => setActiveTab("image")}
//           className={`px-4 py-2 rounded-lg ${activeTab === "image" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
//         >
//           Upload Images
//         </button>
//         <button
//           onClick={() => setActiveTab("csv")}
//           className={`px-4 py-2 rounded-lg ${activeTab === "csv" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
//         >
//           Upload CSV
//         </button>
//         <button
//           onClick={() => setActiveTab("xlsx")}
//           className={`px-4 py-2 rounded-lg ${activeTab === "xlsx" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
//         >
//           Upload XLSX
//         </button>
//       </div>

//       {/* IMAGE UPLOAD */}
//       {activeTab === "image" && (
//         <div>
//           <div
//             onDrop={handleImageDrop}
//             onDragOver={(e) => e.preventDefault()}
//             className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center"
//           >
//             Drag & Drop images here or click to select
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => {
//                 if (e.target.files) {
//                     const uniqueFiles = Array.from(e.target.files).map((f) => makeUniqueFile(f));
//                     setImageFiles([...imageFiles, ...uniqueFiles]);
//                   }
//               }}
//             />
//           </div>

//           <div className="mt-4 space-y-4">
//             {imageFiles.map((file) => (
//               <div key={file.name} className="flex items-center gap-4 p-2 border rounded">
//                 <span className="flex-1">{file.name}</span>
//                 <input
//                   type="text"
//                   placeholder="Answer (a/b/c/d)"
//                   className="border px-2 py-1 rounded"
//                   value={answers[file.name] || ""}
//                   onChange={(e) =>
//                     setAnswers((prev) => ({ ...prev, [file.name]: e.target.value }))
//                   }
//                 />
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={handleSaveImages}
//             disabled={isLoading}
//             className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
//           >
//             {isLoading ? "Saving..." : "Save Image Questions"}
//           </button>
//         </div>
//       )}

//       {/* CSV UPLOAD */}
//       {activeTab === "csv" && (
//         <div>
//           <input
//             type="file"
//             accept=".csv"
//             onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
//           />
//           <button
//             onClick={handleSaveCSV}
//             disabled={!csvFile || isLoading}
//             className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
//           >
//             {isLoading ? "Saving..." : "Save CSV Questions"}
//           </button>
//         </div>
//       )}

//       {/* XLSX UPLOAD */}
//       {activeTab === "xlsx" && (
//         <div>
//           <input
//             type="file"
//             accept=".xlsx"
//             onChange={(e) => setXlsxFile(e.target.files?.[0] || null)}
//           />
//           <button
//             onClick={handleSaveXLSX}
//             disabled={!xlsxFile || isLoading}
//             className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
//           >
//             {isLoading ? "Saving..." : "Save XLSX Questions"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }



// src/pages/AddQuestions.tsx
// src/pages/AddQuestions.tsx
// src/pages/AddQuestions.tsx
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useQuestionStore } from "../../store/questionStore";

// export default function AddQuestions() {
//   const { examId } = useParams<{ examId: string }>();
//   const { addBulkQuestions, isLoading } = useQuestionStore();
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState<"image" | "csv" | "xlsx" | null>(
//     null
//   );
//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [answers, setAnswers] = useState<{ [key: string]: string }>({});
//   const [csvFile, setCsvFile] = useState<File | null>(null);
//   const [csvPreview, setCsvPreview] = useState<string[][]>([]);
//   const [xlsxFile, setXlsxFile] = useState<File | null>(null);
//   const [xlsxPreview, setXlsxPreview] = useState<any[]>([]);

//   const makeUniqueFile = (file: File) => {
//     const uniqueName = `${Date.now()}-${Math.random()
//       .toString(36)
//       .slice(2)}-${file.name}`;
//     return new File([file], uniqueName, { type: file.type });
//   };

//   // ✅ Handle paste
//   useEffect(() => {
//     const handlePaste = (e: ClipboardEvent) => {
//       if (!e.clipboardData) return;
//       const items = e.clipboardData.items;
//       for (let i = 0; i < items.length; i++) {
//         const item = items[i];
//         if (item.type.indexOf("image") !== -1) {
//           const file = item.getAsFile();
//           if (file) {
//             const uniqueFile = makeUniqueFile(file);
//             setImageFiles((prev) => [...prev, uniqueFile]);
//           }
//         }
//       }
//     };

//     window.addEventListener("paste", handlePaste);
//     return () => window.removeEventListener("paste", handlePaste);
//   }, []);

//   // ✅ Handle drag & drop image upload
//   const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const files = Array.from(e.dataTransfer.files);
//     setImageFiles((prev) => [...prev, ...files]);
//   };

//   // ✅ Save image questions
//   const handleSaveImages = async () => {
//     if (!examId) return;
//     const newQuestions = imageFiles.map((file) => ({
//       type: "image",
//       imageFile: file,
//       answer: answers[file.name]?.toLowerCase(),
//     }));
//     await addBulkQuestions(examId, newQuestions);
//     setImageFiles([]);
//     setAnswers({});
//   };

//   // ✅ Handle CSV change (preview + store)
//   const handleCsvChange = async (file: File) => {
//     setCsvFile(file);
//     const text = await file.text();
//     const rows = text.split("\n").map((r) => r.split(","));
//     setCsvPreview(rows);
//   };

//   // ✅ Save CSV
//   const handleSaveCSV = async () => {
//     if (!examId || !csvFile) return;

//     const newQuestions = csvPreview
//       .slice(1) // skip header
//       .map((row) => {
//         const [q, a, b, c, d, ans] = row;
//         return {
//           type: "text",
//           questionText: q,
//           optionA: a,
//           optionB: b,
//           optionC: c,
//           optionD: d,
//           answer: ans?.trim().toLowerCase(),
//         };
//       })
//       .filter((q) => q.questionText);

//     await addBulkQuestions(examId, newQuestions);
//     setCsvFile(null);
//     setCsvPreview([]);
//   };

//   // ✅ Handle XLSX change (preview + store)
//   const handleXlsxChange = async (file: File) => {
//     setXlsxFile(file);

//     const XLSX = await import("xlsx");
//     const data = await file.arrayBuffer();
//     const workbook = XLSX.read(data);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });
//     setXlsxPreview(rows);
//   };

//   // ✅ Save XLSX
//   const handleSaveXLSX = async () => {
//     if (!examId || !xlsxFile) return;

//     const newQuestions = xlsxPreview.map((row) => ({
//       type: "text",
//       questionText: row.questionText,
//       optionA: row["optionA"],
//       optionB: row["optionB"],
//       optionC: row["optionC"],
//       optionD: row["optionD"],
//       answer: row.answer?.toString().toLowerCase(),
//     }));

//     await addBulkQuestions(examId, newQuestions);
//     setXlsxFile(null);
//     setXlsxPreview([]);
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-8 text-center">Add Questions</h1>

//       {/* Buttons */}
//       <div className="flex flex-wrap justify-center gap-4 mb-8">
//         {["image", "csv", "xlsx"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab as any)}
//             className={`px-6 py-2 rounded-lg font-semibold shadow-md transition ${
//               activeTab === tab
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             {tab === "image"
//               ? "Upload Images"
//               : tab === "csv"
//               ? "Upload CSV"
//               : "Upload XLSX"}
//           </button>
//         ))}
//       </div>

//       {/* IMAGE UPLOAD */}
//       {activeTab === "image" && (
//         <div>
//           <div
//             onDrop={handleImageDrop}
//             onDragOver={(e) => e.preventDefault()}
//             className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
//           >
//             Drag & Drop images here or paste (Ctrl+V)
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => {
//                 if (e.target.files) {
//                   const uniqueFiles = Array.from(e.target.files).map((f) =>
//                     makeUniqueFile(f)
//                   );
//                   setImageFiles([...imageFiles, ...uniqueFiles]);
//                 }
//               }}
//             />
//           </div>

//           {/* Image Previews */}
//           {imageFiles.length > 0 && (
//             <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {imageFiles.map((file) => (
//                 <div
//                   key={file.name}
//                   className="p-4 border rounded-lg shadow-sm bg-white"
//                 >
//                   <img
//                     src={URL.createObjectURL(file)}
//                     alt={file.name}
//                     className="w-full h-40 object-contain rounded mb-3"
//                   />
//                   <p className="text-sm truncate mb-2">{file.name}</p>
//                   <input
//                     type="text"
//                     placeholder="Answer (a/b/c/d)"
//                     className="border px-2 py-1 rounded w-full"
//                     value={answers[file.name] || ""}
//                     onChange={(e) =>
//                       setAnswers((prev) => ({
//                         ...prev,
//                         [file.name]: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//               ))}
//             </div>
//           )}

//           {imageFiles.length > 0 && (
//             <div className="text-center">
//               <button
//                 onClick={handleSaveImages}
//                 disabled={isLoading}
//                 className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
//               >
//                 {isLoading ? "Saving..." : "Save Image Questions"}
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {/* CSV UPLOAD */}
//       {activeTab === "csv" && (
//         <div className="space-y-4">
//           <input
//             type="file"
//             accept=".csv"
//             onChange={(e) => {
//               if (e.target.files?.[0]) handleCsvChange(e.target.files[0]);
//             }}
//           />

//           {/* CSV Preview */}
//           {csvPreview.length > 0 && (
//             <div className="overflow-x-auto border rounded-lg">
//               <table className="min-w-full text-sm">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     {csvPreview[0].map((header, idx) => (
//                       <th key={idx} className="px-3 py-2 border">
//                         {header}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {csvPreview.slice(1).map((row, i) => (
//                     <tr key={i}>
//                       {row.map((cell, j) => (
//                         <td key={j} className="px-3 py-2 border">
//                           {cell}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           <button
//             onClick={handleSaveCSV}
//             disabled={!csvFile || isLoading}
//             className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
//           >
//             {isLoading ? "Saving..." : "Save CSV Questions"}
//           </button>
//         </div>
//       )}

//       {/* XLSX UPLOAD */}
//       {activeTab === "xlsx" && (
//         <div className="space-y-4">
//           <input
//             type="file"
//             accept=".xlsx"
//             onChange={(e) => {
//               if (e.target.files?.[0]) handleXlsxChange(e.target.files[0]);
//             }}
//           />

//           {/* XLSX Preview */}
//           {xlsxPreview.length > 0 && (
//             <div className="overflow-x-auto border rounded-lg">
//               <table className="min-w-full text-sm">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     {Object.keys(xlsxPreview[0]).map((header, idx) => (
//                       <th key={idx} className="px-3 py-2 border">
//                         {header}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {xlsxPreview.map((row, i) => (
//                     <tr key={i}>
//                       {Object.values(row).map((cell, j) => (
//                         <td key={j} className="px-3 py-2 border">
//                           {cell as string}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           <button
//             onClick={handleSaveXLSX}
//             disabled={!xlsxFile || isLoading}
//             className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
//           >
//             {isLoading ? "Saving..." : "Save XLSX Questions"}
//           </button>
//         </div>
//       )}

//       {/* Finish Button */}
//       {activeTab && (
//         <div className="text-center mt-8">
//           <button
//             onClick={() => navigate("/faculty/dashboard")}
//             className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold"
//           >
//             Finish
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuestionStore } from "../../store/questionStore";
import { ArrowLeft, FileText, ImageIcon, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddQuestions() {
  const { examId } = useParams<{ examId: string }>();
  const { addBulkQuestions, isLoading } = useQuestionStore();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"image" | "csv" | "xlsx" | null>(
    null
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<string[][]>([]);
  const [xlsxFile, setXlsxFile] = useState<File | null>(null);
  const [xlsxPreview, setXlsxPreview] = useState<any[]>([]);

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

  const handleSaveImages = async () => {
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

  const handleCsvChange = async (file: File) => {
    setCsvFile(file);
    const text = await file.text();
    const rows = text.split("\n").map((r) => r.split(","));
    setCsvPreview(rows);
  };

  const handleSaveCSV = async () => {
    if (!examId || !csvFile) return;
    const newQuestions = csvPreview
      .slice(1)
      .map((row) => {
        const [q, a, b, c, d, ans] = row;
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
    if (!examId || !xlsxFile) return;
    const newQuestions = xlsxPreview.map((row) => ({
      type: "text",
      questionText: row.questionText,
      optionA: row["optionA"],
      optionB: row["optionB"],
      optionC: row["optionC"],
      optionD: row["optionD"],
      answer: row.answer?.toString().toLowerCase(),
    }));
    await addBulkQuestions(examId, newQuestions);
    setXlsxFile(null);
    setXlsxPreview([]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </Button>
        <h1 className="text-3xl font-bold text-center flex-1 text-gray-800">
          Add Questions
        </h1>
        <div className="w-24"></div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("image")}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold shadow-md transition ${
            activeTab === "image"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <ImageIcon className="w-5 h-5" /> Upload Images
        </button>
        <button
          onClick={() => setActiveTab("csv")}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold shadow-md transition ${
            activeTab === "csv"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <FileText className="w-5 h-5" /> Upload CSV
        </button>
        <button
          onClick={() => setActiveTab("xlsx")}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold shadow-md transition ${
            activeTab === "xlsx"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <FileSpreadsheet className="w-5 h-5" /> Upload XLSX
        </button>
      </div>

      {/* IMAGE UPLOAD */}
      {activeTab === "image" && (
        <div>
          <div
            onDrop={handleImageDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
          >
            Drag & Drop images here or paste (Ctrl+V)
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

          {imageFiles.length > 0 && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {imageFiles.map((file) => (
                <div
                  key={file.name}
                  className="p-4 border rounded-lg shadow-sm bg-white flex flex-col"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-40 object-contain rounded mb-3"
                  />
                  <p className="text-sm truncate mb-2">{file.name}</p>
                  <input
                    type="text"
                    placeholder="Answer (a/b/c/d)"
                    className="border px-2 py-1 rounded w-full"
                    value={answers[file.name] || ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [file.name]: e.target.value,
                      }))
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {imageFiles.length > 0 && (
            <div className="text-center mt-6">
              <button
                onClick={handleSaveImages}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                {isLoading ? "Saving..." : "Save Image Questions"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* CSV UPLOAD */}
      {activeTab === "csv" && (
        <div className="space-y-4">
          <input
            type="file"
            accept=".csv"
            className="p-2 border rounded-lg"
            onChange={(e) => {
              if (e.target.files?.[0]) handleCsvChange(e.target.files[0]);
            }}
          />
          {csvPreview.length > 0 && (
            <div className="overflow-x-auto border rounded-lg shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    {csvPreview[0].map((header, idx) => (
                      <th key={idx} className="px-3 py-2 border">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvPreview.slice(1).map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      {row.map((cell, j) => (
                        <td key={j} className="px-3 py-2 border">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button
            onClick={handleSaveCSV}
            disabled={!csvFile || isLoading}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            {isLoading ? "Saving..." : "Save CSV Questions"}
          </button>
        </div>
      )}

      {/* XLSX UPLOAD */}
      {activeTab === "xlsx" && (
        <div className="space-y-4">
          <input
            type="file"
            accept=".xlsx"
            className="p-2 border rounded-lg"
            onChange={(e) => {
              if (e.target.files?.[0]) handleXlsxChange(e.target.files[0]);
            }}
          />
          {xlsxPreview.length > 0 && (
            <div className="overflow-x-auto border rounded-lg shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    {Object.keys(xlsxPreview[0]).map((header, idx) => (
                      <th key={idx} className="px-3 py-2 border">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {xlsxPreview.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      {Object.values(row).map((cell, j) => (
                        <td key={j} className="px-3 py-2 border">
                          {cell as string}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button
            onClick={handleSaveXLSX}
            disabled={!xlsxFile || isLoading}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            {isLoading ? "Saving..." : "Save XLSX Questions"}
          </button>
        </div>
      )}

      {/* Finish Button */}
      {activeTab && (
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/faculty/dashboard")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Finish
          </button>
        </div>
      )}
    </div>
  );
}

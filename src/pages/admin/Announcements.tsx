
// import { useAnnouncementStore } from "@/store/announcementStore";
// import { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { X, ArrowLeft, Home } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useAuthStore } from "@/store/authStore";
// import { toast } from "react-toastify";

// export default function AnnouncementForm() {
//   const { announceId } = useParams<{ announceId: string }>();
//   const { addAnnouncement, fetchAnnouncementsById, updateAnnouncement } = useAnnouncementStore();
//   const { user } = useAuthStore();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     title: "",
//     subject: "",
//     audience: "all",
//     files: [] as File[],
//   });
//   const [existingFiles, setExistingFiles] = useState<{ name: string; url: string }[]>([]);
//   const [removedFiles, setRemovedFiles] = useState<string[]>([]);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Load announcement for editing
//   const loadAnnouncement = async () => {
//     if (!announceId) return;
//     try {
//       setIsLoading(true);
//       const existing = await fetchAnnouncementsById(announceId);
//       if (existing) {
//         setForm({
//           title: existing.title || "",
//           subject: existing.subject || "",
//           audience: existing.audience || "all",
//           files: [],
//         });
//         if (existing.attachementUrls && Array.isArray(existing.attachementUrls)) {
//           const filesData = existing.attachementUrls.map((url: string, index: number) => ({
//             name: existing.attachement[index],
//             url,
//           }));
//           setExistingFiles(filesData);
//         }
//       }
//     } catch (err) {
//       console.error("Failed to fetch announcement:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAnnouncement();
//   }, [announceId, fetchAnnouncementsById, updateAnnouncement]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setForm((prev) => ({
//       ...prev,
//       files: [...prev.files, ...Array.from(e.target.files)],
//     }));
//   };

//   const handleRemoveExistingFile = (fileUrl: string) => {
//     setExistingFiles((prev) => prev.filter((f) => f.url !== fileUrl));
//     setRemovedFiles((prev) => [...prev, fileUrl]);
//   };

//   const handleRemoveNewFile = (index: number) => {
//     setForm((prev) => ({
//       ...prev,
//       files: prev.files.filter((_, i) => i !== index),
//     }));
//   };

//   const handleFileClick = (fileUrl: string) => {
//     if (fileUrl.match(/\.(jpg|jpeg|png)$/i)) {
//       setPreviewImage(fileUrl);
//     } else {
//       window.open(fileUrl, "_blank");
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!form.title || !form.subject) {
//       alert("Please fill in title and subject.");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       if (announceId) {
//         await updateAnnouncement(announceId, {
//           title: form.title,
//           subject: form.subject,
//           audience: form.audience as "all" | "student" | "faculty",
//           attachement: form.files,
//           active: true,
//           removedFiles,
//         });
//         toast.success("Announcement updated successfully!");
//         await loadAnnouncement(); // refresh immediately
//         setForm((prev) => ({ ...prev, files: [] }));
//         setRemovedFiles([]);
//       } else {
//         await addAnnouncement({
//           title: form.title,
//           subject: form.subject,
//           audience: form.audience as "all" | "student" | "faculty",
//           attachement: form.files,
//           active: true,
//         });
//         toast.success("Announcement created successfully!");
//         setForm({ title: "", subject: "", audience: "all", files: [] });
//         setExistingFiles([]);
//         setRemovedFiles([]);
//       }
//     } catch (err) {
//       toast.error("Error submitting announcement:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="lg:w-full mx-auto bg-white shadow-md rounded-lg p-6 relative">
//       {/* Top buttons */}
//   { announceId &&   <div className="flex justify-between items-center mb-4">
//         <Button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
//         >
//           <ArrowLeft className="w-5 h-5" /> Back
//         </Button>

//         <Button
//           asChild
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
//         >
//           <Link to={user?.role === "admin" ? "/admin/dashboard" : "/faculty/dashboard"}>
//             <Home className="w-5 h-5" /> Dashboard
//           </Link>
//         </Button>
//       </div>}

//       <h2 className="text-xl font-bold mb-4">
//         {announceId ? "Edit Announcement" : "Create Announcement"}
//       </h2>

//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Title */}
//           <div>
//             <label className="block font-medium">Title</label>
//             <input
//               type="text"
//               className="w-full border rounded-lg px-3 py-2"
//               placeholder="Enter announcement title"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//               required
//             />
//           </div>

//           {/* Subject */}
//           <div>
//             <label className="block font-medium">Subject</label>
//             <textarea
//               className="w-full border rounded-lg px-3 py-2"
//               placeholder="Enter announcement details"
//               rows={4}
//               value={form.subject}
//               onChange={(e) => setForm({ ...form, subject: e.target.value })}
//               required
//             />
//           </div>

//           {/* Audience */}
//           <div>
//             <label className="block font-medium">Audience</label>
//             <select
//               className="w-full border rounded-lg px-3 py-2"
//               value={form.audience}
//               onChange={(e) => setForm({ ...form, audience: e.target.value })}
//             >
//               <option value="all">All</option>
//               <option value="student">Students</option>
//               <option value="faculty">Faculty</option>
//             </select>
//           </div>

//           {/* Existing Files */}
//           {existingFiles.length > 0 && (
//             <div>
//               <label className="block font-medium">Existing Attachments</label>
//               <div className="flex flex-wrap gap-3 mt-2">
//                 {existingFiles.map((file, i) => {
//                   const isImage = file.url.match(/\.(jpg|jpeg|png)$/i);
//                   return (
//                     <div
//                       key={i}
//                       className="relative border rounded-md p-2 w-24 h-24 flex items-center justify-center bg-gray-50 cursor-pointer"
//                       onClick={() => handleFileClick(file.url)}
//                     >
//                       {isImage ? (
//                         <img
//                           src={file.url}
//                           alt={file.name}
//                           className="w-full h-full object-cover rounded-md"
//                           onError={(e) =>
//                             ((e.target as HTMLImageElement).style.display = "none")
//                           }
//                         />
//                       ) : (
//                         <span className="text-xs text-center break-all">{file.name}</span>
//                       )}
//                       <button
//                         type="button"
//                         className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleRemoveExistingFile(file.url);
//                         }}
//                       >
//                         <X size={12} />
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* New Files */}
//           <div>
//             <label className="block font-medium">
//               {announceId ? "Add More Attachments" : "Attachments"}
//             </label>
//             <input type="file" accept=".jpg,.jpeg,.png,.pdf,.xls,.xlsx" multiple onChange={handleFileChange} />

//             {form.files.length > 0 && (
//               <ul className="mt-2 text-sm list-disc list-inside">
//                 {form.files.map((file, index) => (
//                   <li key={index} className="flex justify-between">
//                     {file.name}
//                     <button
//                       type="button"
//                       className="text-red-600 hover:text-red-800"
//                       onClick={() => handleRemoveNewFile(index)}
//                     >
//                       Remove
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             {announceId ? "Update Announcement" : "Publish Announcement"}
//           </button>
//         </form>
//       )}

//       {/* Image Modal */}
//       {previewImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
//           onClick={() => setPreviewImage(null)}
//         >
//           <img
//             src={previewImage}
//             alt="Preview"
//             className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
//           />
//         </div>
//       )}
//     </div>
//   );
// }



import { useAnnouncementStore } from "@/store/announcementStore";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { X, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";

export default function AnnouncementForm() {
  const { announceId } = useParams<{ announceId: string }>();
  const { addAnnouncement, fetchAnnouncementsById, updateAnnouncement } =
    useAnnouncementStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    subject: "",
    audience: "all",
    files: [] as File[],
  });
  const [existingFiles, setExistingFiles] = useState<
    { name: string; url: string }[]
  >([]);
  const [removedFiles, setRemovedFiles] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load announcement for editing
  const loadAnnouncement = async () => {
    if (!announceId) return;
    try {
      setIsLoading(true);
      const existing = await fetchAnnouncementsById(announceId);
      if (existing) {
        setForm({
          title: existing.title || "",
          subject: existing.subject || "",
          audience: existing.audience || "all",
          files: [],
        });
        if (existing.attachementUrls && Array.isArray(existing.attachementUrls)) {
          const filesData = existing.attachementUrls.map(
            (url: string, index: number) => ({
              name: existing.attachement[index],
              url,
            })
          );
          setExistingFiles(filesData);
        }
      }
    } catch (err) {
      console.error("Failed to fetch announcement:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncement();
  }, [announceId, fetchAnnouncementsById, updateAnnouncement]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setForm((prev) => ({
      ...prev,
      files: [...prev.files, ...Array.from(e.target.files)],
    }));
  };

  const handleRemoveExistingFile = (fileUrl: string) => {
    setExistingFiles((prev) => prev.filter((f) => f.url !== fileUrl));
    setRemovedFiles((prev) => [...prev, fileUrl]);
  };

  const handleRemoveNewFile = (index: number) => {
    setForm((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleFileClick = (fileUrl: string) => {
    if (fileUrl.match(/\.(jpg|jpeg|png)$/i)) {
      setPreviewImage(fileUrl);
    } else {
      window.open(fileUrl, "_blank");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.subject) {
      alert("Please fill in title and subject.");
      return;
    }

    try {
      setIsLoading(true);
      if (announceId) {
        await updateAnnouncement(announceId, {
          title: form.title,
          subject: form.subject,
          audience: form.audience as "all" | "student" | "faculty",
          attachement: form.files,
          active: true,
          removedFiles,
        });
        toast.success("Announcement updated successfully!");
        await loadAnnouncement();
        setForm((prev) => ({ ...prev, files: [] }));
        setRemovedFiles([]);
      } else {
        await addAnnouncement({
          title: form.title,
          subject: form.subject,
          audience: form.audience as "all" | "student" | "faculty",
          attachement: form.files,
          active: true,
        });
        toast.success("Announcement created successfully!");
        setForm({ title: "", subject: "", audience: "all", files: [] });
        setExistingFiles([]);
        setRemovedFiles([]);
      }
    } catch (err) {
      toast.error("Error submitting announcement:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-white shadow-lg rounded-2xl max-w-4xl mx-auto mt-6">
      {/* --- Top Buttons --- */}
      {announceId && (
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
          <Button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </Button>

          <Button
            asChild
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
          >
            <Link
              to={
                user?.role === "admin"
                  ? "/admin/dashboard"
                  : "/faculty/dashboard"
              }
            >
              <Home className="w-5 h-5" /> Dashboard
            </Link>
          </Button>
        </div>
      )}

      {/* --- Form Content --- */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {announceId ? "✏️ Edit Announcement" : "📢 Create Announcement"}
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gray-50 p-6 rounded-xl border"
          >
            {/* Title */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg px-4 py-2 transition"
                placeholder="Enter announcement title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Subject
              </label>
              <textarea
                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg px-4 py-2 transition resize-none"
                placeholder="Enter announcement details"
                rows={5}
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
              />
            </div>

            {/* Audience */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Audience
              </label>
              <select
                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg px-4 py-2 transition"
                value={form.audience}
                onChange={(e) => setForm({ ...form, audience: e.target.value })}
              >
                <option value="all">All</option>
                <option value="student">Students</option>
                <option value="faculty">Faculty</option>
              </select>
            </div>

            {/* Existing Files */}
            {existingFiles.length > 0 && (
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Existing Attachments
                </label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {existingFiles.map((file, i) => {
                    const isImage = file.url.match(/\.(jpg|jpeg|png)$/i);
                    return (
                      <div
                        key={i}
                        className="relative border border-gray-200 rounded-lg p-2 w-28 h-28 flex items-center justify-center bg-white hover:shadow-md transition cursor-pointer"
                        onClick={() => handleFileClick(file.url)}
                      >
                        {isImage ? (
                          <img
                            src={file.url}
                            alt={file.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <span className="text-xs text-gray-500 text-center break-all px-1">
                            {file.name}
                          </span>
                        )}
                        <button
                          type="button"
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveExistingFile(file.url);
                          }}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* New Files */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                {announceId ? "Add More Attachments" : "Attachments"}
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf,.xls,.xlsx"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              />

              {form.files.length > 0 && (
                <ul className="mt-2 text-sm space-y-1">
                  {form.files.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-white border rounded-md px-3 py-1"
                    >
                      <span className="truncate">{file.name}</span>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleRemoveNewFile(index)}
                      >
                        <X size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg w-full transition-transform hover:scale-[1.02]"
            >
              {announceId ? "Update Announcement" : "Publish Announcement"}
            </button>
          </form>
        )}
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

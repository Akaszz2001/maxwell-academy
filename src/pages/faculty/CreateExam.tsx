/* eslint-disable @typescript-eslint/no-explicit-any */
// // src/pages/CreateExam.tsx
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useExamStore } from "../../store/examStore";

// // export default function CreateExam() {
// //   const navigate = useNavigate();
// //   const { createExam, isLoading, error } = useExamStore();

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     subject: "",
// //     startTime: "",
// //     duration: 60, // default minutes
// //   });

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: name === "duration" ? Number(value) : value,
// //     }));
// //   };

// //   const handleSave = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     await createExam(formData, navigate);
// //   };

// //   const handleCancel = () => {
// //     navigate("/faculty/dashboard");
// //   };

// //   return (
// //     <div className="flex justify-center items-center min-h-screen bg-gray-100">
// //       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
// //         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
// //           Create New Exam
// //         </h2>

// //         {error && (
// //           <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
// //         )}

// //         <form onSubmit={handleSave} className="space-y-4">
// //           <input
// //             type="text"
// //             name="name"
// //             placeholder="Exam Name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             className="w-full border p-3 rounded-lg"
// //             required
// //           />

// //           <input
// //             type="text"
// //             name="subject"
// //             placeholder="Subject"
// //             value={formData.subject}
// //             onChange={handleChange}
// //             className="w-full border p-3 rounded-lg"
// //             required
// //           />

// //           <input
// //             type="datetime-local"
// //             name="startTime"
// //             value={formData.startTime}
// //             onChange={handleChange}
// //             className="w-full border p-3 rounded-lg"
// //             required
// //           />

// //           <input
// //             type="number"
// //             name="duration"
// //             placeholder="Duration (minutes)"
// //             value={formData.duration}
// //             onChange={handleChange}
// //             className="w-full border p-3 rounded-lg"
// //             min={1}
// //             required
// //           />

// //           <div className="flex justify-between">
// //             <button
// //               type="button"
// //               onClick={handleCancel}
// //               className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               disabled={isLoading}
// //               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
// //             >
// //               {isLoading ? "Saving..." : "Save & Continue"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }




// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useExamStore } from "../../store/examStore";

// import { toast } from "react-toastify";
// export default function CreateExam() {
//   const navigate = useNavigate();
// const { examId } = useParams<{ examId: string }>();
//  // 👈 check if we are editing
//   const { createExam, updateExam, getExamById, isLoading, error } = useExamStore();

//   const [formData, setFormData] = useState({
//     name: "",
//     subject: "",
//     startTime: "",
//     duration: 60,
//   });

//   // ✅ Load existing exam if editing
//  useEffect(() => {
//   if (examId) {
//     getExamById(examId).then((exam) => {
//       if (exam) {
//         setFormData({
//           name: exam.name || "",
//           subject: exam.subject || "",
//           startTime: exam.startTime
//             ? new Date(exam.startTime).toISOString().slice(0, 16) // 👈 keep yyyy-MM-ddTHH:mm
//             : "",
//           duration: exam.duration || 60,
//         });
//       }
//     });
//   }
// }, [examId, getExamById]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "duration" ? Number(value) : value,
//     }));
//   };

//  const handleSave = async (e: React.FormEvent) => {
//   e.preventDefault();
// console.log("TIME",formData.startTime);

// const local = new Date(formData.startTime);
// const payload = {
//   ...formData,
//   startTime: new Date(
//     local.getTime() - local.getTimezoneOffset() * 60000
//   ).toISOString(),
// };


//   if (examId) {
//     const res = await updateExam(examId, payload);
//     if (res.success) {
//       toast.success("Successfully updated exam");
//     } else {
//       toast.error("Failed to update");
//     }
//   } else {
//     await createExam(payload, navigate);
//   }
// };


//   const handleCancel = () => {
//     navigate("/faculty/dashboard/myExams");
//   };

//   const handleFinish = async () => {
//     if (examId) {
//       await updateExam(examId, formData);
//       toast.success("Exam changes saved ✅");
//       navigate("/faculty/exams");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           {examId ? "Edit Exam" : "Create New Exam"}
//         </h2>



//         <form onSubmit={handleSave} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Exam Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border p-3 rounded-lg"
//             required
//           />

//           <input
//             type="text"
//             name="subject"
//             placeholder="Subject"
//             value={formData.subject}
//             onChange={handleChange}
//             className="w-full border p-3 rounded-lg"
//             required
//           />

//           <input
//             type="datetime-local"
//             name="startTime"
//             value={formData.startTime}
//             onChange={handleChange}
//             className="w-full border p-3 rounded-lg"
//             required
//           />

//           <input
//             type="number"
//             name="duration"
//             placeholder="Duration (minutes)"
//             value={formData.duration}
//             onChange={handleChange}
//             className="w-full border p-3 rounded-lg"
//             min={1}
//             required
//           />

//           {/* Buttons */}
//           <div className="flex flex-wrap justify-between gap-3">
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
//             >
//               Cancel
//             </button>

//             {examId && (
//               <>
//                 <button
//                   type="button"
//                   onClick={() => navigate(`/faculty/dashboard/exams/${examId}/questions`)}
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//                 >
//                   Go to Questions
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleFinish}
//                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                 >
//                   Finish
//                 </button>
//               </>
//             )}

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//             >
//               {isLoading
//                 ? "Saving..."
//                 : examId
//                 ? "Save Changes"
//                 : "Save & Continue"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }







import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useExamStore } from "../../store/examStore";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";

export default function CreateExam() {
  const {user}=useAuthStore()
  const navigate = useNavigate();
  const { examId } = useParams<{ examId: string }>();
  const { createExam, updateExam, getExamById, isLoading, error } =
    useExamStore();

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    mark:0,
    negMark:0,
    startTime: "",
    classs:"",
    duration: 60,
  });

  // ✅ Load existing exam if editing
  useEffect(() => {
    if (examId) {
      getExamById(examId).then((exam) => {
        if (exam) {
          setFormData({
            name: exam.name || "",
            subject: exam.subject || "",
            mark:exam.mark ||1,
            negMark:exam.negMark ||-1,
             classs:exam.classs||"",
            startTime: exam.startTime
              ? new Date(exam.startTime).toISOString().slice(0, 16)
              : "",
            duration: exam.duration || 60,
          });
        }
      });
    }
  }, [examId, getExamById]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;


  // if (name === "mark") {
  //   console.log(typeof(e.target.value));
    
  //   const num = Number(value);
  //   if (num < 1) return; // 👈 blocks negatives and 0
  // }
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const local = new Date(formData.startTime);
    const payload = {
      ...formData,
      startTime: new Date(
        local.getTime() - local.getTimezoneOffset() * 60000
      ).toISOString(),
    };

    if (examId) {
      const res = await updateExam(examId, payload);
      if (res.success) {
        toast.success("Successfully updated exam");
      } else {
        toast.error("Failed to update");
      }
    } else {
      
      await createExam(payload, navigate);
    }
  };

  const handleCancel = () => {
    if(user?.role==="admin"){
    navigate("/admin/dashboard");
  }else{
    navigate("/faculty/dashboard");
  }
  };

  const handleFinish = async () => {
    if (examId) {
      // await updateExam(examId, formData);
      toast.success("Exam changes saved ✅");
      if(user?.role==="admin"){
    navigate("/admin/dashboard");
  }else{
    navigate("/faculty/dashboard");
  }
    }
  };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-4">
//       <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           {examId ? "Edit Exam ✏️" : "Create New Exam 📘"}
//         </h2>

//         {error && (
//           <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm font-medium">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSave} className="space-y-5">
//           <input
//             type="text"
//             name="name"
//             placeholder="Exam Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//             required
//           />

//           <input
//             type="text"
//             name="subject"
//             placeholder="Subject"
//             value={formData.subject}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//             required
//           />
//           <input
//             type="text"
//             name="classs"
//             placeholder="Class"
//             value={formData.classs}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//             required
//           />

          
// {/* <input
//   type="text"
//   name="mark"
//   placeholder="Mark"
//   value={formData.mark}
//   onChange={(e) => {
//     const raw = e.target.value;

//     // Allow empty while typing
//     if (raw === "") {
//       handleChange({ target: { name: "mark", value: "" } } as any);
//       return;
//     }

//     // ✅ Regex:
//     // ^(0|[1-9]\d*)(\.\d+)?$
//     // - 0 → just zero
//     // - [1-9]\d* → numbers without leading zero
//     // - (\.\d+)? → optional decimal part
//     const regex = /^(0|[1-9]\d*)(\\d+)?$/;

//     if (regex.test(raw)) {
//       handleChange({ target: { name: "mark", value: raw } } as any);
//     }
//   }}
//   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
// /> */}
// <input
//   type="text"
//   name="mark"
//   placeholder="Mark"
//   value={formData.mark}
//   onChange={(e) => {
//     const raw = e.target.value;

//     // Allow empty while typing
//     if (raw === "") {
//       handleChange({ target: { name: "mark", value: "" } } as any);
//       return;
//     }

//     // ✅ Regex for numbers with optional decimal, no leading zero
//     // const regex = /^(0|[1-9]\d*)(\.\d+)?$/;
//     const regex = /^(0|[1-9]\d*)(\.\d*)?$/;

//     if (regex.test(raw)) {
//       handleChange({ target: { name: "mark", value: raw } } as any);
//     }
//   }}
//   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
// />





//        <input
//   type="text"
//   name="negativeMark"
//   placeholder="Negative Mark"
//   value={formData.negMark}
//   onChange={(e) => {
//     const  raw = e.target.value;

//     // ✅ Allow empty for typing
//     if (raw === "") {
//       handleChange({ target: { name: "negMark", value: "" } } as any);
//       return;
//     }

//     // ✅ Regex explanation:
//     // - ^[1-9]\d*(\.\d+)?$ → integers or floats without leading zero (≥1)
//     // - ^0+(\.\d+)?$ → numbers like 0.5, 00.12 (leading zeros allowed only if decimal part exists)
//       const regex = /^(0|[1-9]\d*)(\.\d*)?$/;

//     if (regex.test(raw)) {
//       handleChange({ target: { name: "negMark", value: raw } } as any);
//     }
//   }}
//   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
// />


      

//           <input
//             type="datetime-local"
//             name="startTime"
//             value={formData.startTime}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//             required
//           />

//           <input
//             type="number"
//             name="duration"
//             placeholder="Duration (minutes)"
//             value={formData.duration}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//             min={1}
//             required
//           />

//           {/* Buttons */}
//           <div className="flex flex-wrap justify-between gap-3 pt-4">
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="flex-1 px-4 py-2 rounded-full bg-gray-400 text-white font-medium shadow hover:bg-gray-500 hover:scale-105 transition"
//             >
//               Cancel
//             </button>

//             {examId && (
//               <>
//                 <button
//                   type="button"
//                   onClick={() =>
//                    navigate(`/faculty/dashboard/exams/${examId}/questions`,{state:{subject:formData.subject,topic:formData.name,classs:formData.classs}})
//                   }
//                   className="flex-1 px-4 py-2 rounded-full bg-indigo-500 text-white font-medium shadow hover:bg-indigo-600 hover:scale-105 transition"
//                 >
//                   Questions
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleFinish}
//                   className="flex-1 px-4 py-2 rounded-full bg-red-500 text-white font-medium shadow hover:bg-red-600 hover:scale-105 transition"
//                 >
//                   Finish
//                 </button>
//               </>
//             )}

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="flex-1 px-4 py-2 rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 hover:scale-105 disabled:opacity-50 transition"
//             >
//               {isLoading
//                 ? "Saving..."
//                 : examId
//                 ? "Save Changes"
//                 : "Save & Continue"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );



return (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-4">
    <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {examId ? "Edit Exam ✏️" : "Create New Exam 📘"}
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Exam Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Exam Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Class
          </label>
          <input
            type="text"
            name="classs"
            placeholder="Class"
            value={formData.classs}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Mark
          </label>
          <input
            type="text"
            name="mark"
            placeholder="Mark"
            value={formData.mark}
            onChange={(e) => {
              const raw = e.target.value;

              if (raw === "") {
                handleChange({ target: { name: "mark", value: "" } } as any);
                return;
              }

              const regex = /^(0|[1-9]\d*)(\.\d*)?$/;
              if (regex.test(raw)) {
                handleChange({ target: { name: "mark", value: raw } } as any);
              }
            }}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Negative Mark
          </label>
          <input
            type="text"
            name="negativeMark"
            placeholder="Negative Mark"
            value={formData.negMark}
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === "") {
                handleChange({ target: { name: "negMark", value: "" } } as any);
                return;
              }
              const regex = /^(0|[1-9]\d*)(\.\d*)?$/;
              if (regex.test(raw)) {
                handleChange({ target: { name: "negMark", value: raw } } as any);
              }
            }}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Duration (minutes)
          </label>
          <input
            type="number"
            name="duration"
            placeholder="Duration (minutes)"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            min={1}
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-between gap-3 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 px-4 py-2 rounded-full bg-gray-400 text-white font-medium shadow hover:bg-gray-500 hover:scale-105 transition"
          >
            Cancel
          </button>

          {examId && (
            <>
              <button
                type="button"
                onClick={() =>user?.role==='admin'?
                  navigate(`/admin/dashboard/exams/${examId}/questions`, {
                    state: {
                      subject: formData.subject,
                      topic: formData.name,
                      classs: formData.classs,
                    },
                  }):

                    navigate(`/faculty/dashboard/exams/${examId}/questions`, {
                    state: {
                      subject: formData.subject,
                      topic: formData.name,
                      classs: formData.classs,
                    },
                  })
                }
                className="flex-1 px-4 py-2 rounded-full bg-indigo-500 text-white font-medium shadow hover:bg-indigo-600 hover:scale-105 transition"
              >
                Questions
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="flex-1 px-4 py-2 rounded-full bg-red-500 text-white font-medium shadow hover:bg-red-600 hover:scale-105 transition"
              >
                Finish
              </button>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 hover:scale-105 disabled:opacity-50 transition"
          >
            {isLoading
              ? "Saving..."
              : examId
              ? "Save Changes"
              : "Save & Continue"}
          </button>
        </div>
      </form>
    </div>
  </div>
);



}

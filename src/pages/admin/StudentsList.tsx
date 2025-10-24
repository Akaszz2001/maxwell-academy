// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useAuthStore } from "@/store/authStore";
// import type { User } from "@/store/authStore";
// import pb from "@/services/pocketbase";
// import { useNavigate } from "react-router-dom";
// interface StudentListProps {
//   role: "student" | "faculty";
// }

// export default function StudentList({ role }: StudentListProps) {
//   const { fetchStudents, students, isLoading, error,updateVerificationStatus} = useAuthStore();
//   const [editingId, setEditingId] = useState<string | null>(null);
// const navigate=useNavigate()




// const handleVerify = async (id: string, status: boolean) => {
//   try {
//     await updateVerificationStatus(id, status);
//     toast.success(status ? "User verified ✅" : "User unverified ❌");
//   } catch {
//     toast.error("Failed to update verification status ❌");
//   }
// };


//   // Load students from store on mount
//   useEffect(() => {
//     console.log(role);
    
//     fetchStudents(role).catch(() => toast.error("Failed to fetch students ❌"));
//     console.log("STUDENTS",students);
    
//   }, [ students,fetchStudents]);

// const handleChange = (id: string, field: keyof User, value: string) => {
//   useAuthStore.setState((state) => ({
//     students: state.students?.map((s) =>
//       s.id === id ? { ...s, [field]: value } : s
//     ),
//   }));
// };


//   const handleSave = async (student: User) => {
//     try {
//       await pb.collection("users").update(student.id, {
//         name: student.name,
//         email: student.email,
//         phone: student.phone,
//         subject:student.subject
//       });
//       if(role==='student'){
//  toast.success("Student updated ✅");
//       }else{
//          toast.success("Faculty updated ✅");
//       }
     
//       setEditingId(null);
//       fetchStudents(role);
//     } catch {
//       toast.error("Failed to update ❌");
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this student?")) return;
//     try {
//       await pb.collection("users").delete(id);
//       if(role==="student"){
//   toast.success("Student deleted 🗑️");
//       }else{
//           toast.success("Faculty deleted 🗑️");
//       }
    
//       fetchStudents(role);
//     } catch {
//       toast.error("Failed to delete ❌");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen max-w-6xl mx-auto">
//       <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
//        {role==="student" ?"Students":"Faculties"}
//       </h2>

//       {isLoading && (
//         <p className="text-center text-gray-500">{role==="student" ?"Loading students...":"Loading Faculties..."}</p>
//       )}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       <div className="overflow-x-auto rounded-lg shadow-md bg-white">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Phone</th>
//            { role==="faculty" && <th className="px-4 py-2 text-left">Subject</th>}
//               <th className="px-4 py-2 text-left">Photo</th>
//               <th className="px-4 py-2 text-left">Verification</th>

//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {students?.map((s) => (
        
              
//               <tr key={s.id} className="hover:bg-gray-50 transition-colors">
//                 {/* <td className="px-4 py-2">
//                   {editingId === s.id ? (
//                     <input
                   
//                       type="text"
//                       value={s.name}
//                       onChange={(e) => handleChange(s.id, "name", e.target.value)}
//                       className="border p-2 rounded-lg w-full"
//                     />
//                   ) : (
//                     <span  onClick={()=>s.role==='student'&& navigate(`/admin/dashboard/userExams/${s.id}`)}>{s.name}</span>
//                   )}
//                 </td> */}
// <td className="px-4 py-2">
//   {editingId === s.id ? (
//     <input
//       type="text"
//       value={s.name}
//       onChange={(e) => handleChange(s.id, "name", e.target.value)}
//       className="border p-2 rounded-lg w-full"
//     />
//   ) : (
//     <span
//       onClick={() => s.role === "student" && navigate(`/admin/dashboard/userExams/${s.id}`)}
//       className="text-blue-600 font-medium cursor-pointer hover:underline transition-all"
//       title="Click to view user exams"
//     >
//       {s.name}
//     </span>
//   )}
// </td>

//                 <td className="px-4 py-2">
//                   {editingId === s.id ? (
//                     <input
//                       type="email"
//                       value={s.email}
//                       onChange={(e) =>
//                         handleChange(s.id, "email", e.target.value)
//                       }
//                       className="border p-2 rounded-lg w-full"
//                     />
//                   ) : (
//                     <span>{s.email}</span>
//                   )}
//                 </td>

//                 <td className="px-4 py-2">
//                   {editingId === s.id ? (
//                     <input
//                       type="tel"
//                       value={s.phone?.toString() ?? ""}
//                       onChange={(e) =>
//                         handleChange(s.id, "phone", e.target.value)
//                       }
//                       className="border p-2 rounded-lg w-full"
//                     />
//                   ) : (
//                     <span>{s.phone}</span>
//                   )}
//                 </td>
// {role==='faculty' && 
//    <td className="px-4 py-2">
//                   {editingId === s.id ? (
//                     <input
//                       type="text"
//                       value={s.subject}
//                       onChange={(e) => handleChange(s.id, "subject", e.target.value)}
//                       className="border p-2 rounded-lg w-full"
//                     />
//                   ) : (
//                     <span>{s.subject}</span>
//                   )}
//                 </td>

// }
//                 <td className="px-4 py-2">
//                   {s.avatar ? (
//                     <img
//                       src={s.avatar}
//                       alt="student"
//                       className="h-16 w-16 object-cover rounded-lg shadow-sm cursor-pointer"
//                     />
//                   ) : (
//                     <span className="text-gray-400 italic">No photo</span>
//                   )}
//                 </td>
// <td className="px-4 py-2 text-center">
//   <button
//   onClick={() => handleVerify(s.id, !s.isVerified)}
//   className={`px-4 py-2 rounded ${
//     s.isVerified ? "bg-green-600" : "bg-blue-600"
//   } text-white`}
// >
//   {s.isVerified ? "Verified" : "Verify"}
// </button>

// </td>


//                 <td className="px-4 py-2 text-center flex gap-2 justify-center">
//                   {editingId === s.id ? (
//                     <button
//                       onClick={() => handleSave(s)}
//                       className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                     >
//                       Save
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => setEditingId(s.id)}
//                       className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
//                     >
//                       Edit
//                     </button>
//                   )}

//                   <button
//                     onClick={() => handleDelete(s.id)}
//                     className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {students?.length === 0 && !isLoading && (
//               <tr>
//                 <td
//                   colSpan={5}
//                   className="text-center py-4 text-gray-500 italic"
//                 >
//                   No students found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";
import type { User } from "@/store/authStore";
import pb from "@/services/pocketbase";
import { useNavigate } from "react-router-dom";
import { ArrowUp } from "lucide-react";

interface StudentListProps {
  role: "student" | "faculty";
}

export default function StudentList({ role }: StudentListProps) {
  const { fetchStudents, students, isLoading, error, updateVerificationStatus } =
    useAuthStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search
  const navigate = useNavigate();

  const handleVerify = async (id: string, status: boolean) => {
    try {
      await updateVerificationStatus(id, status);
      toast.success(status ? "User verified ✅" : "User unverified ❌");
    } catch {
      toast.error("Failed to update verification status ❌");
    }
  };

  const handleChange = (id: string, field: keyof User, value: string) => {
    useAuthStore.setState((state) => ({
      students: state.students?.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    }));
  };

  const handleSave = async (student: User) => {
    try {
      await pb.collection("users").update(student.id, {
        name: student.name,
        email: student.email,
        phone: student.phone,
        subject: student.subject,
      });
      toast.success(role === "student" ? "Student updated ✅" : "Faculty updated ✅");
      setEditingId(null);
      fetchStudents(role);
    } catch {
      toast.error("Failed to update ❌");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await pb.collection("users").delete(id);
      toast.success(role === "student" ? "Student deleted 🗑️" : "Faculty deleted 🗑️");
      fetchStudents(role);
    } catch {
      toast.error("Failed to delete ❌");
    }
  };

  // Filter students for search (case-insensitive)
  const filteredStudents = students?.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

const [showScrollTop, setShowScrollTop] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Use Intersection Observer to detect bottom visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShowScrollTop(entry.isIntersecting);
        });
      },
      { root: null, threshold: 0.1 } // trigger when 10% of bottom is visible
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, []);

  // Fetch students on mount
  useEffect(() => {
    fetchStudents(role).catch(() => toast.error("Failed to fetch students ❌"));
  }, [fetchStudents,role]);

  return (
    <div id="top" className="p-6 bg-gray-50 min-h-screen max-w-6xl mx-auto relative">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
        {role === "student" ? "Students" : "Faculties"}
      </h2>

      {/* Search bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {isLoading && (
        <p className="text-center text-gray-500">
          {role === "student" ? "Loading students..." : "Loading Faculties..."}
        </p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              {role === "faculty" && <th className="px-4 py-2 text-left">Subject</th>}
         {role==="faculty"&&     <th className="px-4 py-2 text-left">Photo</th>}
              <th className="px-4 py-2 text-left">Verification</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredStudents?.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-2">
  {editingId === s.id ? (
    <input
      type="text"
      value={s.name}
      onChange={(e) => handleChange(s.id, "name", e.target.value)}
      className="border p-2 rounded-lg w-full"
    />
  ) : (
    <>
      {s.role === "student" ? (
        <span
          onClick={() => navigate(`/admin/dashboard/userExams/${s.id}`)}
          className="text-blue-600 font-medium cursor-pointer hover:underline transition-all"
          title="Click to view user exams"
        >
          {s.name}
        </span>
      ) : (
        <span
          className="text-gray-600 font-medium"
          title="Non-student user"
        >
          {s.name}
        </span>
      )}
    </>
  )}
</td>


                <td className="px-4 py-2">
                  {editingId === s.id ? (
                    <input
                      type="email"
                      value={s.email}
                      onChange={(e) => handleChange(s.id, "email", e.target.value)}
                      className="border p-2 rounded-lg w-full"
                    />
                  ) : (
                    <span>{s.email}</span>
                  )}
                </td>

                <td className="px-4 py-2">
                  {editingId === s.id ? (
                    <input
                      type="tel"
                      value={s.phone?.toString() ?? ""}
                      onChange={(e) => handleChange(s.id, "phone", e.target.value)}
                      className="border p-2 rounded-lg w-full"
                    />
                  ) : (
                    <span>{s.phone}</span>
                  )}
                </td>

                {role === "faculty" && (
                  <td className="px-4 py-2">
                    {editingId === s.id ? (
                      <input
                        type="text"
                        value={s.subject}
                        onChange={(e) => handleChange(s.id, "subject", e.target.value)}
                        className="border p-2 rounded-lg w-full"
                      />
                    ) : (
                      <span>{s.subject}</span>
                    )}
                  </td>
                )}

         {role==="faculty"&&      <td className="px-4 py-2">
                  {s.avatar ? (
                    <img
                      src={s.avatar}
                      alt="student"
                      className="h-16 w-16 object-cover rounded-lg shadow-sm cursor-pointer"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No photo</span>
                  )}
                </td>}

                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleVerify(s.id, !s.isVerified)}
                    className={`px-4 py-2 rounded ${
                      s.isVerified ? "bg-green-600" : "bg-blue-600"
                    } text-white`}
                  >
                    {s.isVerified ? "Verified" : "Verify"}
                  </button>
                </td>

                <td className="px-4 py-2 text-center flex gap-2 justify-center">
                  {editingId === s.id ? (
                    <button
                      onClick={() => handleSave(s)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingId(s.id)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(s.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents?.length === 0 && !isLoading && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500 italic">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Scroll to Top Button */}
      <div ref={bottomRef}></div>
      {showScrollTop &&<button
      onClick={() => {
      const topDiv = document.getElementById("top");
      topDiv?.scrollIntoView({ behavior: "smooth" });
    }}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
        title="Return to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>}
    </div>
  );
}

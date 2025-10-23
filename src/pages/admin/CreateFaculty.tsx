/* eslint-disable @typescript-eslint/no-explicit-any */

// import { useState } from "react";
// import { useAuthStore } from "../../store/authStore";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// export default function CreateFacultyPage() {
//   const { signUp, isLoading, error } = useAuthStore();
//   const navigate=useNavigate()
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     subject: "",
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await signUp(formData, "faculty"); // pass role
//      toast.success("Successfully created Faculty account")
//       setTimeout(() => navigate("/admin/dashboard/showCredential", { state:{ ...formData,role: "faculty"} }), 1000);

//     } catch (err: any) {

//       alert(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
//         {/* Decorative circles */}
//         <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-200 rounded-full opacity-50 animate-pulse"></div>
//         <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-40 animate-pulse"></div>

//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//           Create Faculty Account
//         </h2>

//         {error && (
//           <p className="bg-red-100 text-red-700 p-3 mb-4 rounded text-center">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Faculty Name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">Phone</label>
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleInputChange}
//               className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">Subject</label>
//             <input
//               type="text"
//               name="subject"
//               placeholder="Subject"
//               value={formData.subject}
//               onChange={handleInputChange}
//               className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white py-3 rounded-xl font-semibold shadow-lg transition duration-300"
//           >
//             {isLoading ? "Creating..." : "Create Faculty"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Already have an account?{" "}
//           <a href="/login" className="text-indigo-600 font-semibold hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateFacultyPage() {
  const { signUp, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    subject: "",
    avatar: null as File | null, // 👈 faculty image
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, avatar: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {

    const payload = { 
      ...formData, 
      phone: Number(formData.phone) 
    };

    await signUp(payload, "faculty"); // pass role
    toast.success("Successfully created Faculty account");

    setTimeout(
      () =>
        navigate("/admin/dashboard/showCredential", {
          state: { ...payload, role: "faculty" },
        }),
      1000
    );
  } catch (err: any) {
    alert(err.message);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-40 animate-pulse"></div>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Faculty Account
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 mb-4 rounded text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Faculty Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              required
            />
          </div>

          {/* Avatar upload */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Avatar (optional)
            </label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
            {previewUrl && (
              <div className="mt-3">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:opacity-80"
                  onClick={() => setIsModalOpen(true)}
                />
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white py-3 rounded-xl font-semibold shadow-lg transition duration-300"
          >
            {isLoading ? "Creating..." : "Create Faculty"}
          </button>
        </form>

        {/* Modal for enlarged image */}
        {isModalOpen && previewUrl && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)} // close on background click
          >
            <div
              className="bg-white p-4 rounded-xl shadow-lg max-w-lg w-full"
              onClick={(e) => e.stopPropagation()} // prevent closing on image click
            >
              <img
                src={previewUrl}
                alt="Full Preview"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

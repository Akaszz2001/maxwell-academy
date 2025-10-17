// import { useFacultyGalleryStore } from "@/store/facultyGalleryStore";
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";


// export default function FacultyGallery() {
//   const { id } = useParams(); // get id from URL
//   const navigate = useNavigate();
//   const { faculties, fetchFaculties, createFaculty, updateFaculty } = useFacultyGalleryStore()

//   const [formData, setFormData] = useState({
//     name: "",
//     designation: "",
//     subject: "",
//     image: null,
//   });

//   const [isEditMode, setIsEditMode] = useState(false);

//   // Load faculty data if editing
//   useEffect(() => {
//     const loadFaculty = async () => {
//       if (!faculties.length) {
//         await fetchFaculties(); // ensure store has data
//       }
//       if (id) {
//         setIsEditMode(true);
//         const faculty = faculties.find((f) => f.id === id);
//         if (faculty) {
//           setFormData({
//             name: faculty.name || "",
//             designation: faculty.designation || "",
//             subject: faculty.subject || "",
//             image: null, // only update if user chooses a new file
//           });
//         }
//       }
//     };
//     loadFaculty();
//   }, [id, faculties, fetchFaculties]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isEditMode && id) {
//         await updateFaculty(id, formData);
//         alert("Faculty updated successfully!");
//       } else {
//         await createFaculty(formData);
//         alert("Faculty added successfully!");
//       }
//       navigate("/admin/dashboard"); // redirect after success
//     } catch (err) {
//       console.error(err);
//       alert("Error saving faculty!");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow">
//       <h2 className="text-xl font-semibold mb-4">
//         {isEditMode ? "Update Faculty" : "Add Faculty"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           className="w-full border p-2 rounded"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="designation"
//           placeholder="Designation"
//           className="w-full border p-2 rounded"
//           value={formData.designation}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="subject"
//           placeholder="Subject"
//           className="w-full border p-2 rounded"
//           value={formData.subject}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="file"
//           name="image"
//           accept="image/*"
//           onChange={handleChange}
//         />

//         {isEditMode && (
//           <p className="text-gray-500 text-sm">
//             (Leave image blank if you don’t want to change it)
//           </p>
//         )}

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {isEditMode ? "Update" : "Create"}
//         </button>
//       </form>
//     </div>
//   );
// }
import { Button } from "@/components/ui/button";
import { useFacultyGalleryStore } from "@/store/facultyGalleryStore";
import { ArrowLeft, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function FacultyGallery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { faculties, fetchFaculties, createFaculty, updateFaculty } = useFacultyGalleryStore();

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    subject: "",
    image: null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load faculty data if editing
  useEffect(() => {
    const loadFaculty = async () => {
      if (!faculties.length) {
        await fetchFaculties();
      }
      if (id) {
        setIsEditMode(true);
        const faculty = faculties.find((f) => f.id === id);
        if (faculty) {
          setFormData({
            name: faculty.name || "",
            designation: faculty.designation || "",
            subject: faculty.subject || "",
            image: null,
          });
          setPreview(faculty.imageUrl || null); // Assuming faculty.imageUrl exists
        }
      }
    };
    loadFaculty();
  }, [id, faculties, fetchFaculties]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && id) {
        await updateFaculty(id, formData);
        alert("Faculty updated successfully!");
      } else {
        await createFaculty(formData);
        alert("Faculty added successfully!");
      }
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error saving faculty!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 sm:p-8">
       {id&& 
        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-400 text-white"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </Button>
          <Button
           onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Home className="w-5 h-5" /> Dashboard
          </Button>
        </div>
      }
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {isEditMode ? "Update Faculty" : "Add Faculty"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.designation}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block mb-2 font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 rounded-lg"
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="relative w-32 h-32 mt-3">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg border"
            />
            {!isEditMode && (
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow-lg hover:bg-red-700"
              >
                ×
              </button>
            )}
          </div>
        )}

        {isEditMode && (
          <p className="text-gray-500 text-sm">
            (Leave image blank if you don’t want to change it)
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {isEditMode ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

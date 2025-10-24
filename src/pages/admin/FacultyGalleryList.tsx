/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect,useState } from "react";
import { useFacultyGalleryStore } from "@/store/facultyGalleryStore";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function FacultyGalleryList() {
  const { faculties, fetchFaculties, isLoading, deleteFaculty } =
    useFacultyGalleryStore();
const navigate=useNavigate()
const {user}=useAuthStore()

const [showdelete,setShowDelete]=useState(false)
const [deletid,setDeleteId ]=useState("")
  useEffect(() => {
    fetchFaculties();
  }, []);


const cnfrmDelete=async()=>{
setShowDelete(false)
try {
  await deleteFaculty(deletid)
  toast.success("Succecssfully deleted the Faculty")
  setDeleteId("")
} catch (error) {
  console.log(error);
  toast.error("Failed the deletion")
  setDeleteId("")
}
}

const handleDelet=(id)=>{
  setShowDelete(true)
  setDeleteId(id)
  
}


const cancelDelete=()=>{
  setShowDelete(false)
   setDeleteId("")
}
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-600 text-lg animate-pulse">Loading faculties...</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Our Faculties
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {faculties.map((faculty) => (
          <div             key={faculty.id}
            className="bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col items-center text-center p-5"
          >
            {/* Passport Photo */}
            <div className="w-32 h-40 bg-gray-100 rounded-md overflow-hidden shadow-sm">
              <img
                src={faculty.imageUrl ||""}
                alt={faculty.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Faculty Info */}
            <div className="mt-4" onClick={()=>user&& user.role==="admin"  && navigate(`/admin/dashboard/createFacultyGallery/${faculty.id}`)}
>
              <h3 className="text-lg font-semibold text-gray-800">
                {faculty.name}
              </h3>
              <p className="text-sm text-gray-600">{faculty.designation}</p>
              <p className="text-sm text-gray-500 mt-1 italic">
                {faculty.subject}
              </p>
            </div>

            {/* Delete Button */}
           { user&& user.role==="admin"  && <button
              onClick={()=>handleDelet(faculty.id)}
              className="mt-4 flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          
          }
          </div>
        ))}
      </div>

      {/* Empty State */}
      {faculties.length === 0 && (
        <div className="text-center text-gray-500 mt-16">
          <p>No faculty members found.</p>
        </div>
      )}


      {showdelete&&
      <ConfirmDialog title="Delete faculty?" message="Are you sure want to delete Faculty?" confirmText="Yes" cancelText="No"  onConfirm={cnfrmDelete} onCancel={cancelDelete}/>
      }
    </div>
  );
}

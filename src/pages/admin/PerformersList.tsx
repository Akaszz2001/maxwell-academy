import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePerformerStore } from "@/store/performersStore";
import { useAuthStore } from "@/store/authStore";
import { Trash2, Edit } from "lucide-react"; // ✅ delete & edit icons
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function PerformersList() {
  const { performers, fetchPerformers, deletePerformer } = usePerformerStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [showdeltemsg,setShowDeleteMsg]=useState(false)
 const [deleteid,setDeleteId]=useState("")
  useEffect(() => {
    fetchPerformers();
  }, [fetchPerformers]);

  if (!performers.length) {
    return <p className="text-center py-6 text-gray-500">No performers found.</p>;
  }

const confirmDelete=async()=>{
  setShowDeleteMsg(false)
  try {
      await deletePerformer(deleteid);
      toast.success("Performer deleted successfully!");
      setDeleteId("")
    } catch (err) {
      console.error("Error deleting performer:", err);
      toast.error("Failed to delete performer!");
      setDeleteId("")
    }

}

const cancelDelete=()=>{
   setShowDeleteMsg(false)
    setDeleteId("")
}
  const handleDelete = async (id: string) => {
   setDeleteId(id)
   setShowDeleteMsg(true)
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Top Performers</h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {performers.map((performer) => (
          <div
            key={performer.id}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center text-center transition hover:shadow-xl relative group"
          >
            {/* Performer Photo */}
     {performer.photo && (
                <img
  src={
    performer.photo instanceof File
      ? URL.createObjectURL(performer.photo) // convert File to URL 
      : performer.photo || "/placeholder.png" // existing URL or fallback
  }
  alt={performer.name || "Performer"}
  className="w-28 h-36 object-cover rounded-lg border-4 border-blue-100 mb-3 shadow-sm"
/>
  // <img
  //   src={
  //   performer.photo instanceof File
  //     ? URL.createObjectURL(performer.photo) // convert File to URL 
  //     : performer.photo || "/placeholder.png" // existing URL or fallback
  // }
  //   alt={performer.name || "Performer"}
  //   className="w-28 h-36 object-cover rounded-lg border-4 border-blue-100 mb-3 shadow-sm"
  // />
)}


            {/* Performer Details */}
            <h3 className="text-lg font-semibold">{performer.name}</h3>
            <p className="text-gray-500 text-sm mb-3">Rank: {performer.rank}</p>

            {/* Admin / Faculty Controls */}
            {(user?.role === "admin" || user?.role === "faculty") && (
              <div className="flex gap-3 mt-2">
                {/* Edit Button */}
                <button
                  onClick={() => navigate(`/admin/dashboard/editPerformer/${performer.id}`)}
                  className="text-blue-600 hover:text-blue-800 transition"
                  title="Edit Performer"
                >
                  <Edit size={20} />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(performer.id!)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Delete Performer"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
{showdeltemsg&&

<ConfirmDialog title="Delete the Performer" message="Are you sure want to delete the Performer?" confirmText="Yes"  cancelText="No"  onConfirm={confirmDelete} onCancel={cancelDelete}/>
}
      {/* Add New Performer */}
      {/* {(user?.role === "admin" || user?.role === "faculty") && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/admin/dashboard/performers/add")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            + Add New Performer
          </button>
        </div>
      )} */}
    </div>
  );
}

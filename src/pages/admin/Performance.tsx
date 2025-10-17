import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePerformerStore, type Performer } from "@/store/performersStore";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function PerformerForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const { createPerformer, updatePerformer, fetchPerformers, performers } = usePerformerStore();

  const [formData, setFormData] = useState<Partial<Performer>>({
    name: "",
    rank: 0,
    photo: undefined,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Load performer data when editing
  useEffect(() => {
    const loadPerformer = async () => {
      await fetchPerformers();
    };
    loadPerformer();
  }, [fetchPerformers]);

  useEffect(() => {
    if (id && performers.length > 0) {
      const performer = performers.find((p) => p.id === id);
      if (performer) {
        setFormData({
          name: performer.name,
          rank: performer.rank,
          photo: performer.photo, // full URL
        });
        setPreview(performer.photo || null);
      }
    }
  }, [id, performers]);

  // ✅ Handle field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Remove image (only create mode)
  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, photo: undefined }));
    setPreview(null);
  };

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updatePerformer(id, formData);
        alert("Performer updated successfully!");
      } else {
        await createPerformer(formData);
        alert("Performer added successfully!");
      }

      // ✅ Reset form
      setFormData({ name: "", rank: 0, photo: undefined });
      setPreview(null);

      navigate("/admin/dashboard/");
    } catch (err) {
      alert("Error saving performer!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
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
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {id ? "Edit Performer" : "Add Performer"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="border w-full rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
            placeholder="Enter performer name"
            required
          />
        </div>

        {/* Rank */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Rank</label>
          <input
            type="number"
            name="rank"
            value={formData.rank || 0}
            onChange={handleChange}
            className="border w-full rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
            placeholder="Enter performer rank"
            required
          />
        </div>

        {/* Photo */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="border w-full rounded-lg p-2 cursor-pointer focus:ring-2 focus:ring-blue-400 outline-none transition"
          />

          {/* Preview */}
          {preview && (
            <div className="relative w-32 h-32 mt-4">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 shadow-sm"
              />
              {!id && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition"
                  title="Remove image"
                >
                  ×
                </button>
              )}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-medium transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow-md"
          }`}
        >
          {loading
            ? id
              ? "Updating Performer..."
              : "Creating Performer..."
            : id
            ? "Update Performer"
            : "Create Performer"}
        </button>
      </form>
    </div>
  );
}

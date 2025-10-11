import pb from "@/services/pocketbase";
import { create } from "zustand";


export const useFacultyGalleryStore = create((set, get) => ({
  faculties: [],
  isLoading: false,

  // ✅ Fetch all faculty and convert image to full URL
  fetchFaculties: async () => {
    set({ isLoading: true });
    try {
      const records = await pb.collection("facultygallery").getFullList({ sort: "-created" });

      // Convert image file name to URL
      const formatted = records.map((f) => ({
        ...f,
        imageUrl: f.image ? pb.files.getURL(f, f.image) : null,
      }));

      set({ faculties: formatted });
    } catch (err) {
      console.error("Error fetching faculties:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  // ✅ Create new faculty
  createFaculty: async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("designation", data.designation);
      formData.append("subject", data.subject);
      formData.append("image", data.image);

      const record = await pb.collection("facultygallery").create(formData);

      const formatted = {
        ...record,
        imageUrl: record.image ? pb.files.getURL(record, record.image) : null,
      };

      set((state) => ({ faculties: [formatted, ...state.faculties] }));
    } catch (err) {
      console.error("Error creating faculty:", err);
      throw err;
    }
  },

  // ✅ Update existing faculty
  updateFaculty: async (id, data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("designation", data.designation);
      formData.append("subject", data.subject);
      if (data.image) formData.append("image", data.image);

      const updated = await pb.collection("facultygallery").update(id, formData);

      const formatted = {
        ...updated,
        imageUrl: updated.image ? pb.files.getURL(updated, updated.image) : null,
      };

      set((state) => ({
        faculties: state.faculties.map((f) => (f.id === id ? formatted : f)),
      }));
    } catch (err) {
      console.error("Error updating faculty:", err);
      throw err;
    }
  },

  // ✅ Delete faculty
  deleteFaculty: async (id) => {
    try {
      await pb.collection("facultygallery").delete(id);
      set((state) => ({
        faculties: state.faculties.filter((f) => f.id !== id),
      }));
    } catch (err) {
      console.error("Error deleting faculty:", err);
      throw err;
    }
  },
}));

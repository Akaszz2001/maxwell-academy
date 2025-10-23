/* eslint-disable @typescript-eslint/no-explicit-any */
import pb from "@/services/pocketbase";
import { create } from "zustand";

// Define the Faculty type based on your collection fields
export interface Faculty {
  id: string;
  name: string;
  designation: string;
  subject: string;
  image?: string | null
  imageUrl?: string | null;
  created: string;
  updated: string;
}

interface FacultyStore {
  faculties: Faculty[];
  isLoading: boolean;
  fetchFaculties: () => Promise<void>;
  createFaculty: (data: {
    name: string; 
    designation: string;
    subject: string ;
    image: string ;
  }) => Promise<void>;
  updateFaculty: (
    id: string,
    data: {
      name: string
      designation: string ;
      subject: string ;
      image?: string 
    }
  ) => Promise<void>;
  deleteFaculty: (id: string) => Promise<void>;
}

export const useFacultyGalleryStore = create<FacultyStore>((set, ) => ({
  faculties: [],
  isLoading: false,

  fetchFaculties: async () => {
    set({ isLoading: true });
    try {
      const records = await pb.collection("facultygallery").getFullList({ sort: "-created" });

      const formatted: Faculty[] = records.map((f: any) => ({
        id: f.id,
        name: f.name,
        designation: f.designation,
        subject: f.subject,
        image: f.image,
        imageUrl: f.image ? pb.files.getURL(f, f.image) : null,
        created: f.created,
        updated: f.updated,
      }));

      set({ faculties: formatted });
    } catch (err) {
      console.error("Error fetching faculties:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  createFaculty: async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("designation", data.designation);
      formData.append("subject", data.subject);
      formData.append("image", data.image);

      const record: any = await pb.collection("facultygallery").create(formData);

      const formatted: Faculty = {
        id: record.id,
        name: record.name,
        designation: record.designation,
        subject: record.subject,
        image: record.image,
        imageUrl: record.image ? pb.files.getURL(record, record.image) : null,
        created: record.created,
        updated: record.updated,
      };

      set((state) => ({ faculties: [formatted, ...state.faculties] }));
    } catch (err) {
      console.error("Error creating faculty:", err);
      throw err;
    }
  },

  updateFaculty: async (id, data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("designation", data.designation);
      formData.append("subject", data.subject);
      if (data.image) formData.append("image", data.image);

      const updated: any = await pb.collection("facultygallery").update(id, formData);

      const formatted: Faculty = {
        id: updated.id,
        name: updated.name,
        designation: updated.designation,
        subject: updated.subject,
        image: updated.image,
        imageUrl: updated.image ? pb.files.getURL(updated, updated.image) : null,
        created: updated.created,
        updated: updated.updated,
      };

      set((state) => ({
        faculties: state.faculties.map((f) => (f.id === id ? formatted : f)),
      }));
    } catch (err) {
      console.error("Error updating faculty:", err);
      throw err;
    }
  },

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

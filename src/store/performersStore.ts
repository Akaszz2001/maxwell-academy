// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { create } from "zustand";
// import pb from "@/services/pocketbase";

// export interface Performer {
//   id?: string;
//   name: string;
//   rank: number;
//   photo?: string; // full image URL
// }

// interface PerformerState {
//   performers: Performer[];
//   fetchPerformers: () => Promise<void>;
//   createPerformer: (data: Performer) => Promise<void>;
//   updatePerformer: (id: string, data: Performer) => Promise<void>;
//   deletePerformer: (id: string) => Promise<void>; // ✅ added
// }

// export const usePerformerStore = create<PerformerState>((set, get) => ({
//   performers: [],

//   // ✅ Fetch performers
//   fetchPerformers: async () => {
//     try {
//       const records = await pb.collection("performers").getFullList({ sort: "-created" });
//       const formatted = records.map((record: any) => ({
//         id: record.id,
//         name: record.name,
//         rank: record.rank,
//         photo: record.photo
//           ? pb.files.getURL(record, record.photo, { thumb: "400x400" })
//           : undefined,
//       }));
//       set({ performers: formatted });
//     } catch (err) {
//       console.error("Error fetching performers:", err);
//     }
//   },

//   // ✅ Create performer
//   createPerformer: async (data) => {
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("rank", data.rank.toString());
//     if (data.photo instanceof File) formData.append("photo", data.photo);

//     await pb.collection("performers").create(formData);
//     await get().fetchPerformers();
//   },

//   // ✅ Update performer
//   updatePerformer: async (id, data) => {
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("rank", data.rank.toString());
//     if (data.photo instanceof File) formData.append("photo", data.photo);

//     await pb.collection("performers").update(id, formData);
//     await get().fetchPerformers();
//   },

//   // ✅ Delete performer
//   deletePerformer: async (id) => {
//     try {
//       await pb.collection("performers").delete(id);
//       // Refresh performer list after deletion
//       await get().fetchPerformers();
//     } catch (err) {
//       console.error("Error deleting performer:", err);
//       throw err;
//     }
//   },
// }));





/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import pb from "@/services/pocketbase";

export interface Performer {
  id?: string;
  name: string;
  rank: number;
  photo?: string | File; // allow File for new uploads
}

interface PerformerState {
  performers: Performer[];
  fetchPerformers: () => Promise<void>;
  createPerformer: (data: Performer) => Promise<void>;
  updatePerformer: (id: string, data: Performer) => Promise<void>;
  deletePerformer: (id: string) => Promise<void>;
}

export const usePerformerStore = create<PerformerState>((set, get) => ({
  performers: [],

  fetchPerformers: async () => {
    try {
      const records = await pb.collection("performers").getFullList({ sort: "-created" });
      const formatted = records.map((record: any) => ({
        id: record.id,
        name: record.name,
        rank: record.rank,
        photo: record.photo
          ? pb.files.getURL(record, record.photo, { thumb: "400x400" })
          : undefined,
      }));
      set({ performers: formatted });
    } catch (err) {
      console.error("Error fetching performers:", err);
    }
  },

  createPerformer: async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("rank", data.rank.toString());

    // ✅ Fix type narrowing for photo
    if (data.photo && typeof data.photo !== "string") {
      formData.append("photo", data.photo);
    }

    await pb.collection("performers").create(formData);
    await get().fetchPerformers();
  },

  updatePerformer: async (id, data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("rank", data.rank.toString());

    // ✅ Fix type narrowing for photo
    if (data.photo && typeof data.photo !== "string") {
      formData.append("photo", data.photo);
    }

    await pb.collection("performers").update(id, formData);
    await get().fetchPerformers();
  },

  deletePerformer: async (id) => {
    try {
      await pb.collection("performers").delete(id);
      await get().fetchPerformers();
    } catch (err) {
      console.error("Error deleting performer:", err);
      throw err;
    }
  },
}));

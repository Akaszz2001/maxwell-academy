// import { create } from "zustand";
// import pb from "@/services/pocketbase";

// interface Announcement {
//   id?: string;
//   title: string;
//   subject?: string;
//   audience: "all" | "student" | "faculty";
//   attachement?: File[]; // multiple files
//   active:boolean
// }

// interface AnnouncementState {
//   announcements: Announcement[];
//   isLoading: boolean;
//   error: string | null;
//   addAnnouncement: (data: Announcement) => Promise<void>;
//   fetchAnnouncements: () => Promise<void>;
//   fetchAnnouncementsById: (id:string) => Promise<Announcement>;
// }

// export const useAnnouncementStore = create<AnnouncementState>((set) => ({
//   announcements: [],
//   isLoading: false,
//   error: null,

//   // Add new announcement
//   addAnnouncement: async (data: Announcement) => {
//     try {
//       set({ isLoading: true, error: null });

//       const formData = new FormData();
//       formData.append("title", data.title);
//       if (data.subject) formData.append("subject", data.subject);
//       formData.append("audience", data.audience);
//       formData.append("active","true")

//       // Append each file individually
//       if (data.attachement && data.attachement.length > 0) {
//         data.attachement.forEach((file) => {
//           formData.append("attachement", file); // PB field name
//         });
//       }

//       // Debug: check FormData content
//       console.log("FormData entries:");
//       for (const pair of formData.entries()) {
//         console.log(pair[0], pair[1]);
//       }

//       const record = await pb.collection("announcements").create(formData);
//       console.log("Created record:", record);

//       // Refresh announcements
//       const updated = await pb.collection("announcements").getFullList({ sort: "-created" });
//       set({ announcements: updated, isLoading: false });
//     } catch (err) {
//       console.error(err);
//       set({ error: (err as Error).message, isLoading: false });
//     }
//   },

//   // Fetch all announcements
//   fetchAnnouncements: async () => {
//     try {
//       set({ isLoading: true, error: null });
//       const list = await pb.collection("announcements").getFullList({ sort: "-created" });
//       set({ announcements: list, isLoading: false });
//     } catch (err) {
//       set({ error: (err as Error).message, isLoading: false });
//     }
//   },
//   fetchAnnouncementsById: async (id) => {
//     try {
//       set({ isLoading: true, error: null });
//       const list = await pb.collection("announcements").getFullList({ 
//         filter: `id="${id}"`,
//         sort: "-created" });

//       set({ isLoading: false });
//         return list
//     } catch (err) {
//       set({ error: (err as Error).message, isLoading: false });
//       return err
//     }
//   },
// }));

import { create } from "zustand";
import pb from "@/services/pocketbase";
import { useAuthStore } from "./authStore";

interface Announcement {
  id?: string;
  title: string;
  subject?: string;
  audience: "all" | "student" | "faculty";
  attachement?: File[]; // multiple files
  active: boolean;
  created: string;
  updated: string;
}

interface AnnouncementState {
  announcements: Announcement[];
  isLoading: boolean;
  error: string | null;
  addAnnouncement: (data: Announcement) => Promise<void>;
  fetchAnnouncements: () => Promise<void>;
  fetchAnnouncementsForNotfications: (role:string) => Promise<void>;
  fetchAnnouncementsById: (id: string) => Promise<Announcement | null>;
  updateAnnouncement: (id: string, data: Announcement) => Promise<void>;
   fetchAnnouncementsByRole: () => Promise<void>; // <-- new
   deleteAnnouncement:(id:string)=>Promise<void>
}

export const useAnnouncementStore = create<AnnouncementState>((set) => ({
  announcements: [],
  isLoading: false,
  error: null,

  // Add a new announcement
  addAnnouncement: async (data: Announcement) => {
    try {
      set({ isLoading: true, error: null });

      const formData = new FormData();
      formData.append("title", data.title);
      if (data.subject) formData.append("subject", data.subject);
      formData.append("audience", data.audience);
      formData.append("active", data.active.toString());

      if (data.attachement && data.attachement.length > 0) {
        data.attachement.forEach((file) => formData.append("attachement", file));
      }

      await pb.collection("announcements").create(formData);

      const updated = await pb.collection("announcements").getFullList({
        sort: "-created",
      });

      set({ announcements: updated, isLoading: false });
    } catch (err) {
      console.error("Error adding announcement:", err);
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  // Fetch all announcements
  fetchAnnouncements: async () => {
    try {
      set({ isLoading: true, error: null });
      const list = await pb.collection("announcements").getFullList({
   
        sort: "-created"
      });
      set({ announcements: list, isLoading: false });

    } catch (err) {
      console.error("Error fetching announcements:", err);
      set({ error: (err as Error).message, isLoading: false });
      
     }
  },
  fetchAnnouncementsForNotfications: async (role:string) => {
    try {
      set({ isLoading: true, error: null });
      const list = await pb.collection("announcements").getFullList({
             filter: `active=true && (audience="all" || audience~"${role}")`,
        sort: "-created"
      });
      set({ announcements: list, isLoading: false });

    } catch (err) {
      console.error("Error fetching announcements:", err);
      set({ error: (err as Error).message, isLoading: false });
      
     }
  },

  // Fetch single announcement by ID
  // fetchAnnouncementsById: async (id: string) => {
  //   try {
  //     set({ isLoading: true, error: null });
  //     const record = await pb.collection("announcements").getOne(id);
  //     set({ isLoading: false });
  //     return record as Announcement;
  //   } catch (err) {
  //     console.error("Error fetching announcement by ID:", err);
  //     set({ error: (err as Error).message, isLoading: false });
  //     return null;
  //   }
  // },
fetchAnnouncementsById: async (id: string) => {
  try {
    set({ isLoading: true, error: null });

    // Fetch the record by ID
    const record = await pb.collection("announcements").getOne(id);

    // Map attachments to full URLs
    let attachments: string[] = [];
    if (record.attachement && Array.isArray(record.attachement)) {
      attachments = record.attachement.map((fileName: string) =>
        pb.files.getURL(record, fileName)
      );
    }

    // Build the announcement object with URLs
    const announcement: Announcement & { attachementUrls?: string[] } = {
      id: record.id,
      title: record.title,
      subject: record.subject,
      audience: record.audience,
      active: record.active,
      attachement: record.attachement || [],
      attachementUrls: attachments, 
      created:record.created// URLs ready for frontend
    };

    set({ isLoading: false });
    return announcement;
  } catch (err) {
    console.error("Error fetching announcement by ID:", err);
    set({ error: (err as Error).message, isLoading: false });
    return null;
  }
},

  // Update existing announcement
  updateAnnouncement: async (id: string, data: Announcement) => {
    try {
      set({ isLoading: true, error: null });

      const formData = new FormData();
      formData.append("title", data.title);
      if (data.subject) formData.append("subject", data.subject);
      formData.append("audience", data.audience);
      formData.append("active", data.active);

      if (data.attachement && data.attachement.length > 0) {
        data.attachement.forEach((file) => formData.append("attachement", file));
      }

      await pb.collection("announcements").update(id, formData);

      const updated = await pb.collection("announcements").getFullList({
        sort: "-created",
      });

      set({ announcements: updated, isLoading: false });
      console.log("Updated announcement:", id);
    } catch (err) {
      console.error("Error updating announcement:", err);
      set({ error: (err as Error).message, isLoading: false });
    }
  },

    fetchAnnouncementsByRole: async () => {
    try {
      set({ isLoading: true, error: null });
      const user = useAuthStore.getState().user;

      const list = await pb.collection("announcements").getFullList({
        filter:"active=true",
        sort: "-updated", // or "-created"
      });

      // Filter by user role
      const filtered = list.filter((a: any) =>
        a.audience.includes("all") || a.audience.includes(user?.role)
      );

      set({ announcements: filtered, isLoading: false });
    } catch (err) {
      console.error("Error fetching announcements by role:", err);
      set({ error: (err as Error).message, isLoading: false });
    }
  },
  // Delete an announcement by ID
deleteAnnouncement: async (id: string) => {
  try {
    set({ isLoading: true, error: null });

    // Delete from PocketBase
    await pb.collection("announcements").delete(id);

    // Update local state after deletion
    set((state) => ({
      announcements: state.announcements.filter((a) => a.id !== id),
      isLoading: false,
    }));

    console.log("Deleted announcement:", id);
  } catch (err) {
    console.error("Error deleting announcement:", err);
    set({ error: (err as Error).message, isLoading: false });
  }
},

}));



import { create } from "zustand";
import pb from "@/services/pocketbase";
import { useAuthStore } from "./authStore";
import type { RecordModel } from "pocketbase";

interface Announcement {


  id?: string;
  title: string;
  subject?: string;
  audience: "all" | "student" | "faculty";
  attachement?: File[]; // multiple files
  attachementUrls?:string[]
  active: boolean;
  created: string;
  updated: string;
  removedFiles?: string[];
}

interface AnnouncementState {
  announcements: Announcement[];
  isLoading: boolean;
  error: string | null;
  addAnnouncement: (data: Announcement) => Promise<void>;
  fetchAnnouncements: () => Promise<void>;
  fetchAnnouncementsForNotfications: (role: string) => Promise<void>;
  fetchAnnouncementsById: (id: string) => Promise<Announcement | null>;
  updateAnnouncement: (id: string, data: Announcement) => Promise<void>;
  fetchAnnouncementsByRole: () => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;
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

      const updated = await pb.collection("announcements").getFullList<RecordModel>({
        sort: "-created",
      });

      // ✅ Fix: map RecordModel → Announcement
      set({
        announcements: updated.map((r) => ({
          id: r.id,
          title: r.title,
          subject: r.subject,
          audience: r.audience,
          active: r.active,
          created: r.created,
          updated: r.updated,
        })),
        isLoading: false,
      });
    } catch (err) {
      console.error("Error adding announcement:", err);
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  // Fetch all announcements
  fetchAnnouncements: async () => {
    try {
      set({ isLoading: true, error: null });
      const list = await pb.collection("announcements").getFullList<RecordModel>({
        sort: "-created",
      });
console.log(list);

      // ✅ Fix: map to Announcement[]
      set({
        announcements: list.map((r) => ({
          id: r.id,
          title: r.title,
          subject: r.subject,
          audience: r.audience,
          active: r.active,
          created: r.created,
          attachement:r.attachement,
          updated: r.updated,
        })),
        isLoading: false,
      });
    } catch (err) {
      console.error("Error fetching announcements:", err);
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  fetchAnnouncementsForNotfications: async (role: string) => {
    try {
      set({ isLoading: true, error: null });
      const list = await pb.collection("announcements").getFullList<RecordModel>({
        filter: `active=true && (audience="all" || audience~"${role}")`,
        sort: "-created",
      });

      // ✅ Fix: map to Announcement[]
      set({
        announcements: list.map((r) => ({
          id: r.id,
          title: r.title,
          subject: r.subject,
          audience: r.audience,
          active: r.active,
          created: r.created,
          updated: r.updated,
        })),
        isLoading: false,
      });
    } catch (err) {
      console.error("Error fetching announcements:", err);
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  fetchAnnouncementsById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });

      const record = await pb.collection("announcements").getOne<RecordModel>(id);

      let attachments: string[] = [];
      if (record.attachement && Array.isArray(record.attachement)) {
         
        attachments = record.attachement.map((fileName: string) =>
          pb.files.getURL(record, fileName)
        );
      }

      const announcement: Announcement & { attachementUrls?: string[] } = {
        id: record.id,
        title: record.title,
        subject: record.subject,
        audience: record.audience,
        active: record.active,
        attachement: record.attachement || [],
        attachementUrls: attachments,
        created: record.created,
        updated: record.updated,
      };
console.log(announcement);

      set({ isLoading: false });
      return announcement;
    } catch (err) {
      console.error("Error fetching announcement by ID:", err);
      set({ error: (err as Error).message, isLoading: false });
      return null;
    }
  },

  updateAnnouncement: async (id: string, data: Announcement) => {
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

      await pb.collection("announcements").update(id, formData);

      const updated = await pb.collection("announcements").getFullList<RecordModel>({
        sort: "-created",
      });

      // ✅ Fix
      set({
        announcements: updated.map((r) => ({
          id: r.id,
          title: r.title,
          subject: r.subject,
          audience: r.audience,
          active: r.active,
          created: r.created,
          updated: r.updated,
        })),
        isLoading: false,
      });
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

      const list = await pb.collection("announcements").getFullList<RecordModel>({
        filter: "active=true",
        sort: "-updated",
      });

      const filtered = list.filter(
        (a) => a.audience.includes("all") || a.audience.includes(user?.role)
      );

      set({
        announcements: filtered.map((r) => ({
          id: r.id,
          title: r.title,
          subject: r.subject,
          audience: r.audience,
          active: r.active,
          created: r.created,
          updated: r.updated,
        })),
        isLoading: false,
      });
    } catch (err) {
      console.error("Error fetching announcements by role:", err);
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  deleteAnnouncement: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await pb.collection("announcements").delete(id);

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

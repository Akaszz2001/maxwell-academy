

// // src/store/eventStore.ts
// import pb from "@/services/pocketbase";
// import { create } from "zustand";

// export interface Event {
//   id: string;
//   eventname: string;
//   description?: string;
//   images?: string[];
//   created: string;
//   updated: string;
// }

// interface EventsStore {
//   events: Event[];
//   fetchEvents: () => Promise<void>;
//   createEvent: (data: { eventname: string; description?: string; images: File[] }) => Promise<void>;
//   deleteEvent: (id: string) => Promise<void>;
//   updateEvent: (id: string, data: { eventname: string; description?: string; images?: File[]; removeImages?: string[] }) => Promise<void>;
// removeImageFromEvent:(eventId:string,imageUrl: string) =>Promise<void>
// }

// export const useEventsStore = create<EventsStore>((set) => ({
//   events: [],

//   fetchEvents: async () => {
//     try {
//       const list = await pb.collection("events").getFullList<Event>({
//         sort: "-created",
//       });

//       const eventsWithUrls = list.map((event) => {
//         const images = event.images || [];
//         const imageUrls = images.map((img) => pb.files.getURL(event, img));
//         return { ...event, images: imageUrls };
//       });

//       set({ events: eventsWithUrls });
//     } catch (err) {
//       console.error("Error fetching events:", err);
//       set({ events: [] });
//     }
//   },

//   createEvent: async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("eventname", data.eventname);
//       if (data.description) formData.append("description", data.description);
//       data.images.forEach((file) => formData.append("images", file));

//       await pb.collection("events").create(formData);

//       await pb.collection("events").getFullList<Event>({ sort: "-created" }).then((list) =>
//         set({ events: list })
//       );
//     } catch (err) {
//       console.error("Error creating event:", err);
//       throw err;
//     }
//   },

//   deleteEvent: async (id) => {
//     try {
//       await pb.collection("events").delete(id);
//       set((state) => ({
//         events: state.events.filter((e) => e.id !== id),
//       }));
//     } catch (err) {
//       console.error("Error deleting event:", err);
//       throw err;
//     }
//   },

//  // src/store/eventStore.ts
// updateEvent: async (id, data) => {
//   try {
//     const formData = new FormData();
//     formData.append("eventname", data.eventname);
//     if (data.description) formData.append("description", data.description);

//     // Append new images if any
//     data.images?.forEach((file) => formData.append("images", file));

//     // Remove images if specified
//     if (data.removeImages && data.removeImages.length > 0) {
//       data.removeImages.forEach((img) => formData.append("remove_images[]", img));
//     }

//     await pb.collection("events").update(id, formData);

//     // Refresh events
//     const list = await pb.collection("events").getFullList<Event>({ sort: "-created" });
//     set({ events: list });
//   } catch (err) {
//     console.error("Error updating event:", err);
//     throw err;
//   }
// },

// // New function to remove a single image from existing event
// // src/store/eventStore.ts
// removeImageFromEvent: async (eventId: string, imageUrl: string) => {
//   try {
//     // 1. Fetch the event record by ID
//     const event = await pb.collection("events").getOne(eventId);
//     const images: string[] = event.images || [];

//     if (images.length === 0) return;

//     // 2. Find the filename corresponding to the clicked URL
//     const filenameToRemove = images.find((filename) => pb.files.getURL(event, filename) === imageUrl);
//     if (!filenameToRemove) return;

//     // 3. Use PocketBase API to remove the image
//     // Important: append the filename exactly as stored in the `images` array
//     const formData = new FormData();
//     formData.append("remove_images[]", filenameToRemove);

//     await pb.collection("events").update(eventId, formData);

//     // 4. Update local state
//     set((state) => ({
//       events: state.events.map((e) =>
//         e.id === eventId
//           ? { ...e, images: e.images?.filter((img) => img !== filenameToRemove) }
//           : e
//       ),
//     }));
//   } catch (err) {
//     console.error("Error removing image:", err);
//     throw err;
//   }
// }


// }));



// src/store/eventStore.ts
import pb from "@/services/pocketbase";
import { create } from "zustand";

export interface Event {
  id: string;
  eventname: string;
  description?: string;
  images?: string[];
  created: string;
  updated: string;
}

interface EventsStore {
  events: Event[];
  fetchEvents: () => Promise<void>;
  createEvent: (data: { eventname: string; description?: string; images: File[] }) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  updateEvent: (id: string, data: { eventname: string; description?: string; images?: File[]; removeImages?: string[] }) => Promise<void>;
  removeImageFromEvent: (eventId: string, imageUrl: string) => Promise<void>;
}

export const useEventsStore = create<EventsStore>((set) => ({
  events: [],

  fetchEvents: async () => {
    try {
      const list = await pb.collection("events").getFullList<Event>({
        sort: "-created",
      });

      const eventsWithUrls = list.map((event) => {
        const images = event.images || [];
        const imageUrls = images.map((img) => pb.files.getURL(event, img));
        return { ...event, images: imageUrls };
      });

      set({ events: eventsWithUrls });
    } catch (err) {
      console.error("Error fetching events:", err);
      set({ events: [] });
    }
  },

  createEvent: async (data) => {
    try {
      const formData = new FormData();
      formData.append("eventname", data.eventname);
      if (data.description) formData.append("description", data.description);
      data.images.forEach((file) => formData.append("images", file));

      await pb.collection("events").create(formData);
      await setTimeout(async () => await pb.collection("events").getFullList<Event>({ sort: "-created" }).then((list) =>
        set({ events: list })
      ), 100);
    } catch (err) {
      console.error("Error creating event:", err);
      throw err;
    }
  },

  deleteEvent: async (id) => {
    try {
      await pb.collection("events").delete(id);
      set((state) => ({
        events: state.events.filter((e) => e.id !== id),
      }));
    } catch (err) {
      console.error("Error deleting event:", err);
      throw err;
    }
  },

  // updateEvent: async (id, data) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("eventname", data.eventname);
  //     if (data.description) formData.append("description", data.description);

  //     // Append new images
  //     data.images?.forEach((file) => formData.append("images", file));

  //     // Remove images if specified
  //     if (data.removeImages && data.removeImages.length > 0) {
  //       data.removeImages.forEach((img) => formData.append("remove_images[]", img));
  //     }

  //     await pb.collection("events").update(id, formData);

  //     // Refresh events
  //     const list = await pb.collection("events").getFullList<Event>({ sort: "-created" });
  //     const eventsWithUrls = list.map((event) => {
  //       const images = event.images || [];
  //       const imageUrls = images.map((img) => pb.files.getURL(event, img));
  //       return { ...event, images: imageUrls };
  //     });

  //     set({ events: eventsWithUrls });
  //   } catch (err) {
  //     console.error("Error updating event:", err);
  //     throw err;
  //   }
  // },

//   updateEvent: async (id, data) => {
//   try {
//     const formData = new FormData();
//     formData.append("eventname", data.eventname);
//     if (data.description) formData.append("description", data.description);

//     // Append only new images
//     data.images?.forEach((file) => formData.append("images", file));

//     // Append images to remove (from existing images)
//     if (data.removeImages && data.removeImages.length > 0) {
//       data.removeImages.forEach((img) => formData.append("remove_images[]", img));
//     }

//     await pb.collection("events").update(id, formData);

//     // Refresh events
//     const list = await pb.collection("events").getFullList<Event>({ sort: "-created" });
//     const eventsWithUrls = list.map((event) => {
//       const images = event.images || [];
//       const imageUrls = images.map((img) => pb.files.getURL(event, img));
//       return { ...event, images: imageUrls };
//     });

//     set({ events: eventsWithUrls });
//   } catch (err) {
//     console.error("Error updating event:", err);
//     throw err;
//   }
// },
updateEvent: async (id, data) => {
  try {
    const formData = new FormData();
    formData.append("eventname", data.eventname);
    if (data.description) formData.append("description", data.description);

    // 1️⃣ Fetch existing images from the event
    const event = await pb.collection("events").getOne(id);
    const existingImages: string[] = event.images || [];

    // 2️⃣ Combine existing images filenames and new files into a single array
    const allImages: (string | File)[] = [...existingImages, ...(data.images || [])];

    // 3️⃣ Append everything to FormData under "images"
    allImages.forEach((img) => formData.append("images", img));

    // 4️⃣ Update event in PocketBase
    await pb.collection("events").update(id, formData);

    // 5️⃣ Refresh events in store
    const list = await pb.collection("events").getFullList<Event>({ sort: "-created" });
    const eventsWithUrls = list.map((event) => {
      const images = event.images || [];
      const imageUrls = images.map((img) => pb.files.getURL(event, img));
      return { ...event, images: imageUrls };
    });

    set({ events: eventsWithUrls });
  } catch (err) {
    console.error("Error updating event:", err);
    throw err;
  }
},


  removeImageFromEvent: async (eventId: string, imageUrl: string) => {
  try {
    // 1. Fetch the event record by ID
    const event = await pb.collection("events").getOne(eventId);
    const images: string[] = event.images || [];

    // 2. Find the filename that matches the imageUrl
    const filenameToRemove = images.find(
      (filename) => pb.files.getURL(event, filename) === imageUrl
    );

    if (!filenameToRemove) return;

    // 3. Filter out the filename to remove
    const updatedImages = images.filter((filename) => filename !== filenameToRemove);

    // 4. Prepare FormData and append all remaining images back
    const formData = new FormData();
    for (const filename of updatedImages) {
      formData.append("images", event[`@files.images`]?.find((f: File) => f.name === filename) || filename);
    }

    // 5. Update the record in PocketBase
    await pb.collection("events").update(eventId, { images: updatedImages });

    // 6. Update local state
    set((state) => ({
      events: state.events.map((e) =>
        e.id === eventId
          ? { ...e, images: updatedImages }
          : e
      ),
    }));
  } catch (err) {
    console.error("Error removing image:", err);
    throw err;
  }
},

}));

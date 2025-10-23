/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import pb from "../services/pocketbase";
;
// Form data used in signup forms
export interface FormData {
  name: string;
  email: string;
  phone: string;
  isVerified?:boolean
  password: string;
  subject?: string; // 👈 added for faculty
  avatar?: File | null; // 👈 optional file upload
}

// Unified User model (what comes back from PB)
export interface User {
  id: string;
  email: string;
  name: string;
  isVerified?:boolean
  role: "student" | "faculty" | "admin";
  phone?: number;
  subject?: string; // 👈 added for faculty
  avatar?: string;  // 👈 stored as filename in PB
  created: string;
  updated: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
    students?: User[];
    faculty?:User[]
    noOfStudents?:User[]

  // Actions
  setAuth: (user: User, token: string) => void;
  checkAuth: () => void;
  fetchStudents:(role:string)=>Promise<void>;
  fetchFaculties:()=>Promise<void>;
  fetchAllUsers:()=>Promise<void>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ user: User; token: string }>;
signUp: (
  data: {
    name: string;
    email: string;
    phone?: number;
    password: string;
    subject?: string;
    avatar?: File | null; // 👈 added
  },
  role?: "student" | "faculty" | "admin"
) => Promise<void>;
  signOut: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  updateVerificationStatus: (id: string, status: boolean) => Promise<void>;
}

// Convert PB record to our User type
 
export const convertToUser = (record: any): User => ({
  id: record.id ?? "",
  email: record.email ?? "",
  name: record.name ?? "",
  role: record.role ?? "student",
  isVerified:record.isVerified??"",
  phone: record.phone ?? "",
  subject: record.subject ?? "",
  created: record.created ?? "",
  updated: record.updated ?? "",
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setAuth: (user: any, token: any) => set({ user, token }),

      checkAuth: () => {
        if (pb.authStore.isValid && pb.authStore.model) {
          set({
            user: convertToUser(pb.authStore.model),
            token: pb.authStore.token,
            isAuthenticated: true,
          });
        } else {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },


fetchStudents: async (role) => {
  try {
    set({ isLoading: true, error: null });

    const studentList = await pb.collection("users").getFullList({
    filter: `role = '${role}'`,
      sort: "-created", // optional: newest first
    });
    console.log(studentList);
    
const mapped=studentList.map((rec:any)=>{
  return{
    id:rec.id,
    name:rec.name,
    email:rec.email,
    phone:rec.phone,
    role:rec.role,
    subject:rec.subject,
    isVerified:rec.isVerified,
    avatar:rec.avatar?pb.files.getURL(rec,rec.avatar):undefined,
    created:rec.created,
    updated:rec.updated
  }
})

console.log(mapped);

    // const students = studentList.map((record: any) => convertToUser(record));

    set({ students:mapped, isLoading: false });
  } catch (err) {
    set({
      error: (err as Error).message,
      isLoading: false,
    });
  }
},
fetchFaculties: async () => {
  try {
    set({ isLoading: true, error: null });

    const studentList = await pb.collection("users").getFullList({
    filter: `role = 'faculty'`,
      sort: "-created", // optional: newest first
    });
const mapped=studentList.map((rec:any)=>{
  return{
    id:rec.id,
    name:rec.name,
    email:rec.email,
    phone:rec.phone,
    role:rec.role,
    subject:rec.subject,
    avatar:rec.avatar?pb.files.getURL(rec,rec.avatar):undefined,
        created:rec.created,
    updated:rec.updated
  }
})

console.log(mapped);

    // const students = studentList.map((record: any) => convertToUser(record));

    set({ faculty:mapped, isLoading: false });
  } catch (err) {
    set({
      error: (err as Error).message,
      isLoading: false,
    });
  }
}

,
      // signIn: async (email, password) => {
      //   try {
      //     set({ isLoading: true, error: null });
      //     const authData = await pb
      //       .collection("users")
      //       .authWithPassword(email, password);

      //     const user = convertToUser(authData.record);
      //     const token = authData.token;

      //     set({
      //       user,
      //       token,
      //       isAuthenticated: true,
      //       isLoading: false,
      //     });

      //     return { user, token };
      //   } catch (err) {
      //     set({
      //       error: (err as Error).message,
      //       isLoading: false,
      //     });
      //     throw err;
      //   }
      // },

      // signUp: async ({ name, email, phone, password, subject }, role = "student") => {
      //   try {
      //     set({ isLoading: true, error: null });

      //     await pb.collection("users").create({
      //       email,
      //       password,
      //       passwordConfirm: password, // PB requires confirm
      //       phone,
      //       name,
      //       role,
      //       ...(role === "faculty" && { subject }), // only add subject if faculty
      //     });

      //     set({ isLoading: false });
      //   } catch (err: any) {
      //     console.log("SIGNUP error raw:", err?.data);

      //     let errorMessage = "Signup failed. Please try again.";

      //     if (err?.data?.data) {
      //       if (err.data.data.email?.message) {
      //         errorMessage = err.data.data.email.message;
      //       } else if (err.data.data.phone?.message) {
      //         errorMessage = err.data.data.phone.message;
      //       } else if (err.data.data.password?.message) {
      //         errorMessage = err.data.data.password.message;
      //       } else if (err.data.data.subject?.message) {
      //         errorMessage = err.data.data.subject.message;
      //       }
      //     }

      //     set({ error: errorMessage, isLoading: false });
      //     throw new Error(errorMessage);
      //   }
      // },


signIn: async (email: string, password: string) => {
  try {
    set({ isLoading: true, error: null });

    // Authenticate using PocketBase
    const authData = await pb.collection("users").authWithPassword(email, password);

    const user = convertToUser(authData.record);
    const token = authData.token;

    // ✅ Admin verification check
    if (!user.isVerified) {
      pb.authStore.clear();
      throw new Error("Your account is not yet verified by the admin.");
    }

    // ✅ Successful login
    set({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });

    return { user, token };
  } catch (err: any) {
    console.log("PocketBase Error:", err);

    let message = "Login failed. Please try again.";

    // --- Handle unverified account ---
    if (err?.message?.includes("not yet verified")) {
      message = err.message;
    }

    // --- Handle invalid credentials ---
    else if (err?.data?.message?.includes("Failed to authenticate")) {
      message = "Invalid email or password.";
    }

    // --- Handle PocketBase error code ---
    else if (err?.status === 400) {
      message = "Invalid email or password.";
    }

    // --- Update state ---
    set({
      error: message,
      isLoading: false,
    });

    throw new Error(message);
  }
},



signUp: async ({ name, email, phone, password, subject, avatar }, role = "student") => {
  try {
    set({ isLoading: true, error: null });

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("passwordConfirm", password);
    formData.append("name", name);
    formData.append("role", role);
   formData.append("emailVisibility", "true");
  
    if (phone) formData.append("phone", phone.toString());
    if (subject && role === "faculty") formData.append("subject", subject);
    if (avatar) formData.append("avatar", avatar); // 👈 add file only if provided

    await pb.collection("users").create(formData);

    set({ isLoading: false });
  } catch (err: any) {
    console.log("SIGNUP error raw:", err?.data);
    let errorMessage = "Signup failed. Please try again.";

    if (err?.data?.data) {
      if (err.data.data.email?.message) {
        errorMessage = err.data.data.email.message;
      } else if (err.data.data.phone?.message) {
        errorMessage = err.data.data.phone.message;
      } else if (err.data.data.password?.message) {
        errorMessage = err.data.data.password.message;
      } else if (err.data.data.subject?.message) {
        errorMessage = err.data.data.subject.message;
      } else if (err.data.data.avatar?.message) {
        errorMessage = err.data.data.avatar.message;
      }
    }

    set({ error: errorMessage, isLoading: false });
    throw new Error(errorMessage);
  }
},


      signOut: () => {
        pb.authStore.clear();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateUser: async (data) => {
        const currentUser = get().user;
        if (!currentUser) throw new Error("Not logged in");

        set({ isLoading: true });
        try {
          const updatedRecord = await pb
            .collection("users")
            .update(currentUser.id, data);
          set({
            user: convertToUser(updatedRecord),
            isLoading: false,
          });
        } catch (err) {
          set({
            error: (err as Error).message,
            isLoading: false,
          });
          throw err;
        }
      },


fetchAllUsers: async () => {
  try {
    set({ isLoading: true, error: null });

    const userList = await pb.collection("users").getFullList({
      sort: "-created", // newest first
    });

    const allUsers = userList.map((rec: any) => ({
      id: rec.id,
      name: rec.name,
      email: rec.email,
      phone: rec.phone,
      role: rec.role,
      subject: rec.subject,
      avatar: rec.avatar ? pb.files.getURL(rec, rec.avatar) : undefined,
          created:rec.created,
    updated:rec.updated
    }));


    set({ noOfStudents: allUsers, isLoading: false }); // reuse students array for storing all users
  } catch (err) {
    set({
      error: (err as Error).message,
      isLoading: false,
    });
  }
},

updateVerificationStatus: async (id: string, status: boolean) => {
  try {
    console.log("Updating verified for:", id, "to:", status);

    // --- Create FormData and append boolean correctly ---
    const formData = new FormData();
    formData.append("isVerified",status?"true":"false");

    // --- Send the FormData to PocketBase ---
    await pb.collection("users").update(id, formData);

    // --- Refresh list if needed ---
    const role = get().students?.find(u => u.id === id)?.role || "student";
    await get().fetchStudents(role);
  } catch (err: any) {
    console.error("Failed to update verification status:", err?.data || err);
    throw err;
  }
},


    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Keep Zustand store in sync with PocketBase's auth changes
pb.authStore.onChange(() => {
  useAuthStore.setState({
    user: pb.authStore.model ? convertToUser(pb.authStore.model) : null,
    token: pb.authStore.token,
    isAuthenticated: pb.authStore.isValid,
  });
});

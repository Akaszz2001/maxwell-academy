// import { create } from "zustand";

// import { persist,createJSONStorage  } from "zustand/middleware";
// import pb from "../services/pocketbase";

// export interface FormData{
//   name: string;
//   email: string;
//   phone: string;
//   password: string;
// }

// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   role: "student" | "faculty" | "admin";
//   phone?: number;
//   created: string;
//   updated: string;
// }

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: string | null;

//   // Actions
//   setAuth: (user: User, token: string) => void;
//   checkAuth: () => void;
//   signIn: (email: string, password: string) => Promise<{user:User,token:string}>;
//   signUp: (data:{name?:string,email:string,phone?:number,password:string,},role?:string
//   ) => Promise<void>;
//   signOut: () => void;
//   updateUser: (data: Partial<User>) => Promise<void>;
// }

// // Convert PB record to our User type
// export const convertToUser = (record: any): User => ({
//   id: record.id ?? "",
//   email: record.email ?? "",
//   name: record.name ?? "",
//   role: record.role ?? "student",
//   phone: record.phone ?? "",
//   created: record.created ?? "",
//   updated: record.updated ?? "",
// });

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       user: null,
//       token: null,
//       isAuthenticated: false,
//       isLoading: false,
//       error: null,
//       setAuth: (user, token) => set({ user, token }),
//       // Restore auth state from PocketBase's internal authStore
//       checkAuth: () => {
//         if (pb.authStore.isValid && pb.authStore.model) {
//           set({
//             user: convertToUser(pb.authStore.model),
//             token: pb.authStore.token,
//             isAuthenticated: true,
//           });
//         } else {
//           set({
//             user: null,
//             token: null,
//             isAuthenticated: false,
//           });
//         }
//       },

//       signIn: async (email, password) => {
//         try {
//           set({ isLoading: true, error: null });
//           const authData = await pb
//             .collection("users")
//             .authWithPassword(email, password);
//             const user = convertToUser(authData.record);
//             const token = authData.token;
//           set({
//             user: convertToUser(authData.record),
//             token: authData.token,
//             isAuthenticated: true,
//             isLoading: false,
//           });
//           return { user, token }; 
//         } catch (err) {
//           set({
//             error: (err as Error).message,
//             isLoading: false,
//           });
//           throw err;
//         }

    
//       },

//       // signUp: async ({name,email,phone,password},role = "student") => {
//       //   try {
      
//       //     set({ isLoading: true, error: null });
//       //     await pb.collection("users").create({
//       //       email,
//       //       password,
//       //       passwordConfirm: password,  
//       //       phone,
//       //       name,
//       //       role,
//       //     });
//       //     // // auto login after sign up
//       //     // const authData = await pb
//       //     //   .collection("users")
//       //     //   .authWithPassword(email, password);
//       //     // set({
//       //     //   user: convertToUser(authData.record),
//       //     //   token: authData.token,
//       //     //   isAuthenticated: true,
//       //     //   isLoading: false,
//       //     // });
//       //   } catch (err:any) {
//       //     console.log("SIGNUP eror ",err.data);
          
//       //     const emailError = err?.data?.data?.email?.message;
          
//       //     if (emailError) {
//       //       console.log("Email error:", emailError); // "The email is already in use."
//       //     }
    
//       //     throw emailError
//       //   }
//       // },

//       signUp: async ({ name, email, phone, password }, role = "student") => {
//         try {
//           set({ isLoading: true, error: null });
      
//           await pb.collection("users").create({
//             email,
//             password,
//             passwordConfirm: password,
//             phone,
//             name,
//             role,
//           });
      
//           // (Optional) auto login can go here
//           set({ isLoading: false });
      
//         } catch (err: any) {
//           console.log("SIGNUP error raw:", err?.data);
      
//           // Default message
//           let errorMessage = "Signup failed. Please try again.";
      
//           // Extract specific field errors
//           if (err?.data?.data) {
//             if (err.data.data.email?.message) {
//               errorMessage = err.data.data.email.message; // "The email is already in use."
//             } else if (err.data.data.phone?.message) {
//               errorMessage = err.data.data.phone.message; // "Invalid phone number."
//             } else if (err.data.data.password?.message) {
//               errorMessage = err.data.data.password.message; // "Password too short."
//             }
//           }
      
//           // Update state with clean message
//           set({
//             error: errorMessage,
//             isLoading: false,
//           });
      
//           // Re-throw clean message so caller can also use it
//           throw new Error(errorMessage);
//         }
//       },
      

//       signOut: () => {
//         pb.authStore.clear();
//         set({
//           user: null,
//           token: null,
          
//           isAuthenticated: false,
//         });
//       },

//       updateUser: async (data) => {
//         const currentUser = get().user;
//         if (!currentUser) throw new Error("Not logged in");

//         set({ isLoading: true });
//         try {
//           const updatedRecord = await pb
//             .collection("users")
//             .update(currentUser.id, data);
//           set({
//             user: convertToUser(updatedRecord),
//             isLoading: false,
//           });
//         } catch (err) {
//           set({
//             error: (err as Error).message,
//             isLoading: false,
//           });
//           throw err;
//         }
//       },
//     }),
//     {
//       name: "auth-storage", // key in localStorage
//       storage: createJSONStorage ( () => localStorage),

//     }
//   )
// );

// // Keep Zustand store in sync with PocketBase's auth changes
// pb.authStore.onChange(() => {
//   useAuthStore.setState({
//     user: pb.authStore.model
//       ? convertToUser(pb.authStore.model)
//       : null,
//     token: pb.authStore.token,
//     isAuthenticated: pb.authStore.isValid,
//   });
// });
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import pb from "../services/pocketbase";

// Form data used in signup forms
export interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  subject?: string; // 👈 added for faculty
}

// Unified User model
export interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "faculty" | "admin";
  phone?: number;
  subject?: string; // 👈 added for faculty
  created: string;
  updated: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setAuth: (user: User, token: string) => void;
  checkAuth: () => void;
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
    },
    role?: "student" | "faculty" | "admin"
  ) => Promise<void>;
  signOut: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
}

// Convert PB record to our User type
export const convertToUser = (record: any): User => ({
  id: record.id ?? "",
  email: record.email ?? "",
  name: record.name ?? "",
  role: record.role ?? "student",
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

      setAuth: (user, token) => set({ user, token }),

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

      signIn: async (email, password) => {
        try {
          set({ isLoading: true, error: null });
          const authData = await pb
            .collection("users")
            .authWithPassword(email, password);

          const user = convertToUser(authData.record);
          const token = authData.token;

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          return { user, token };
        } catch (err) {
          set({
            error: (err as Error).message,
            isLoading: false,
          });
          throw err;
        }
      },

      signUp: async ({ name, email, phone, password, subject }, role = "student") => {
        try {
          set({ isLoading: true, error: null });

          await pb.collection("users").create({
            email,
            password,
            passwordConfirm: password, // PB requires confirm
            phone,
            name,
            role,
            ...(role === "faculty" && { subject }), // only add subject if faculty
          });

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

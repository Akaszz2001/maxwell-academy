// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore, convertToUser } from "../../store/authStore";
// import { Eye, EyeOff } from 'lucide-react';
// import Person from '../../assets/person.png';

// // Import your login function from wherever it’s defined
//  // <- adjust path

// export default function Login() {
//   const navigate = useNavigate();
//   const {signIn}=useAuthStore()
//   const setAuth = useAuthStore((state) => state.setAuth);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
// const{isAuthenticated,user}=useAuthStore()
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const { user, token } = await signIn(email,password)

//       // Convert PocketBase record to User type and store in Zustand
//       const userData = convertToUser(user);
//       setAuth(userData, token); // <- persists automatically via createJSONStorage

//       console.log("Login successful:", {
//         userName: userData.name,
//         userRole: userData.role,
//         token: token
//       });

//       navigate(getDashboardPath(userData.role));

//     } catch (err: any) {
//       setError("Invalid email or password");
//       console.error("Login error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDashboardPath = (role: string): string => {
//     switch (role) {
//       case "admin": return "/admin/dashboard";
//       case "faculty": return "/faculty/dashboard";
//       case "student": return '/student/dashboard'
//       default: return "/student/dashboard";
//     }
//   };

//   const handleForgotPassword = () => {
//     // Implement forgot password logic
//     console.log("Forgot password clicked");
//   };

//   const handleSignUp = () => {
//     // Implement sign-up navigation
//     console.log("Sign-up clicked");
//   };

//   useEffect(() => {
//     // ✅ run when auth state changes
//     if (isAuthenticated === false) {
//       navigate("/login");
//     } 
//     else if (user?.role === "student") {
//       navigate("/student/dashboard");
//     } 
//     else if (user?.role === "admin") {
//       navigate("/admin/dashboard");
//     } 
//     else if (user?.role === "faculty") {
//       navigate("/faculty/dashboard");
//     } 
//   }, [isAuthenticated, user, navigate]);
//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       <div className="flex-1 flex items-center justify-center p-8">
//         <div className="w-full max-w-sm">
//           <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome Back!!</h1>
//           {error && (
//             <div className="bg-red-100 text-red-700 p-2 mb-4 text-center rounded">
//               {error}
//             </div>
//           )}
          
//           <form onSubmit={handleLogin} className="space-y-6">
//             {/* Email Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
//                     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
//                     <polyline points="22,6 12,13 2,6"/>
//                   </svg>
//                 </div>
//                 <input
//                   type="email"
//                   value={email}
//                   required
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
//                 />
//               </div>
//             </div>

//             {/* Password Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
//                     <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//                     <circle cx="12" cy="16" r="1"/>
//                     <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                   </svg>
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   required
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 >
//                   {showPassword ? (
//                     <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
//                   ) : (
//                     <Eye size={18} className="text-gray-400 hover:text-gray-600" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Forgot Password */}
//             <div className="text-right">
//               <button
//                 type="button"
//                 onClick={handleForgotPassword}
//                 className="text-sm text-gray-600 hover:text-gray-800"
//               >
//                 Forget Password?
//               </button>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-400 text-gray-800 py-3 px-4 rounded-lg hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors font-medium"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="text-center text-gray-500 text-sm mt-6">or</div>

//           {/* Sign Up Link */}
//           <div className="text-center text-sm mt-6">
//             <span className="text-gray-600">Don't have an account? </span>
//             <button
//               type="button"
//               onClick={handleSignUp}
//               className="text-blue-600 hover:text-orange-800 font-medium"
//             >
//               Sign up
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Right Section - Illustration */}
//       <div className="flex-1 flex items-center justify-center relative overflow-hidden">
//         <div className="absolute right-0 top-0 w-96 h-full bg-blue-300 rounded-l-full"></div>
//         <div className="absolute left-48 top-1/2 transform -translate-y-1/2 z-10">
//           <img width={300} src={Person} alt="Person illustration" />
//         </div>
//         <div className="absolute left-20 bottom-20 w-20 h-20 bg-orange-200 rounded-full opacity-60"></div>
//         <div className="absolute left-32 top-32 w-12 h-12 bg-yellow-200 rounded-full opacity-40"></div>
//       </div>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore, convertToUser } from "../../store/authStore";
// import { Eye, EyeOff } from "lucide-react";
// import Person from "../../assets/person.png";

// export default function Login() {
//   const navigate = useNavigate();
//   const { signIn } = useAuthStore();
//   const setAuth = useAuthStore((state) => state.setAuth);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const { isAuthenticated, user } = useAuthStore();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const { user, token } = await signIn(email, password);
//       const userData = convertToUser(user);
//       setAuth(userData, token);
//       navigate(getDashboardPath(userData.role));
//     } catch (err: any) {
//       setError("Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDashboardPath = (role: string): string => {
//     switch (role) {
//       case "admin":
//         return "/admin/dashboard";
//       case "faculty":
//         return "/faculty/dashboard";
//       case "student":
//         return "/student/dashboard";
//       default:
//         return "/student/dashboard";
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated === false) {
//       navigate("/login");
//     } else if (user?.role === "student") {
//       navigate("/student/dashboard");
//     } else if (user?.role === "admin") {
//       navigate("/admin/dashboard");
//     } else if (user?.role === "faculty") {
//       navigate("/faculty/dashboard");
//     }
//   }, [isAuthenticated, user, navigate]);

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
//       {/* Left Section - Form */}
//       <div className="flex-1 flex items-center justify-center p-6 md:p-12">
//         <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-6">
//             Welcome Back
//           </h1>
//           <p className="text-gray-600 mb-8">
//             Login to continue to Maxwell Academy
//           </p>

//           {error && (
//             <div className="bg-red-100 text-red-700 p-3 mb-4 text-center rounded-lg">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleLogin} className="space-y-6">
//             {/* Email Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   value={email}
//                   required
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
//                 />
//               </div>
//             </div>

//             {/* Password Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   required
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-3 flex items-center"
//                 >
//                   {showPassword ? (
//                     <EyeOff size={18} className="text-gray-400" />
//                   ) : (
//                     <Eye size={18} className="text-gray-400" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Forgot Password */}
//             <div className="text-right">
//               <button
//                 type="button"
//                 className="text-sm text-blue-600 hover:underline"
//               >
//                 Forgot Password?
//               </button>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="text-center text-gray-500 text-sm mt-6">or</div>

//           {/* Sign Up Link */}
//           <div className="text-center text-sm mt-6">
//             <span className="text-gray-600">Don't have an account? </span>
//             <button
//               type="button"
//               className="text-blue-600 hover:underline font-medium"
//             >
//               Sign up
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Right Section - Illustration */}
//       <div className="hidden md:flex flex-1 items-center justify-center bg-blue-50 relative">
//         <img
//           width={350}
//           src={Person}
//           alt="Person illustration"
//           className="z-10"
//         />
//         <div className="absolute bottom-12 left-12 w-16 h-16 bg-blue-200 rounded-full opacity-40"></div>
//         <div className="absolute top-16 right-20 w-20 h-20 bg-blue-300 rounded-full opacity-30"></div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, convertToUser } from "../../store/authStore";
import { Eye, EyeOff } from "lucide-react";
import Person from "../../assets/person.png";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuthStore();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { isAuthenticated, user } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { user, token } = await signIn(email, password);
      const userData = convertToUser(user);
      setAuth(userData, token);

      navigate(getDashboardPath(userData.role));
    } catch (err: any) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const getDashboardPath = (role: string): string => {
    switch (role) {
      case "admin":
        return "/admin/dashboard";
      case "faculty":
        return "/faculty/dashboard";
      case "student":
        return "/student/dashboard";
      default:
        return "/student/dashboard";
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    } else if (user?.role === "student") {
      navigate("/student/dashboard");
    } else if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user?.role === "faculty") {
      navigate("/faculty/dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Section - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Welcome Back!
          </h1>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 text-center rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full p-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="text-center text-gray-500 text-sm mt-6">or</div>

          {/* Signup Link */}
          <div className="text-center text-sm mt-6">
            <span className="text-gray-600">Don’t have an account? </span>
            <button
              type="button"
              onClick={handleSignUp}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Right Section - Illustration with Bubbles + Semi-Circle */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-full bg-blue-300 rounded-l-full"></div>
        <div className="absolute left-48 top-1/2 transform -translate-y-1/2 z-10">
          <img width={300} src={Person} alt="Person Illustration" />
        </div>
        <div className="absolute left-20 bottom-20 w-20 h-20 bg-orange-200 rounded-full opacity-60"></div>
        <div className="absolute left-32 top-32 w-12 h-12 bg-yellow-200 rounded-full opacity-40"></div>
      </div>
    </div>
  );
}

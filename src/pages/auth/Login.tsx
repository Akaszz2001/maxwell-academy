
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
              onClick={()=>navigate("/signup")}
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

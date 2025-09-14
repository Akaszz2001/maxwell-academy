import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore, type FormData } from "../../store/authStore";
import Person from "../../assets/person.png";
export default function StudentSignup() {
  const navigate = useNavigate();
  const { user, isAuthenticated, signUp } = useAuthStore();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "student") navigate("/student");
      else if (user.role === "faculty") navigate("/faculty");
      else if (user.role === "admin") navigate("/admin");
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await signUp({
        ...formData,
        phone: Number(formData.phone),
      });
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err?.message || "Signup failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Section - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Student Signup
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 p-2 mb-4 rounded text-center">
              {success}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone (Optional)"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-full bg-blue-300 rounded-l-full"></div>
        <div className="absolute left-48 top-1/2 transform -translate-y-1/2 z-10">
          <img
            width={300}
            src={Person}
            alt="Student Illustration"
          />
        </div>
        <div className="absolute left-20 bottom-20 w-20 h-20 bg-orange-200 rounded-full opacity-60"></div>
        <div className="absolute left-32 top-32 w-12 h-12 bg-yellow-200 rounded-full opacity-40"></div>
      </div>
    </div>
  );
}

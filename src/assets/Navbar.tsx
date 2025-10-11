import { useAuthStore } from "@/store/authStore";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

const Navbar: FC = () => {
  const navigate=useNavigate()
  const {user,signOut}= useAuthStore()
  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
          onClick={()=>navigate('/')}
            src="../src/assets/officialLogo.png" // move to public folder for easier reference if possible
            alt="Institute Logo"
            className="h-10"
          />
          <span className="font-bold text-xl text-gray-800">
            Maxwell Academy
          </span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-6 font-medium text-gray-600">
          <a href="/" className="hover:text-blue-600">
            Home
          </a>
          <a href="/gallery" className="hover:text-blue-600">
            Gallery
          </a>
          <a href="/aboutUs" className="hover:text-blue-600">
            About
          </a>
          <a href="#contact" className="hover:text-blue-600">
            Contact
          </a>
          <a href="/faculties" className="hover:text-blue-600">
            Faculties
          </a>
          <a href="/topperformers" className="hover:text-blue-600">
Top Performers          </a>
        </nav>

        {/* Login Button */}
      {user ?   <button onClick={signOut} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Logout
        </button> :
        <button onClick={()=>navigate("/login")} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Login
        </button>}
      </div>
    </header>
  );
};

export default Navbar;

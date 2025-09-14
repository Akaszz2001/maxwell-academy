import React from "react";
// import Navbar

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 pt-28 pb-16"
      >
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            Learning Today, <br /> Leading Tomorrow
          </h1>
          <p className="text-lg text-gray-600">
            An advanced exam platform for students and question management
            system for faculties. Simple, modern, and efficient.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-50 transition">
              Learn More
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="../src/assets/hero-image-education.png"
            alt="Hero Illustration"
            className="max-h-96"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Platform Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-md rounded-xl">
              <h3 className="text-xl font-semibold mb-2">For Students</h3>
              <p className="text-gray-600">
                Take exams in a secure environment, track your progress, and
                review your results instantly.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-xl">
              <h3 className="text-xl font-semibold mb-2">For Faculties</h3>
              <p className="text-gray-600">
                Easily create, manage, and organize question papers with modern
                tools and analytics.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Modern Design</h3>
              <p className="text-gray-600">
                A fully responsive, sleek, and easy-to-use interface for all
                devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>
            © {new Date().getFullYear()} Maxwell Academy. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

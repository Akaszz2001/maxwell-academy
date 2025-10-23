import { useState, useEffect, useRef } from "react";
import logo from "../assets/officialLogo.png";
import banner1 from "../assets/bannerImages/1.jpg"; // Added logo import
import banner2 from "../assets/bannerImages/2.jpg"; // Added logo import
import banner3 from "../assets/bannerImages/3.jpg"; // Added logo import
import Slider from "react-slick";
import { MdSportsMartialArts } from 'react-icons/md';
import { GiMeditation} from "react-icons/gi";
import { AiOutlineLaptop } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const {user}=useAuthStore()
  const navigate=useNavigate()
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    instructors: 0,
    satisfaction: 0,
  });
  console.log(stats);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000, // transition speed (1 second)
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500, // time each image stays (2.5 seconds)
    arrows: false, // no prev/next buttons
    fade: true, // smooth fade transition
    pauseOnHover: false, // keep autoplay even if hovered
  };

  const images = [banner1, banner2, banner3];

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showTopBlur, setShowTopBlur] = useState(false);
  const [showBottomBlur, setShowBottomBlur] = useState(false);

  useEffect(() => {
    console.log(showTopBlur);
    
    console.log(showBottomBlur);
    
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setShowTopBlur(scrollTop > 2);
      setShowBottomBlur(scrollTop + clientHeight < scrollHeight - 2);
    };

    handleScroll(); // initial check
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [showBottomBlur, showTopBlur]);

  // Counter animation for statistics
  useEffect(() => {
    const animateValue = (key: string, end: number, duration: number) => {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setStats((prev) => ({ ...prev, [key]: end }));
          clearInterval(timer);
        } else {
          setStats((prev) => ({ ...prev, [key]: Math.floor(start) }));
        }
      }, 16);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateValue("students", 10000, 2000);
          animateValue("courses", 500, 2000);
          animateValue("instructors", 150, 2000);
          animateValue("satisfaction", 98, 2000);
        }
      },
      { threshold: 0.5 }
    );

    const statsElement = document.getElementById("statistics-section");
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => {
      if (statsElement) {
        observer.unobserve(statsElement);
      }
    };
  }, []);

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: "Engineering Tution",
      description:
        "We offer quality engineering tuition with experienced teachers to help students understand concepts clearly and score better in exams.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      title: "Entrance Coaching",
      description:
        "We offer expert coaching for JEE, NEET, KEAM, CUSAT, and ICAR entrance exams with experienced faculty. Our focused training helps students master concepts and score high ranks.",
      color: "from-blue-600 to-indigo-600",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
      title: "High School & Higher Secondary Tuition",
      description:
        "We provide comprehensive tuition for high school and higher secondary students across all subjects with experienced teachers. Our personalized approach helps students build strong academic foundations, improve grades, and excel in board examinations.",
      color: "from-indigo-600 to-purple-600",
    },
  ];

  return (
    <div className="scroll-smooth overflow-hidden">
      {/* HERO SECTION with Trigonometric Designs */}
      <section className="relative min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-600 overflow-hidden">
        {/* Animated Trigonometric Wave Patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient
                id="wave-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#2563EB" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Multiple wave layers */}
            <path
              d="M0,100 Q250,80 500,100 T1000,100 T1500,100 T2000,100 L2000,0 L0,0 Z"
              fill="url(#wave-gradient)"
              className="animate-wave-slow"
            />
            <path
              d="M0,150 Q300,120 600,150 T1200,150 T1800,150 T2400,150 L2400,0 L0,0 Z"
              fill="url(#wave-gradient)"
              opacity="0.5"
              className="animate-wave-medium"
            />
            <path
              d="M0,200 Q200,170 400,200 T800,200 T1200,200 T1600,200 L1600,0 L0,0 Z"
              fill="url(#wave-gradient)"
              opacity="0.3"
              className="animate-wave-fast"
            />
          </svg>
        </div>

        {/* Geometric floating elements with parallax */}
        <div
          className="absolute top-20 right-20 w-96 h-96 opacity-30 pointer-events-none"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div
          className="absolute bottom-20 left-20 w-80 h-80 opacity-20 pointer-events-none"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-indigo-500 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Trigonometric circles pattern */}
        <div className="absolute top-1/4 left-1/4 pointer-events-none">
          <svg
            width="200"
            height="200"
            className="animate-spin-slow opacity-20"
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2"
            />
            <circle
              cx="100"
              cy="100"
              r="40"
              fill="none"
              stroke="#1D4ED8"
              strokeWidth="2"
              strokeDasharray="3,3"
            />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                {/* Decorative element */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">
                    Welcome to MaxWeLL Scientific Academy 
                  </span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                  Learning Today
                  <br />
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent animate-gradient">
                      Leading
                    </span>
                    {/* Underline decoration */}
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-4"
                      viewBox="0 0 300 12"
                    >
                      <path
                        d="M5,7 Q75,2 150,7 T295,7"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="animate-draw"
                      />
                    </svg>
                  </span>
                  <br />
                  Tomorrow
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Transform your future with world-class education. Join
                  thousands of students who have achieved their dreams through
                  our comprehensive programs and cutting-edge learning
                  platforms.
                </p>
              </div>

              {/* CTA Buttons with geometric accents */}
              <div className="flex flex-wrap gap-4">
                <button onClick={()=>user?.role==="admin" ? navigate('/admin/dashboard'): user?.role==='faculty'?navigate('/faculty/dashboard'):user?.role==='student' ?navigate("/student/dashboard"):navigate("/signup")} className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 active:scale-95">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  {/* Geometric decorations */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full transform translate-x-10 -translate-y-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full transform -translate-x-8 translate-y-8"></div>
                </button>

                <button onClick={()=>navigate("/aboutUs")} className="group relative overflow-hidden bg-white text-blue-600 border-3 border-blue-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 active:scale-95">
                  <span className="relative z-10 flex items-center gap-2">
                    Learn More
                    <svg
                      className="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Enhanced Floating Stats Badges */}
              <div className="flex flex-wrap gap-4 pt-8">
                <div className="group relative bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-300 hover:-translate-y-2">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    150+
                  </div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">
                    Active Students
                  </div>
                  {/* Geometric background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                </div>

                <div className="group relative bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-300 hover:-translate-y-2">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-400 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-400 bg-clip-text text-transparent">
                    10+
                  </div>
                  <div className="text-sm text-gray-600 font-semibold mt-1">
                    Courses
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                </div>
              </div>
            </div>

            {/* Right Side - Enhanced Illustration */}
            {/* <div
              className="relative animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative">
                <div className="absolute inset-0 -z-10">
                  <svg className="w-full h-full opacity-10">
                    <defs>
                      <pattern
                        id="hero-grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="20" cy="20" r="1" fill="#2563EB" />
                        <path
                          d="M0,20 L40,20 M20,0 L20,40"
                          stroke="#3B82F6"
                          strokeWidth="0.5"
                          opacity="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-grid)" />
                  </svg>
                </div>

                <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl transform rotate-12 animate-float shadow-2xl opacity-80"></div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full animate-float-delay shadow-2xl opacity-70"></div>
                <div
                  className="absolute top-1/4 -right-12 w-24 h-24 bg-gradient-to-br from-blue-300 to-blue-500 transform -rotate-12 animate-float-delay-2 shadow-xl opacity-60"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  }}
                ></div>

                

                <div className="relative bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500 w-full h-full">
               
                  <div className="relative w-full h-full z-0">
                    <Slider {...settings}>
                      {images.map((img, index) => (
                        <div key={index} className="w-full h-full">
                          <img
                            src={img}
                            alt={`Slide ${index}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div> */}

            <div
              className="relative animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative">
                <div className="absolute inset-0 -z-10">
                  <svg className="w-full h-full opacity-10">
                    <defs>
                      <pattern
                        id="hero-grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="20" cy="20" r="1" fill="#2563EB" />
                        <path
                          d="M0,20 L40,20 M20,0 L20,40"
                          stroke="#3B82F6"
                          strokeWidth="0.5"
                          opacity="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-grid)" />
                  </svg>
                </div>

                <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl transform rotate-12 animate-float shadow-2xl opacity-80"></div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full animate-float-delay shadow-2xl opacity-70"></div>
                <div
                  className="absolute top-1/4 -right-12 w-24 h-24 bg-gradient-to-br from-blue-300 to-blue-500 transform -rotate-12 animate-float-delay-2 shadow-xl opacity-60"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  }}
                ></div>

                <div className="relative rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500 aspect-[4/3]">
                  <div className="absolute inset-0">
                    <Slider {...settings}>
                      {images.map((img, index) => (
                        <div key={index} className="h-full">
                          <img
                            src={img}
                            alt={`Slide ${index}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION with Geometric Cards */}
      <section className="relative bg-white py-24 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="features-pattern"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="1"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="1"
                />
                <path
                  d="M50,20 L80,50 L50,80 L20,50 Z"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#features-pattern)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-6 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
                Our Features
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Why Choose{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  MaxWeLL Scientific Academy
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 200 12"
                >
                  <path
                    d="M5,7 Q50,2 100,7 T195,7"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the innovative features that make us the premier choice
              for quality education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              // <div
              //   key={index}
              //   className="group relative"
              //   style={{ animationDelay: `${index * 0.1}s` }}
              // >
              //   {/* Geometric background decoration */}
              //   <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>

              //   <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 border-2 border-gray-100 group-hover:border-blue-200 overflow-hidden">
              //     {/* Trigonometric pattern in background */}
              //     <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
              //       <svg className="w-full h-full">
              //         <circle
              //           cx="64"
              //           cy="16"
              //           r="40"
              //           fill="none"
              //           stroke="currentColor"
              //           strokeWidth="2"
              //         />
              //         <circle
              //           cx="64"
              //           cy="16"
              //           r="20"
              //           fill="none"
              //           stroke="currentColor"
              //           strokeWidth="1"
              //         />
              //       </svg>
              //     </div>

              //     {/* Icon container with gradient */}
              //     <div
              //       className={`relative bg-gradient-to-br ${feature.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
              //     >
              //       {feature.icon}
              //       {/* Orbiting dot */}
              //       <div className="absolute inset-0 animate-spin-slow">
              //         <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-lg"></div>
              //       </div>
              //     </div>

              //     <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
              //       {feature.title}
              //     </h3>
              //     <p className="text-gray-600 leading-relaxed mb-6">
              //       {feature.description}
              //     </p>

              //     {/* Animated arrow */}
              //     <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 gap-2 transition-all">
              //       <span>Learn More</span>
              //       <svg
              //         className="w-5 h-5 transform group-hover:translate-x-2 transition-transform"
              //         fill="none"
              //         stroke="currentColor"
              //         viewBox="0 0 24 24"
              //       >
              //         <path
              //           strokeLinecap="round"
              //           strokeLinejoin="round"
              //           strokeWidth={2}
              //           d="M13 7l5 5m0 0l-5 5m5-5H6"
              //         />
              //       </svg>
              //     </div>

              //     {/* Corner decorations */}
              //     <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-blue-600 rounded-tl-3xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              //     <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-blue-600 rounded-br-3xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              //   </div>
              // </div>

              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Geometric background decoration */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>

                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 border-2 border-gray-100 group-hover:border-blue-200 overflow-hidden h-[280px]">
                  {/* Trigonometric pattern in background */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                    <svg className="w-full h-full">
                      <circle
                        cx="64"
                        cy="16"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="64"
                        cy="16"
                        r="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>

                  {/* Icon container with gradient */}
                  <div
                    className={`relative bg-gradient-to-br ${feature.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                  >
                    {feature.icon}
                    <div className="absolute inset-0 animate-spin-slow">
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Scrollable description only, hidden scrollbar */}
                  <div className="overflow-y-auto max-h-[120px] pr-2 scrollbar-hide">
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                  </div>

                  {/* Animated arrow */}
                  <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                    <span>Learn More</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>

                  {/* Removed opposite corner borders completely */}
                </div>
              </div>

              // <div
              //     key={index}
              //     className="group relative"
              //     style={{ animationDelay: `${index * 0.1}s` }}
              //   >
              //     {/* Hover glow background */}
              //     <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl opacity-0 group-hover:opacity-100 group-hover:blur transition-all duration-500"></div>

              //     <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 border-2 border-gray-100 group-hover:border-blue-200 overflow-hidden">

              //       {/* Fixed Icon and Title */}
              //       <div className="relative z-10">
              //         <div
              //           className={`relative bg-gradient-to-br ${feature.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
              //         >
              //           {feature.icon}
              //           <div className="absolute inset-0 animate-spin-slow">
              //             <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-lg"></div>
              //           </div>
              //         </div>
              //         <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
              //           {feature.title}
              //         </h3>
              //       </div>

              //       {/* Scrollable description */}
              //       <div
              //         ref={scrollRef}
              //         className="relative h-[180px] overflow-y-auto no-scrollbar pr-2"
              //       >
              //         <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>

              //         {/* Top blur indicator */}
              //         {showTopBlur && (
              //           <div className="absolute top-0 left-0 w-full h-6 backdrop-blur-sm bg-white/30 pointer-events-none transition-opacity duration-300"></div>
              //         )}

              //         {/* Bottom blur indicator */}
              //         {showBottomBlur && (
              //           <div className="absolute bottom-0 left-0 w-full h-6 backdrop-blur-sm bg-white/30 pointer-events-none transition-opacity duration-300"></div>
              //         )}
              //       </div>
              //     </div>
              //   </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION with Trigonometric Design */}
      <section
        id="statistics-section"
        className="relative py-24 overflow-hidden"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient"></div>

        {/* Trigonometric wave overlay */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern
                id="stats-pattern"
                x="0"
                y="0"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                />
                <path
                  d="M0,40 Q20,20 40,40 T80,40"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="2"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stats-pattern)" />
          </svg>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">
              Our Other Programs
            </h2>
            <p className="text-blue-100 text-xl font-medium">
              Join a thriving community of learners and achievers
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative group">
              {/* Geometric background */}
              <div className="absolute -inset-4 bg-white/10 backdrop-blur-sm rounded-3xl transform group-hover:scale-110 transition-transform duration-500"></div>

              <div className="relative text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border-2 border-white/20 group-hover:border-white/40 transition-all duration-500">
                {/* Icon */}
                <div className="text-4xl mb-3 animate-bounce text-white">
                  <GiMeditation />
                </div>

                {/* Number with trigonometric decoration */}
                <div className="relative inline-block">
                  <div className="text-xl lg:text-xl font-black text-white mb-2 tabular-nums">
                    Yoga Classes
                  </div>
                  {/* Underline wave */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                  >
                    <path
                      d="M0,4 Q50,0 100,4 T200,4"
                      fill="none"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="text-blue-100 text-base font-semibold mt-3"></div>

                {/* Corner decorations */}
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-2xl"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-2xl"></div>
              </div>
            </div>
            <div className="ml-2 relative group">
              {/* Geometric background */}
              <div className="absolute -inset-4 bg-white/10 backdrop-blur-sm rounded-3xl transform group-hover:scale-110 transition-transform duration-500"></div>

              <div className="relative text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border-2 border-white/20 group-hover:border-white/40 transition-all duration-500">
                {/* Icon */}
                <div className="text-4xl mb-3 animate-bounce text-white">
                  <MdSportsMartialArts/>
                </div>

                {/* Number with trigonometric decoration */}
                <div className="relative inline-block">
                  <div className="text-xl lg:text-xl font-black text-white mb-2 tabular-nums">
                    Karate Classes
                  </div>
                  {/* Underline wave */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                  >
                    <path
                      d="M0,4 Q50,0 100,4 T200,4"
                      fill="none"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="text-blue-100 text-base font-semibold mt-3"></div>

                {/* Corner decorations */}
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-2xl"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-2xl"></div>
              </div>
            </div>
            <div className="ml-2 relative group">
              {/* Geometric background */}
              <div className="absolute -inset-4 bg-white/10 backdrop-blur-sm rounded-3xl transform group-hover:scale-110 transition-transform duration-500"></div>

              <div className="relative text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border-2 border-white/20 group-hover:border-white/40 transition-all duration-500">
                {/* Icon */}
                <div className="text-4xl mb-3 animate-bounce text-white">

                  <AiOutlineLaptop/>
                </div>

                {/* Number with trigonometric decoration */}
                <div className="relative inline-block">
                  <div className="text-xl lg:text-xl font-black text-white mb-2 tabular-nums">
                    Online & Offline Classes
                  </div>
                  {/* Underline wave */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                  >
                    <path
                      d="M0,4 Q50,0 100,4 T200,4"
                      fill="none"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="text-blue-100 text-base font-semibold mt-3"></div>

                {/* Corner decorations */}
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-2xl"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-2xl"></div>
              </div>
            </div>
            <div className="ml-2 relative group">
              {/* Geometric background */}
              <div className="absolute -inset-4 bg-white/10 backdrop-blur-sm rounded-3xl transform group-hover:scale-110 transition-transform duration-500"></div>

              <div className="relative text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border-2 border-white/20 group-hover:border-white/40 transition-all duration-500">
                {/* Icon */}
                <div className="text-4xl mb-3 animate-bounce text-white">
                  <FaUserGraduate />
                </div>

                {/* Number with trigonometric decoration */}
                <div className="relative inline-block">
                  <div className="text-xl lg:text-xl font-black text-white mb-2 tabular-nums">
                    Career Guidance Classes
                  </div>
                  {/* Underline wave */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                  >
                    <path
                      d="M0,4 Q50,0 100,4 T200,4"
                      fill="none"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="text-blue-100 text-base font-semibold mt-3"></div>

                {/* Corner decorations */}
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-2xl"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION with Advanced Design */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-24 overflow-hidden">
        {/* Geometric pattern background */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="cta-pattern"
                x="0"
                y="0"
                width="120"
                height="120"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M60,0 L60,120 M0,60 L120,60"
                  stroke="#93C5FD"
                  strokeWidth="1"
                  opacity="0.3"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="40"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="1"
                  opacity="0.5"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="20"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="1"
                  opacity="0.7"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-pattern)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white rounded-[3rem] shadow-2xl p-12 lg:p-20 overflow-hidden">
            {/* Trigonometric decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 opacity-5">
              <svg className="w-full h-full">
                <circle
                  cx="300"
                  cy="100"
                  r="150"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3"
                />
                <circle
                  cx="300"
                  cy="100"
                  r="100"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />
                <circle
                  cx="300"
                  cy="100"
                  r="50"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="1"
                />
              </svg>
            </div>

            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 bg-blue-100 px-6 py-3 rounded-full mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                </span>
                <span className="text-sm font-bold text-blue-700 tracking-wider uppercase">
                  Limited Time Offer
                </span>
              </div>

              <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                Ready to Start Your
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Learning Journey?
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="12"
                    viewBox="0 0 400 12"
                  >
                    <path
                      d="M5,7 Q100,2 200,7 T395,7"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="4"
                      strokeLinecap="round"
                      opacity="0.5"
                    />
                  </svg>
                </span>
              </h2>

              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of students who have transformed their careers
                with our comprehensive programs. Get instant access to all
                courses and start learning today with expert guidance.
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://forms.gle/H582to5UkQoibR6H8")
                  }
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    Enroll Now
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>

                <button className="group relative bg-gray-100 text-gray-800 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-gray-200 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg">
                  <span className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View Courses
                  </span>
                </button>
              </div>

              {/* Trust badges */}
              <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">Money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span className="font-semibold">Lifetime access</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER with Geometric Design */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-20 pb-10 overflow-hidden">
        {/* Trigonometric pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="footer-pattern"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0,50 Q25,25 50,50 T100,50"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="15"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footer-pattern)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Logo and About */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 group cursor-pointer">
                {/* LOGO - Using actual logo image */}
                <img
                  src={logo}
                  alt="Excellence Institute Logo"
                  className="w-16 h-16 object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
                <div>
                  <span className="font-black text-xl block">
                   MaxWeLL Scientific Academy 
                  </span>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering students worldwide with quality education and
                innovative learning solutions for a better future.
              </p>
              {/* Enhanced Social Icons */}
              <div className="flex gap-3 pt-4">
                {[
                  {
                    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                    name: "Facebook",
                  },
                  {
                    icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                    name: "Twitter",
                  },
                  {
                    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                    name: "LinkedIn",
                  },
                  {
                    icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
                    name: "Instagram",
                  },
                ].map((social, index) => (
                  <button
                    key={index}
                    className="relative group w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 shadow-lg"
                    aria-label={social.name}
                  >
                    <svg
                      className="w-5 h-5 relative z-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.icon} />
                    </svg>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-blue-400 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
          <div>
              <h3 className="font-black text-lg mb-6 relative inline-block">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {[{name:"Home",link:"/"},{name: "About Us",link:"aboutUs"}, {name:"Faculties",link:"/faculties"}, {name:"Gallery",link:"gallery"},{name:"Top Achievers",link:"/topperformers"}].map(
                  (links) => (
                    <li key={links.name}>
                      <a
                        href={links.link}
                        className="group flex items-center text-gray-400 hover:text-blue-400 transition-all"
                      >
                        <svg
                          className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        {links.name}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h3 className="font-black text-lg mb-6 relative inline-block">
                Programs
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-indigo-600 to-purple-400 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {[
                  "Undergraduate",
                  "Graduate",
                  "Online Learning",
                  "Certifications",
                  "Professional Development",
                ].map((program) => (
                  <li key={program}>
                    <a
                      href="#"
                      className="group flex items-center text-gray-400 hover:text-purple-400 transition-all"
                    >
                      <svg
                        className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      {program}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-black text-lg mb-6 relative inline-block">
                Contact Us
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-green-600 to-emerald-400 rounded-full"></div>
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3 group hover:text-green-400 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-green-900 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span className="leading-relaxed">
                    Amballoor, Kanjiramattom,Ernakulam 
                  </span>
                </li>
                <li className="flex items-center gap-3 group hover:text-blue-400 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-900 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span>emailtomaxwell@gmail.com</span>
                </li>
                <li className="flex items-center gap-3 group hover:text-purple-400 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-900 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <span>+91 9745171072</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar with Wave Design */}
          <div className="relative border-t border-gray-800 pt-10">
            {/* Top wave decoration */}
            <svg
              className="absolute -top-px left-0 w-full h-2"
              preserveAspectRatio="none"
              viewBox="0 0 1200 4"
            >
              <path
                d="M0,2 Q300,0 600,2 T1200,2"
                fill="none"
                stroke="url(#footer-gradient)"
                strokeWidth="2"
              />
              <defs>
                <linearGradient
                  id="footer-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                © 2025 Excellence Institute. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-6 text-sm">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition-colors relative group"
                    >
                      {link}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes wave-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes wave-medium {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        @keyframes wave-fast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(12deg);
          }
          50% {
            transform: translateY(-20px) rotate(12deg);
          }
        }

        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        @keyframes float-delay-2 {
          0%,
          100% {
            transform: translateY(0) rotate(-12deg);
          }
          50% {
            transform: translateY(-25px) rotate(-12deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        .animate-wave-slow {
          animation: wave-slow 20s linear infinite;
        }

        .animate-wave-medium {
          animation: wave-medium 15s linear infinite;
        }

        .animate-wave-fast {
          animation: wave-fast 10s linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float-delay 4s ease-in-out infinite;
        }

        .animate-float-delay-2 {
          animation: float-delay-2 3.5s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

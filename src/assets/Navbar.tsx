

import { useState, useEffect } from 'react';
import logo from '../assets/officialLogo.png'; // Added logo import
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
const {user,signOut}=useAuthStore()
const navigate=useNavigate()
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/aboutUs' },
    // { name: 'Contact', path: '#contact' },
    { name: 'Faculties', path: '/faculties' },
    { name: 'Top Achievers', path: '/topperformers' },
  ];


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLinkClick = (link: { name: any; path: any; }) => {

    setActiveLink(link.name);
    setIsOpen(false);
    navigate(link.path)
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-lg transition-all duration-500 ${
        isScrolled ? 'shadow-2xl border-b-4 border-blue-500' : 'border-b border-blue-100'
      }`}
    >
      {/* Trigonometric Wave Pattern */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 4">
            <path
              d="M0,2 Q300,0 600,2 T1200,2"
              fill="none"
              stroke="white"
              strokeWidth="2"
              className="animate-wave"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Section - Logo with Geometric Design */}
          <div className="flex items-center gap-3 group cursor-pointer">
            {/* LOGO - Using actual logo image */}
            <img
            onClick={()=>navigate('/')} 
              src={logo} 
              alt="Excellence Institute Logo" 
              className="w-25 h-25 object-contain transform transition-all duration-300 group-hover:scale-110"
            />
            <div>
              <span className="font-bold text-xl text-gray-900 block">
            MaxWeLL Scientific Academy 
              </span>
            </div>
          </div>

          {/* Center Section - Navigation Links (Desktop) with Geometric Accents */}
          {/* <div className="hidden md:flex items-center gap-1"> */}
          <div className="hidden lg:flex items-center gap-1">

            {navLinks.map((link) => (
              <button
              
                key={link.name}
                onClick={() => handleLinkClick(link)}
                className={`relative px-6 py-2 text-gray-600 font-medium transition-all duration-300 group ${
                  activeLink === link.name ? 'text-blue-600' : 'hover:text-blue-600'
                }`}
                aria-label={`Navigate to ${link.name}`}
              >
                {/* Geometric background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl transform transition-all duration-300 ${
                  activeLink === link.name 
                    ? 'scale-100 opacity-100' 
                    : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                }`}></div>
                
                <span className="relative z-10">{link.name}</span>
                
                {/* Trigonometric underline */}
                {activeLink === link.name && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full">
                    <div className="absolute inset-0 bg-blue-300 rounded-full animate-pulse"></div>
                  </div>
                )}
                
                {/* Geometric corner accents */}
                {activeLink === link.name && (
                  <>
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-600 rounded-tl"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-600 rounded-br"></div>
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Right Section - Enhanced Login Button (Desktop) */}
          {/* <div className="hidden md:flex items-center gap-4"> */}

          <div className="hidden  lg:flex items-center gap-4">

            <button className="relative group overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              
              {/* Trigonometric pattern overlay */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <pattern id="wave-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 20 Q10 10, 20 20 T40 20" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#wave-pattern)"/>
                </svg>
              </div>
              
           {  user ?
            <span  onClick={signOut}   className="relative z-10 flex items-center gap-2">
                Logout
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>:
            <span onClick={()=>navigate('/login')} className="relative z-10 flex items-center gap-2">
                Login
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              }
              
              {/* Geometric corner decorations */}
              <div className="absolute top-0 right-0 w-3 h-3 bg-white/30 transform rotate-45"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 bg-white/30 transform rotate-45"></div>
            </button>
          </div>

          {/* Hamburger Menu Button (Mobile) with Animation */}
          <button
            onClick={toggleMenu}
           className="lg:hidden relative w-10 h-10 text-gray-700 hover:text-blue-600 transition-colors duration-300 focus:outline-none group"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <div className="absolute inset-0 bg-blue-50 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100 my-1'}`}></span>
              <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu with Geometric Design */}
      <div
      className={`lg:hidden bg-white/95 backdrop-blur-lg border-t border-blue-100 transition-all duration-500 overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {/* Geometric pattern background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <defs>
              <pattern id="mobile-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="2" fill="#2563EB"/>
                <path d="M0,25 L50,25 M25,0 L25,50" stroke="#2563EB" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mobile-pattern)"/>
          </svg>
        </div>

        <div className="relative px-4 py-4 space-y-2">
          {navLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link)}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`block w-full text-left px-6 py-4 rounded-xl transition-all duration-300 transform ${
                isOpen ? 'animate-slide-down' : ''
              } ${
                activeLink === link.name
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600'
              }`}
              aria-label={`Navigate to ${link}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{link.name}</span>
                {activeLink === link.name && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          ))}
          <div className="pt-4">
          { user ?
           <button onClick={signOut} className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
              Logout
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>:
           <button onClick={()=>navigate('/login')} className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
              Login
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
          }
          </div>
        </div>
      </div>

      <style >{`
        @keyframes wave {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(50%);
          }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-wave {
          animation: wave 3s linear infinite;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  );



};

export default Navbar;
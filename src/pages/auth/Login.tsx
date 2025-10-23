/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { useState, useEffect } from 'react';
import logo from '../../assets/officialLogo.png'; // Added logo import

import { useNavigate } from "react-router-dom";
import { useAuthStore, convertToUser } from "../../store/authStore";
import { toast } from 'react-toastify';
import { BookOpen, Smile, Users } from 'lucide-react';

const LoginPage = () => {
   const navigate = useNavigate();
  const { signIn } = useAuthStore();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { isAuthenticated, user} = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});



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

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Validate email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password
  const validatePassword = (password: string | any[]) => {
    return password.length >= 6;
  };

  // Handle input change
  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: type === 'checkbox' ? checked : value
  //   }));

  //   if (errors[name]) {
  //     setErrors(prev => ({ ...prev, [name]: '' }));
  //   }
  // };

  // Handle input blur
  const handleBlur = (e: { target: { name: any; }; }) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name);
  };

  // Validate individual field
  const validateField = (fieldName: string) => {
    let error = '';

    if (fieldName === 'email') {
      if (!email) {
        error = 'Email is required';
      } else if (!validateEmail(email)) {
        error = 'Please enter a valid email address';
      }
    }

    if (fieldName === 'password') {
      if (!password) {
        error = 'Password is required';
      } else if (!validatePassword(password)) {
        error = 'Password must be at least 6 characters';
      }
    }
const err=((prev: any) => ({ ...prev, [fieldName]: error }))
    setErrors(err);
    return !error;
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   setTouched({ email: true, password: true });

  //   const isEmailValid = validateField('email');
  //   const isPasswordValid = validateField('password');

  //   if (isEmailValid && isPasswordValid) {
  //     setIsLoading(true);
      
  //     setTimeout(() => {
  //       console.log('Login successful:', formData);
  //       setIsLoading(false);
  //     }, 1500);
  //   }
  // };

  // Handle social login
  // const handleSocialLogin = (provider) => {
  //   console.log(`Login with ${provider}`);
  // };


   const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setTouched({ email: true, password: true });

    setLoading(true);
    setErrors({email:"",password:""});

    try {
      const { user, token } = await signIn(email, password);
      toast.success("Sucessfully logined")
      const userData = convertToUser(user);
      setAuth(userData, token);

      navigate(getDashboardPath(userData.role));
    } catch (err: any) {
  toast.error(err?.message || "Invalid email or password");
  setErrors(prev => ({ ...prev, email: "Invalid email or password" }));
}
 finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: '📚', text: ' Entrance coaching- JEE. NEET, KEAM, CUSAT AND ICAR', color: 'from-blue-500 to-blue-600' },
    { icon: '🎯', text: 'Engineering tuition', color: 'from-indigo-500 to-indigo-600' },
    { icon: '👨‍🏫', text: 'TUITION FOR CLASS 7 to 12', color: 'from-purple-500 to-purple-600' },
    { icon: '🏆', text: 'ONLINE & OFFLINE CLASSES', color: 'from-blue-600 to-indigo-600' },
    { icon: '🏆', text: 'CAREER GUIDANCE CLASSES', color: 'from-blue-600 to-indigo-600' },
    { icon: '🏆', text: 'YOGA CLASS', color: 'from-blue-600 to-indigo-600' },
    { icon: '🏆', text: 'KARATE CLASS', color: 'from-blue-600 to-indigo-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
      {/* Animated Trigonometric Wave Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="login-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1"/>
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          
          <path
            d="M0,100 Q250,50 500,100 T1000,100 T1500,100 L1500,0 L0,0 Z"
            fill="url(#login-wave-gradient)"
            className="animate-wave-slow"
          />
          <path
            d="M0,150 Q300,100 600,150 T1200,150 L1200,0 L0,0 Z"
            fill="url(#login-wave-gradient)"
            opacity="0.5"
            className="animate-wave-medium"
          />
        </svg>
      </div>

      {/* Floating geometric elements with parallax */}
      <div 
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      ></div>
      <div 
        className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`
        }}
      ></div>

      {/* Trigonometric circles pattern */}
      <div className="absolute top-1/4 left-1/4 pointer-events-none opacity-10">
        <svg width="300" height="300" className="animate-spin-very-slow">
          <circle cx="150" cy="150" r="120" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="10,10"/>
          <circle cx="150" cy="150" r="90" fill="none" stroke="#6366F1" strokeWidth="2"/>
          <circle cx="150" cy="150" r="60" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="5,5"/>
        </svg>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white/95 backdrop-blur-xl rounded-[3rem] shadow-2xl overflow-hidden relative z-10 border-2 border-white/50">
        {/* LEFT SIDE - FORM */}
        <div className="p-8 lg:p-16 relative">
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-blue-200 rounded-tl-[3rem] opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-indigo-200 rounded-br-[3rem] opacity-30"></div>

          {/* LOGO PLACEHOLDER */}
          <div className="mb-10 flex items-center gap-4 group cursor-pointer">
            <img 
              src={logo} 
              alt="Excellence Institute Logo" 
              className="w-20 h-20 object-contain"
            />
            <div>
              <span className="font-black text-2xl text-gray-900 block">MaxWeLL Scientific Academy</span>
              <span className="text-sm text-blue-600 font-semibold">Learning Today Leading Tommorrow</span>
            </div>
          </div>

          {/* Form Header with geometric decoration */}
          <div className="mb-10 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">Secure Login</span>
            </div>
            
            <h1 className="text-5xl font-black text-gray-900 mb-3 leading-tight">
              Welcome{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Back!
                </span>
                <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8">
                  <path d="M5,4 Q50,0 100,4 T195,4" fill="none" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="text-gray-600 text-lg">Sign in to access your account and continue learning</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3 items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleBlur}
                  className={`w-full px-5 py-4 border-2 rounded-2xl transition-all focus:outline-none focus:ring-4 bg-gray-50 focus:bg-white ${
                    errors.email && touched.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                      : email && !errors.email
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-100'
                      : 'border-gray-200 focus:border-blue-600 focus:ring-blue-100'
                  }`}
                  placeholder="you@example.com"
                />
                {/* Success checkmark */}
                {email && !errors.email && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="group">
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-3 items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handleBlur}
                  className={`w-full px-5 py-4 border-2 rounded-2xl transition-all focus:outline-none focus:ring-4 bg-gray-50 focus:bg-white ${
                    password && touched.password
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                      : password && !errors.password
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-100'
                      : 'border-gray-200 focus:border-blue-600 focus:ring-blue-100'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center py-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  {/* <input
                    type="checkbox"
                    name="rememberMe"
                    checked={rememberMe}
                    onChange={handleChange}
                    className="peer sr-only"
                  /> */}
                  {/* <div className="w-6 h-6 border-2 border-gray-300 rounded-lg peer-checked:bg-gradient-to-br peer-checked:from-blue-600 peer-checked:to-indigo-600 peer-checked:border-transparent transition-all group-hover:border-blue-400">
                    <svg className={`w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity ${formData.rememberMe ? 'opacity-100' : 'opacity-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div> */}
                </div>
                {/* <span className="text-sm text-gray-600 font-medium select-none group-hover:text-gray-900 transition-colors">Remember me</span> */}
              </label>
              {/* <a href="#" className="text-sm text-blue-600 hover:text-indigo-600 font-bold transition-all relative group">
                Forgot Password?
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
              </a> */}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`relative w-full overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 group ${
                loading
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              
              {/* Wave pattern overlay */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <pattern id="btn-wave" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 20 Q10 10, 20 20 T40 20" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#btn-wave)"/>
                </svg>
              </div>

              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>

              {/* Corner decorations */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full transform translate-x-10 -translate-y-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full transform -translate-x-8 translate-y-8"></div>
            </button>

            {/* Divider with geometric design */}
            <div className="relative py-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-6 bg-white text-sm font-bold text-gray-500 flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  or continue with
                  <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            {/* <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                // onClick={() => handleSocialLogin('Google')}
                className="group relative overflow-hidden flex items-center justify-center gap-3 border-2 border-gray-200 rounded-2xl py-4 hover:border-blue-400 hover:bg-blue-50 transition-all hover:scale-105 active:scale-95"
              >
                <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                  <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                  <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                  <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
                </svg>
                <span className="font-bold text-gray-700 relative z-10">Google</span>
              </button>

              <button
                type="button"
                // onClick={() => handleSocialLogin('Microsoft')}
                className="group relative overflow-hidden flex items-center justify-center gap-3 border-2 border-gray-200 rounded-2xl py-4 hover:border-indigo-400 hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95"
              >
                <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24">
                  <path fill="#f25022" d="M0 0h11.377v11.377H0z"/>
                  <path fill="#00a4ef" d="M12.623 0H24v11.377H12.623z"/>
                  <path fill="#7fba00" d="M0 12.623h11.377V24H0z"/>
                  <path fill="#ffb900" d="M12.623 12.623H24V24H12.623z"/>
                </svg>
                <span className="font-bold text-gray-700 relative z-10">Microsoft</span>
              </button>
            </div> */}

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 pt-4">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 font-black hover:text-indigo-600 transition-all relative group">
                Sign Up
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </p>
          </form>
        </div>

        {/* RIGHT SIDE - ENHANCED ILLUSTRATION */}
        <div className="hidden lg:flex bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500 flex-col items-center justify-center p-16 relative overflow-hidden">
          {/* Animated Trigonometric Background */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <pattern id="illustration-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"/>
                  <circle cx="50" cy="50" r="25" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                  <path d="M0,50 Q25,25 50,50 T100,50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#illustration-pattern)"/>
            </svg>
          </div>

          {/* Decorative floating elements */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-20 w-20 h-20 bg-white/20 rounded-2xl transform rotate-12 animate-float shadow-2xl"></div>
          <div className="absolute bottom-32 right-20 w-24 h-24 bg-white/20 rounded-full animate-float-delay shadow-2xl"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-white/20 transform -rotate-12 animate-float-delay-2 shadow-xl" style={{clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'}}></div>

          {/* Main Content */}
          <div className="relative z-10 text-center space-y-10">
            {/* Animated Logo */}
            <div className="relative mx-auto w-48 h-48">
              <div className="absolute inset-0 bg-blue-400/30 backdrop-blur-lg rounded-full flex items-center justify-center border-4 border-white/40 shadow-2xl animate-float">
                <img 
                  src={logo} 
                  alt="Excellence Institute" 
                  className="w-28 h-28 object-contain"
                />
              </div>
              {/* Orbiting elements */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute -top-2 left-1/2 w-5 h-5 bg-white rounded-full transform -translate-x-1/2 shadow-lg"></div>
              </div>
              <div className="absolute inset-0 animate-spin-slow" style={{animationDirection: 'reverse', animationDuration: '12s'}}>
                <div className="absolute -bottom-2 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 shadow-lg"></div>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-white leading-tight">
                  Join Thousands of
                  <br />
                  <span className="relative inline-block">
                    Learners
                    <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8">
                      <path d="M5,4 Q50,0 100,4 T195,4" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h2>
                <p className="text-blue-100 text-xl font-medium">
                  Start your learning journey today and unlock your full potential
                </p>
              </div>
            </div>

            {/* Features List with Icons */}
            <div className="space-y-4 max-w-md mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border-2 border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white font-bold text-left">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats with Geometric Design */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { value: '100+', label: 'Students',icon:<Users/>},
                { value: '10+', label: 'Courses',icon:<BookOpen/>},
                { value: '98%', label: 'Satisfied',icon:<Smile/>}
              ].map((stat, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-2 bg-white/10 rounded-2xl transform group-hover:scale-110 transition-transform"></div>
                  <div className="relative text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-white/20">
                    <div className="text-3xl mb-2 text-white">{stat.icon}</div>
                    <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
                    <div className="text-blue-100 text-sm font-semibold">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative wave at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120">
                <path d="M0,64 Q300,0 600,64 T1200,64 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.1)"/>
                <path d="M0,80 Q300,40 600,80 T1200,80 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.05)"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wave-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes wave-medium {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(12deg); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes float-delay-2 {
          0%, 100% { transform: translateY(0) rotate(-12deg); }
          50% { transform: translateY(-25px) rotate(-12deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-very-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-wave-slow {
          animation: wave-slow 20s linear infinite;
        }
        
        .animate-wave-medium {
          animation: wave-medium 15s linear infinite;
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
        
        .animate-spin-very-slow {
          animation: spin-very-slow 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;





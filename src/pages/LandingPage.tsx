import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Person from '../assets/person.png'
import { useAuthStore } from '../store/authStore';
const LandingPage: React.FC = () => {
  const [email, setEmail] = useState('email@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {signOut}=useAuthStore()

  const handleLogin = () => {
    console.log('Login clicked');
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
  };

  const handleAppleLogin = () => {
    console.log('Apple login clicked');
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
  };

  return (
    <div><h1>hello lanmding page</h1>
    <button onClick={signOut}>logout</button>
    </div>
  );
};

export default LandingPage;
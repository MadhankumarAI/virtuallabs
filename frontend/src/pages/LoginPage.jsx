import React, { useState } from 'react';
import GlowInput from './GlowInput';
import '../static_folder/styles.css'

const LoginPage = ({ onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      alert('Login successful! Welcome to EduPortal.');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-10 w-full max-w-md shadow-[0_25px_50px_rgba(0,0,0,0.5)] transform translate-y-5 opacity-0 animate-[floatIn_1s_ease-out_forwards_0.5s] relative overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent animate-[shimmer_3s_infinite] pointer-events-none" />
      
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] tracking-[4px] mb-2">
          EDUPORTAL
        </h1>
        <p className="text-gray-400 text-sm tracking-[2px]">NEURAL LEARNING SYSTEM</p>
      </div>
      
      <div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-300 mb-2 text-sm font-light tracking-wider">
            EMAIL ADDRESS
          </label>
          <GlowInput
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 mb-2 text-sm font-light tracking-wider">
            PASSWORD
          </label>
          <GlowInput
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full p-4 bg-gradient-to-r from-gray-800 to-gray-600 border border-white/20 rounded-lg text-white font-inherit text-base font-normal tracking-[2px] cursor-pointer transition-all duration-300 relative overflow-hidden hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-400 hover:border-white/40 hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span className="relative z-10">
            {loading ? 'AUTHENTICATING...' : 'INITIALIZE ACCESS'}
          </span>
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-left duration-500 group-hover:left-full" />
        </button>
      </div>
      
      <div className="text-center mt-6 pt-6 border-t border-white/10">
        <button
          onClick={onSwitchToSignup}
          className="text-gray-300 no-underline text-sm transition-colors duration-300 tracking-wider hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        >
          CREATE NEW ACCOUNT
        </button>
      </div>
      
      <style jsx>{`
        @keyframes floatIn {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
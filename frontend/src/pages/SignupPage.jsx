import React, { useState } from 'react';
import GlowInput from './GlowInput';
import '../static_folder/styles.css'

const SignupPage = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    college: '',
    branch: '',
    fieldOfStudy: '',
    password: '',
    confirmPassword: ''
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
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    setLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      alert('Registration successful! Welcome to EduPortal.');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-10 w-full max-w-lg shadow-[0_25px_50px_rgba(0,0,0,0.5)] transform translate-y-5 opacity-0 animate-[floatIn_1s_ease-out_forwards_0.5s] relative overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent animate-[shimmer_3s_infinite] pointer-events-none" />
      
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] tracking-[4px] mb-2">
          EDUPORTAL
        </h1>
        <p className="text-gray-400 text-sm tracking-[2px]">STUDENT REGISTRATION</p>
      </div>
      
      <div>
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label htmlFor="firstName" className="block text-gray-300 mb-2 text-sm font-light tracking-wider">
              FIRST NAME
            </label>
            <GlowInput
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First name"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="lastName" className="block text-gray-300 mb-2 text-sm font-light tracking-wider">
              LAST NAME
            </label>
            <GlowInput
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last name"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        
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
          <label htmlFor="phone" className="block text-gray-300 mb-2 text-sm font-light tracking-wider">
            PHONE NUMBER
          </label>
          <GlowInput
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="college" className="block text-gray-300 mb-2 text-sm font-light tracking-wider">
            COLLEGE/UNIVERSITY
          </label>
          <GlowInput
            type="text"
            id="college"
            name="college"
            placeholder="Enter your institution"
            required
            value={formData.college}
            onChange={handleChange}
          />
        </div>
        
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label htmlFor="branch" className="block text-gray-300 mb-2 text-sm font-light tracking-wider">
              BRANCH
            </label>
            <GlowInput name="branch" value={formData.branch} onChange={handleChange}>
              <select className="text-gray-300">
                <option value="">Select Branch</option>
                <option value="computer-science">Computer Science</option>
                <option value="information-technology">Information Technology</option>
                <option value="electronics">Electronics</option>
                <option value="mechanical">Mechanical</option>
                <option value="civil">Civil</option>
                <option value="electrical">Electrical</option>
                <option value="other">Other</option>
              </select>
            </GlowInput>
          </div>
          <div className="flex-1">
            <label htmlFor="fieldOfStudy" className="block text-gray-300 mb-2 text-sm font-light tracking-wider">
              FIELD OF STUDY
            </label>
            <GlowInput name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange}>
              <select className="text-gray-300">
                <option value="">Select Field</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
                <option value="doctorate">Doctorate</option>
                <option value="diploma">Diploma</option>
              </select>
            </GlowInput>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 mb-2 text-sm font-light tracking-wider">
            PASSWORD
          </label>
          <GlowInput
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-300 mb-2 text-sm font-light tracking-wider">
            CONFIRM PASSWORD
          </label>
          <GlowInput
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            required
            value={formData.confirmPassword}
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
            {loading ? 'REGISTERING...' : 'REGISTER STUDENT'}
          </span>
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-left duration-500 group-hover:left-full" />
        </button>
      </div>
      
      <div className="text-center mt-6 pt-6 border-t border-white/10">
        <button
          onClick={onSwitchToLogin}
          className="text-gray-300 no-underline text-sm transition-colors duration-300 tracking-wider hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        >
          ALREADY HAVE AN ACCOUNT?
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

export default SignupPage;
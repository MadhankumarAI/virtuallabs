import React, { useState } from 'react';

const SignupPanel = ({ switchToLogin }) => {
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
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      alert('Registration successful! Welcome to VirtLabs.');
      setIsLoading(false);
    }, 2000);
  };

  const handleInputFocus = (e) => {
    e.target.parentElement.style.transform = 'scale(1.02)';
  };

  const handleInputBlur = (e) => {
    e.target.parentElement.style.transform = 'scale(1)';
  };

  return (
    <div className="auth-panel signup-panel">
      <div className="logo">
        <h1>VIRTLABS</h1>
        <p>STUDENT REGISTRATION</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">FIRST NAME</label>
            <div className="input-container">
              <input 
                type="text" 
                id="firstName" 
                className="form-input" 
                placeholder="First name" 
                value={formData.firstName}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
              <div className="input-glow"></div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">LAST NAME</label>
            <div className="input-container">
              <input 
                type="text" 
                id="lastName" 
                className="form-input" 
                placeholder="Last name" 
                value={formData.lastName}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
              <div className="input-glow"></div>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="email">EMAIL ADDRESS</label>
          <div className="input-container">
            <input 
              type="email" 
              id="email" 
              className="form-input" 
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
            <div className="input-glow"></div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">PHONE NUMBER</label>
          <div className="input-container">
            <input 
              type="tel" 
              id="phone" 
              className="form-input" 
              placeholder="Enter your phone number" 
              value={formData.phone}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
            <div className="input-glow"></div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="college">COLLEGE/UNIVERSITY</label>
          <div className="input-container">
            <input 
              type="text" 
              id="college" 
              className="form-input" 
              placeholder="Enter your institution" 
              value={formData.college}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
            <div className="input-glow"></div>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="branch">BRANCH</label>
            <div className="input-container">
              <select 
                id="branch" 
                className="form-input" 
                value={formData.branch}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              >
                <option value="">Select Branch</option>
                <option value="computer-science">Computer Science</option>
                <option value="information-technology">Information Technology</option>
                <option value="electronics">Electronics</option>
                <option value="mechanical">Mechanical</option>
                <option value="civil">Civil</option>
                <option value="electrical">Electrical</option>
                <option value="other">Other</option>
              </select>
              <div className="input-glow"></div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="fieldOfStudy">FIELD OF STUDY</label>
            <div className="input-container">
              <select 
                id="fieldOfStudy" 
                className="form-input" 
                value={formData.fieldOfStudy}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              >
                <option value="">Select Field</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
                <option value="doctorate">Doctorate</option>
                <option value="diploma">Diploma</option>
              </select>
              <div className="input-glow"></div>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="password">PASSWORD</label>
          <div className="input-container">
            <input 
              type="password" 
              id="password" 
              className="form-input" 
              placeholder="Create a password" 
              value={formData.password}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
            <div className="input-glow"></div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
          <div className="input-container">
            <input 
              type="password" 
              id="confirmPassword" 
              className="form-input" 
              placeholder="Confirm your password" 
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
            <div className="input-glow"></div>
          </div>
        </div>
        
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? 'REGISTERING...' : 'REGISTER STUDENT'}
        </button>
      </form>
      
      <div className="switch-auth">
        <a href="#" onClick={(e) => { e.preventDefault(); switchToLogin(); }}>
          ALREADY HAVE AN ACCOUNT?
        </a>
      </div>
    </div>
  );
};

export default SignupPanel;
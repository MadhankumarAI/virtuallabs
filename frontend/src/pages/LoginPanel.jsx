import React, { useState } from 'react';

const LoginPanel = ({ switchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      alert('Login successful! Welcome to EduPortal.');
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
    <div className="auth-panel">
      <div className="logo">
        <h1>EDUPORTAL</h1>
        <p>NEURAL LEARNING SYSTEM</p>
      </div>
      
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="password">PASSWORD</label>
          <div className="input-container">
            <input 
              type="password" 
              id="password" 
              className="form-input" 
              placeholder="Enter your password" 
              value={formData.password}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
            <div className="input-glow"></div>
          </div>
        </div>
        
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? 'AUTHENTICATING...' : 'INITIALIZE ACCESS'}
        </button>
      </form>
      
      <div className="switch-auth">
        <a href="#" onClick={(e) => { e.preventDefault(); switchToSignup(); }}>
          CREATE NEW ACCOUNT
        </a>
      </div>
    </div>
  );
};

export default LoginPanel;
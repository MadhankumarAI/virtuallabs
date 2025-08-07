import React, { useState, useEffect } from 'react';
import LoginPanel from './LoginPanel';
import SignupPanel from './SignupPanel';
import CombinedThreeBackground from './CombinedThreeBackground';

const AuthPage = () => {
  const [currentPanel, setCurrentPanel] = useState('login');

  const switchToSignup = () => {
    setCurrentPanel('signup');
  };

  const switchToLogin = () => {
    setCurrentPanel('login');
  };

  return (
    <div className="auth-page">
      <CombinedThreeBackground/>
      <div className="grid-overlay"></div>
      <div className="floating-elements">
        <div className="floating-cube"></div>
        <div className="floating-cube"></div>
        <div className="floating-cube"></div>
      </div>

      <div className="main-container">
        {currentPanel === 'login' ? (
          <LoginPanel switchToSignup={switchToSignup} />
        ) : (
          <SignupPanel switchToLogin={switchToLogin} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
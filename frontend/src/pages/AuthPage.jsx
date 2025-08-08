import React, { useState, useEffect } from 'react';
import LoginPanel from './LoginPanel';
import SignupPanel from './SignupPanel';
import CombinedThreeBackground from './CombinedThreeBackground';

const AuthPage = () => {
  const [currentPanel, setCurrentPanel] = useState('login');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1025);

  const switchToSignup = () => {
    setCurrentPanel('signup');
  };

  const switchToLogin = () => {
    setCurrentPanel('login');
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1025);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine container class based on panel and screen size
  const getContainerClass = () => {
    if (!isDesktop) return 'main-container';
    return `main-container panel-${currentPanel}-desktop`;
  };

  return (
    <div className="auth-page">
      {/* Background effects */}
      <div className="grid-overlay"></div>
      <div className="floating-elements">
        <div className="floating-cube"></div>
        <div className="floating-cube"></div>
        <div className="floating-cube"></div>
      </div>

      <div className={getContainerClass()}>
        {isDesktop ? (
          // Desktop: Split screen layout
          <>
            {/* Auth Panel Section */}
            <div className="panel-split">
              {currentPanel === 'login' ? (
                <LoginPanel switchToSignup={switchToSignup} />
              ) : (
                <SignupPanel switchToLogin={switchToLogin} />
              )}
            </div>
            
            {/* Three.js Section */}
            <div className="panel-split">
              <CombinedThreeBackground />
            </div>
          </>
        ) : (
          // Mobile/Tablet: Centered layout with background
          <>
            <CombinedThreeBackground />
            {currentPanel === 'login' ? (
              <LoginPanel switchToSignup={switchToSignup} />
            ) : (
              <SignupPanel switchToLogin={switchToLogin} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
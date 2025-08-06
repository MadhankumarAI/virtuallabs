import React, { useState } from 'react';
import GlobalStyles from './pages/GlobalStyles';
import ThreeBackground from './pages/ThreeBackground';
import FloatingElements from './pages/FloatingElements';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './static_folder/styles.css'

const App = () => {
  const [currentView, setCurrentView] = useState('login'); 

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
     
      
      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:50px_50px] pointer-events-none -z-10" />
      
      <FloatingElements />
       {/* <GlobalStyles />
      <ThreeBackground /> */}
      <div className="min-h-screen flex items-center justify-center p-5 relative">
       
        {currentView === 'login' ? (
          <LoginPage onSwitchToSignup={() => setCurrentView('signup')} />
        ) : (
          <SignupPage onSwitchToLogin={() => setCurrentView('login')} />
        )}
      </div>
       
    </div>
    

  );
};

export default App;
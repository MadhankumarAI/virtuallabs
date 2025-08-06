import React from 'react';
import '../static_folder/styles.css'

const FloatingElements = () => (
  <div className="absolute w-full h-full pointer-events-none overflow-hidden">
    <div 
      className="absolute top-1/5 left-1/10 w-5 h-5 border border-white/10 bg-white/5"
      style={{ animation: 'float 6s ease-in-out infinite' }} 
    />
    <div 
      className="absolute top-3/5 right-1/6 w-5 h-5 border border-white/10 bg-white/5"
      style={{ animation: 'float 6s ease-in-out infinite 2s' }} 
    />
    <div 
      className="absolute top-1/3 right-1/4 w-5 h-5 border border-white/10 bg-white/5"
      style={{ animation: 'float 6s ease-in-out infinite 4s' }} 
    />
    
    <style jsx>{`
      @keyframes float {
        0%, 100% { 
          transform: translateY(0) rotate(0deg); 
          opacity: 0.3; 
        }
        50% { 
          transform: translateY(-20px) rotate(180deg); 
          opacity: 0.7; 
        }
      }
    `}</style>
  </div>
);

export default FloatingElements;
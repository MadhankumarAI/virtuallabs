import React, { useState } from 'react';
import '../static_folder/styles.css'

const GlowInput = ({ type, id, name, placeholder, required, value, onChange, children }) => {
  const [focused, setFocused] = useState(false);

  const baseClasses = "w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white font-inherit text-base transition-all duration-300 outline-none focus:border-white/40 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(255,255,255,0.1)] focus:scale-105";

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <div className="relative">
      {children ? (
        React.cloneElement(children, {
          id,
          name,
          className: `${baseClasses} ${children.props.className || ''}`,
          value,
          onChange,
          onFocus: handleFocus,
          onBlur: handleBlur,
          required
        })
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${baseClasses} placeholder:text-gray-500`}
        />
      )}
      <div 
        className={`absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-300 pointer-events-none ${
          focused ? 'opacity-100' : 'opacity-0'
        }`} 
      />
    </div>
  );
};

export default GlowInput;
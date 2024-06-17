import React from 'react';


const Button = ({ className, placeholder, variant, onClick, children }) => {
    const baseClasses = 'px-[18px] py-[8px] rounded-[3px] inline-flex items-center justify-center font-semibold transition-colors';
    const variantClasses = variant === 'white' 
      ? 'bg-white text-[#800080] hover:bg-gray-100'
      : 'bg-[#800080] text-white hover:bg-[#9b59b6]';
  
    return (
      <button onClick={onClick} className={`${baseClasses} ${variantClasses} ${className}`}>
        {placeholder}
        {children}
      </button>
    );
  };

export default Button;
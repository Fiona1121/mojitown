import React from 'react';

const PixelButton = ({ children, onClick, className = '' }) => {
  return (
    <button 
      onClick={onClick}
      className={`bg-yellow-300 rounded-full border-4 border-black text-black font-bold transition-all duration-100 
      hover:bg-yellow-400 hover:scale-105 
      active:translate-y-1 active:shadow-sm
      shadow-lg ${className}`}
      style={{
        fontFamily: '"Silkscreen", monospace',
        textShadow: '1px 1px 0 rgba(0,0,0,0.3)',
        boxShadow: '4px 4px 0 rgba(0,0,0,0.7)'
      }}
    >
      {children}
    </button>
  );
};

export default PixelButton;
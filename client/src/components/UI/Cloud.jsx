import React from 'react';

const Cloud = ({ positionX, positionY, size = 'md', speed = 'normal' }) => {
  // Sizes for the cloud
  const sizes = {
    sm: 'w-16 h-10',
    md: 'w-24 h-16',
    lg: 'w-32 h-20',
  };
  
  // Animation speeds
  const speeds = {
    slow: 'animate-float-slow',
    normal: 'animate-float',
    fast: 'animate-float-fast',
  };
  
  // Styling for the cloud
  const style = {
    position: 'absolute',
    left: `${positionX}%`,
    top: `${positionY}%`,
    backgroundColor: 'white',
    borderRadius: '50%',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
  };

  return (
    <div 
      className={`${sizes[size]} ${speeds[speed]}`} 
      style={style}
    >
      {/* Create the fluffy cloud shape with pseudo-elements in CSS */}
    </div>
  );
};

export default Cloud;
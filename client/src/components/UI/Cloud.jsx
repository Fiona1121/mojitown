import React from 'react';

const Cloud = () => {
  // Create an array of cloud configurations
  const clouds = [
    { left: '5%', bottom: '65%', width: '120px', height: '40px', delay: '0s' },
    { left: '20%', bottom: '68%', width: '150px', height: '45px', delay: '2s' },
    { left: '40%', bottom: '63%', width: '130px', height: '40px', delay: '1s' },
    { left: '60%', bottom: '66%', width: '140px', height: '42px', delay: '3s' },
    { left: '80%', bottom: '64%', width: '120px', height: '38px', delay: '1.5s' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main cloud layer at bottom of sky */}
      <div className="absolute bottom-1/3 w-full">
        <svg width="100%" height="50" viewBox="0 0 1200 50" preserveAspectRatio="none" className="w-full">
          <path 
            d="M0,50 C100,20 200,0 300,15 C400,30 500,40 600,20 C700,0 800,10 900,25 C1000,40 1100,30 1200,10 L1200,50 L0,50 Z" 
            fill="white" 
            opacity="0.9"
          />
        </svg>
      </div>
      
      {/* Floating clouds */}
      {clouds.map((cloud, index) => (
        <div 
          key={index}
          className="absolute bg-white rounded-full animate-float"
          style={{
            left: cloud.left,
            bottom: cloud.bottom,
            width: cloud.width,
            height: cloud.height,
            opacity: 0.8,
            animationDelay: cloud.delay,
            boxShadow: '2px 2px 0 rgba(0, 0, 0, 0.1)',
          }}
        />
      ))}
    </div>
  );
};

export default Cloud;
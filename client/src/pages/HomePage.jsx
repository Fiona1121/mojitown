import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PixelButton from '../components/UI/PixelButton';
import backgroundImage from '../assets/HomePage/Landing_page.png';

// HomePage component with full-screen background image and pixel art style
const HomePage = () => {
  const navigate = useNavigate();
  const [titleScale, setTitleScale] = useState(1);
  const [buttonVisible, setButtonVisible] = useState(false);
  
  // Simple animation for the title
  useEffect(() => {
    // Title animation
    const interval = setInterval(() => {
      setTitleScale(prev => prev === 1 ? 1.02 : 1);
    }, 800);
    
    // Delayed button appearance
    setTimeout(() => {
      setButtonVisible(true);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
      }}
    >
      {/* Title */}
      <div 
        className="relative mb-20 z-10"
        style={{ 
          transform: `scale(${titleScale})`,
          transition: 'transform 0.5s ease-in-out'
        }}
      >
        <h1 
          className="text-6xl text-white tracking-widest pixel-text"
          style={{ 
            textShadow: '4px 4px 0 rgba(0,0,0,0.7)'
          }}
        >
          MOJITOWN
        </h1>
      </div>
      
      {/* Start Button */}
      <div 
        className={`relative z-10 transition-opacity duration-500 ${
          buttonVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <PixelButton 
          onClick={() => navigate('/create')}
          className="text-2xl px-12 py-3 bg-yellow-300 rounded-full hover:bg-yellow-400 border-4 border-black"
        >
          START
        </PixelButton>
      </div>
    </div>
  );
};

export default HomePage;
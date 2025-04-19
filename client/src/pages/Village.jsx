import React from 'react';
import { useNavigate } from 'react-router-dom';
import PixelButton from '../components/UI/PixelButton';

const Village = () => {
  const navigate = useNavigate();
  
  return (
    <div className="fullscreen bg-sky-400">
      <h1 className="pixel-text text-white text-2xl mb-8">Mojitown Village</h1>
      <p className="pixel-text text-white mb-12">Village scene coming soon!</p>
      <PixelButton onClick={() => navigate('/')}>
        Back to Home
      </PixelButton>
    </div>
  );
};

export default Village;
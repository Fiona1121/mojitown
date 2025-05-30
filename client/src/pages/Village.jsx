import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PixelButton from '../components/UI/PixelButton';
import Ground from '../components/UI/Ground';
import VillageCharacter from '../components/VillageCharacter';
import useGameState from '../store/useGameState';
import backgroundImg from '../assets/MeetMyMojiFriends/background.png';

const Village = () => {
  const navigate = useNavigate();
  const characters = useGameState((state) => state.characters);

  if (!characters || characters.length === 0) {
    return (
      <div className="fullscreen flex flex-col items-center justify-center" style={{ fontFamily: 'Silkscreen, cursive', background: `url(${backgroundImg}) center/cover no-repeat` }}>
        <h1 className="pixel-text text-white text-2xl mb-4" style={{ textShadow: '2px 2px 0 #000', fontSize: '2rem' }}>No Mojifriends in the village yet!</h1>
        <PixelButton onClick={() => navigate('/create')}>Create a Mojifriend</PixelButton>
        <div style={{ marginTop: '20px' }}>
          <PixelButton onClick={() => navigate('/')}>Back to Home</PixelButton>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fullscreen"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: `url(${backgroundImg}) center/cover no-repeat`,
        fontFamily: 'Silkscreen, cursive',
      }}
    >
      {/* Render each character */}
      {characters.map((character, index) => (
        <VillageCharacter
          key={character.id || index}
          characterData={character}
          initialXOffset={(index - (characters.length - 1) / 2) * 200}
          allCharacters={characters}
          myIndex={index}
        />
      ))}

      {/* Title and button overlay */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 0,
          width: '100%',
          textAlign: 'center',
          zIndex: 3,
        }}
      >
        <h1 className="pixel-text text-white text-2xl mb-8" style={{ textShadow: '2px 2px 0 #000', fontSize: '2.5rem', marginBottom: 0 }}>
          Meet Your Mojifriend!
        </h1>
        <p className="pixel-text text-white mb-12" style={{ textShadow: '1px 1px 0 #000', fontSize: '1.2rem', marginBottom: 16 }}>
          Your Mojifriend has arrived in Mojitown!
        </p>
      </div>

      {/* Ground/grass at the bottom */}
      <Ground />

      {/* Buttons container */}
      <div style={{ position: 'absolute', bottom: 32, left: 0, width: '100%', textAlign: 'center', zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <PixelButton onClick={() => navigate('/create')}>Add Another Moji</PixelButton>
        <PixelButton onClick={() => navigate('/')}>Back to Home</PixelButton>
      </div>
    </div>
  );
};

export default Village;
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ground from '../components/UI/Ground';
import VillageCharacter from '../components/VillageCharacter';
import MojiList from '../components/MojiList';
import ConversationHistory from '../components/ConversationHistory';
import useGameState from '../store/useGameState';
import backgroundImg from '../assets/MeetMyMojiFriends/background.png';

const Village = () => {
  const navigate = useNavigate();
  const characters = useGameState((state) => state.characters);
  const [isMojiListOpen, setIsMojiListOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const conversations = useGameState((state) => state.conversations || []);

  const buttonStyle = {
    backgroundColor: '#FFD700',
    color: 'black',
    border: '3px solid black',
    padding: '10px 25px',
    borderRadius: '8px',
    fontFamily: 'Silkscreen, cursive',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '3px 3px 0 #000',
    transform: 'translateY(0)',
    transition: 'transform 0.1s, box-shadow 0.1s',
    margin: '8px'
  };

  const buttonHoverEvents = {
    onMouseDown: (e) => {
      e.currentTarget.style.transform = 'translateY(3px)';
      e.currentTarget.style.boxShadow = '0px 0px 0 #000';
    },
    onMouseUp: (e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '3px 3px 0 #000';
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '3px 3px 0 #000';
    }
  };

  if (!characters || characters.length === 0) {
    return (
      <div className="fullscreen flex flex-col items-center justify-center" style={{ fontFamily: 'Silkscreen, cursive', background: `url(${backgroundImg}) center/cover no-repeat` }}>
        <h1 className="pixel-text text-white text-2xl mb-4" style={{ textShadow: '2px 2px 0 #000', fontSize: '2rem' }}>No Mojifriends in the village yet!</h1>
        <button 
          onClick={() => navigate('/create')}
          style={buttonStyle}
          {...buttonHoverEvents}
        >
          Create a Mojifriend
        </button>
        <button 
          onClick={() => navigate('/')}
          style={{
            ...buttonStyle,
            backgroundColor: '#f1f1f1'
          }}
          {...buttonHoverEvents}
        >
          Back to Home
        </button>
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
      {/* Moji List Component */}
      <MojiList characters={characters} isOpen={isMojiListOpen} />

      {/* Conversation History Component */}
      <ConversationHistory conversations={conversations} isOpen={isHistoryOpen} />

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
      <div style={{ 
        position: 'absolute', 
        bottom: 16, 
        left: 0, 
        width: '100%', 
        textAlign: 'center', 
        zIndex: 4, 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center', 
        gap: '16px' 
      }}>
        <button 
          onClick={() => setIsMojiListOpen(!isMojiListOpen)}
          style={{
            ...buttonStyle,
            backgroundColor: isMojiListOpen ? '#f1f1f1' : '#FFD700'
          }}
          {...buttonHoverEvents}
        >
          {isMojiListOpen ? 'Close List' : 'Moji List'}
        </button>
        <button 
          onClick={() => navigate('/create')}
          style={buttonStyle}
          {...buttonHoverEvents}
        >
          Add Another Moji
        </button>
        <button 
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          style={{
            ...buttonStyle,
            backgroundColor: isHistoryOpen ? '#f1f1f1' : '#FFD700'
          }}
          {...buttonHoverEvents}
        >
          {isHistoryOpen ? 'Close History' : 'Chat History'}
        </button>
        <button 
          onClick={() => {
            window.location.href = '/';  // This will force a full page reload
          }}
          style={{
            ...buttonStyle,
            backgroundColor: '#f1f1f1'
          }}
          {...buttonHoverEvents}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Village;
import React from 'react';
import whiteCatSprite from '../assets/CreateCharacter/cat_white.png';
import blackCatSprite from '../assets/CreateCharacter/cat_black.png';
import blueCatSprite from '../assets/CreateCharacter/cat_blue.png';
import brownCatSprite from '../assets/CreateCharacter/cat_brown.png';
import grayCatSprite from '../assets/CreateCharacter/cat_gray.png';
import greenCatSprite from '../assets/CreateCharacter/cat_green.png';
import orangeCatSprite from '../assets/CreateCharacter/cat_orange.png';
import pinkCatSprite from '../assets/CreateCharacter/cat_pink.png';
import purpleCatSprite from '../assets/CreateCharacter/cat_purple.png';
import coffeeCupSprite from '../assets/CreateCharacter/coffeecup.png';
import ojisanSprite from '../assets/CreateCharacter/ojisan.png';
import sportSprite from '../assets/CreateCharacter/sport.png';
import sportBrownSprite from '../assets/CreateCharacter/sport_brown.png';

const FRAME_SIZE = 96; // Each frame is 96x96px
const SPRITE_WIDTH = 384; // 4 frames in a row

const COLOR_SPRITES = {
  white: whiteCatSprite,
  black: blackCatSprite,
  blue: blueCatSprite,
  brown: brownCatSprite,
  gray: grayCatSprite,
  green: greenCatSprite,
  orange: orangeCatSprite,
  pink: pinkCatSprite,
  purple: purpleCatSprite,
};

const SPORT_SPRITES = {
  white: sportSprite,
  brown: sportBrownSprite
};

const EMOJI_SPRITES = {
  '🐱': (color) => COLOR_SPRITES[color] || whiteCatSprite,
  '☕': () => coffeeCupSprite,
  '👓': () => ojisanSprite,
  '🏋️': (color) => SPORT_SPRITES[color] || sportSprite,
};

const MojiList = ({ characters, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100vh',
      width: '450px',
      backgroundColor: 'rgba(255, 255, 255, 0.97)',
      borderRight: '4px solid black',
      zIndex: 5,
      overflowY: 'auto',
      padding: '80px 20px 20px 20px',
      fontFamily: 'Silkscreen, cursive',
      boxShadow: '4px 0 15px rgba(0, 0, 0, 0.3)',
      animation: 'slideIn 0.3s ease-out',
      backgroundImage: 'linear-gradient(45deg, rgba(255,215,0,0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,215,0,0.05) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,215,0,0.05) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,215,0,0.05) 75%)',
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
    }}>
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          ::-webkit-scrollbar {
            width: 10px;
          }
          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
          }
          ::-webkit-scrollbar-thumb {
            background: #FFD700;
            border: 2px solid black;
            border-radius: 5px;
          }
        `}
      </style>
      
      <h2 style={{
        fontSize: '1.8rem',
        textAlign: 'center',
        marginBottom: '25px',
        color: '#333',
        textShadow: '2px 2px 0 rgba(0,0,0,0.1)',
        borderBottom: '3px solid rgba(0,0,0,0.1)',
        paddingBottom: '15px',
        position: 'relative'
      }}>
        Your Mojifriends
        <div style={{
          position: 'absolute',
          bottom: '-3px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100px',
          height: '3px',
          background: '#FFD700',
        }}/>
      </h2>
      
      {characters.map((character, index) => {
        const spriteImage = EMOJI_SPRITES[character.emoji] ? EMOJI_SPRITES[character.emoji](character.color) : null;
        
        return (
          <div 
            key={character.id || index} 
            style={{
              backgroundColor: 'white',
              border: '3px solid black',
              borderRadius: '12px',
              padding: '15px 25px',
              marginBottom: '15px',
              boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
              display: 'flex',
              gap: '30px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              animation: 'fadeIn 0.5s ease-out forwards',
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
              cursor: 'pointer',
              ':hover': {
                transform: 'translateY(-2px)',
                boxShadow: '6px 6px 0 rgba(0,0,0,0.15)'
              }
            }}
          >
            {/* Left side: Character Display and Name */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: '85px'
            }}>
              {/* Character Display */}
              <div style={{
                width: '85px',
                height: '85px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(0,0,0,0.1)',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.5)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
              }}>
                {spriteImage && (
                  <img
                    src={spriteImage}
                    alt={`${character.name || 'Unnamed'} Character`}
                    style={{
                      width: `${SPRITE_WIDTH * 0.75}px`,
                      height: `${FRAME_SIZE * 0.75}px`,
                      imageRendering: 'pixelated',
                      position: 'absolute',
                      left: 0,
                      bottom: '10px',
                      clipPath: 'inset(0 216px 0 0)',
                    }}
                  />
                )}
              </div>
              
              {/* Character Name */}
              <div style={{ 
                textAlign: 'center',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                marginTop: '8px',
                wordBreak: 'break-word',
                width: '100%',
                color: '#333',
                textShadow: '1px 1px 0 rgba(255,255,255,0.5)'
              }}>
                {character.name || 'Unnamed Moji'}
              </div>
            </div>

            {/* Right side: Character Info */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              fontSize: '0.8rem',
              color: '#333',
              borderLeft: '2px solid rgba(0,0,0,0.1)',
              paddingLeft: '25px',
              minWidth: '240px',
              background: 'linear-gradient(to right, rgba(255,255,255,0.5), transparent)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '10px 15px',
                alignContent: 'center'
              }}>
                {[
                  ['Birthday', character.birthday],
                  ['MBTI', character.mbti],
                  ['Zodiac', character.zodiac]
                ].map(([label, value]) => (
                  <React.Fragment key={label}>
                    <span style={{ 
                      color: '#666', 
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {label}:
                    </span>
                    <span style={{
                      background: 'rgba(255,215,0,0.1)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.85rem'
                    }}>
                      {value || 'Unknown'}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MojiList; 
import React, { useState, useEffect } from 'react';
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

const BOX_SIZE = 150; // Preview box size

// Map of color IDs to their respective sprite images
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

// Map of sport character colors to sprites
const SPORT_SPRITES = {
  white: sportSprite,
  brown: sportBrownSprite
};

// Map emojis to their sprite images
const EMOJI_SPRITES = {
  '🐱': (color) => COLOR_SPRITES[color] || whiteCatSprite,
  '☕': () => coffeeCupSprite,
  '👓': () => ojisanSprite,
  '🏋️': (color) => SPORT_SPRITES[color] || sportSprite,
};

const CharacterPreview = ({ show, color = 'white', emoji = '🐱' }) => {
  const [isSecondFrame, setIsSecondFrame] = useState(false);
  
  // Effect to handle frame animation when color or emoji changes
  useEffect(() => {
    if (show) {
      setIsSecondFrame(true);
      const timer = setTimeout(() => {
        setIsSecondFrame(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [color, emoji, show]);

  if (!show) return null;

  const spriteImage = EMOJI_SPRITES[emoji] ? EMOJI_SPRITES[emoji](color) : null;

  const frameStyles = isSecondFrame ? {
    clipPath: 'inset(0 96px 0 0)',
    left: 'calc(50% - 80px)',
  } : {
    clipPath: 'inset(0 96px 0 0)',
    left: 'calc(50% + 16px)',
  };

  return (
    <div
      style={{
        width: `${BOX_SIZE}px`,
        height: `${BOX_SIZE}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        border: '4px solid black',
        boxShadow: '5px 5px 0 rgba(0, 0, 0, 0.5)',
        padding: 0,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
        {spriteImage && (
          <img 
            src={spriteImage} 
            alt={`${emoji} Character`}
            style={{
              width: '384px',
              height: '96px',
              imageRendering: 'pixelated',
              position: 'absolute',
              top: '58%',
              transform: 'translate(-64px, -64px)',
              ...frameStyles
            }}
          />
        )}
    </div>
  );
};

export default CharacterPreview; 
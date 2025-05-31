import React, { useState, useEffect, useRef } from 'react';
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

const BOX_SIZE_WIDTH = 132; // Preview box size
const BOX_SIZE_HEIGHT = 150;
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

const CharacterPreview = ({ show, color = 'white', emoji = '🐱', isPositioned = false }) => {
  const [isSecondFrame, setIsSecondFrame] = useState(false);
  const [isFalling, setIsFalling] = useState(false); // State for falling animation
  const fallStartTimerId = useRef(null);
  const fallEndTimerId = useRef(null);
  
  // Effect for falling animation
  useEffect(() => {
    // Clear any existing timers from previous runs or if 'show' toggles quickly
    if (fallStartTimerId.current) clearTimeout(fallStartTimerId.current);
    if (fallEndTimerId.current) clearTimeout(fallEndTimerId.current);

    if (show && isPositioned) {
      // Fall will start after a brief delay, allowing parent component to position this one.
      fallStartTimerId.current = setTimeout(() => {
        setIsFalling(true); // Start falling
        fallStartTimerId.current = null; // Timer has fired

        fallEndTimerId.current = setTimeout(() => {
          setIsFalling(false); // End falling
          fallEndTimerId.current = null; // Timer has fired
        }, 500); // Fall duration 0.5s
      }, 50); // Delay before starting fall (e.g., 50ms)

    } else {
      // If component is hidden (show is false), or not positioned, ensure it's not in a falling state.
      setIsFalling(false);
    }

    // Cleanup function for the effect: clear timers if component unmounts or props change again.
    return () => {
      if (fallStartTimerId.current) {
        clearTimeout(fallStartTimerId.current);
        fallStartTimerId.current = null;
      }
      if (fallEndTimerId.current) {
        clearTimeout(fallEndTimerId.current);
        fallEndTimerId.current = null;
      }
    };
  }, [show, isPositioned]); // Dependency array includes only 'show' and 'isPositioned'
  
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

  const currentFrameStyles = isSecondFrame ? {
    clipPath: 'inset(0 96px 0 0)',
    left: 'calc(50% - 80px)',
  } : {
    clipPath: 'inset(0 96px 0 0)',
    left: 'calc(50% + 16px)',
  };

  // Define Y offset for starting position of the fall
  // Character image height is 96px. We want it to start well above the box.
  const initialYOffsetForFall = BOX_SIZE_HEIGHT + 96; // Start above box + character height

  const finalTransform = 'translate(-64px, -64px)';
  const fallingTransform = `translate(-64px, ${-64 - initialYOffsetForFall}px)`;

  return (
    <div
      style={{
        width: `${BOX_SIZE_WIDTH}px`,
        height: `${BOX_SIZE_HEIGHT}px`,
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
              top: '58%', // Base vertical position
              ...currentFrameStyles, // Applies left and clipPath for sprite animation
              transform: isFalling ? fallingTransform : finalTransform,
              transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.5)', // Easing for fall effect
            }}
          />
        )}
    </div>
  );
};

export default CharacterPreview; 
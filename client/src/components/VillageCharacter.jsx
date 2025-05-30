import React, { useEffect, useRef, useState } from 'react';
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
const BOX_SIZE = 150;

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

const WALK_FRAMES_LEFT = [2, 3]; // 3rd and 4th frames (index 2, 3)
const WALK_FRAMES_RIGHT = [0, 1]; // 1st and 2nd frames (index 0, 1)

const TRACK_OFFSETS = [0, 50, 120, 170]; // Adjusted for larger height variance, spanning approx one Moji's height

const VillageCharacter = ({ characterData, style, initialXOffset = 0 }) => {
  const { color = 'white', emoji = '🐱' } = characterData || {}; // Destructure with defaults
  const spriteImage = EMOJI_SPRITES[emoji] ? EMOJI_SPRITES[emoji](color) : null;
  
  // Internal animation states
  const [dropped, setDropped] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [currentPose, setCurrentPose] = useState(0); // 0: first frame, 1: second frame, null: walk
  const [verticalOffset, setVerticalOffset] = useState(0); // For random height on grass

  const [frameIdx, setFrameIdx] = useState(0); // 0 or 1 for WALK_FRAMES
  const [direction, setDirection] = useState(Math.random() < 0.5 ? 1 : -1); // Random initial direction
  const [x, setX] = useState(initialXOffset); // horizontal position in px, starts with offset
  const containerRef = useRef(null);

  // Calculate walking boundaries based on window width
  const [bounds, setBounds] = useState({ minX: 0, maxX: 0 });
  useEffect(() => {
    function updateBounds() {
      // To go completely off-screen, the character's center needs to move
      // past the screen edge by half its own width (BOX_SIZE / 2).
      const halfBox = BOX_SIZE / 2;
      const halfScreen = window.innerWidth / 2;

      const minX = -halfScreen - halfBox; // Turnaround point when moving left
      const maxX = halfScreen + halfBox;  // Turnaround point when moving right
      setBounds({ minX, maxX });
    }
    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  // Effect for entry animation sequence
  useEffect(() => {
    // Start drop animation after mount
    const dropTimer = setTimeout(() => setDropped(true), 300);
    // After drop animation, show 2nd frame static for 2s, then start walk
    const poseTimer = setTimeout(() => {
      setCurrentPose(1); // show 2nd frame
      const walkTimer = setTimeout(() => {
        setCurrentPose(null);
        setIsWalking(true);
        // Randomly select a track offset
        setVerticalOffset(TRACK_OFFSETS[Math.floor(Math.random() * TRACK_OFFSETS.length)]);
      }, 2000);
      return () => clearTimeout(walkTimer);
    }, 1500); // 1.2s drop (approx) + 0.3s delay

    return () => {
      clearTimeout(dropTimer);
      clearTimeout(poseTimer);
    };
  }, []); // Runs once on mount

  // Effect to randomize vertical offset when direction changes while walking
  useEffect(() => {
    if (isWalking) {
      // Set random offset when direction changes (after the initial one set on walk start)
      // This will trigger after the first turn and subsequent turns
      // Randomly select a track offset
      setVerticalOffset(TRACK_OFFSETS[Math.floor(Math.random() * TRACK_OFFSETS.length)]);
    }
  }, [direction, isWalking]); // Re-run if direction changes while isWalking is true

  useEffect(() => {
    if (!isWalking) return; // Changed from walk prop to internal isWalking state
    let animationId;
    let lastTimestamp = performance.now();
    let walkSpeed = 10; // This was previously modified, keeping it at 10
    let frameInterval = 200; // This was previously modified, keeping it at 200
    let frameTimer = 0;
    function animate(now) {
      const dt = now - lastTimestamp;
      lastTimestamp = now;
      setX(prevX => {
        let nextX = prevX + direction * (walkSpeed * dt / 1000);
        if (nextX > bounds.maxX) {
          setDirection(-1);
          nextX = bounds.maxX;
        } else if (nextX < bounds.minX) {
          setDirection(1);
          nextX = bounds.minX;
        }
        return nextX;
      });
      frameTimer += dt;
      if (frameTimer > frameInterval) {
        setFrameIdx(f => (f + 1) % 2);
        frameTimer = 0;
      }
      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [direction, isWalking, bounds]); // Changed from walk prop

  // frame selection: walk uses WALK_FRAMES, otherwise use pose
  let frameLeftPx;
  if (isWalking) { // Changed from walk prop
    // Mirror walk cycle when direction is left
    const walkFrame = direction === -1 ? WALK_FRAMES_LEFT[frameIdx] : WALK_FRAMES_RIGHT[frameIdx];
    frameLeftPx = walkFrame * 96;
  } else if (currentPose === 0) { // Changed from pose prop
    frameLeftPx = 0;
  } else if (currentPose === 1) { // Changed from pose prop
    frameLeftPx = 96;
  } else {
    frameLeftPx = 0;
  }

  // flip logic
  const flip = direction === 1 ? true : false;

//   // Debug box
//   const debugBox = (
//     <div
//       style={{
//         position: 'fixed',
//         right: 10,
//         bottom: 10,
//         background: 'rgba(0,0,0,0.7)',
//         color: '#fff',
//         fontSize: 12,
//         padding: '8px 12px',
//         borderRadius: 6,
//         zIndex: 9999,
//         fontFamily: 'monospace',
//         minWidth: 120,
//         pointerEvents: 'none',
//       }}
//     >
//       <div>pose: {String(currentPose)}</div>
//       <div>walk: {String(isWalking)}</div>
//       <div>frameIdx: {frameIdx}</div>
//       <div>frameLeftPx: {frameLeftPx}</div>
//       <div>direction: {direction === 1 ? 'right' : 'left'}</div>
//     </div>
//   );

  return (
    <>
      {/* This is the main container that will handle the drop animation */}
      <div
        style={{
          position: 'absolute',
          left: '50%', // Centered horizontally
          transform: `translateX(calc(-50% + ${x}px))`, // Apply x offset for walking and initialXOffset
          top: dropped ? '70%' : '-30%', // Drop animation
          transition: 'top 1.2s cubic-bezier(0.22, 1, 0.36, 1)', // Drop animation transition
          zIndex: 2, // Ensure characters are above background but below UI elements like title/buttons
          // The width/height for this dropping container can be minimal,
          // as the inner div `containerRef` handles the character's visual box.
        }}
      >
        <div
          ref={containerRef}
          style={{
            width: `${BOX_SIZE}px`,
            height: `${BOX_SIZE}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'end',
            padding: 0,
            overflow: 'hidden',
            // position: 'absolute', // No longer absolute within the dropping container
            // left: '50%', // Positioning handled by parent div
            // bottom: 0, // Positioning handled by parent div
            // transform: `translate(-50%, 0) translateX(${x}px)`, // Walking transform now on parent
            background: 'none',
            border: 'none',
            boxShadow: 'none',
            transform: `translateY(-${verticalOffset}px)`, // Apply vertical offset
            ...style, // Original style prop can still be applied
          }}
        >
          <div
            style={{
              width: '96px',
              height: '96px',
              position: 'absolute', // Kept absolute for sprite positioning within its 96x96 box
              left: '50%',
              bottom: 0,
              transform: 'translateX(-50%)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'center',
            }}
          >
            {spriteImage && (
              <img
                src={spriteImage}
                alt={`${emoji} Character`}
                style={{
                  width: `${SPRITE_WIDTH}px`,
                  height: `${FRAME_SIZE}px`,
                  imageRendering: 'pixelated',
                  position: 'absolute',
                  left: `-${frameLeftPx}px`,
                  bottom: 0,
                  transform: `scaleX(${flip ? -1 : 1})`,
                }}
              />
            )}
          </div>
        </div>
      </div>
      {/* {debugBox} */}
    </>
  );
};

export default VillageCharacter; 
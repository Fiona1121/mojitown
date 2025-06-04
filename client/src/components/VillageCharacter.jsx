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
import useGameState from '../store/useGameState'; // Import useGameState

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

const TRACK_OFFSETS = [0, 70, 130, 190]; // Adjusted for larger height variance, spanning approx one Moji's height

const VillageCharacter = ({ characterData, style, initialXOffset = 0, allCharacters = [], myIndex }) => {
  const { id, color = 'white', emoji = '🐱', isNewlyAdded, conversationState } = characterData || {}; // Destructure conversationState
  const spriteImage = EMOJI_SPRITES[emoji] ? EMOJI_SPRITES[emoji](color) : null;
  const markAnimationPlayed = useGameState((state) => state.markCharacterAnimationPlayed);
  const updatePosition = useGameState((state) => state.updateCharacterPosition);
  const startGlobalConversation = useGameState((state) => state.startConversation);
  const endGlobalConversation = useGameState((state) => state.endConversation);
  
  // Internal animation states
  const [dropped, setDropped] = useState(!isNewlyAdded);
  const [isWalking, setIsWalking] = useState(false);
  const [currentPose, setCurrentPose] = useState(0); // 0: first frame, 1: second frame, null: walk
  const [verticalOffset, setVerticalOffset] = useState(0); // Initialize, will be set on mount

  // Local conversation display states
  const [speechBubble, setSpeechBubble] = useState('');

  const [frameIdx, setFrameIdx] = useState(0); // 0 or 1 for WALK_FRAMES
  const [direction, setDirection] = useState(Math.random() < 0.5 ? 1 : -1); // Random initial direction
  const [x, setX] = useState(initialXOffset); // horizontal position in px, starts with offset
  const containerRef = useRef(null);
  const conversationTimeoutRef = useRef(null);
  const conversationCooldownRef = useRef(new Set()); // Track recent conversation partners
  
  // Track other characters' positions for this character instance
  const [otherCharacterPositions, setOtherCharacterPositions] = useState([]);

  // Calculate walking boundaries based on window width
  const [bounds, setBounds] = useState({ minX: 0, maxX: 0 });

  // Effect to handle conversation state changes from global state
  useEffect(() => {
    // Clear any existing conversation timeout
    if (conversationTimeoutRef.current) {
      clearTimeout(conversationTimeoutRef.current);
      conversationTimeoutRef.current = null;
    }

    if (conversationState?.isInConversation) {
      setIsWalking(false); // Stop walking when conversation starts
      
      if (conversationState.role === 'initiator') {
        // Find the conversation in global state
        const currentConversation = useGameState.getState().conversations.find(
          conv => conv.character1Id === id && conv.character2Id === conversationState.partnerId
        );
        
        // Show the actual message from the conversation
        setSpeechBubble(currentConversation?.message1 || '');
        
        conversationTimeoutRef.current = setTimeout(() => {
          setSpeechBubble('');
          console.log('Initiator finished speaking:', id);
          
          if (conversationState.partnerId) {
            conversationCooldownRef.current.add(conversationState.partnerId);
            setTimeout(() => {
              conversationCooldownRef.current.delete(conversationState.partnerId);
            }, 3000);
          }
        }, 1500);
      } else if (conversationState.role === 'responder') {
        // Find the conversation in global state
        const currentConversation = useGameState.getState().conversations.find(
          conv => conv.character2Id === id && conv.character1Id === conversationState.partnerId
        );
        
        // Wait for initiator to finish, then show response
        conversationTimeoutRef.current = setTimeout(() => {
          setSpeechBubble(currentConversation?.message2 || '');
          
          conversationTimeoutRef.current = setTimeout(() => {
            setSpeechBubble('');
            
            if (conversationState.partnerId) {
              conversationCooldownRef.current.add(conversationState.partnerId);
              setTimeout(() => {
                conversationCooldownRef.current.delete(conversationState.partnerId);
              }, 3000);
            }
            
            if (id && conversationState.partnerId) {
              endGlobalConversation(id, conversationState.partnerId);
            }
          }, 1500);
        }, 1500);
      }
    } else {
      // Conversation ended or never started
      setSpeechBubble('');
      
      const canWalk = 
        (!isNewlyAdded && dropped) || 
        (isNewlyAdded && dropped && currentPose === null);
      
      if (canWalk) {
        setIsWalking(true);
      }
    }
  }, [conversationState, id, endGlobalConversation, isNewlyAdded, dropped, currentPose]);

  // Cleanup effect for conversation timeouts
  useEffect(() => {
    return () => {
      if (conversationTimeoutRef.current) {
        clearTimeout(conversationTimeoutRef.current);
      }
    };
  }, []);

  // Effect to update this character's position in global state
  useEffect(() => {
    if (id && updatePosition) {
      updatePosition(id, { 
        x, 
        verticalOffset, 
        direction, 
        isWalking, 
        isInConversation: conversationState?.isInConversation || false 
      });
    }
  }, [id, x, verticalOffset, direction, isWalking, conversationState, updatePosition]);

  // Effect to update this character's position in global state
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

  // Effect to set the initial vertical track ONCE on mount
  useEffect(() => {
    setVerticalOffset(TRACK_OFFSETS[Math.floor(Math.random() * TRACK_OFFSETS.length)]);
  }, []); // Empty dependency array: runs only once on mount

  // Effect for entry animation sequence AND for handling existing characters
  useEffect(() => {
    // verticalOffset is already set by the mount effect.

    if (isNewlyAdded) {
      // Start drop animation after mount for new characters
      const dropTimer = setTimeout(() => {
        setDropped(true);
      }, 300);
      // After drop animation, show 2nd frame static for 2s, then start walk
      const poseTimer = setTimeout(() => {
        setCurrentPose(1); // show 2nd frame
        const walkTimer = setTimeout(() => {
          setCurrentPose(null);
          setIsWalking(true);
          if (id) { // Ensure id is present before marking
            markAnimationPlayed(id); // Mark animation as played for this character
          }
        }, 2000);
        return () => clearTimeout(walkTimer);
      }, 1500); // 1.2s drop (approx) + 0.3s delay

      return () => {
        clearTimeout(dropTimer);
        clearTimeout(poseTimer);
      };
    } else {
      // For existing characters (on page refresh), perform a greeting animation.
      setDropped(true); // Appear in place

      let greetingPose1Timer;
      let greetingWalkTimer;

      if (direction === -1) { // Facing Left - new order: pose 0 (sprite idx 0) then pose 1 (sprite idx 1)
        setCurrentPose(0); // Start with first left-facing pose (sprite index 0)
        greetingPose1Timer = setTimeout(() => {
          setCurrentPose(1); // Switch to second left-facing pose (sprite index 1)
        }, 1000);
      } else { // Facing Right (direction === 1) - new order: pose 1 (sprite idx 3) then pose 0 (sprite idx 2)
        setCurrentPose(1); // Start with second right-facing pose (sprite index 3, will be flipped)
        greetingPose1Timer = setTimeout(() => {
          setCurrentPose(0); // Switch to first right-facing pose (sprite index 2, will be flipped)
        }, 1000);
      }
      
      greetingWalkTimer = setTimeout(() => {
        setCurrentPose(null); // End greeting, prepare for walk
        setIsWalking(true);   // Start walking
      }, 2000); // Total duration of greeting (1s poseA + 1s poseB)

      // Cleanup timers for the greeting sequence
      return () => {
        clearTimeout(greetingPose1Timer);
        clearTimeout(greetingWalkTimer);
      };
    }
  }, [isNewlyAdded, id, markAnimationPlayed, direction]); // Added direction to dependencies

  // Effect to update other characters' positions and check for encounters
  useEffect(() => {
    if (!allCharacters || myIndex === undefined) return;
    
    const others = allCharacters
      .map((char, index) => ({ ...char, index }))
      .filter((char, index) => index !== myIndex); // Exclude self
    
    setOtherCharacterPositions(others);
    
    // Check for encounters if this character is walking and not already in conversation
    if (isWalking && !conversationState?.isInConversation) {
      checkForEncounters(others);
    }
  }, [allCharacters, myIndex, x, verticalOffset, direction, isWalking, conversationState]);

  // Function to generate a random conversation message
  const generateMessage = (character, isInitiator) => {
    // Level 1: Extroverted, Sensing - Very casual, emoji-heavy
    const level1 = [
      "Hi hi! 🌟 🎵",
      "Yay! ✨ 🎈",
      "Woohoo! 🎉 💫",
      "La la la~ 🌈 ⭐",
      "Hehe! 🌸 💝",
      "Look! 🦋 🌺",
      "Dancing! 🎵 💃",
      "Sunshine! 🌞 🌈",
      "Fun time! 🎪 🎠",
      "Pretty! 🎨 🎭"
    ];

    // Level 2: Extroverted, Intuitive - Playful with some depth
    const level2 = [
      "Wow! 🤔 ✨",
      "Cool! 💭 🌟",
      "Really? 🎯 💫",
      "Fun! 🎪 ⭐",
      "Amazing! 🌈 💝",
      "Let's play! 🎮 🎲",
      "Dance time! 💃 🕺",
      "Party! 🎉 🎊",
      "Adventure awaits! 🗺️ 🎯",
      "Magic happens! ✨ 🔮"
    ];

    // Level 3: Introverted, Sensing - Thoughtful conversations
    const level3 = [
      "Tell me your thoughts? 🤔",
      "What do you think? 💭",
      "Share your story? 📖",
      "How are you feeling? 💫",
      "Let's talk more! 💝",
      "That's interesting! 💫",
      "I understand! 🤝",
      "Please continue! 👂",
      "Makes sense! 💡",
      "You're right! ⭐"
    ];

    // Level 4: Introverted, Intuitive - Deep but conversational
    const level4 = [
      "Life is beautiful! 🌟",
      "Dreams inspire us! 💫",
      "Found inner peace? ✨",
      "Let's explore together! 🌈",
      "Share your wisdom! 📚",
      "What's your dream? 🌌",
      "Tell me more! 💫",
      "That's deep! ✨",
      "I feel that! 💝",
      "You inspire me! 💫"
    ];

    // Level 5: INTJ/INFJ - Philosophical but accessible
    const level5 = [
      "Mind meets heart! 🧠💝",
      "Wisdom flows freely! 📚✨",
      "Paths cross perfectly! 🌟",
      "Thoughts become reality! 💫",
      "Souls connect here! 💫",
      "Shall we discover? 🔮",
      "Journey continues! ✨",
      "Growing together! 🌱",
      "Ideas bloom! 🌸",
      "Truth shines bright! ✨"
    ];

    // Enhanced personality-based level determination
    const determineLevel = (char) => {
      const personalityTraits = char.mbti || '';
      let score = 0;

      // Introversion adds deep thinking (0-3 points)
      score += personalityTraits.includes('I') ? 3 : 0;

      // Intuition adds abstract thinking (0-3 points)
      score += personalityTraits.includes('N') ? 3 : 0;

      // Thinking adds logical depth (0-2 points)
      score += personalityTraits.includes('T') ? 2 : 0;

      // Judging adds structure (0-1 point)
      score += personalityTraits.includes('J') ? 1 : 0;

      // Random factor (0-2 points)
      score += Math.floor(Math.random() * 3);

      // Determine level based on total score
      if (score >= 8) return 5;      // INTJ/INFJ territory
      if (score >= 6) return 4;      // IN** types
      if (score >= 4) return 3;      // I*** or *N** types
      if (score >= 2) return 2;      // Mixed types
      return 1;                      // E*** types
    };

    const level = determineLevel(character);
    
    // Get the appropriate message array based on level
    let messageArray;
    switch(level) {
      case 5: messageArray = level5; break;
      case 4: messageArray = level4; break;
      case 3: messageArray = level3; break;
      case 2: messageArray = level2; break;
      default: messageArray = level1;
    }

    // Sometimes use pure emoji responses for introverted types
    if (character.mbti?.includes('I') && Math.random() < 0.3) {
      const emojiOnlyResponses = [
        "🤔 💭 ✨",
        "💫 🌟 💝",
        "✨ 📚 💫",
        "🧠 💡 ⭐",
        "🔮 💫 🌸"
      ];
      return emojiOnlyResponses[Math.floor(Math.random() * emojiOnlyResponses.length)];
    }

    // Return a single random message from the appropriate level
    return messageArray[Math.floor(Math.random() * messageArray.length)];
  };

  // Function to check for face-to-face encounters
  const checkForEncounters = (others) => {
    const myPosition = { x, verticalOffset, direction };
    
    others.forEach((otherChar) => {
      const otherPosition = otherChar.currentPosition;
      
      // Skip if other character doesn't have position data or is also in conversation
      if (!otherPosition || otherPosition.isInConversation) return;
      
      // Skip if this character is in cooldown with the other character
      if (conversationCooldownRef.current.has(otherChar.id)) {
        return;
      }
      
      // Check if on same track (within tolerance)
      const trackTolerance = 40; // pixels
      const onSameTrack = Math.abs(myPosition.verticalOffset - otherPosition.verticalOffset) < trackTolerance;
      
      // Strict face-to-face check: characters must be facing each other directly
      const facingEachOther = myPosition.direction !== otherPosition.direction;
      
      // Additional check: ensure they are actually moving towards each other
      const movingTowardsEachOther = 
        (myPosition.direction === 1 && myPosition.x < otherPosition.x) || // I'm moving right and other is to my right
        (myPosition.direction === -1 && myPosition.x > otherPosition.x);   // I'm moving left and other is to my left
      
      // Precise distance check: exactly around 90px
      const distance = Math.abs(myPosition.x - otherPosition.x);
      const perfectDistance = distance >= 85 && distance <= 95; // 90px ± 5px tolerance
      
      // Check if both are walking (not in poses)
      const bothWalking = isWalking && otherPosition.isWalking;
      
      // Only trigger if all conditions are met
      if (onSameTrack && facingEachOther && movingTowardsEachOther && perfectDistance && bothWalking) {
        // Only the character with smaller ID triggers to prevent duplicate conversations
        if (id < otherChar.id) {
          // Generate all messages for the conversation upfront
          const messages = [];
          for (let i = 0; i < 4; i++) {
            const message1 = generateMessage(characterData, true);
            const message2 = generateMessage(otherChar, false);
            messages.push({ message1, message2 });
          }
          
          // Start the conversation with the first set of messages
          startGlobalConversation(id, otherChar.id, messages[0].message1, messages[0].message2);
          
          // Show first speech bubble
          setSpeechBubble(messages[0].message1);
          
          let currentExchange = 1;
          
          // Set up the conversation sequence
          const nextExchange = () => {
            if (currentExchange < 4) {
              setSpeechBubble(messages[currentExchange].message1);
              currentExchange++;
              
              // Schedule next exchange
              conversationTimeoutRef.current = setTimeout(nextExchange, 3000);
            } else {
              // End conversation
              endGlobalConversation(id, otherChar.id);
              setSpeechBubble('');
              
              // Add to cooldown
              conversationCooldownRef.current.add(otherChar.id);
              setTimeout(() => {
                conversationCooldownRef.current.delete(otherChar.id);
              }, 30000); // 30 second cooldown
            }
          };
          
          // Start the exchange sequence
          conversationTimeoutRef.current = setTimeout(nextExchange, 3000);
        }
      }
    });
  };

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
    frameLeftPx = walkFrame * FRAME_SIZE; // Use FRAME_SIZE constant
  } else { // Posing (greeting for existing characters, or initial pose for new characters)
    if (direction === -1) { // Facing Left (not flipped) - User wants frames 0, 1 for left smile
      if (currentPose === 0) {
        frameLeftPx = 0 * FRAME_SIZE; // Sprite frame 0
      } else if (currentPose === 1) {
        frameLeftPx = 1 * FRAME_SIZE; // Sprite frame 1
      } else {
        frameLeftPx = 0 * FRAME_SIZE; // Default to first frame if pose is unexpected
      }
    } else { // Facing Right (direction === 1, will be flipped) - User wants frames 2, 3 for right smile
      if (currentPose === 0) {
        frameLeftPx = 2 * FRAME_SIZE; // Sprite frame 2 (will be flipped)
      } else if (currentPose === 1) {
        frameLeftPx = 3 * FRAME_SIZE; // Sprite frame 3 (will be flipped)
      } else {
        frameLeftPx = 2 * FRAME_SIZE; // Default to first right-smile frame if pose is unexpected
      }
    }
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

  // Function to handle character encounters
  const handleEncounter = (otherCharacter) => {
    if (
      !conversationState?.isInConversation &&
      !otherCharacter.conversationState?.isInConversation &&
      !conversationCooldownRef.current.has(otherCharacter.id)
    ) {
      const message1 = generateMessage(characterData, true);
      const message2 = generateMessage(otherCharacter, false);
      
      startGlobalConversation(characterData.id, otherCharacter.id, message1, message2);
      
      // Show speech bubbles
      setSpeechBubble(message1);
      
      // Clear conversation after a delay
      conversationTimeoutRef.current = setTimeout(() => {
        endGlobalConversation(characterData.id, otherCharacter.id);
        setSpeechBubble('');
        
        // Add to cooldown
        conversationCooldownRef.current.add(otherCharacter.id);
        setTimeout(() => {
          conversationCooldownRef.current.delete(otherCharacter.id);
        }, 30000); // 30 second cooldown
      }, 5000);
    }
  };

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
        {/* Speech bubble */}
        {speechBubble && (
          <div
            style={{
              position: 'absolute',
              bottom: `calc(100% + ${verticalOffset}px - 80px)`, // Position above character, accounting for vertical offset
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'white',
              border: '3px solid black',
              borderRadius: '10px',
              padding: '8px 12px',
              fontFamily: 'Silkscreen, cursive',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              zIndex: 9999,
              boxShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)',
            }}
          >
            {speechBubble}
            {/* Speech bubble tail */}
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid black',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '-2px',
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid white',
              }}
            />
          </div>
        )}

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
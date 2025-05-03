import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGameState from '../store/useGameState';
import CharacterPreview from '../components/CharacterPreview';

const CreateCharacter = () => {
  const navigate = useNavigate();
  const updateCharacter = useGameState((state) => state.updateCharacter);
  const savedCharacter = useGameState((state) => state.character);
  
  const [character, setCharacter] = useState({
    name: savedCharacter?.name || '',
    emoji: savedCharacter?.emoji || '🐱',
    color: savedCharacter?.color || 'white',
    birthday: savedCharacter?.birthday || '',
    zodiac: savedCharacter?.zodiac || '',
    mbti: savedCharacter?.mbti || ''
  });

  // List of available emojis
  const emojis = ['🐱', '☕', '👓', '🏋️', '👻',  '🐶', '🦊', '🐸', '🐼', '🦄'];
  
  // List of zodiac signs
  const zodiacSigns = [
    { sign: 'Aries ♈', emoji: '♈' },
    { sign: 'Taurus ♉', emoji: '♉' },
    { sign: 'Gemini ♊', emoji: '♊' },
    { sign: 'Cancer ♋', emoji: '♋' },
    { sign: 'Leo ♌', emoji: '♌' },
    { sign: 'Virgo ♍', emoji: '♍' },
    { sign: 'Libra ♎', emoji: '♎' },
    { sign: 'Scorpio ♏', emoji: '♏' },
    { sign: 'Sagittarius ♐', emoji: '♐' },
    { sign: 'Capricorn ♑', emoji: '♑' },
    { sign: 'Aquarius ♒', emoji: '♒' },
    { sign: 'Pisces ♓', emoji: '♓' }
  ];

  // MBTI pairs for selection
  const mbtiPairs = [
    { 
      name: 'Social Energy',
      left: 'I',
      right: 'E',
      leftDesc: 'Being alone is peace',
      rightDesc: 'Social butterfly'
    },
    {
      name: 'Problem Solving',
      left: 'S',
      right: 'N',
      leftDesc: 'Focus on details & facts',
      rightDesc: 'Follow your gut feeling'
    },
    {
      name: 'Decision Making',
      left: 'T',
      right: 'F',
      leftDesc: 'Logic over emotions',
      rightDesc: 'Heart over head'
    },
    {
      name: 'Lifestyle',
      left: 'J',
      right: 'P',
      leftDesc: 'Plan everything ahead',
      rightDesc: 'Go with the flow'
    }
  ];

  // List of available colors with their display names
  const colors = [
    { id: 'white', name: 'White', bg: '#FFFFFF' },
    { id: 'orange', name: 'Orange', bg: '#FFA500' },
    { id: 'black', name: 'Black', bg: '#333333' },
    { id: 'gray', name: 'Gray', bg: '#808080' },
    { id: 'brown', name: 'Brown', bg: '#8B4513' },
    { id: 'blue', name: 'Blue', bg: '#4169E1' },
    { id: 'pink', name: 'Pink', bg: '#FFB6C1' },
    { id: 'green', name: 'Green', bg: '#3CB371' },
    { id: 'purple', name: 'Purple', bg: '#8A2BE2' }
  ];

  // Function to calculate zodiac sign from birthday
  const getZodiacSign = (date) => {
    const month = new Date(date).getMonth() + 1; // getMonth() returns 0-11
    const day = new Date(date).getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries ♈';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus ♉';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini ♊';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer ♋';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo ♌';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo ♍';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra ♎';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio ♏';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius ♐';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn ♑';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius ♒';
    return 'Pisces ♓';
  };

  const handleInputChange = (field, value) => {
    if (field === 'birthday') {
      const zodiacSign = getZodiacSign(value);
      const newCharacter = {
        ...character,
        birthday: value,
        zodiac: zodiacSign
      };
      setCharacter(newCharacter);
      updateCharacter(newCharacter);
    } else {
      const newCharacter = { ...character, [field]: value };
      setCharacter(newCharacter);
      updateCharacter(newCharacter);
    }
  };

  const handleMbtiSelect = (index, value) => {
    const currentMbti = character.mbti.split('') || ['', '', '', ''];
    currentMbti[index] = value;
    handleInputChange('mbti', currentMbti.join(''));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to MBTI selection instead of village
    navigate('/create-character/mbti');
  };

  // Background style with gradient
  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #87CEEB, #E0F7FA)',
    fontFamily: 'Silkscreen, cursive',
  };

  // Common input styles
  const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '3px solid black',
    borderRadius: '5px',
    fontFamily: 'Silkscreen, cursive',
    fontSize: '0.8rem',
    marginTop: '5px'
  };

  return (
    <div className="fullscreen" style={backgroundStyle}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: '2rem'
      }}>
        <div className="character-container" style={{ 
          position: 'relative',
          width: '100%',
          maxWidth: '600px',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '2rem',
          borderRadius: '10px',
          border: '4px solid black',
          boxShadow: '5px 5px 0 rgba(0, 0, 0, 0.5)'
        }}>
          <h1 style={{ 
            color: '#333', 
            textAlign: 'center', 
            marginBottom: '1.5rem',
            fontSize: '2rem',
            textShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)',
            letterSpacing: '0.1em'
          }}>
            Create Your Character
          </h1>
          
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#666',
            fontSize: '0.9rem',
            fontStyle: 'italic'
          }}>
            Design your unique character for the adventure
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Name input */}
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label htmlFor="name" style={{ fontSize: '0.9rem' }}>Name:</label>
              <input
                type="text"
                id="name"
                value={character.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                placeholder="Enter name"
                style={inputStyle}
              />
            </div>

            {/* Birthday input with zodiac display */}
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label htmlFor="birthday" style={{ fontSize: '0.9rem' }}>Birthday:</label>
              <button
                type="button"
                onClick={() => document.getElementById('birthday').showPicker()}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '3px solid black',
                  borderRadius: '5px',
                  background: 'white',
                  fontFamily: 'Silkscreen, cursive',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📅</span>
                  <span style={{ color: character.birthday ? 'black' : '#666' }}>
                    {character.birthday ? new Date(character.birthday).toLocaleDateString() : 'Select birthday'}
                  </span>
                </div>
                {character.zodiac && (
                  <div style={{
                    fontWeight: 'bold',
                    color: '#333',
                    fontSize: '0.9rem'
                  }}>
                    {character.zodiac}
                  </div>
                )}
              </button>
              <input
                type="date"
                id="birthday"
                value={character.birthday}
                onChange={(e) => handleInputChange('birthday', e.target.value)}
                required
                style={{ 
                  position: 'absolute',
                  opacity: 0,
                  width: 0,
                  height: 0
                }}
              />
            </div>

            {/* Emoji selection with preview */}
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.9rem' }}>Choose Your Character:</label>
              <div style={{ 
                display: 'flex',
                gap: '20px',
                marginTop: '10px'
              }}>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '10px',
                  flex: '1'
                }}>
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      style={{
                        fontSize: '2rem',
                        padding: '10px',
                        border: character.emoji === emoji ? '3px solid #FFD700' : '3px solid black',
                        borderRadius: '8px',
                        background: character.emoji === emoji ? '#FFFACD' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        transform: character.emoji === emoji ? 'scale(1.1)' : 'scale(1)'
                      }}
                      onClick={() => handleInputChange('emoji', emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                
                {/* Character preview box */}
                <CharacterPreview 
                  show={character.emoji === '🐱' || character.emoji === '☕' || character.emoji === '👓' || character.emoji === '🏋️'} 
                  color={character.color} 
                  emoji={character.emoji} 
                />
              </div>

              {/* Color selection section */}
              {(character.emoji === '🐱' || character.emoji === '☕' || character.emoji === '👓' || character.emoji === '🏋️') && (
                <div style={{ marginTop: '20px' }}>
                  <label style={{ fontSize: '0.9rem', display: 'block', marginBottom: '10px' }}>
                    {(() => {
                      switch(character.emoji) {
                        case '🐱': return 'Choose Cat Color:';
                        case '🏋️': return 'Choose Outfit Color:';
                        default: return 'Color Option:';
                      }
                    })()}
                  </label>
                  <div style={{ 
                    display: 'flex', 
                    gap: '10px',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                  }}>
                    {colors
                      .filter(colorOption => {
                        switch(character.emoji) {
                          case '🐱':
                            return true; // show all colors for cat
                          case '☕':
                          case '👓':
                            return colorOption.id === 'white'; // only white for coffee and ojisan
                          case '🏋️':
                            return ['white', 'brown'].includes(colorOption.id); // only white and brown for sport
                          default:
                            return false;
                        }
                      })
                      .map((colorOption) => (
                      <button
                        key={colorOption.id}
                        type="button"
                        onClick={() => handleInputChange('color', colorOption.id)}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: colorOption.bg,
                          border: character.color === colorOption.id ? '3px solid #FFD700' : '3px solid black',
                          cursor: 'pointer',
                          transform: character.color === colorOption.id ? 'scale(1.1)' : 'scale(1)',
                          transition: 'all 0.2s',
                          position: 'relative'
                        }}
                        title={colorOption.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Navigation buttons */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginTop: '2rem' 
            }}>
              <Link 
                to="/" 
                style={{
                  backgroundColor: '#f1f1f1',
                  color: 'black',
                  border: '3px solid black',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontFamily: 'Silkscreen, cursive',
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '3px 3px 0 #000',
                  transform: 'translateY(0)',
                  transition: 'transform 0.1s, box-shadow 0.1s',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translateY(3px)';
                  e.currentTarget.style.boxShadow = '0px 0px 0 #000';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '3px 3px 0 #000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '3px 3px 0 #000';
                }}
              >
                Back
              </Link>
              
              <button 
                type="submit"
                style={{
                  backgroundColor: '#FFD700',
                  color: 'black',
                  border: '3px solid black',
                  padding: '10px 25px',
                  borderRadius: '8px',
                  fontFamily: 'Silkscreen, cursive',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  boxShadow: '3px 3px 0 #000',
                  transform: 'translateY(0)',
                  transition: 'transform 0.1s, box-shadow 0.1s',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translateY(3px)';
                  e.currentTarget.style.boxShadow = '0px 0px 0 #000';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '3px 3px 0 #000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '3px 3px 0 #000';
                }}
              >
                Choose Mojifriend's Personality
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacter;
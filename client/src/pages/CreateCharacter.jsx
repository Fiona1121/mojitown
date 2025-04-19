import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGameState from '../store/useGameState';

const CreateCharacter = () => {
  const navigate = useNavigate();
  const updateCharacter = useGameState((state) => state.updateCharacter);
  
  const [character, setCharacter] = useState({
    name: '',
    emoji: '😀',
    trait: 'friendly',
  });

  // List of available emojis
  const emojis = ['😀', '😎', '🤠', '👻', '🐱', '🐶', '🦊', '🐸', '🐼', '🦄'];
  
  // List of character traits
  const traits = ['friendly', 'brave', 'clever', 'mysterious', 'energetic'];

  const handleNameChange = (e) => {
    setCharacter({ ...character, name: e.target.value });
  };

  const handleEmojiSelect = (emoji) => {
    setCharacter({ ...character, emoji });
  };

  const handleTraitSelect = (trait) => {
    setCharacter({ ...character, trait });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update the global state with character information
    updateCharacter(character);
    
    // Navigate to the village
    navigate('/village');
  };

  // Background style with gradient
  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #87CEEB, #E0F7FA)',
    fontFamily: 'Silkscreen, cursive',
  };

  return (
    <div className="fullscreen" style={backgroundStyle}>
      <div className="character-container">
        <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '1.5rem' }}>
          Create Your Character
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" style={{ fontSize: '0.9rem' }}>Name:</label>
            <input
              type="text"
              id="name"
              value={character.name}
              onChange={handleNameChange}
              required
              placeholder="Enter name"
              style={{
                width: '100%',
                padding: '8px',
                border: '3px solid black',
                borderRadius: '5px',
                fontFamily: 'Silkscreen, cursive',
                fontSize: '0.8rem',
                marginTop: '5px'
              }}
            />
          </div>
          
          <div className="form-group">
            <label style={{ fontSize: '0.9rem' }}>Choose an Emoji:</label>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(5, 1fr)', 
              gap: '10px',
              marginTop: '10px'
            }}>
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  style={{
                    fontSize: '2rem',
                    padding: '10px',
                    border: character.emoji === emoji 
                      ? '3px solid #FFD700' 
                      : '3px solid black',
                    borderRadius: '8px',
                    background: character.emoji === emoji 
                      ? '#FFFACD' 
                      : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    transform: character.emoji === emoji 
                      ? 'scale(1.1)' 
                      : 'scale(1)'
                  }}
                  onClick={() => handleEmojiSelect(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label style={{ fontSize: '0.9rem' }}>Select a Trait:</label>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '10px',
              marginTop: '10px'
            }}>
              {traits.map((trait, index) => (
                <button
                  key={index}
                  type="button"
                  style={{
                    padding: '8px 16px',
                    border: character.trait === trait 
                      ? '3px solid #FFD700' 
                      : '3px solid black',
                    borderRadius: '20px',
                    background: character.trait === trait 
                      ? '#FFFACD' 
                      : 'white',
                    fontFamily: 'Silkscreen, cursive',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => handleTraitSelect(trait)}
                >
                  {trait}
                </button>
              ))}
            </div>
          </div>
          
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
              Create & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCharacter;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useGameState from '../store/useGameState';

const CreateCharacterMBTI = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const addCharacter = useGameState((state) => state.addCharacter);

  // Local state for the character being built, initialized from location state
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    if (location.state?.characterData) {
      setCharacter(location.state.characterData);
    } else {
      // If no character data is passed, redirect to the first step
      navigate('/create');
    }
  }, [location.state, navigate]);

  // Redirect if no character info exists (or hasn't been set yet)
  // This useEffect can be simplified or adapted based on the above initialization
  useEffect(() => {
    // This check might be redundant if the above useEffect handles redirection robustly
    if (!character?.name || !character?.emoji) {
      // Consider if navigation is needed here or if initial state handling is sufficient
      // navigate('/create'); 
    }
  }, [character, navigate]);

  // MBTI pairs for selection
  const mbtiPairs = [
    { 
      name: 'Social Energy',
      left: 'I',
      right: 'E',
      leftDesc: '🧘 Being alone is peace',
      rightDesc: '🎉 Social butterfly'
    },
    {
      name: 'Problem Solving',
      left: 'S',
      right: 'N',
      leftDesc: '📋 Focus on details & facts',
      rightDesc: '💭 Follow your gut feeling'
    },
    {
      name: 'Decision Making',
      left: 'T',
      right: 'F',
      leftDesc: '🧮 Logic over emotions',
      rightDesc: '💝 Heart over head'
    },
    {
      name: 'Lifestyle',
      left: 'J',
      right: 'P',
      leftDesc: '📅 Plan everything ahead',
      rightDesc: '🌊 Go with the flow'
    }
  ];

  const handleMbtiSelect = (index, value) => {
    if (!character) return; // Guard clause
    const currentMbti = (character.mbti || '').split('');
    while (currentMbti.length < 4) currentMbti.push('');
    currentMbti[index] = value;
    const newCharacter = { ...character, mbti: currentMbti.join('') };
    setCharacter(newCharacter); // Update local state
    // updateCharacter(newCharacter); // We will call addCharacter on submit
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (character && character.mbti && character.mbti.length === 4) {
      addCharacter(character); // Add the complete character to the global state
      navigate('/village');
    }
  };

  const handleBack = () => {
    // Pass the current character data back to the create page if user goes back
    navigate('/create', { state: { characterData: character } });
  };

  // Background style with gradient
  const backgroundStyle = {
    background: 'linear-gradient(to bottom, #87CEEB, #E0F7FA)',
    fontFamily: 'Silkscreen, cursive',
  };

  // Conditional rendering for the form until character data is loaded
  if (!character) {
    return <div>Loading character data...</div>; // Or some other loading indicator
  }

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
            What's Your Mojifriend Like?
          </h1>
          
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#666',
            fontSize: '0.9rem',
            fontStyle: 'italic'
          }}>
            Choose your Mojifriend's personality traits
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginTop: '10px' }}>
              {mbtiPairs.map((pair, index) => (
                <div key={pair.name} style={{ 
                  marginBottom: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px'
                }}>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: '#666',
                    marginBottom: '5px'
                  }}>
                    Your Mojifriend's {pair.name}:
                    {character.mbti?.[index] && (
                      <span style={{
                        marginLeft: '8px',
                        color: '#333',
                        fontWeight: 'bold'
                      }}>
                        {character.mbti[index]} ({character.mbti[index] === pair.left ? 
                          pair.left === 'I' ? 'Introvert' :
                          pair.left === 'S' ? 'Sensing' :
                          pair.left === 'T' ? 'Thinking' :
                          'Judging'
                          : 
                          pair.right === 'E' ? 'Extrovert' :
                          pair.right === 'N' ? 'Intuitive' :
                          pair.right === 'F' ? 'Feeling' :
                          'Perceiving'
                        })
                      </span>
                    )}
                  </div>
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    gap: '10px',
                    alignItems: 'center',
                    width: '100%'
                  }}>
                    <button
                      type="button"
                      onClick={() => handleMbtiSelect(index, pair.left)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '3px solid black',
                        borderRadius: '5px',
                        background: 'white',
                        fontFamily: 'Silkscreen, cursive',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        minHeight: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        ...(character.mbti?.[index] === pair.left && {
                          border: '3px solid #FFD700',
                          background: '#FFFACD'
                        })
                      }}
                    >
                      {pair.leftDesc}
                    </button>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: '#666',
                      padding: '0 10px',
                      fontWeight: 'bold'
                    }}>or</div>
                    <button
                      type="button"
                      onClick={() => handleMbtiSelect(index, pair.right)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '3px solid black',
                        borderRadius: '5px',
                        background: 'white',
                        fontFamily: 'Silkscreen, cursive',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        minHeight: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        ...(character.mbti?.[index] === pair.right && {
                          border: '3px solid #FFD700',
                          background: '#FFFACD'
                        })
                      }}
                    >
                      {pair.rightDesc}
                    </button>
                  </div>
                </div>
              ))}
              {character.mbti && character.mbti.length === 4 && (
                <div style={{ 
                  textAlign: 'center', 
                  marginTop: '10px',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  color: '#333'
                }}>
                  Your Mojifriend's Type: {character.mbti}
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginTop: '2rem' 
            }}>
              <button
                type="button"
                onClick={handleBack}
                style={{
                  backgroundColor: '#f1f1f1',
                  color: 'black',
                  border: '3px solid black',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontFamily: 'Silkscreen, cursive',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  boxShadow: '3px 3px 0 #000',
                }}
              >
                Back
              </button>
              
              <button 
                type="submit"
                disabled={!character.mbti || character.mbti.length !== 4}
                style={{
                  backgroundColor: '#FFD700',
                  color: 'black',
                  border: '3px solid black',
                  padding: '10px 25px',
                  borderRadius: '8px',
                  fontFamily: 'Silkscreen, cursive',
                  fontSize: '0.8rem',
                  cursor: character.mbti?.length === 4 ? 'pointer' : 'not-allowed',
                  opacity: character.mbti?.length === 4 ? 1 : 0.5,
                  boxShadow: '3px 3px 0 #000',
                }}
              >
                Meet Your Mojifriend
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacterMBTI; 
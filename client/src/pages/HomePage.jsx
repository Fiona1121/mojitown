import React from 'react';
import { Link } from 'react-router-dom';
import backgroundGif from '../assets/HomePage/HomeBG.gif';
import useGameState from '../store/useGameState';

const HomePage = () => {
  const character = useGameState((state) => state.character);
  const resetGame = useGameState((state) => state.resetGame);
  const hasExistingCharacter = character.name && character.emoji;

  return (
    <div className="fullscreen" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${backgroundGif})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center'
      }}>
        <h1 
          className="title"
          style={{
            textAlign: 'center',
            fontSize: 135,
            color: 'white',
            fontWeight: '500',
            textShadow: '4px 4px 0 #000, -4px -4px 0 #000, 4px -4px 0 #000, 10px 10px 0 #000, -4px 4px 0 #000',
            fontFamily: 'Silkscreen'
          }}
        >
          MOJITOWN
        </h1>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '32px'
        }}>
          {hasExistingCharacter ? (
            <>
              <Link 
                to="/village" 
                style={{
                  backgroundColor: '#FFD700',
                  color: 'black',
                  border: '2px solid black',
                  padding: '2px 44px',
                  borderRadius: '5px',
                  fontFamily: 'Silkscreen',
                  textShadow: '2px 1px 0 #E8B500',
                  fontSize: '28px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  boxShadow: '4px 4px 0 #000',
                  transform: 'translateY(0)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '4px 4px 0 #000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '4px 4px 0 #000';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translateY(4px) scale(0.95)';
                  e.currentTarget.style.boxShadow = '0px 0px 0 #000';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '4px 4px 0 #000';
                }}
              >
                Continue
              </Link>
              <button
                onClick={() => {
                  resetGame();
                  window.location.href = '/create';
                }}
                style={{
                  backgroundColor: '#f1f1f1',
                  color: 'black',
                  border: '2px solid black',
                  padding: '2px 44px',
                  borderRadius: '5px',
                  fontFamily: 'Silkscreen',
                  fontSize: '28px',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  boxShadow: '4px 4px 0 #000',
                  transform: 'translateY(0)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '4px 4px 0 #000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '4px 4px 0 #000';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translateY(4px) scale(0.95)';
                  e.currentTarget.style.boxShadow = '0px 0px 0 #000';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '4px 4px 0 #000';
                }}
              >
                New Game
              </button>
            </>
          ) : (
            <Link 
              to="/create" 
              style={{
                backgroundColor: '#FFD700',
                color: 'black',
                border: '2px solid black',
                padding: '2px 44px',
                borderRadius: '5px',
                fontFamily: 'Silkscreen',
                textShadow: '2px 1px 0 #E8B500',
                fontSize: '28px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                display: 'inline-block',
                boxShadow: '4px 4px 0 #000',
                transform: 'translateY(0)',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '4px 4px 0 #000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '4px 4px 0 #000';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(4px) scale(0.95)';
                e.currentTarget.style.boxShadow = '0px 0px 0 #000';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '4px 4px 0 #000';
              }}
            >
              Start
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundGif from '../assets/HomePage/HomeBG.gif';

const HomePage = () => {
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
            fontSize: 110,
            color: 'white',
            fontWeight: '500',
            textShadow: '3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, 10px 10px 0 #000, -3px 6px 0 #000',
            fontFamily: 'Silkscreen'
          }}
        >
          MOJITOWN
        </h1>
        
        <Link 
          to="/create" 
          style={{
            backgroundColor: '#FFD700',
            color: 'black',
            border: '2px solid black',
            padding: '4px 32px',
            borderRadius: '5px',
            fontFamily: 'Silkscreen',
            textShadow: '2px 1px 0 #E8B500',
            fontSize: '20px',
            textDecoration: 'none',
            textTransform: 'uppercase',
            display: 'inline-block',
            boxShadow: '4px 4px 0 #000',
            transform: 'translateY(0)',
            transition: 'all 0.2s ease',
            marginTop: '30px',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFD700';
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '4px 4px 0 #000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFD700';
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
            e.currentTarget.style.backgroundColor = '#FFD700';
            e.currentTarget.style.textShadow = '2px 1px 0 #E8B500';
          }}
          className="start-button"
        >
          Start
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
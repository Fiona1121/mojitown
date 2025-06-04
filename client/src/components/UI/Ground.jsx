import React from 'react';

const Ground = () => {
  return (
    <div className="absolute bottom-0 w-full">
      {/* Simple flat green grass layer */}
      <div 
        className="w-full"
        style={{
          height: '80px',
          background: '#3CB371', // A nice grass green
        }}
      />
    </div>
  );
};

export default Ground;
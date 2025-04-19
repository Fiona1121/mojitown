import React from 'react';

const Ground = () => {
  // Create small grass patches to place randomly
  const grassPatches = Array(20).fill().map((_, i) => ({
    left: `${Math.random() * 90 + 5}%`,
    bottom: `${Math.random() * 30 + 60}px`,
    width: `${Math.random() * 10 + 10}px`,
    height: `${Math.random() * 5 + 5}px`,
  }));

  return (
    <div className="absolute bottom-0 w-full">
      {/* Top light green grass layer with pixel pattern */}
      <div 
        className="w-full h-40 bg-green-400 relative"
        style={{
          backgroundImage: `
            linear-gradient(to right, 
              rgba(255,255,255,0.1) 1px, 
              transparent 1px
            ),
            linear-gradient(to bottom, 
              rgba(255,255,255,0.1) 1px, 
              transparent 1px
            )
          `,
          backgroundSize: '8px 8px'
        }}
      >
        {/* Small white grass highlights */}
        {grassPatches.map((patch, index) => (
          <div 
            key={index}
            className="absolute bg-white opacity-30"
            style={{
              left: patch.left,
              bottom: patch.bottom,
              width: patch.width,
              height: patch.height,
            }}
          />
        ))}
      </div>
      
      {/* Middle darker green layer */}
      <div className="w-full h-16 bg-green-600 -mt-5"></div>
      
      {/* Bottom darkest green layer */}
      <div className="w-full h-16 bg-green-800 -mt-2"></div>
    </div>
  );
};

export default Ground;
import React from 'react';

const Tree = ({ positionX, positionY, size = 'md', type = 'normal' }) => {
  // Size configurations
  const sizes = {
    sm: { width: '40px', height: '60px' },
    md: { width: '60px', height: '90px' },
    lg: { width: '80px', height: '120px' },
  };

  // Tree types (could be different tree designs)
  const treeTypes = {
    normal: {
      trunkColor: '#8B4513',
      leavesColor: '#228B22',
    },
    autumn: {
      trunkColor: '#8B4513',
      leavesColor: '#FF8C00',
    },
    cherry: {
      trunkColor: '#A0522D',
      leavesColor: '#FFB7C5',
    },
  };

  // Get the selected tree settings
  const sizeConfig = sizes[size];
  const treeConfig = treeTypes[type];

  return (
    <div
      style={{
        position: 'absolute',
        left: `${positionX}%`,
        top: `${positionY}%`,
        width: sizeConfig.width,
        height: sizeConfig.height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        imageRendering: 'pixelated',
      }}
    >
      {/* Tree leaves (top) */}
      <div
        style={{
          width: '100%',
          height: '70%',
          backgroundColor: treeConfig.leavesColor,
          borderRadius: '50% 50% 20% 20%',
          boxShadow: `0 0 5px ${treeConfig.leavesColor}`,
          zIndex: 1,
        }}
      />
      
      {/* Tree trunk (bottom) */}
      <div
        style={{
          width: '30%',
          height: '40%',
          backgroundColor: treeConfig.trunkColor,
          marginTop: '-10%',
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default Tree;
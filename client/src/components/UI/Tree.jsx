import React from 'react';

const Tree = ({ size = 'md', left, bottom }) => {
  // Define different tree sizes
  const sizes = {
    sm: { 
      treeWidth: 'w-10',
      treeHeight: 'h-12',
      trunkWidth: 'w-4',
      trunkHeight: 'h-5',
    },
    md: { 
      treeWidth: 'w-14',
      treeHeight: 'h-16',
      trunkWidth: 'w-6',
      trunkHeight: 'h-6',
    },
    lg: { 
      treeWidth: 'w-16',
      treeHeight: 'h-20',
      trunkWidth: 'w-8',
      trunkHeight: 'h-8',
    },
  };

  const { treeWidth, treeHeight, trunkWidth, trunkHeight } = sizes[size];
  
  return (
    <div 
      className="absolute" 
      style={{ 
        left: typeof left === 'string' ? left : `${left}%`,
        bottom: typeof bottom === 'string' ? bottom : `${bottom}px`,
      }}
    >
      <div className="relative">
        {/* Tree top - dark green oval */}
        <div 
          className={`${treeWidth} ${treeHeight} bg-green-800 rounded-full border-2 border-black absolute bottom-2`}
          style={{ 
            boxShadow: '2px 2px 0 rgba(0,0,0,0.3)',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {/* Light spots on tree */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        
        {/* Tree trunk - brown rectangle */}
        <div 
          className={`${trunkWidth} ${trunkHeight} bg-yellow-900 border-2 border-black absolute bottom-0`}
          style={{ 
            boxShadow: '2px 2px 0 rgba(0,0,0,0.3)',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Tree;
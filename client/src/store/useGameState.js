import { create } from 'zustand';

// Create a store with Zustand
const useGameState = create((set) => ({
  // State
  mojis: [],
  selectedMoji: null,
  
  // Actions
  addMoji: (moji) => set((state) => ({ 
    mojis: [...state.mojis, { 
      id: Date.now().toString(),
      position: { x: Math.random() * 800, y: Math.random() * 400 },
      ...moji 
    }] 
  })),
  
  selectMoji: (id) => set((state) => ({
    selectedMoji: state.mojis.find(moji => moji.id === id) || null
  })),
  
  updateMojiPosition: (id, position) => set((state) => ({
    mojis: state.mojis.map(moji => 
      moji.id === id ? { ...moji, position } : moji
    )
  })),
}));

export default useGameState;
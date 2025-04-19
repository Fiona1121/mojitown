import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Create a store with Zustand that persists to localStorage
const useGameState = create(
  persist(
    (set, get) => ({
      // Character data
      character: {
        name: '',
        emoji: '😀',
        trait: 'friendly',
      },
      
      // Game progress
      progress: {
        hasCreatedCharacter: false,
        unlockedLocations: ['Town Square'], // Start with only town square unlocked
        completedQuests: [],
        villagersFriendship: {}, // To track relationship with villagers
      },
      
      // Inventory items
      inventory: [],
      
      // Currency
      coins: 0,
      
      // Update character
      updateCharacter: (characterData) => 
        set((state) => ({ 
          character: { ...state.character, ...characterData },
          progress: { 
            ...state.progress, 
            hasCreatedCharacter: true 
          }
        })),
      
      // Update progress
      unlockLocation: (location) =>
        set((state) => {
          if (state.progress.unlockedLocations.includes(location)) return state;
          return {
            progress: {
              ...state.progress,
              unlockedLocations: [...state.progress.unlockedLocations, location]
            }
          };
        }),
        
      // Add a completed quest
      completeQuest: (questId) =>
        set((state) => {
          if (state.progress.completedQuests.includes(questId)) return state;
          return {
            progress: {
              ...state.progress,
              completedQuests: [...state.progress.completedQuests, questId]
            }
          };
        }),
        
      // Update friendship with a villager
      updateFriendship: (villagerId, amount) =>
        set((state) => {
          const currentAmount = state.progress.villagersFriendship[villagerId] || 0;
          return {
            progress: {
              ...state.progress,
              villagersFriendship: {
                ...state.progress.villagersFriendship,
                [villagerId]: Math.min(100, Math.max(0, currentAmount + amount))
              }
            }
          };
        }),
        
      // Add item to inventory
      addItem: (item) =>
        set((state) => ({
          inventory: [...state.inventory, item]
        })),
        
      // Remove item from inventory
      removeItem: (itemId) =>
        set((state) => ({
          inventory: state.inventory.filter(item => item.id !== itemId)
        })),
        
      // Update coins
      updateCoins: (amount) =>
        set((state) => ({
          coins: Math.max(0, state.coins + amount)
        })),
        
      // Reset game state (for testing or new game)
      resetGame: () => set({
        character: {
          name: '',
          emoji: '😀',
          trait: 'friendly',
        },
        progress: {
          hasCreatedCharacter: false,
          unlockedLocations: ['Town Square'],
          completedQuests: [],
          villagersFriendship: {},
        },
        inventory: [],
        coins: 0,
      }),
    }),
    {
      name: 'mojitown-storage', // localStorage key
    }
  )
);

export default useGameState;
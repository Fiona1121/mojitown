import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Create a store with Zustand that persists to localStorage
const useGameState = create(
  persist(
    (set, get) => ({
      // Character data
      characters: [],
      
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
      
      // Add character to the list
      addCharacter: (characterData) => 
        set((state) => ({ 
          characters: [
            ...state.characters, 
            { 
              ...characterData, 
              id: characterData.id || `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Ensure ID and add flag
              isNewlyAdded: true 
            }
          ],
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
        characters: [],
        progress: {
          hasCreatedCharacter: false,
          unlockedLocations: ['Town Square'],
          completedQuests: [],
          villagersFriendship: {},
        },
        inventory: [],
        coins: 0,
      }),

      // New action to mark character as seen (animation played)
      markCharacterAnimationPlayed: (characterId) =>
        set((state) => ({
          characters: state.characters.map(char =>
            char.id === characterId 
              ? { ...char, isNewlyAdded: false } 
              : char
          ),
        })),

      // Update character position for encounter detection
      updateCharacterPosition: (characterId, position) =>
        set((state) => ({
          characters: state.characters.map(char =>
            char.id === characterId 
              ? { ...char, currentPosition: position } 
              : char
          ),
        })),

      // Start a conversation between two characters
      startConversation: (character1Id, character2Id) =>
        set((state) => ({
          characters: state.characters.map(char => {
            if (char.id === character1Id) {
              return { ...char, conversationState: { isInConversation: true, partnerId: character2Id, role: 'initiator' } };
            } else if (char.id === character2Id) {
              return { ...char, conversationState: { isInConversation: true, partnerId: character1Id, role: 'responder' } };
            }
            return char;
          }),
        })),

      // End conversation for both characters
      endConversation: (character1Id, character2Id) =>
        set((state) => ({
          characters: state.characters.map(char => {
            if (char.id === character1Id || char.id === character2Id) {
              return { ...char, conversationState: null };
            }
            return char;
          }),
        })),
    }),
    {
      name: 'mojitown-storage', // localStorage key
    }
  )
);

export default useGameState;
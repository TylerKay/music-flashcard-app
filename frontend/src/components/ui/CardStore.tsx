import { create } from 'zustand';

interface CardStoreState {
    currCardIndex: number;
    setCurrCardIndex: (newCurrCardIndex: number) => void;
    incrementCurrCardIndex: () => void;

    cardArray: string[];
    setCardArray: (newCardArray: string[]) => void;

    answer: string; // Type for answer state
    setAnswer: (newAnswer: string) => void; // Type for the setAnswer function
}

export const useCardStore = create<CardStoreState>((set) => ({
    currCardIndex: 0,
    setCurrCardIndex: (newCurrCardIndex: number) => set({ currCardIndex: newCurrCardIndex }),
    incrementCurrCardIndex: () => set((state) => {
        const nextIndex = state.currCardIndex + 1;
        return {
            currCardIndex: nextIndex < state.cardArray.length ? nextIndex : nextIndex - 1 // Loop back to 0
        };
    }),

    cardArray: [],
    setCardArray: (newCardArray: string[]) => set({ cardArray: newCardArray }),


    answer: "", // Initial state
    setAnswer: (newAnswer: string) => set({ answer: newAnswer }), // Action to set a new answer
}));

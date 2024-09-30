import { create } from 'zustand';

interface CardStoreState {
    currCardIndex: number;
    setCurrCardIndex: (newCurrCardIndex: number) => void;
    incrementCurrCardIndex: () => void;

    cardArray: string[];
    setCardArray: (newCardArray: string[]) => void;

    answer: string; // Type for answer state
    setAnswer: (newAnswer: string) => void; // Type for the setAnswer function

    incorrect_attempts: number;
    setIncorrectAttempts: (newIncorrectAttempts: number) => void;
    resetIncorrectAttempts: () => void;
    incrementIncorrectAttempts: () => void;

    attemptId: number;
    setAttemptId: (newAttemptId: number) => void;
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

    incorrect_attempts: 0,
    setIncorrectAttempts: (newIncorrectAttempts: number) => set({ incorrect_attempts: newIncorrectAttempts }),
    resetIncorrectAttempts: () => set({ incorrect_attempts: 0 }),
    incrementIncorrectAttempts: () => set((state) => ({ incorrect_attempts: state.incorrect_attempts + 1 })),

    attemptId: -1,
    setAttemptId: (newAttemptId: number) => set({ attemptId: newAttemptId })
}));

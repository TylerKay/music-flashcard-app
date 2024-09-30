import { create } from 'zustand';

interface usePageState {
    pageState: number;
    setPageState: (newPageState: number) => void;
    incrementPageState: () => void;

}

export const usePageStore = create<usePageState>((set) => ({
    pageState: 0,
    setPageState: (newPageState: number) => set({ pageState: newPageState }),
    incrementPageState: () => set((state) => ({ pageState: state.pageState + 1 })),
}));

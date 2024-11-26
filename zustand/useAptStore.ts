import { APTInfo } from '@/types/AptType';
import { create } from 'zustand';

interface SigState {
  apts: APTInfo[];
  reset: () => void;
  setApts: (arr: APTInfo[]) => void;
}

export const useAptStore = create<SigState>((set) => ({
  apts: [],
  reset: () => set({ apts: [] }),
  setApts: (arr) => set({ apts: arr }),
}));

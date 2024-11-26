import { create } from 'zustand';

interface KeywordState {
  keyword: string;
  keywordOpen: boolean;
  setKeyword: (newKeyword: string) => void;
  closeKeyword: () => void;
  openKeyword: () => void;
}

export const useKeywordStore = create<KeywordState>((set) => ({
  keyword: '',
  keywordOpen: false,
  setKeyword: (keyword) => set({ keyword }),
  closeKeyword: () => set({ keywordOpen: false }),
  openKeyword: () => set({ keywordOpen: true }),
}));

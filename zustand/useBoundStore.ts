import { Bound } from '@/types/MapType';
import { create } from 'zustand';

interface BoundState {
  bound: Bound | null;
  setBound: (bound: Bound | null) => void;
}

export const useBoundStore = create<BoundState>((set) => ({
  bound: null,
  setBound: (bound) => set({ bound }),
}));

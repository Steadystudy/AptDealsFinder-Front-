import { Area } from '@/types/MapType';
import { create } from 'zustand';

interface AreasState {
  areas: Area[] | null;
  setAreas: (areas: Area[]) => void;
}

export const useAreasStore = create<AreasState>((set) => ({
  areas: null,
  setAreas: (areas) => set({ areas }),
}));

import { INITIAL_CENTER } from '@/constants/map.constants';
import { ClickArea, Coordinates } from '@/types/MapType';
import { create } from 'zustand';

interface ClickedAreaState {
  clickedArea: ClickArea | null;
  center: Coordinates;
  setClickedArea: (area: ClickArea) => void;
  setCenter: (center: Coordinates) => void;
}

export const useClickedAreaStore = create<ClickedAreaState>((set) => ({
  clickedArea: null,
  center: INITIAL_CENTER,
  setClickedArea: (area) => set({ clickedArea: area }),
  setCenter: (center) => set({ center }),
}));

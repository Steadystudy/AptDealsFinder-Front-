import { create } from 'zustand';

interface MapState {
  map: kakao.maps.Map | null;
  isDistanceClick: boolean;
  setMap: (map: any) => void;
  setIsDistanceClick: (click: boolean) => void;
}

export const useMapStore = create<MapState>((set) => ({
  map: null,
  isDistanceClick: false,
  setMap: (map) => set({ map }),
  setIsDistanceClick: (click: boolean) => set({ isDistanceClick: click }),
}));

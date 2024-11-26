import { Marker } from '@/types/MarkerType';
import { create } from 'zustand';

interface MarkersState {
  markers: Marker[];
  setMarkers: (newMarkers: Marker[]) => void;
}

export const useMarkersStore = create<MarkersState>((set) => ({
  markers: [],
  setMarkers: (newMarkers) => set({ markers: newMarkers }),
}));

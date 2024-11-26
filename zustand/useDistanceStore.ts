import { Coordinates } from '@/types/MapType';
import { create } from 'zustand';

const INITIAL_MOUSE = { lat: 34.55280146659, lng: 127.741219253 };
interface DistanceState {
  isDrawing: boolean;
  distances: number[];
  paths: Coordinates[];

  setIsDrawing: (drawing: boolean) => void;
  setDistances: (newDistances: number[]) => void;
  setPaths: (paths: Coordinates[]) => void;

  initLine: () => void;
}

interface MouseState {
  mousePosition: Coordinates;
  moveLine: kakao.maps.Polyline | null;
  clickLine: kakao.maps.Polyline | null;
  setMousePosition: (position: Coordinates) => void;
  setClickLine: (clickLine: kakao.maps.Polyline) => void;
  setMoveLine: (moveLine: kakao.maps.Polyline) => void;
}

export const useDistanceStore = create<DistanceState>((set) => ({
  distances: [],
  paths: [],
  isDrawing: false,
  setDistances: (distances) => set({ distances }),
  setPaths: (paths) => set({ paths }),
  setIsDrawing: (isDrawing) => set({ isDrawing }),
  initLine: () => set({ isDrawing: false, distances: [], paths: [] }),
}));

export const useMouseStore = create<MouseState>((set) => ({
  mousePosition: INITIAL_MOUSE,
  moveLine: null,
  clickLine: null,
  setMousePosition: (mousePosition) => set({ mousePosition }),
  setClickLine: (clickLine) => set({ clickLine }),
  setMoveLine: (moveLine) => set({ moveLine }),
}));

import { APTInfo } from '@/types/AptType';
import { create } from 'zustand';

interface SidebarState {
  aptDetail: APTInfo | null;
  isAptSidebarOpen: boolean;
  setApt: (aptDetail: APTInfo) => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const useAptSidebarStore = create<SidebarState>((set) => ({
  aptDetail: null,
  isAptSidebarOpen: false,
  setApt: (aptDetail) => set({ aptDetail }),
  closeSidebar: () => set({ isAptSidebarOpen: false }),
  openSidebar: () => set({ isAptSidebarOpen: true }),
}));

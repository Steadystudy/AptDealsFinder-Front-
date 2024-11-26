import { create } from 'zustand';

type Version = 'login' | 'signup';

interface ModalState {
  isOpen: boolean;
  version: Version;
  openModal: () => void;
  closeModal: () => void;
  setVersion: (ver: Version) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  version: 'login',
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setVersion: (val: Version) => set({ version: val }),
}));

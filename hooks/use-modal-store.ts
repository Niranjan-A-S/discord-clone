import { IModalStore } from '@/types';
import { create } from 'zustand';

export const useModalStore = create<IModalStore>((set) => ({
    isOpen: false,
    onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
    onClose: () => set({ isOpen: false, type: null }),
    type: null,
    data: {}
}));

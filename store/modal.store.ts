import { create } from "zustand";

interface ModalStoreState {
  createHabit: boolean;
  setState: (modal: "createHabit", state: boolean) => void;
}

export const useModalStore = create<ModalStoreState>()((set, get) => ({
  createHabit: false,
  setState(modal, state) {
    set({
      [modal]: state,
    });
  },
}));

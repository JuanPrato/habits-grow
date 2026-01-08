import { create } from "zustand";

interface ModalStoreState {
  createHabit: boolean;
  levelUp: boolean;
  setState: (modal: "createHabit" | "levelUp", state: boolean) => void;
}

export const useModalStore = create<ModalStoreState>()((set, get) => ({
  createHabit: false,
  levelUp: false,
  setState(modal, state) {
    set({
      [modal]: state,
    });
  },
}));

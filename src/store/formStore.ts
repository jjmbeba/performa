import { create } from "zustand";

export interface FormState {
  step:number;
  onHandleNext: () => void;
  onHandleBack: () => void;
}

export const useFormStore = create<FormState>()((set) => ({
  step: 1,
  onHandleNext: () =>
    set((state) => ({
      step: state.step + 1,
    })),
  onHandleBack: () =>
    set((state) => ({
      step: state.step - 1,
    })),
}));

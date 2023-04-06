import { create } from "zustand";

type StepState = {
  currentStep: number;
  nextStep: () => void;
};

export const useStepStore = create<StepState>((set) => ({
  currentStep: 0,
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
}));

import { create } from "zustand";

export const useStages = create((set) => ({
  stages: {} as any[],
  stage: {} as any,
  setStages: (stages: any[]) => set({ stages }),
  setStage: (stage: any) => set({ stage }),
}));

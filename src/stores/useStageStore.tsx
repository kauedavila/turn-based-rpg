import { create } from "zustand";

export const useStagesStore = create((set) => ({
  stages: {} as any[],
  stage: {} as any,
  setStages: (stages: any[]) => set({ stages }),
  setStage: (stage: any) => set({ stage }),
}));

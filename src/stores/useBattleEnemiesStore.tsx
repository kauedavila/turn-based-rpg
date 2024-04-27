import { create } from "zustand";
import { EnemyData } from "@/types";

export const useBattleEnemiesStore = create((set) => ({
  battleEnemies: [] as EnemyData[],
  setBattleEnemies: (battleEnemies: EnemyData[]) => set({ battleEnemies }),
}));

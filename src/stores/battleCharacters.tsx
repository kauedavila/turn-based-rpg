import { create } from "zustand";
import { CharacterData } from "@/types";

export const useBattleCharacters = create((set) => ({
  battleCharacters: [] as CharacterData[],
  setBattleCharacters: (battleCharacters: CharacterData[]) => set({ battleCharacters }),
}));

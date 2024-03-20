import { create } from "zustand";
import { CharacterData } from "@/types";

export const useBattleCharactersStore = create((set) => ({
  battleCharacters: [] as CharacterData[],
  setBattleCharacters: (battleCharacters: CharacterData[]) => set({ battleCharacters }),
}));

import { create } from "zustand";
import templateCharacters from "@/templates/characters";
import templateEnemies from "@/templates/enemies";
import { CharacterData } from "@/types";

export const useBattleCharacters = create((set) => ({
  battleCharacters: {} as CharacterData[],
  setBattleCharacters: (battleCharacters: CharacterData[]) =>
    set({ battleCharacters }),
}));

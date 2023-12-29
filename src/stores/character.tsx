import { create } from "zustand";
import templateCharacters from "@/templates/characters";
import templateEnemies from "@/templates/enemies";
import { CharacterData } from "@/types";

export const useCharacter = create((set) => ({
  character: {} as CharacterData,
  setCharacter: (character: CharacterData) => set({ character }),
}));

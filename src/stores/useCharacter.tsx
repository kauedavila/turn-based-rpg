import { create } from "zustand";
import { CharacterData } from "@/types";

export const useCharacters = create((set) => ({
  characters: {} as CharacterData[],
  setCharacters: (characters: CharacterData[]) => set({ characters }),
}));

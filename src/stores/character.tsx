import { create } from "zustand";
import { CharacterData } from "@/types";

export const useCharacter = create((set) => ({
  character: {} as CharacterData,
  setCharacter: (character: CharacterData) => set({ character }),
}));

import { SpriteDataType } from "@/types";
import { create } from "zustand";

export const useSprites = create((set) => ({
  sprites: {} as SpriteDataType[],
  setSprites: (sprites: SpriteDataType[]) => set({ sprites }),
}));

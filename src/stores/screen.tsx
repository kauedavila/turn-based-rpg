import { create } from "zustand";
import { ScreenList } from "@/types";

export const useScreen = create((set) => ({
  screen: "" as ScreenList,
  setScreen: (screen: ScreenList) => set({ screen }),
}));

import { create } from "zustand";
import { ScreenList } from "@/types";

export const useScreenStore = create((set) => ({
  screen: "login" as ScreenList,
  setScreen: (screen: ScreenList) => set({ screen }),
}));

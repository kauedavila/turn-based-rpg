import { create } from "zustand";
import { PartyDataType } from "@/types";

export const useParty = create((set) => ({
  party: [] as PartyDataType,
  setParty: (party: PartyDataType) => set({ party }),
}));

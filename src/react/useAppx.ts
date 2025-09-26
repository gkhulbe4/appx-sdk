import { useContext } from "react";
import { AppxContext } from "./AppxProvider.js";
import type { AppxContextType } from "../types/types.js";

export function useAppx(): AppxContextType {
  const context = useContext(AppxContext);
  if (!context) {
    throw new Error("useAppx must be used within <AppxProvider>");
  }
  return context;
}

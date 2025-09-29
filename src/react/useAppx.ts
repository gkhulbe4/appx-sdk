import { useContext } from "react";
import { AppxContext } from "./AppxProvider.js";
import type { AppxContextType } from "../types/appxTypes.js";

export function useAppx(): AppxContextType {
  const context = useContext(AppxContext);
  if (!context) {
    throw new Error();
  }
  return context;
}

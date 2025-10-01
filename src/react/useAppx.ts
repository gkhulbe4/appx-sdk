import { useContext } from "react";
import { AppxContext } from "./AppxProvider";
import type { AppxContextType } from "../types/appxTypes";

export function useAppx(): AppxContextType {
  const context = useContext(AppxContext);
  if (!context) {
    throw new Error();
  }
  return context;
}

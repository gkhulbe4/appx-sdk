import React, { createContext, useState } from "react";
import type { ReactNode } from "react";
import { AppxSdk } from "../node/index";
import type { AppxContextType, CurrentUser } from "../types/appxTypes";

const AppxContext = createContext<AppxContextType | null>(null);

export const AppxProvider: React.FC<{
  baseUrl: string;
  children: ReactNode;
}> = ({ baseUrl, children }) => {
  const sdk = new AppxSdk({
    baseUrl,
    getToken: () => {
      const currentUserDetails = localStorage.getItem("current_user");
      if (!currentUserDetails) return null;
      return JSON.parse(currentUserDetails).token;
    },
  });

  const [user, setUser] = useState<CurrentUser | null>(null);

  return (
    <AppxContext.Provider value={{ sdk, user, setUser }}>
      {children}
    </AppxContext.Provider>
  );
};

export { AppxContext };

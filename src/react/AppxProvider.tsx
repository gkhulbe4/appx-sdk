import React, { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AppxSdk } from "../node/index";
import type { AppxContextType, CurrentUser } from "../types/appxTypes";

const AppxContext = createContext<AppxContextType | null>(null);

export const AppxProvider: React.FC<{
  baseUrl: string;
  children: ReactNode;
}> = ({ baseUrl, children }) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const sdk = new AppxSdk({
    baseUrl,
    getToken: () => {
      const currentUserDetails = localStorage.getItem("current_user");
      if (!currentUserDetails) return null;
      return JSON.parse(currentUserDetails).token;
    },
  });

  useEffect(() => {
    let deviceId = localStorage.getItem("browserDeviceId");

    if (!deviceId) {
      const randomPart = Math.random().toString(36).substring(2, 10);
      deviceId = `WebBrowser${Date.now()}${randomPart}`;
      localStorage.setItem("browserDeviceId", deviceId);
    }

    document.cookie = `baseUrl=${encodeURIComponent(
      baseUrl
    )}; path=/; expires=${60 * 60 * 24 * 7}`;
  }, []);

  return (
    <AppxContext.Provider value={{ sdk, user, setUser }}>
      {children}
    </AppxContext.Provider>
  );
};

export { AppxContext };

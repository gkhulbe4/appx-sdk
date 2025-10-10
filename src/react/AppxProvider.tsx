"use client";

import { createContext, useEffect, useState, type ReactNode } from "react";
import { AppxSdk } from "../node/init";
import type { AppxContextType, CurrentUser } from "../types/appxTypes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AppxContext = createContext<AppxContextType | null>(null);

interface AppxProviderProps {
  razorPayKey: string;
  baseUrl: string;
  children: ReactNode;
}

export function AppxProvider({
  razorPayKey,
  baseUrl,
  children,
}: AppxProviderProps) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [queryClient] = useState(() => new QueryClient());

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
    )}; path=/; max-age=${60 * 60 * 24 * 7}`;
  }, [baseUrl]);

  return (
    <AppxContext.Provider value={{ sdk, user, setUser, razorPayKey }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AppxContext.Provider>
  );
}

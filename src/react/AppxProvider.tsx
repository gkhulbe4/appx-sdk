"use client";

import { createContext, useEffect, useState, type ReactNode } from "react";
import { AppxSdk } from "../node/init";
import type { AppxContextType, CurrentUser } from "../types/appxTypes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AppxContext = createContext<AppxContextType | null>(null);

interface AppxProviderProps {
  baseUrl: string;
  children: ReactNode;
}

export function AppxProvider({ baseUrl, children }: AppxProviderProps) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [firebaseSdkReady, setFirebaseSdkReady] = useState(false);
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
    const initFirebase = async () => {
      const currentUser = localStorage.getItem("current_user");
      const token = currentUser ? JSON.parse(currentUser).token : "";
      const userId = currentUser ? JSON.parse(currentUser).id : "";
      const domain = process.env.NEXT_PUBLIC_DOMAIN_URL!;

      await sdk.initFirebaseForDomain(domain, token, userId);
      setFirebaseSdkReady(true);
    };

    initFirebase().catch(console.error);
  }, [sdk]);

  if (!firebaseSdkReady) return <div>Loading...</div>;

  return (
    <AppxContext.Provider value={{ sdk, user, setUser }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AppxContext.Provider>
  );
}

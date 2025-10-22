// AppxProvider.tsx
"use client";

import {
  createContext,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { AppxSdk } from "../node/init";
import type { AppxContextType, CurrentUser } from "../types/appxTypes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AppxContext = createContext<AppxContextType | null>(null);

interface AppxProviderProps {
  baseUrl: string;
  domainUrl: string;
  children: ReactNode;
}

export function AppxProvider({
  baseUrl,
  domainUrl,
  children,
}: AppxProviderProps) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [firebaseSdkReady, setFirebaseSdkReady] = useState(false);
  const [queryClient] = useState(() => new QueryClient());

  const sdk = useMemo(
    () =>
      new AppxSdk({
        baseUrl,
        domainUrl,
        getToken: () => {
          const currentUserDetails = localStorage.getItem("current_user");
          if (!currentUserDetails) return null;
          return JSON.parse(currentUserDetails).token;
        },
      }),
    [baseUrl, domainUrl]
  );

  useEffect(() => {
    const initFirebase = async () => {
      try {
        await sdk.waitForFirebase();
        console.log("Firebase initialized successfully");
        setFirebaseSdkReady(true);
      } catch (error) {
        console.error("Firebase initialization failed:", error);
      }
    };

    initFirebase();
  }, [sdk]);

  if (!firebaseSdkReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading Firebase...</div>
      </div>
    );
  }

  return (
    <AppxContext.Provider value={{ sdk, user, setUser }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AppxContext.Provider>
  );
}

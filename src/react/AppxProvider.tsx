import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AppxSdk } from "../node/index.js";
import type { AppxContextType, User } from "../types/types.js";

const AppxContext = createContext<AppxContextType | null>(null);

export const AppxProvider: React.FC<{
  baseUrl: string;
  children: ReactNode;
}> = ({ baseUrl, children }) => {
  const sdk = new AppxSdk(baseUrl);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  async function loginPass(email: string, password: string): Promise<User> {
    setLoading(true);
    try {
      const data = await sdk.loginWithPass(email, password);
      const loggedInUser: User = data.user;
      setUser(loggedInUser);
      return loggedInUser;
    } finally {
      setLoading(false);
    }
  }

  async function loginOtp(email: string): Promise<User> {
    setLoading(true);
    try {
      const data = await sdk.loginWithOtp(email);
      const loggedInUser: User = data.user;
      setUser(loggedInUser);
      return loggedInUser;
    } finally {
      setLoading(false);
    }
  }

  async function fetchUser(): Promise<void> {
    setLoading(true);
    try {
      const data = await sdk.me();
      const currentUser: User = data.user;
      setUser(currentUser);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppxContext.Provider value={{ sdk, user, loading, loginPass, loginOtp }}>
      {children}
    </AppxContext.Provider>
  );
};

export { AppxContext };

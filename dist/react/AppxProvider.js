import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useState, useEffect } from "react";
import { AppxSdk } from "../node/index.js";
const AppxContext = createContext(null);
export const AppxProvider = ({ baseUrl, children }) => {
    const sdk = new AppxSdk(baseUrl);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    async function loginPass(email, password) {
        setLoading(true);
        try {
            const data = await sdk.loginWithPass(email, password);
            const loggedInUser = data.user;
            setUser(loggedInUser);
            return loggedInUser;
        }
        finally {
            setLoading(false);
        }
    }
    async function loginOtp(email) {
        setLoading(true);
        try {
            const data = await sdk.loginWithOtp(email);
            const loggedInUser = data.user;
            setUser(loggedInUser);
            return loggedInUser;
        }
        finally {
            setLoading(false);
        }
    }
    async function fetchUser() {
        setLoading(true);
        try {
            const data = await sdk.me();
            const currentUser = data.user;
            setUser(currentUser);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchUser();
    }, []);
    return (_jsx(AppxContext.Provider, { value: { sdk, user, loading, loginPass, loginOtp }, children: children }));
};
export { AppxContext };
//# sourceMappingURL=AppxProvider.js.map
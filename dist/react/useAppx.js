import { useContext } from "react";
import { AppxContext } from "./AppxProvider.js";
export function useAppx() {
    const context = useContext(AppxContext);
    if (!context) {
        throw new Error("useAppx must be used within <AppxProvider>");
    }
    return context;
}
//# sourceMappingURL=useAppx.js.map
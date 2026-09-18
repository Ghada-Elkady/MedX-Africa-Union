import { createContext, useState } from "react";

const User = createContext();
export { User };
export const UserProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        try {
            const stored = localStorage.getItem("seta_auth");
            return stored ? JSON.parse(stored) : { accessToken: null, refreshToken: null, user: null };
        } catch {
            return { accessToken: null, refreshToken: null, user: null };
        }
    });

    const updateAuth = (next) => {
        setAuth(next);
        try {
            localStorage.setItem("seta_auth", JSON.stringify(next));
        } catch {
            // ignore storage write failures
        }
    };

    return <User.Provider value={{ auth, setAuth: updateAuth }}>{children}</User.Provider>;
};

export default UserProvider;
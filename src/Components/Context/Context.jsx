import { createContext, useState } from "react";

 const User = createContext();
export { User };
export const UserProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    console.log(auth);
    return <User.Provider value={{ auth, setAuth }}>{children}</User.Provider>;
};

export default UserProvider;


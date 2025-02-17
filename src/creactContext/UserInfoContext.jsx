import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userName, setUsername] = useState();
    const [password, setPassword] = useState();

    return (
        <UserContext.Provider value={{
            userName, setUsername,
            password, setPassword
        }}>
            {children}
        </UserContext.Provider>
    );
};

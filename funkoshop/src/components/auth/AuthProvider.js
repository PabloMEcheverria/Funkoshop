import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, user => setCurrentUser(user));

        return () =>  unsuscribe()
    }, [auth]);

    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ currentUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
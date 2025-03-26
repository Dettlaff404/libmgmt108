import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        //get the token from local storag and validate
    }, [])

    const login = (token: string) => {
        //set token from local storage
        setIsAuthenticated(true);
    }
    
    const logout = () => {
        //remove token from local storage
        setIsAuthenticated(false);
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
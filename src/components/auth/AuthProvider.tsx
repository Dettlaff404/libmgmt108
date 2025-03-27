import { createContext, ReactNode, useContext, useEffect, useState } from "react";

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
        const token = localStorage.getItem('libToken');
        if (token) {
            setIsAuthenticated(!!token);
        }
    }, [])

    const login = (token: string) => {
        //set token from local storage
        localStorage.setItem('libToken', token);
        setIsAuthenticated(true);
    }
    
    const logout = () => {
        //remove token from local storage
        localStorage.removeItem('libToken');
        setIsAuthenticated(false);
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth should be used within an AuthProvider');
    }
    return context;
}
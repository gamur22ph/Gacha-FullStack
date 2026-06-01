import { createContext, useContext, useState } from "react";
import type { UserData } from "../types/UserData";

interface AuthContextType {
    user : UserData | null;
    token : string | null;
    updateUser : (newData: Partial<UserData>) => void;
    handleLogin : (userData : UserData, newToken: string) => void;
    handleLogout : () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children : React.ReactNode}) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [user, setUser] = useState<UserData | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    })

    const login = (userData : UserData, newToken : string) => {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    const updateUser = (newData: Partial<UserData>) => {
        setUser((prevUser) => {
        if (!prevUser) return null;
        const updatedUser = { ...prevUser, ...newData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
        });
    };
    
    return (
        <AuthContext.Provider value = {{
            user: user,
            token: token, 
            updateUser: updateUser,
            handleLogin: (userParam, tokenParam) => login(userParam, tokenParam),
            handleLogout: logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}


"use client";

import React, {createContext, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// @ts-ignore
export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const token = sessionStorage.getItem('access_token');
            setIsAuthenticated(!!token); // Sets isAuthenticated to true if token is not null
        };

        checkAuth();
        window.addEventListener('storage', checkAuth); // Listen to storage events to update auth status

        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        sessionStorage.removeItem('access_token');
        setIsAuthenticated(false);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

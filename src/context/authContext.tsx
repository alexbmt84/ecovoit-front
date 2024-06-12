"use client";

import React, {createContext, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import axios from "axios";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// @ts-ignore
export const AuthProvider = ({children}) => {

    const csrfToken = typeof window !== 'undefined' ? localStorage.getItem('csrfToken') : null;
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

    const login = async (email: string, password: string) => {
        const response = await axios.post('https://api.ecovoit.tech/api/login', {
            email,
            password
        }, {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });

        sessionStorage.setItem('access_token', response.data.access_token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        sessionStorage.removeItem('access_token');
        setIsAuthenticated(false);
        localStorage.removeItem('csrfToken');
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

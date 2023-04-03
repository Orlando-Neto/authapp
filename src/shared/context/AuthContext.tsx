import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { Usuario } from '../models/Usuario';
import { AuthService } from '../services/api/auth/AuthService';

interface IAuthContextData {
    isAuthenticated: boolean;
    user: Usuario | null;
    login: (email: string, password: string) => Promise<string | void>;
    logout: () => void;
}

const AuthContext = createContext({} as IAuthContextData);

interface IAuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {

    const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

    const [ user, setUser ] = useState(null);
    const [ accessToken, setAccessToken ] = useState<string>();

    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

        if(accessToken) {
            setAccessToken(JSON.parse(accessToken));
        } else {
            setAccessToken(undefined);
        }
    }, []);

    const handleLogin = useCallback(async (email: string, password: string) => {

        const result = await AuthService.auth(email, password);

        if(result instanceof Error) {
            return result.message;
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.accessToken));
            setAccessToken(result.accessToken);
        }
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
        setAccessToken(undefined);
    }, []);

    const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

    return (
        <AuthContext.Provider value={{isAuthenticated, user, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
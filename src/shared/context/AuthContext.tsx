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
    const [ nome_emp, setNome_emp ] = useState<string>();

    useEffect(() => {
        const nome_emp = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

        if(nome_emp) {
            setNome_emp(JSON.parse(nome_emp));
        } else {
            setNome_emp(undefined);
        }
    }, []);

    const handleLogin = useCallback(async (email: string, password: string) => {

        const result = await AuthService.auth(email, password);

        if(result instanceof Error) {
            return result.message;
        } else {
            
            if(result.error) {
                alert(result.error);
                return;
            }

            localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.nome_emp));
            setNome_emp(result.nome_emp);
        }
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
        setNome_emp(undefined);
    }, []);

    const isAuthenticated = useMemo(() => !!nome_emp, [nome_emp]);

    return (
        <AuthContext.Provider value={{isAuthenticated, user, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
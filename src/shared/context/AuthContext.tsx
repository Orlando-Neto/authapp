import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { Usuario } from '../models/Usuario';
import { AuthService } from '../services/api/auth/AuthService';
import { Api } from '../services/api/axios-config';

interface IAuthContextData {
    isAuthenticated: boolean;
    username: string | null;
    login: (usuario: string, password: string) => Promise<any>;
    register: (usuario: Usuario) => Promise<any>;
    logout: () => void;
}

const AuthContext = createContext({} as IAuthContextData);

interface IAuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {

    const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';
    const LOCAL_STORAGE_KEY__USERNAME = 'APP_USERNAME';

    const [ username, setUsername ] = useState('');

    useEffect(() => {
        let username = localStorage.getItem(LOCAL_STORAGE_KEY__USERNAME);

        if(username) setUsername(username);
    }, []);

    const handleLogin = useCallback(async (usuario: string, password: string) => {

        const result = await AuthService.auth(usuario, password);

        if(result instanceof Error) {
            return {errors: result.message};
        } else {
            
            if(result.status === 200) {

                localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.token) ?? '');
                localStorage.setItem(LOCAL_STORAGE_KEY__USERNAME, JSON.stringify(result.username) ?? '');
                setUsername(result.username);

                Api.defaults.headers.common['Authorization'] = `Bearer ${result.token}`;

            } else if(result.status === 422) {
                return result;
            } else {
                alert(result.message);
            }
        }
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_KEY__USERNAME);

        setUsername('');
    }, []);

    const handleRegister = useCallback(async (usuario: Usuario) => {
        
        const result = await AuthService.register(usuario);

        if(result instanceof Error) {
            return {errors: result.message};
        } else {
            
            if(result) {
                localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.token));
                localStorage.setItem(LOCAL_STORAGE_KEY__USERNAME, JSON.stringify(result.username));
                setUsername(result.username);

                Api.defaults.headers.common['Authorization'] = `Bearer ${result.token}`;

                return result;
            }
        }
    }, []);

    const isAuthenticated = useMemo(() => !!username, [username]);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            username,
            login: handleLogin,
            logout: handleLogout,
            register: handleRegister
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { Usuario } from '../models/Usuario';
import { AuthService } from '../services/api/auth/AuthService';

interface IAuthContextData {
    isAuthenticated: boolean;
    username: string | null;
    login: (usuario: string, password: string) => Promise<string | void>;
    register: (usuario: Usuario) => Promise<string | object | void>;
    logout: () => void;
}

const AuthContext = createContext({} as IAuthContextData);

interface IAuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {

    const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

    const [ username, setUsername ] = useState('');

    useEffect(() => {
        
    }, []);

    const handleLogin = useCallback(async (usuario: string, password: string) => {

        const result = await AuthService.auth(usuario, password);

        if(result instanceof Error) {
            return result.message;
        } else {
            
            if(result.error) {
                alert(result.error);
                return;
            }

            localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.nome_emp));
            
        }
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
        
    }, []);

    const handleRegister = useCallback(async (usuario: Usuario) => {
        
        const result = await AuthService.register(usuario);

        console.log(result);

        if(result instanceof Error) {

            return result.message;
        } else {
            
            if(result.validation_errors) {

                let arrErrors = {};
                Object.keys(result.validation_errors).map(error => {
                    console.log(error);
                    if(result.validation_errors && result.validation_errors[error])
                        console.log(result.validation_errors[error]);
                });

                return arrErrors;
            }

            localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.token ?? ''));
            setUsername(result.username ?? '');
        }
    }, []);

    const isAuthenticated = useMemo(() => !!username, [username]);

    return (
        <AuthContext.Provider value={{isAuthenticated, username, login: handleLogin, logout: handleLogout, register: handleRegister }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
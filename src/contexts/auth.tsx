import React, { createContext, useContext, useEffect, useState } from 'react';
import Usuario from '../model/Usuario';

interface props {
    children: any
}

interface AuthContextData {
    signed: boolean;
    user: Usuario | null;
    Login(user: object): Promise<void>;
    Logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<props> = ({ children }: props) => {

    const [user, setUser] = useState<Usuario | null>(null);

    useEffect(() => {
        const storagedUser = localStorage.getItem("@App:user");
        const storagedToken = localStorage.getItem("@App:token");

        if (storagedUser && storagedToken) {
            setUser(JSON.parse(storagedUser));
        }
    }, [])

    async function Login(user: Usuario) {

        

        setUser(user);

        localStorage.setItem('@App:user', JSON.stringify(user));
        localStorage.setItem('@App:token', "jsdiwoahdowahduwa");
    }

    async function Logout() {

        setUser(null);

        localStorage.removeItem('@App:user');
        localStorage.removeItem('@App:token');
    }


    return (
        <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}
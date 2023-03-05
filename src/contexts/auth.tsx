import React, { createContext, useContext, useEffect, useState } from 'react';

interface props {
    children: any
}

interface Usuario {
    nome: string
    email: string
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

    async function Login(user: Usuario) {

        setUser(user);

        localStorage.setItem('@App:user', JSON.stringify(user));
        localStorage.setItem('@App:token', "jsdiwoahdowahduwa");
    }

    function Logout() {
        setUser(null);

        sessionStorage.removeItem('@App:user');
        sessionStorage.removeItem('@App:token');
    }

    useEffect(() => {
        const storagedUser = localStorage.getItem("@App:user");
        const storagedToken = localStorage.getItem("@App:token");

        if (storagedUser && storagedToken) {
            setUser(JSON.parse(storagedUser));
        }
    }, [])

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
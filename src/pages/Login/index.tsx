import React from 'react';
import { useAuth } from '../../contexts/auth';

const Login: React.FC = () => {

    const { Login } = useAuth();

    function handleLogin() {

        let user = {
            nome: "Orlando",
            email: "orlando@teste.com"
        }

        Login(user);
    }

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
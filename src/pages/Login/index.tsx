import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useAuth } from '../../contexts/auth';
import Usuario from '../../model/Usuario';

const Login: React.FC = () => {

    const { Login } = useAuth();
    const [user, setUser] = useState<Usuario>({nome: "", email: ""});

    function handleLogin(e: any, user: Usuario) {
        e.preventDefault();

        Login(user);
    }

    return (
        <div>
            <form action="#" onSubmit={(e) => handleLogin(e, user)}>

                <div>
                    <label htmlFor="Usuario">Usuario:</label>
                    <input type="text" name="usuario" id='usuario' onChange={(e) => setUser({...user, nome: e.target.value})} value={user.nome} />
                </div>
                <Button variant="contained" color='primary' type="submit">Login</Button>
            </form>
        </div>
    );
};

export default Login;
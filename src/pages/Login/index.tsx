import React, { useState } from 'react';
import { Button } from '@mui/material';

import { useDrawerContext } from '../../shared/context';
import { useAuth } from '../../shared/context';
import Usuario from '../../model/Usuario';

const Login: React.FC = () => {

    const { Login } = useAuth();
    const [user, setUser] = useState<Usuario>({nome: "", email: ""});
    const { toggleDrawerOpen } = useDrawerContext()

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
                <Button variant="contained" color="secondary" type="button" onClick={toggleDrawerOpen}>Abrir menu</Button>
            </form>
        </div>
    );
};

export default Login;
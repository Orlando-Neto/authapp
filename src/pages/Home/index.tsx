import { Button } from '@mui/material';
import React from 'react';
import { useAuth } from '../../contexts/auth';

const Home: React.FC = () => {

    const { user, Logout } = useAuth();

    return (
        <div>
            Usuário: {user?.nome}
            <h1>Home</h1>
            <Button type="button" onClick={Logout}>Sair</Button>
        </div>
    )
};

export default Home;
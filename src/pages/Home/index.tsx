import React from 'react';
import { Button } from '@mui/material';

import { useAuth } from '../../shared/context';

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
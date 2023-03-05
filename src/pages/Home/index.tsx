import React from 'react';
import { useAuth } from '../../contexts/auth';

const Home: React.FC = () => {

    const { user, Logout } = useAuth();

    return (
        <div>
            Usuário: {user?.nome}
            <h1>Home</h1>
            <button type="button" onClick={Logout}>Sair</button>
        </div>
    )
};

export default Home;
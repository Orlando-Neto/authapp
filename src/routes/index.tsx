import React, {useEffect} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth, useDrawerContext } from '../shared/context';

import { 
    Dashboard,
    ListagemDePessoas,
} from '../pages';
import { Box } from '@mui/material';

const AppRoutes: React.FC = () => {

    const { signed } = useAuth();
    const { setDrawerOption } = useDrawerContext();

    useEffect(() => {
        setDrawerOption([
            {
                label: "Página inicial",
                path: '/pagina-inicial',
                icon: 'home'
            },
            {
                label: "Pessoas",
                path: "/pessoas",
                icon: "people"
            }
        ]);
    }, []);

    return (
        <Routes>
            {
                signed ? (
                    <>
                        <Route path="/pagina-inicial" element={<Dashboard />} />
                    </>
                ) : (
                    <>
                        <Route path="/pagina-inicial" element={<Dashboard />} />
                    </>
                )
            }
            <Route path="/pessoas" element={<ListagemDePessoas />} />
            <Route path="/pessoas/detalhe/:id" element={<p>Detalhe</p>} />
            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
};

export default AppRoutes;
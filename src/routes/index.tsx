import React, {useEffect} from 'react';

import { useAuth, useDrawerContext } from '../shared/context';
import { Route, Routes } from 'react-router-dom';

import { 
    Dashboard,
    ListagemDePessoas,
} from '../pages';

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
        </Routes>
    );
};

export default AppRoutes;
import React, {useEffect} from 'react';

import { useAuth, useDrawerContext } from '../shared/context';
import { Route, Routes } from 'react-router-dom';

import { Dashboard, Oi } from '../pages';

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
                label: "Oi",
                path: "/oi",
                icon: "comedy"
            }
        ]);
    }, [])

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
            <Route path="/oi" element={<Oi />} />
        </Routes>
    );
};

export default AppRoutes;
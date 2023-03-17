import React, {useEffect} from 'react';

import { useAuth, useDrawerContext } from '../shared/context';
import { Route, Routes } from 'react-router-dom';

import { Dashboard } from '../pages/dashboard/Dashboard';

const AppRoutes: React.FC = () => {

    const { signed } = useAuth();
    const { setDrawerOption } = useDrawerContext();

    useEffect(() => {
        setDrawerOption([
            {
                label: "Página inicial",
                path: '/pagina-inicial',
                icon: 'home'
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
        </Routes>
    );
};

export default AppRoutes;
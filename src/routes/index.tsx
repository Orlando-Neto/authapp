import React, {useEffect} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useDrawerContext } from '../shared/context';

import {
    Graficos, ListagemDeGastos
} from '../pages';

import routes from './routes.json';
import { Register } from '../shared/components/register/Register';

const AppRoutes: React.FC = () => {

    const { setDrawerOption } = useDrawerContext();

    useEffect(() => {
        setDrawerOption(routes);
    }, [setDrawerOption]);

    return (
        <Routes>
            
            <Route path={`/gastos`}>
                <Route path="" element={<ListagemDeGastos />} />
            </Route>

            <Route path='/graficos' element={<Graficos />} />

            <Route path='/*' element={<Navigate to={`/gastos`} />} />
        </Routes>
    );
};

export default AppRoutes;
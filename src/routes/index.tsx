import React, {useEffect} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useDrawerContext } from '../shared/context';

import {
    Dashboard, DetalheDeCidades, DetalheDePessoas, 
    Graficos, ListagemDeCidades, ListagemDeGastos, 
    ListagemDePessoas
} from '../pages';

import routes from './routes.json';
import { Typography } from '@mui/material';

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
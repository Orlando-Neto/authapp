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
            <Route path={`/pagina-inicial`} element={<Dashboard />} />

            <Route path={`/pessoas`}>
                <Route path="" element={<ListagemDePessoas />} />
                <Route path="detalhe/:id" element={<DetalheDePessoas />} />
                <Route path='perfil' element={<Typography>Olá</Typography>} />
                <Route path='*' element={<Navigate to="" />} />
            </Route>

            <Route path={`/cidades`}>
                <Route path="" element={<ListagemDeCidades />} />
                <Route path="detalhe/:id" element={<DetalheDeCidades />} />
                <Route path='*' element={<Navigate to="" />} />
            </Route>

            <Route path={`/gastos`}>
                <Route path="" element={<ListagemDeGastos />} />
            </Route>

            <Route path='/graficos' element={<Graficos />} />

            <Route path='/*' element={<Navigate to={`/pagina-inicial`} />} />
        </Routes>
    );
};

export default AppRoutes;
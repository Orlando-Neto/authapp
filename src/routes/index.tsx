import React from 'react';

import { useAuth } from '../contexts/auth';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';

const AppRoutes: React.FC = () => {

    const { signed } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                {
                    signed ? (
                        <Route path="/" element={<Home />} />
                    ) : (
                    <>
                        <Route path="/" element={<Login />} />
                    </>)
                }
                <Route path='*' element={<Navigate to="/" />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
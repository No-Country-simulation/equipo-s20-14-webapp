import React from 'react'
import { Route, Routes } from 'react-router';
import { LoginPage, RegisterPage } from '../auth/index ';
import HomePage from '../components/HomePage';
import { FinanzasApp } from '../FinanzasApp';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login/*" element={<LoginPage />} />
            <Route path="/register/*" element={<RegisterPage />} />
            <Route path="/*" element={<FinanzasApp />} />
        </Routes>
    )
}

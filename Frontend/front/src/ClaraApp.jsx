import React from 'react'
import { BrowserRouter } from 'react-router'
import { AppRouter } from './router'

export const ClaraApp = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
}

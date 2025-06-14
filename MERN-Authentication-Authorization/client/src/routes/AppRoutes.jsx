import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '../pages/pageOne/Home'
import PageOneLayout from '../layout/PageOneLayout'
const AppRoutes = () => {

    const routes = useRoutes([
        {
            path: '/',
            element: <PageOneLayout />,
            children: [
                {
                    path: 'pageone',
                    element: <Home />
                }
            ],
        },
    ])

    return routes;
}

export default AppRoutes
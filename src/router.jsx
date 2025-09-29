import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Auth from './layouts/Auth';
import Inicio from './views/Inicio';
import Login from './views/Login';
import Ordenes from './views/Ordenes';
import Productos from './views/Productos';
import Registro from './views/Registro';
import Admin from './layouts/Admin';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Inicio />,
            },
        ],
    },
    {
        path: '/auth',
        element: <Auth />,
        children: [
            {
                path: '/auth/login',
                element: <Login />,
            },
            {
                path: '/auth/registro',
                element: <Registro />,
            },
        ],
    },
    {
        path: '/admin',
        element: <Admin />,
        children: [
            {
                index: true,
                element: <Ordenes />,
            },
            {
                path: '/admin/productos',
                element: <Productos />,
            },
        ],
    },
]);

export default router;


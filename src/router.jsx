import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Auth from './layouts/Auth';
import Inicio from './views/Inicio';
import Login from './views/Login';
import Registro from './views/Registro';

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
]);

export default router;


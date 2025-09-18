import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';

let router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
	},
]);

export default router;


import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import ProtectedLayout from '../components/ProtectedLayout';
import GuestLayout from '../components/GuestLayout';
import EditForm from '../pages/EditForm';
import CreateForm from '../pages/CreateForm';
import Details from '../pages/Details';
import Search from '../pages/Search';

const router = createBrowserRouter([
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: '/',
				element: <Main />,
			},
			{
				path: '/register',
				element: <Register />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/search',
				element: <Search />,
			},
		],
	},
	{
		path: '/',
		element: <ProtectedLayout />,
		children: [
			{
				path: '/dashboard',
				element: <Dashboard />,
			},
			{
				path: '/profile',
				element: <Profile />,
			},
			{
				path: '/edit/:id',
				element: <EditForm />,
			},
			{
				path: '/create',
				element: <CreateForm/>,
			},
			{
				path: '/details/:id',
				element: <Details />,
			},
			{
				path: '/search',
				element: <Search />,
			},
		],
	},
]);

export default router; 
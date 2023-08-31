import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../contexts/AuthContext';
import NavBar from './NavBar';

export default function DefaultLayout() {
	const { user, setUser } = useAuth();

	// check if user is logged in or not from server
	useEffect(() => {
		(async () => {
			try {
				const resp = await axios.get('/user');
				if (resp.status === 200) {
					setUser(resp.data.data);
				}
			} catch (error) {
				if (error.response.status === 401) {
					localStorage.removeItem('user');
					window.location.href = '/';
				}
			}
		})();
	}, []);

	// if user is not logged in, redirect to login page
	if (!user) {
		return <Navigate to="/login" />;
	}

	// logout user
	const handleLogout = async () => {
		try {
			const resp = await axios.post('/logout');
			if (resp.status === 200) {
				localStorage.removeItem('user');
				window.location.href = '/';
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<NavBar />
			<nav>
				<a
					onClick={handleLogout}
					href="#"
				>
					Logout
				</a>
				<a

					href="/create"
				>
					Add new
				</a>

			</nav>
			<main>
				<Outlet />
			</main>
		</>
	);
}
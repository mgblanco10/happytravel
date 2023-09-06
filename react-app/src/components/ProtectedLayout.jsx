import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axios from '../services/axios';
import { useAuth } from '../contexts/AuthContext';
import NavBar from './NavBar';

export default function DefaultLayout() {
	const { user, setUser } = useAuth();
	const location = useLocation();
	
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

	
	if (!user) {
		return <Navigate to="/login" />;
	}

	
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
	const hideSearch = location.pathname === '/register' || location.pathname === '/login' || location.pathname === '/profile' || location.pathname === '/create';
	return (
		<>
		<NavBar onLogout={handleLogout} hideSearch={hideSearch}/>
			<main>
                <Outlet />
			</main>
		</>
	);
}
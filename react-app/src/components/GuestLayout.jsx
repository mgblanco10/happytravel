import React,{ useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NavBar from '../components/NavBar'; 

export default function GuestLayout() {
	const [searchResults, setSearchResults] = useState([]);
	const { user } = useAuth();

	const handleSearchSubmit = (searchInput) => {
		setSearchResults(searchInput)
	}

	// if user is logged in, redirect to profile page
	if (user) {
		return <Navigate to="/dashboard" />;
	}
	return (
		<>
			<NavBar handleSearchSubmit={handleSearchSubmit}/>
			<main>
                <Outlet searchResults={searchResults}/>
			</main>
		</>
	);
}
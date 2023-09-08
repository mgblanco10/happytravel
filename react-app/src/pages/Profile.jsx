import React from 'react';
import Fav from '../components/FavList';
import { useAuth } from '../contexts/AuthContext';
import FavList from '../components/FavList';

export default function Profile() {
	const { user } = useAuth();
	return (
		<>
			<h2>User Profile</h2>
				<div>
				Name: {user.name}
				</div>
				<div>
				Email: {user.email}
				</div>

				<div>
					<h3>Favoritos</h3>
					<FavList/>
				</div>
				
		</>
		
		
	
	);
}
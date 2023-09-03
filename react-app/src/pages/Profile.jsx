import React from 'react';
import { useAuth } from '../contexts/AuthContext';

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
				
		</>
	);
}
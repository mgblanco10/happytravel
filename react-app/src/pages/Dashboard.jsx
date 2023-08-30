import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
	const { user } = useAuth();
	return (
		<>
			<div >User Profile</div>
				<h5>
					Name: {user.name}
				</h5>
				
		</>
	);
}
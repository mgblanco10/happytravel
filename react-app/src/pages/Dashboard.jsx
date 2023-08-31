import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import CardsGuest from '../components/CardsGuest'; 

export default function Dashboard() {
	const { user } = useAuth();
	return (
		<>
            <CardsGuest />
				
		</>
	);
}
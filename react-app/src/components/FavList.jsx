import React from 'react';

export default function FavList({ favoriteTravels }) {
    return (
        <div>
            <h2>Favorite Destinations</h2>
            <ul>
                {favoriteTravels.map((travel) => (
                    <li key={travel.id}>
                        {travel.name} - {travel.location}
                    </li>
                ))}
            </ul>
        </div>
    );
}
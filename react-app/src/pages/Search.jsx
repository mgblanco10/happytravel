import React, { useState } from 'react';
import CardsSearch from '../components/CardsSearch';

export default function Search() {
	const [searchValue, setSearchValue] = useState('');
	return (
		<>
			<CardsSearch searchValue={searchValue}/>
		</>
	);
}


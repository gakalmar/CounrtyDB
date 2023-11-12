import { useState, useEffect } from 'react';
import CountryData from './CountryData';

function FavoriteCountries (props) {

    const [favoriteCountries, setFavoriteCountries] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/favoriteCountries');
                if (response.ok) {
                    const favorites = await response.json();
                    setFavoriteCountries(favorites);
                } else {
                    console.error('Failed to fetch favorite countries');
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchFavorites();
    }, []);

    return (
        <div>Favorite countries should go here</div>
    )
}

export default FavoriteCountries
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CountryData from './CountryData';

function FavoriteCountries (props) {

    const navigate = useNavigate();

    const [favoriteCountries, setFavoriteCountries] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/favoriteCountries');
                if (response.ok) {
                    const favorites = await response.json();
                    // console.log(favorites);
                    setFavoriteCountries(favorites);
                } else {
                    console.error('Failed to fetch favorite countries');
                }
                // const favCountries = await response.json();
                setFavoriteCountries(favorites);
                
            } catch (error) {
                console.error(error);
            }
        };
        fetchFavorites();
    }, []);

    console.log(favoriteCountries);

    return (
        <div>
            <h1>Favorite Countries</h1>
            <button onClick={() => navigate('/')}>Back</button>
            {favoriteCountries.map(country => <CountryData key={country.name} countryData={country}/>)}
        </div>
    )
}

export default FavoriteCountries
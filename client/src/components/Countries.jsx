import { useState, useEffect } from 'react';

function Countries(props) {
    const { index, name, countryData, setSelectedCountry } = props;
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/favoriteCountries');
                if (response.ok) {
                    const favorites = await response.json();
                    const isFavoriteCountry = await favorites.find(fav => fav.name === countryData.name);
                    setIsFavorite(!!isFavoriteCountry); // Check if current country is in favorites === set isFavorite to true if isFavoriteCountry is truthy, and false otherwise.
                } else {
                    console.error('Failed to fetch favorite countries');
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchFavorites();
    }, [countryData]);

    const handleAddFavorite = async () => {
        try {

            // Check if the country is already a favorite
            if (isFavorite) {
                alert('Country is already in favorites!');
                return;
            }

            const response = await fetch('http://localhost:3000/api/favoriteCountries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(countryData)
            });

            if (response.ok) {
                setIsFavorite(true); // Update the state immediately after a successful POST request
                alert('Country added to favorites!');
            } else {
                console.error('Failed to add country to favourites');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div key={index}>
            <h2>
                {name}
                <span onClick={handleAddFavorite} className="plussign">{isFavorite ? " -" : " +"}</span></h2>
            <button type="button" onClick={() => setSelectedCountry(countryData)}>
                More details
            </button>
        </div>
    );
}

export default Countries;
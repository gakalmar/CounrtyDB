function Countries(props) {
    const { index, name, countryData, setSelectedCountry } = props;

    const handleAddFavorite = async () => {
        try {

            const response = await fetch('http://localhost:3000/api/favoriteCountries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(countryData)
            });

            if (response.ok) {
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
                <span onClick={handleAddFavorite}> +</span></h2>
            <button type="button" onClick={() => setSelectedCountry(countryData)}>
                More details
            </button>
        </div>
    );
}

export default Countries;
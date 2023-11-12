import { useState, useEffect } from 'react'
import './App.css'
import Countries from './components/Countries';
import CountryData from './components/CountryData';

function App() {
    
    // Create states to store fetched data (and handle errors and loading):
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [listOrder, setListOrder] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [filterByName, setFilterByName] = useState([]);

    // Make API request with useEffect:
    useEffect(() => {

        const allCountriesUrl = 'https://restcountries.com/v3.1/all';

        // Create fetch function
        async function fetchData(allCountriesUrl) {
            try {
                const response = await fetch(allCountriesUrl);
                if (response.ok) {
                    const data = await response.json();

                    let sortedData;
                    switch (listOrder) {
                        case 1:
                            sortedData = await data.sort((a, b) => a.name.common.localeCompare(b.name.common));
                            break;
                        case 2:
                            sortedData = await data.sort((a, b) => b.name.common.localeCompare(a.name.common));
                            break;
                        default:
                            sortedData = data;
                    }

                    setCountries(sortedData);
                    setLoading(false);
                } else {
                    throw new Error("Error happened during fetch");
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        // Call function to fetch from API:
        fetchData(allCountriesUrl);

    }, [listOrder, filterByName]);    // Empty dependency array ensures that this effect runs only once
                        // for the A-Z buttons we had to add "listOrder" state to the dependencies array, so it reloads after it is changed

    if (loading) {
        return <div>Loading...</div>;
    };

    if (error) {
        return <div>Error: {error.message}</div>
    }

    // Filter functionality:
    const handleInput = (event) => {
        const inputValue = event.target.value.toLowerCase();
        if (inputValue === "") {
            setFilterByName([]); // Clear the filtered list when there's no input
        } else {
            const filteredList = countries.filter((country) =>
                country.name.common.toLowerCase().includes(inputValue)
            );
            setFilterByName(filteredList);
        }
    };

    const displayedCountries = filterByName.length > 0 ? filterByName : countries; 

    return (
        <div>
            {selectedCountry ? (
                <button type="button" onClick={() => {
                    setFilterByName([])
                    setSelectedCountry(null)
                    }}>
                    Back
                </button>
                ) : (
                <nav>
                    <button onClick={() => setListOrder(1)}>Sort by Name (A-Z)</button>
                    <button onClick={() => setListOrder(2)}>Sort by Name (Z-A)</button>
                    <input onInput={handleInput} placeholder='Search by name'></input>
                </nav>
                )
            }
            <h1>{selectedCountry ? "Country Details" : "List of Countries:"}</h1>
            {selectedCountry ? (
                <CountryData countryData={selectedCountry} />
            ) : (
                displayedCountries.map((country, index) => {
                    return <div key={`country-${index}`}>
                        <Countries
                            setSelectedCountry={setSelectedCountry}
                            index={index}
                            name={country.name.common}
                            countryData={{
                                name: country.name.common ? country.name.common : "n/a",
                                cca3: country.cca3 ? country.cca3 : "n/a",
                                capital: (country.capital && country.capital[0]) ? country.capital[0] : "n/a",
                                region: country.region ? country.region : "n/a",
                                subregion: country.subregion ? country.subregion : "n/a",
                                continents: country.continents ? country.continents : "n/a",
                                area: country.area ? country.area : "n/a",
                                population: country.population ? country.population : "n/a",
                                flag: country.flags.png ? country.flags.png : "n/a",
                                timezone: (country.timezones && country.timezones[0]) ? country.timezones[0] : "n/a",
                                translation: country.translations.hun.official ? country.translations.hun.official : "n/a"
                            }}
                        />
                    </div>
                })
                )
            }
        </div>
    );
}

export default App

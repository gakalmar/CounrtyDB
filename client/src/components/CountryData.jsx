function CountryData (props) {

    const { countryData } = props;

    return (
        <div>
            <h3>Details:</h3>
                <img src={props.countryData.flag}/>
                <ul>
                    <li>Country Code: {countryData.cca3}</li>
                    <li>Capital: {countryData.capital}</li>
                    <li>Region: {countryData.region}</li>
                    <li>Subregion: {countryData.subregion}</li>
                    <li>Continent: {countryData.continents}</li>
                    <li>Area: {countryData.area} sqkm</li>
                    <li>Population: {countryData.population}</li>
                    <li>Timezone: {countryData.timezone}</li>
                    <li>Translation: {countryData.translation}</li>
                </ul>
        </div>
    )
}

export default CountryData
function Countries(props) {
    const { index, name, countryData, setSelectedCountry } = props;

    return (
        <div key={index}>
            <h2>{name}</h2>
            <button type="button" onClick={() => setSelectedCountry(countryData)}>More details</button>
        </div>
    );
}

export default Countries;
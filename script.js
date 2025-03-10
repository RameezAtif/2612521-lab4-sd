document.getElementById('searchButton').addEventListener('click', function() {
    const countryName = document.getElementById('countryInput').value;
    fetchCountryData(countryName);
});

function fetchCountryData(countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 404) throw new Error('Country not found');
            displayCountryData(data[0]);
            fetchNeighbouringCountries(data[0].borders);
        })
        .catch(error => {
            document.getElementById('country-info').textContent = error.message;
        });
}

function displayCountryData(country) {
    const countryInfo = document.getElementById('country-info');
    countryInfo.innerHTML = `
        <h2>${country.name.common}</h2>
        <p> Capital: ${country.capital[0]}</p>
        <p> Population: ${country.population.toLocaleString()}</p>
        <p> Region: ${country.region}</p>
        <p> Flag: <p>
        <img class="country-flag" src="${country.flags.svg}" alt="Flag of ${country.name.common}" width="100">
    `;
}

function fetchNeighbouringCountries(borders) {
    if (!borders) {
        document.getElementById('bordering-countries').textContent = 'No bordering countries.';
        return;
    }
    const neighbours = document.getElementById('bordering-countries');
    neighbours.innerHTML = '<h3>Bordering Countries</h3>';
    borders.forEach(border => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then(response => response.json())
            .then(data => {
                neighbours.innerHTML += `
                    <p ><span>${data[0].name.common}</span><img class="border-flags" src="${data[0].flags.svg}" alt="Flag"></p>
                `;
            });
    });
}


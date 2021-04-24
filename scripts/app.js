const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

const updateUI = ({ cityData, weatherData }) => {
    const { EnglishName } = cityData;
    const { ID, CountryID } = cityData.AdministrativeArea;
    const { WeatherText, Temperature } = weatherData;

    details.innerHTML = `
                <h5 class="my-3">${EnglishName}, ${ID}, ${CountryID}</h5>
                <div class="my-3">${WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${Temperature.Imperial.Value}</span>
                    <span>&deg;F</span>
                </div>
                        `;
    // remove d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {
    const cityData = await getCity(city);
    const weatherData = await getWeather(cityData.Key);
    return {
        cityData,
        weatherData
    };
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the UI with new city
    updateCity(city)
        .then(data => {
            console.log(data);
            updateUI(data);
        })
        .catch(err => console.log(err));
});
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = ({ cityData, weatherData }) => {
    console.log(cityData, weatherData);
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

    // update the night/day & icon images
    const iconSource = `img/icons/${weatherData.WeatherIcon}.svg`
    icon.setAttribute('src', iconSource);

    let timeSource = weatherData.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSource);

    // remove d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the UI with new city
    forecast.updateCity(city)
        .then(data => {
            console.log(data);
            updateUI(data);
        })
        .catch(err => console.log(err));

    // set localStorage to store the last searched city
    localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}
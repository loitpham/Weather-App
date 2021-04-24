const apiKey = 'IGkZ4yh6vkRRoyMFXz2DsvX3CZ70NRXM';

// get city information
const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${apiKey}&q=${city}`
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
};

// get weather information
const getCurrentConditions = async (location) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${location}?apikey=${apiKey}`;
    const response = await fetch(base + query);
    return await response.json();
}

getCity('seattle')
    .then(cityData => getCurrentConditions(cityData.Key))
    .then(conditionsData => console.log(conditionsData))
    .catch(err => console.log(err));

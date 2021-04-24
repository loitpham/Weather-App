const apiKey = 'IGkZ4yh6vkRRoyMFXz2DsvX3CZ70NRXM';

const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${apiKey}&q=${city}`
    const response = await fetch(base + query);
    return await response.json();
};

getCity('seattle')
    .then(data => console.log(data[0].Key))
    .catch(err => console.log(err));
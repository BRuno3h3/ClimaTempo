const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '4118509aa4655e417281255d60176538';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    description.innerHTML = `Limpo`;
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    description.innerHTML = `Chuva`;
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    description.innerHTML = `Neve`;
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    description.innerHTML = `Nublado`;
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    description.innerHTML = `Neblina`;
                    break;

                default:
                    image.src = '';
            }


            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});
const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "539f95e2c4effae8060255537f6c594d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === '404') {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("Location not found");
            return;
        }

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${(weather_data.wind.speed * 3.6).toFixed(2)} Km/H`;

        const weather_main = weather_data.weather[0].main;
        const weather_desc = weather_data.weather[0].description;

        const weatherImages = {
            'Clear': 'clear.png',
            'Clouds': {
                'few clouds': 'few_clouds.png',
                'scattered clouds': 'scattered_clouds.png',
                'broken clouds': 'broken_clouds.png',
                'overcast clouds': 'overcast_clouds.png'
            },
            'Drizzle': 'drizzle.png',
            'Rain': {
                'light rain': 'light_rain.png',
                'moderate rain': 'moderate_rain.png',
                'heavy intensity rain': 'heavy_rain.png',
                'very heavy rain': 'very_heavy_rain.png',
                'extreme rain': 'extreme_rain.png',
                'freezing rain': 'freezing_rain.png',
                'light intensity shower rain': 'shower_rain.png',
                'shower rain': 'shower_rain.png',
                'heavy intensity shower rain': 'heavy_rain.png',
                'ragged shower rain': 'shower_rain.png'
            },
            'Thunderstorm': 'thunderstorm.png',
            'Snow': 'snow.png',
            'Mist': 'mist.png',
            'Smoke': 'smoke.png',
            'Haze': 'haze.png',
            'Dust': 'dust.png',
            'Fog': 'fog.png',
            'Sand': 'sand.png',
            'Ash': 'ash.png',
            'Squall': 'squall.png',
            'Tornado': 'tornado.png'
        };

        function getWeatherImage(main, desc) {
            if (weatherImages[main]) {
                if (typeof weatherImages[main] === 'string') {
                    return `/assets/${weatherImages[main]}`;
                } else if (weatherImages[main][desc]) {
                    return `/assets/${weatherImages[main][desc]}`;
                }
            }
            return '/assets/default.png';
        }

        weather_img.src = getWeatherImage(weather_main, weather_desc);

        console.log(weather_data);

    } catch (error) {
        console.log("An error occurred:", error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

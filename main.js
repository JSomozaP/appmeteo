document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('#search-input');
    const latInput = document.querySelector('#lat-input');
    const lonInput = document.querySelector('#lon-input');
    const locateButton = document.querySelector('#locate-me');
    const coordSearchButton = document.querySelector('#coord-search');



    // Créer la section d'affichage météo si elle n'existe pas
    if (!document.querySelector('.weather-display')) {
        const weatherDisplay = document.createElement('div');
        weatherDisplay.className = 'weather-display';
        document.querySelector('main').appendChild(weatherDisplay);
    }

    

    // Fonction pour obtenir les coordonnées d'une ville
    async function getCityCoordinates(cityName) {
        try {
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=fr&format=json`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                return {
                    lat: data.results[0].latitude,
                    lon: data.results[0].longitude,
                    name: data.results[0].name
                };
            }
            throw new Error('Ville non trouvée');
        } catch (error) {
            console.error('Erreur:', error);
            alert('Impossible de trouver cette ville');
            return null;
        }
    }

    async function getWeatherData(lat, lon, cityName = '') {
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m&current=weathercode&timezone=auto&daily=sunrise,sunset&current=temperature_2m,weathercode,time`
            );
            const data = await response.json();
            checkDayNight(data);
            displayWeather(data, cityName);
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la récupération des données météo');
        }
    }

    function checkDayNight(data) {
        const currentTime = new Date(data.current_weather.time);
        const sunrise = new Date(data.daily.sunrise[0]);
        const sunset = new Date(data.daily.sunset[0]);
    
        const isNight = currentTime < sunrise || currentTime > sunset;
        
        if (isNight) {
            document.body.classList.add('night-theme');
        } else {
            document.body.classList.remove('night-theme');
        }
    }

    function getWeatherEmoji(weatherCode) {
        const weatherIcons = {
            0: '☀️',     // Ciel dégagé
            1: '🌤️',     // Principalement dégagé
            2: '⛅',     // Partiellement nuageux
            3: '☁️',     // Couvert
            45: '🌫️',    // Brouillard
            48: '🌫️',    // Brouillard givrant
            51: '🌧️',    // Bruine légère
            53: '🌧️',    // Bruine modérée
            55: '🌧️',    // Bruine dense
            61: '🌧️',    // Pluie légère
            63: '🌧️',    // Pluie modérée
            65: '🌧️',    // Pluie forte
            66: '🌧️',    // Pluie verglaçante légère
            67: '🌧️',    // Pluie verglaçante forte
            71: '🌨️',    // Neige légère
            73: '🌨️',    // Neige modérée
            75: '🌨️',    // Neige forte
            77: '🌨️',    // Grains de neige
            80: '🌦️',    // Averses légères
            81: '🌦️',    // Averses modérées
            82: '🌦️',    // Averses violentes
            85: '🌨️',    // Averses de neige légères
            86: '🌨️',    // Averses de neige fortes
            95: '⛈️',    // Orage
            96: '⛈️',    // Orage avec grêle légère
            99: '⛈️'     // Orage avec grêle forte
        };
        return weatherIcons[weatherCode] || '❓';
    }

    function displayWeather(data, cityName) {
        const weatherDisplay = document.querySelector('.weather-display');
        const temperature = data.current_weather.temperature;
        const weatherCode = data.current_weather.weathercode;
        
        // Formatage de l'heure locale
        const localTime = new Date(data.current_weather.time);
        const timeString = localTime.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/Paris',
        });
    
        weatherDisplay.innerHTML = `
            ${cityName ? `<div class="city-name">${cityName}</div>` : ''}
            <div class="local-time">${timeString}</div>
            <div class="temperature">${temperature}°C</div>
            <div class="weather-icon">${getWeatherEmoji(weatherCode)}</div>
        `;
    }

    // Gérer la recherche par ville
    searchInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const cityData = await getCityCoordinates(searchInput.value);
            if (cityData) {
                getWeatherData(cityData.lat, cityData.lon, cityData.name);
                // Mettre à jour les champs lat/lon
                latInput.value = cityData.lat;
                lonInput.value = cityData.lon;
            }
        }
    });

    // Gérer la recherche par coordonnées
    coordSearchButton.addEventListener('click', () => {
        const lat = latInput.value;
        const lon = lonInput.value;
        if (lat && lon) {
            getWeatherData(lat, lon);
        } else {
            alert('Veuillez entrer des coordonnées valides');
        }
    });

    // Gérer le bouton "Chez moi"
    locateButton.addEventListener('click', () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    latInput.value = lat;
                    lonInput.value = lon;
                    getWeatherData(lat, lon, 'Ma position');
                },
                (error) => {
                    alert('Erreur de géolocalisation : ' + error.message);
                }
            );
        } else {
            alert('La géolocalisation n\'est pas supportée par votre navigateur');
        }
    });
});
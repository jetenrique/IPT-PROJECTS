/**
 * Activity 1: API Fundamentals - Weather API (JavaScript / Node.js)
 * ------------------------------------------------------------------
 * Objective: Connect to a public Weather API, fetch temperature data,
 * and display at least two fields (City/Location and Temperature).
 * 
 * Run using Node.js:
 *   node activity1_weather.js
 */

async function fetchWeather(city = 'Manila', lat = 14.5995, lon = 120.9842) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    console.log(`Connecting to Weather API (Open-Meteo) for ${city}...`);
    console.log(`Endpoint: ${url}\n`);

    try {
        const response = await fetch(url);
        console.log(`HTTP Response Status Code: ${response.status} ${response.statusText}`);

        const data = await response.json();
        const current = data.current_weather || {};
        const units = data.current_weather_units || {};

        console.log('='.repeat(55));
        console.log(`         WEATHER API RESPONSE DATA (${city.toUpperCase()})        `);
        console.log('='.repeat(55));
        console.log(`1. City / Location    : ${city} (Lat: ${lat}, Lon: ${lon})`);
        console.log(`2. Current Temperature: ${current.temperature || 'N/A'} ${units.temperature || '°C'}`);
        console.log(`3. Wind Speed         : ${current.windspeed || 'N/A'} ${units.windspeed || 'km/h'}`);
        console.log('='.repeat(55));

        console.log('\nExtracted JSON object ("current_weather"):');
        console.log(JSON.stringify(current, null, 2));

    } catch (error) {
        console.error('Error fetching Weather API:', error.message);
    }
}

// Execute function
fetchWeather('Manila', 14.5995, 120.9842);

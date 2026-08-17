/**
 * Activity 1: API Fundamentals - Frontend JavaScript Logic
 */

function switchTab(tabName) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.api-section').forEach(sec => sec.classList.remove('active'));

  document.getElementById(`tab-${tabName}`).classList.add('active');
  document.getElementById(`section-${tabName}`).classList.add('active');
}

// 1. Cat Facts API Fetcher
async function fetchCatFactUI() {
  const textElem = document.getElementById('cat-fact-text');
  const lengthElem = document.getElementById('cat-fact-length');
  const rawElem = document.getElementById('cat-raw-json');
  const statusElem = document.getElementById('cat-status');
  const spinner = document.getElementById('cat-spinner');

  spinner.style.display = 'inline-block';
  statusElem.textContent = 'Status: Fetching...';
  statusElem.style.color = '#f59e0b';

  try {
    const url = 'https://catfact.ninja/fact';
    const response = await fetch(url);
    const data = await response.json();

    // Display extracted fields
    textElem.textContent = `"${data.fact}"`;
    lengthElem.textContent = data.length;
    rawElem.textContent = JSON.stringify(data, null, 2);

    statusElem.textContent = `Status: ${response.status} OK`;
    statusElem.style.color = '#4ade80';
  } catch (error) {
    textElem.textContent = 'Failed to fetch data from Cat Facts API.';
    lengthElem.textContent = '--';
    rawElem.textContent = `Error: ${error.message}`;
    statusElem.textContent = 'Status: Error';
    statusElem.style.color = '#f87171';
  } finally {
    spinner.style.display = 'none';
  }
}

// 2. Weather API Fetcher
async function fetchWeatherUI() {
  const citySelect = document.getElementById('city-select');
  const selectedOption = citySelect.options[citySelect.selectedIndex];
  const cityName = selectedOption.value;
  const lat = selectedOption.getAttribute('data-lat');
  const lon = selectedOption.getAttribute('data-lon');

  const locElem = document.getElementById('weather-location');
  const coordsElem = document.getElementById('weather-coords');
  const tempElem = document.getElementById('weather-temp');
  const windElem = document.getElementById('weather-wind');
  const rawElem = document.getElementById('weather-raw-json');
  const statusElem = document.getElementById('weather-status');
  const spinner = document.getElementById('weather-spinner');

  spinner.style.display = 'inline-block';
  statusElem.textContent = 'Status: Fetching...';
  statusElem.style.color = '#f59e0b';

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const response = await fetch(url);
    const data = await response.json();

    const current = data.current_weather || {};
    const units = data.current_weather_units || {};

    locElem.textContent = cityName;
    coordsElem.textContent = `Lat: ${lat}, Lon: ${lon}`;
    tempElem.textContent = current.temperature !== undefined ? current.temperature : '--';
    windElem.textContent = `Wind: ${current.windspeed || '--'} ${units.windspeed || 'km/h'}`;
    rawElem.textContent = JSON.stringify(data, null, 2);

    statusElem.textContent = `Status: ${response.status} OK`;
    statusElem.style.color = '#4ade80';
  } catch (error) {
    locElem.textContent = cityName;
    tempElem.textContent = '--';
    rawElem.textContent = `Error: ${error.message}`;
    statusElem.textContent = 'Status: Error';
    statusElem.style.color = '#f87171';
  } finally {
    spinner.style.display = 'none';
  }
}

// Automatically fetch initial data on page load
window.addEventListener('DOMContentLoaded', () => {
  fetchCatFactUI();
  fetchWeatherUI();
});

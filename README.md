# Activity 1: API Fundamentals

## Objective
To introduce APIs by interacting with real-world public data endpoints in Python and JavaScript before studying formal theory.

---

## 📁 Repository Structure

```
IPT-PROJECTS/
├── activity1_catfacts.py   # Python solution fetching Cat Facts API
├── activity1_weather.py    # Python solution fetching Weather API
├── activity1_catfacts.js    # Node.js solution fetching Cat Facts API
├── activity1_weather.js     # Node.js solution fetching Weather API
├── index.html              # Web Application UI for Interactive API Showcase
├── style.css               # Modern glassmorphic dark theme CSS
├── app.js                  # Frontend JavaScript fetch implementation
└── README.md               # Documentation & Activity Guide
```

---

## 🚀 How to Run

### 1. Python Solutions

#### Cat Facts API (Python)
Fetches random cat facts from `https://catfact.ninja/fact`.
```bash
python3 activity1_catfacts.py
```

#### Weather API (Python)
Fetches temperature and location data from Open-Meteo Weather API (`https://api.open-meteo.com/v1/forecast`).
```bash
python3 activity1_weather.py
```

---

### 2. JavaScript / Node.js Solutions

#### Cat Facts API (Node.js)
```bash
node activity1_catfacts.js
```

#### Weather API (Node.js)
```bash
node activity1_weather.js
```

---

### 3. Interactive Web Application (Browser)

Open `index.html` directly in any web browser, or serve it using Python's built-in HTTP server:
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

---

## 📊 Extracted JSON Fields Summary

| API Name | Endpoint URL | Field 1 Extracted | Field 2 Extracted |
| :--- | :--- | :--- | :--- |
| **Cat Facts API** | `https://catfact.ninja/fact` | `fact` *(Fact Text)* | `length` *(Character Count)* |
| **Weather API** | `https://api.open-meteo.com/v1/forecast` | `location` / `city` *(City Name)* | `temperature` *(°C Temp Data)* |

---

## 🔍 Code Walkthrough & JSON Schema

### 1. Cat Facts API Response
```json
{
  "fact": "Cats can jump up to 6 times their length.",
  "length": 41
}
```
* **Field 1 (`fact`)**: The fact statement string.
* **Field 2 (`length`)**: The character length of the fact.

### 2. Weather API Response
```json
{
  "current_weather": {
    "temperature": 26.9,
    "windspeed": 19.9
  }
}
```
* **Field 1 (`location`)**: User requested location (e.g., Manila).
* **Field 2 (`temperature`)**: Current temperature value in Celsius (`26.9 °C`).

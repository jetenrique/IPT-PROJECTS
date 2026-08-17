#!/usr/bin/env python3
"""
Activity 1: API Fundamentals - Weather API (Python)
---------------------------------------------------
Objective: Connect to a public Weather API, fetch temperature data, 
and display at least two fields (City/Location & Temperature) from the JSON response.

Includes support for:
1. Open-Meteo Public API (Keyless / Works out of the box)
2. OpenWeather API (Requires API Key)
"""

import json
import urllib.request
import urllib.parse
import sys

def fetch_weather_open_meteo(city_name="Manila", lat=14.5995, lon=120.9842):
    """Fetches weather data from Open-Meteo public API (No key required)."""
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
    print(f"Connecting to Weather API (Open-Meteo) for {city_name}...")
    print(f"Endpoint: {url}\n")
    
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Python API Activity)"})
        with urllib.request.urlopen(req) as response:
            status_code = response.getcode()
            print(f"HTTP Response Status Code: {status_code} OK")
            
            raw_data = response.read().decode('utf-8')
            data = json.loads(raw_data)
            
            # Extract fields from JSON response
            current = data.get("current_weather", {})
            temp_celsius = current.get("temperature", "N/A")
            wind_speed = current.get("windspeed", "N/A")
            units = data.get("current_weather_units", {})
            temp_unit = units.get("temperature", "°C")
            wind_unit = units.get("windspeed", "km/h")
            
            print("=" * 55)
            print(f"         WEATHER API RESPONSE DATA ({city_name.upper()})        ")
            print("=" * 55)
            print(f"1. City / Location    : {city_name} (Lat: {lat}, Lon: {lon})")
            print(f"2. Current Temperature: {temp_celsius} {temp_unit}")
            print(f"3. Wind Speed         : {wind_speed} {wind_unit}")
            print("=" * 55)
            print("\nExtracted JSON object ('current_weather'):")
            print(json.dumps(current, indent=2))
            
    except urllib.error.URLError as e:
        print(f"Error fetching weather data: {e}", file=sys.stderr)

def fetch_weather_openweather(city_name="Manila", api_key="YOUR_API_KEY_HERE"):
    """Fetches weather data from OpenWeather API if an API key is provided."""
    encoded_city = urllib.parse.quote(city_name)
    url = f"https://api.openweathermap.org/data/2.5/weather?q={encoded_city}&units=metric&appid={api_key}"
    print(f"\nConnecting to OpenWeather API for {city_name}...")
    
    if api_key == "YOUR_API_KEY_HERE":
        print("Note: To use OpenWeather API, replace 'YOUR_API_KEY_HERE' with a valid OpenWeather API Key.")
        return
        
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Python API Activity)"})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            
            # Extract fields: City Name & Temperature
            name = data.get("name", city_name)
            main_data = data.get("main", {})
            temp = main_data.get("temp", "N/A")
            weather_desc = data.get("weather", [{}])[0].get("description", "N/A")
            
            print("=" * 55)
            print("         OPENWEATHER API RESPONSE DATA         ")
            print("=" * 55)
            print(f"1. City Name   : {name}")
            print(f"2. Temperature : {temp} °C ({weather_desc.capitalize()})")
            print("=" * 55)
            
    except urllib.error.URLError as e:
        print(f"Error connecting to OpenWeather API: {e}", file=sys.stderr)

if __name__ == "__main__":
    # Execute weather fetch
    fetch_weather_open_meteo("Manila", lat=14.5995, lon=120.9842)
    fetch_weather_openweather("Manila", "YOUR_API_KEY_HERE")

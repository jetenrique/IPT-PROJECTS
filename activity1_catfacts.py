#!/usr/bin/env python3
"""
Activity 1: API Fundamentals - Cat Facts API (Python)
------------------------------------------------------
Objective: Connect to a public API, fetch real data, and display at least two fields
from the JSON response.

API Endpoint: https://catfact.ninja/fact
Response JSON Format:
{
    "fact": "A cat's hearing is much more sensitive than a human's or a dog's.",
    "length": 65
}
"""

import json
import urllib.request
import sys

def fetch_cat_fact():
    url = "https://catfact.ninja/fact"
    print(f"Connecting to Public API: {url} ...\n")
    
    try:
        # Step 1: Send HTTP GET request to the API
        req = urllib.request.Request(
            url, 
            headers={"User-Agent": "Mozilla/5.0 (API Activity Demo)"}
        )
        
        with urllib.request.urlopen(req) as response:
            status_code = response.getcode()
            print(f"HTTP Response Status Code: {status_code} OK")
            
            # Step 2: Read raw response data
            raw_data = response.read().decode('utf-8')
            
            # Step 3: Parse JSON data into a Python dictionary
            data = json.loads(raw_data)
            
            print("=" * 55)
            print("         CAT FACTS API - JSON RESPONSE DATA        ")
            print("=" * 55)
            
            # Step 4: Extract and display at least two fields from JSON
            fact_text = data.get("fact", "N/A")
            fact_length = data.get("length", 0)
            
            print(f"1. Fact Text   : {fact_text}")
            print(f"2. Text Length : {fact_length} characters")
            print("=" * 55)
            print("\nFull JSON Response Received:")
            print(json.dumps(data, indent=2))
            
    except urllib.error.URLError as e:
        print(f"Error connecting to API: {e}", file=sys.stderr)
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}", file=sys.stderr)

if __name__ == "__main__":
    fetch_cat_fact()

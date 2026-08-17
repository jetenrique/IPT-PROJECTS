/**
 * Activity 1: API Fundamentals - Cat Facts API (JavaScript / Node.js)
 * -------------------------------------------------------------------
 * Objective: Connect to a public API using fetch(), parse JSON, 
 * and display at least two fields (fact text and text length).
 * 
 * Run using Node.js:
 *   node activity1_catfacts.js
 */

async function fetchCatFact() {
    const url = 'https://catfact.ninja/fact';
    console.log(`Connecting to Public API: ${url} ...\n`);

    try {
        // Step 1: Send HTTP GET request
        const response = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Node.js API Activity)' }
        });

        console.log(`HTTP Response Status Code: ${response.status} ${response.statusText}`);

        // Step 2: Parse response stream into JSON object
        const data = await response.json();

        // Step 3: Extract and display at least two fields from JSON
        const factText = data.fact;
        const factLength = data.length;

        console.log('='.repeat(55));
        console.log('         CAT FACTS API - JSON RESPONSE DATA        ');
        console.log('='.repeat(55));
        console.log(`1. Fact Text   : ${factText}`);
        console.log(`2. Text Length : ${factLength} characters`);
        console.log('='.repeat(55));

        console.log('\nFull JSON Response Received:');
        console.log(JSON.stringify(data, null, 2));

    } catch (error) {
        console.error('Error fetching API:', error.message);
    }
}

// Execute function
fetchCatFact();

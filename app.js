//Settings
const zip = "11768";
const APIURL = "https://api.openweathermap.org/data/2.5/weather";
const ApiKey = "c78a1f4d585006ddf654876e854ca98f";

//Require https module
const https = require('https');
//Require http module for status codes
const http = require('http');

//Print Error Messages
function printError(error) {
  console.error(error.message);
}

//Function to print message to console
function printMessage(zipcode, city, temp) {
  const message = `${zipcode} in zip code ${zipcode} current temp is ${temp}`;
  console.log(message);
}

try {    
    
    const request = https.get(`${APIURL}?zip=${zip},us&APPID=${ApiKey}`, response => {
    if (response.statusCode === 200) {
        let body = "";
        // Read the data
        response.on('data', data => {
        body += data.toString();
        });

        response.on('end', () => {
            try {
                // Parse the data
                const weather = JSON.parse(body);                            
                // Print the data
                printMessage(zip, weather.city, weather.main.temp);
            } catch (error) {
                printError(error);
            }
        });
    } else {
        const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);
    }
    });
    request.on('error', printError);
  } catch (error) {
    printError(error);
}
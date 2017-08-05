//Require https module
const https = require('https');
const api = require('./api.json');

//Print Error Messages
function printError(error) {
  console.error(error.message);
}

//Function to print message to console
function printWeather(weather) {
  const message = `Current temperature in ${weather.location.city} (zip code ${weather.location.zip}) is ${weather.current_observation.temp_f}F`;
  console.log(message);
}

function get(query) {
    try {
        https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`,
        response =>  {
            if (response.statusCode === 200) {
                let body = "";
                response.on('data', chunk => {
                    body += chunk;
                });
                response.on('end', () => {
                    try {
                        const weather = JSON.parse(body); 
                        if(weather.location) {
                            printWeather(weather);
                        }
                        else {
                            const queryError = new Error('Error with the query');
                            printError(queryError);
                        }
                    } catch (error) {
                        printError(error);
                    }
                });            
            } else {
                const message = `There was an error getting the weather for ${query} (${http.STATUS_CODES[response.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }        
        });    
    } catch(error) {
        printError(error);
    }
}

module.exports.get = get;
const weather = require('./weather');
const query = process.argv.slice(2).join("_").replace(' ', '_');
//query: 11768
//query: Cleveland_OH
//query: London_England
weather.get(query);
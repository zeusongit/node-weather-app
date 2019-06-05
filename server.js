const fs = require('fs');
const express = require('express');

const utils = require(__dirname+'/utils/utils.js');

const port = process.env.PORT || 3002;
var server = express();

server.set('view engine', 'hbs');
server.use(express.static(__dirname +   '/public'));

server.get('/', (req, res) => {
    res.render('home.hbs');
})

server.get('/weather/address/json', (req, res) => {
    const address = req.query.address;
    if (!address)
    {
        res.send(`please provide address`);
    }
    let weatherJSON = {};
    utils.getCoords(address).then((location) => {
        weatherJSON.location = location
        return utils.getWeather(location);
    }).then((weather) => {
        weatherJSON.summary = weather.summary;
        weatherJSON.temperature = weather.temperature;
        weatherJSON.feelslike = weather.apparentTemperature;
        res.send(weatherJSON);
    }).catch((err) => {
        console.log(err);
        fs.appendFile('server.log', new Date() + '  	' + err);
        res.send({});
    })
})

server.get('/weather/location/json', (req, res) => {
    let location = {};
    location.lat = req.query.lat;
    location.lng = req.query.lng;

    if (location.lat && location.lng)
    {
        let weatherJSON = {};
        utils.getWeather(location).then ((weather)=> {
            weatherJSON.summary = weather.summary;
            weatherJSON.temperature = weather.temperature;
            weatherJSON.feelslike = weather.apparentTemperature;
            weatherJSON.location = location;
            return utils.getAddress(location);
        }).then((address) => {
            weatherJSON.location.address = address;
            res.send(weatherJSON);
        })
        .catch((err)=> { 
            console.log(err);
            fs.appendFile('error.log', new Date() + '   ' +err);
            res.send({});
        })
    }
    else
    {
        res.send({});
    }
})

server.get('/address/reverse/json',(req, res) => {
    let location = {};
    location.lat = req.query.lat;
    location.lng = req.query.lng;

    if (location.lat && location.lng)
    {
        utils.getAddress(location).then((address) => {

        })
    }
    res.send({})
})

server.listen(port, (error)=> {
    if (error)
    {
        console.log(error)
        fs.appendFile('startuplogs.txt', new Date() +   '   '   +   error);

    }
    else{
        console.log(`server @ ${port}`);
        console.log(`geocode key: ${utils.geocode_key}`);
        console.log(`darksky key: ${utils.darksky_key}`);
    }
});

const request   =   require('request');
const fs        =   require('fs');
const licenseUtils   =   require(__dirname+'/../licenseUtils/licenseUtils.js');

const keys = licenseUtils.keys;

const geocode_key = keys.geocode_key
const darksky_key = keys.darksky_key

const getCoords = (address) => {
    return new Promise((resolve, reject) => {
        if (geocode_key)
        {
            if (!address) {
                reject(Error('please provide address'));
            }
    
            let uri = encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geocode_key}`);
            makeRequest(uri).then((response) => {
                if (response.body.status==='OK'){
                    let location = response.body.results[0].geometry.location;
                    location.address = response.body.results[0].formatted_address;
                    resolve(location);
                }
                    
                console.log(response.body.results.length);
                console.log(response.body.status)
                reject(`invalid address`);
                
            })
        }
        else{
            reject(Error('please provide a geocode key'));
        }
        


    })
}

const makeRequest = (uri) => {
    return new Promise((resolve, reject) => {
        if (!uri)
        {
            reject(Error(`no uri provided`));
        }
        request({uri, json: true}
            , (error, response, body) => {
        
            if (error)
                {
                    reject(Error(error.toString()));
                }
                if (response.statusCode!=200 )
                {
                    reject(Error(`invalid request`));
                }
                resolve(response);
        })
    })
}


const getWeather = (location) => {
    return new Promise((resolve, reject) => {
        if (darksky_key)
        {
            if (!location)
            {   
                reject(Error(`no location information`))
            }

            let uri = encodeURI(`https://api.darksky.net/forecast/${darksky_key}/${location.lat},${location.lng}`);

            makeRequest(uri).then((response) => {
                resolve(response.body.currently);
            })
        }
        
        else{
            reject(Error(`please provide a darksky`));
        }

    })
}



const getAddress = (coords) => {
    return new Promise((resolve, reject) => {
        if (geocode_key)
        {
            console.log("GEOCODE: "+geocode_key);
            if (!coords.lat || !coords.lng)
            {
                reject(Error(`no latitude and longitude`));
            }
            let uri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${geocode_key}`;
            console.log(uri);
            makeRequest(uri).then((response) => {
                if (response.body.status=== "OK"){
                    resolve(response.body.results[0].formatted_address);
                }
                else {
                    console.log(response.body);
                    reject(Error(`invalid location`+ coords.toString()));
                }
                
            })
        }
        else{
            reject(Error(`please provide a geocode key`));
        }
    })
}


module.exports = {
    getCoords,
    getWeather,
    getAddress,
    darksky_key,
    geocode_key
}



const licUtils = require('./licenseUtils.js');

it ('should return license and api keys', () => {


    let keys = licUtils.keys;
    if (!keys.geocode_key || !keys.darksky_key)
    {
        throw Error('no api keys  available');
    }

});
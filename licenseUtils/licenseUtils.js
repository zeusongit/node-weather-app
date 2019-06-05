const fs = require('fs');


const getLicense = function(){
    let lic = {}

    if (process.env.geocode_key && process.env.darksky_key)
    {   
        lic.geocode_key = process.env.geocode_key;
        lic.darksky_key = process.env.darksky_key;
        return lic;
    }
    else
    {
        try {
            lic = JSON.parse(fs.readFileSync(__dirname+'/../keys/keys.lic'));
        } catch (error) {
            console.log(error);
            lic = {};
        }
        
    }
    return lic;
    
    
}

const lic = getLicense();

module.exports = {
    keys: lic
}
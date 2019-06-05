const request = require('request');

request.get('https://s3.amazonaws.com/vrs1211-images/InkedIMG_1296_LI.jpg',(err, res, body) => {
    console.log(res);
})
var getLocation = new Promise((resolve, reject) => {
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(position) {
            let location = {
                "lat":    position.coords.latitude,
                "lng":    position.coords.longitude 
            }
            console.log(location);
            resolve (location);
        })
    }
    else{
        console.log(`no geolocation api supported`);
        reject(Error(`geolocation not supported. Cannot locate you`));
    }
})

document.addEventListener('DOMContentLoaded', function() {

    var weatherDiv = document.getElementById('user-weather');
    getLocation.then((location) => {
        console.log(location);
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET',`/weather/location/json?lat=${location.lat}&lng=${location.lng}&t=`+(new Date()).getTime+Math.random()*101, true);
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){                
                weatherDiv.innerHTML = this.responseText;
            }
        }
        xhttp.send();
    }).catch((err) => {
        weatherDiv.innerHTML = err;
    })

  
    // if (location)
    // {
    //     var xhttp = new XMLHttpRequest();
    //     xhttp.open('GET',`/weather/location/json?lat=${location.lat}&lng=${location.lng}`, true);
    //     xhttp.onreadystatechange = function(){
    //         if (this.readyState == 4 && this.status == 200){                
    //             weatherDiv.innerHTML = this.responseText;
    //         }
    //     }
    // }
    // else{
    //     weatherDiv.innerHTML = 'your browser does not support geo location API. Cannoto Detect your location';
    // }

}, false);
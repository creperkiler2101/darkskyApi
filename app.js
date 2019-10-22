const timezoneContainer = document.getElementsByClassName("location-timezone")[0];
const fullTempContainer = document.getElementsByClassName("degree-section")[0];
const tempContainer = document.getElementsByClassName("temperature-degree")[0];
const symContainer = fullTempContainer.getElementsByTagName("span")[0];

let temp = -404;
let isFahrenheit = true;

window.addEventListener("load", () => {
    let long = 24.7037952;
    let lat = 59.4075648;

    if ("geolocation" in navigator) {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        console.log(long);
        console.log(lat);
    }

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api = `${proxy}https://api.darksky.net/forecast/a4bfe3b6420e0b1c387a7aba9b0d45d4/${lat},${long}`;

    fetch(api).then(data => data.json()).then(json => {
        console.log(json);
        timezoneContainer.innerHTML = json.timezone;
        temp = json.currently.apparentTemperature;
        tempContainer.innerHTML = temp;
    });
});

fullTempContainer.addEventListener("click", () => {
    isFahrenheit = !isFahrenheit;

    if (isFahrenheit) {
        tempContainer.innerHTML = temp;
        symContainer.innerHTML = "F°";
    }
    else {
        tempContainer.innerHTML = Math.round(5 / 9 * (temp - 32) * 100) / 100;
        symContainer.innerHTML = "C°";
    }
});
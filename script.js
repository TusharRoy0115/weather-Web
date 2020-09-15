//const api = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=c4cb5822cae3202d6645aaaa38ec751b";

let searchbox = document.querySelector(".search-box");

searchbox.addEventListener('keypress', SearchCity);

function SearchCity(e) {
    if (e.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults(task) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${task}&units=metric&APPID=c4cb5822cae3202d6645aaaa38ec751b`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;


    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    let weatherDescription = document.querySelector('.weather');

    weatherDescription.innerText = weather.weather[0].main;
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.floor(weather.main.temp_min)}°c/${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];


    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
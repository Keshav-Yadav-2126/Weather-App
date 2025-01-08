import { apiCall } from "./weather-api.js";

window.addEventListener("load", () => {
    date();
    document.querySelector(".search-box i").addEventListener("click", search);
    document.querySelector(".main-cont").style.display = "none";

    if (localStorage.city) {
        document.querySelector("#search").value = localStorage.getItem("city");
        search();
    }
});

function date() {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date();
    let current_date = document.querySelector(".date");
    current_date.innerHTML = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
}

async function fetchWeather(name) {
    try {
        const data = await apiCall(name);

        if (data.error) {
            showError("City not found! Please try again.");
            return;
        }

        status(data);
    } catch (error) {
        showError("Something went wrong. Please try again later.");
    }
}

function status(data) {

    let city_name = document.querySelector(".city");
    let temp = document.querySelector(".temp");
    let weather_desc = document.querySelector(".weather-desc");
    let weather_img = document.querySelector(".weather-img img");
    let min = document.querySelector(".min");
    let max = document.querySelector(".max");
    let humid = document.querySelector(".humidity");
    let wind = document.querySelector(".wind");

    city_name.innerHTML = `${data.location.name}`;
    temp.innerHTML = `${Math.floor(data.current.temp_c)}`;
    weather_desc.innerHTML = `${data.current.condition.text}`;
    weather_img.src = `${data.current.condition.icon}`;
    max.innerHTML = `/${Math.floor(data.forecast.forecastday[0].day.maxtemp_c)}`;
    min.innerHTML = Math.floor(data.forecast.forecastday[0].day.mintemp_c);
    humid.innerHTML = `${data.current.humidity}%`;
    wind.innerHTML = `${Math.floor(data.current.wind_kph)} KM/H`;

    document.querySelector(".main-cont").style.display = "flex";
    hideError();
}

function search() {
    let name = document.querySelector("#search").value;
    fetchWeather(name);
    save(name);
}

function save(city) {
    if (localStorage) {
        localStorage.city = city;
    }
}

function showError(message) {
    document.querySelector(".city").innerHTML = "";

    let errorBox = document.querySelector(".error-message");

    if (!errorBox) {
        errorBox = document.createElement("div");
        errorBox.className = "error-message bg-red-500 text-white text-center p-3 rounded-xl";
        document.querySelector(".wrapper").prepend(errorBox);
    }

    errorBox.textContent = message;
    document.querySelector(".main-cont").style.display = "none";
}


function hideError() {
    let errorBox = document.querySelector(".error-message");
    if (errorBox) {
        errorBox.remove();
    }
}

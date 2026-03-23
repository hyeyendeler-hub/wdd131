// Uganda Place Page JavaScript

// Static weather values for Uganda (Kampala)
// Temperature in Celsius and Wind speed in km/h
const temperatureC = 28;
const windSpeedKmh = 12;

// Wind Chill Calculation Function (Metric)
// Formula: Wind Chill = 13.12 + 0.6215*T - 11.37*(V^0.16) + 0.3965*T*(V^0.16)
// where T = temperature in Celsius, V = wind speed in km/h
// Returns N/A if conditions are not met (temp > 10°C or wind <= 4.8 km/h)
const calculateWindChill = (temp, wind) => 
    (temp <= 10 && wind > 4.8) 
        ? Math.round((13.12 + (0.6215 * temp) - (11.37 * Math.pow(wind, 0.16)) + (0.3965 * temp * Math.pow(wind, 0.16))) * 10) / 10
        : "N/A";

// Display wind chill on page load
function displayWindChill() {
    const windChillElement = document.getElementById('windchill-result');
    if (windChillElement) {
        windChillElement.textContent = calculateWindChill(temperatureC, windSpeedKmh);
    }
}

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });
}

// Set current year in footer
const yearSpan = document.getElementById('currentyear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Set last modified date in footer
const lastModified = document.getElementById('lastModified');
if (lastModified) {
    const modDate = new Date(document.lastModified);
    lastModified.textContent = `Last Modified: ${modDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
}

// Execute on page load
document.addEventListener('DOMContentLoaded', displayWindChill);

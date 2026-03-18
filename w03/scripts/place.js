// W03 Country Page – Uganda
// Wind Chill Calculator & Dynamic Date

// ── Dynamic footer dates ──────────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastmod').textContent = document.lastModified;

// ── Wind Chill Calculation ────────────────────────────────────────────────
// Formula (NWS): WC = 35.74 + 0.6215T - 35.75(V^0.16) + 0.4275T(V^0.16)
// Conditions: Temperature ≤ 50°F  AND  Wind Speed > 3 mph

/**
 * Calculates the wind chill factor.
 * @param {number} temp  - Temperature in °F
 * @param {number} speed - Wind speed in mph
 * @returns {number} Wind chill temperature in °F (rounded to 1 decimal)
 */
function calculateWindChill(temp, speed) {
  return (35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16)).toFixed(1);
}

// ── Apply wind chill if conditions are met ─────────────────────────────────
const temperature = parseFloat(document.getElementById('temperature').textContent);
const windSpeed   = parseFloat(document.getElementById('windspeed').textContent);
const windchillEl = document.getElementById('windchill');

if (temperature <= 50 && windSpeed > 3) {
  windchillEl.textContent = `${calculateWindChill(temperature, windSpeed)}°F`;
} else {
  windchillEl.textContent = 'N/A';
}

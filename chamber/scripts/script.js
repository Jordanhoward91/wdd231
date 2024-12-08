document.addEventListener("DOMContentLoaded", function () {
  // Set current year
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Set last modified
  const lastModifiedElement = document.getElementById("last-modified");
  if (lastModifiedElement) {
    lastModifiedElement.textContent = document.lastModified;
  }

  // Weather API
  const weatherContainer = document.getElementById("weather-info");
  if (weatherContainer) {
    const apiKey = '407fd750375e864d1311169e64467610'; // Replace with your valid API key
    const city = 'Boise,US';

    // Fetch current weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data.");
        }
        return response.json();
      })
      .then(data => {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        // Display the data
        weatherContainer.innerHTML = `
          <p>Temperature: ${temperature}&deg;F</p>
          <p>Description: ${description}</p>
          <img src="${icon}" alt="Weather icon">
        `;
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
        weatherContainer.innerHTML = "<p>Could not load current weather data.</p>";
      });

    // Fetch 3-day forecast
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch forecast data.");
        }
        return response.json();
      })
      .then(data => {
        const forecast = data.list.filter((_, index) => index % 8 === 0).slice(0, 3);
        const forecastHTML = forecast.map(day => `
          <p>${new Date(day.dt_txt).toLocaleDateString()}: ${day.main.temp}&deg;F, ${day.weather[0].description}</p>
        `).join('');
        weatherContainer.innerHTML += `<div class="forecast">${forecastHTML}</div>`;
      })
      .catch(error => {
        console.error("Error fetching forecast data:", error);
        weatherContainer.innerHTML += "<p>Could not load forecast data.</p>";
      });
  }

  // Load spotlights
  const spotlightContainer = document.querySelector(".company-spotlights");
  if (spotlightContainer) {
    fetch("data/members.json")
      .then(response => response.json())
      .then(data => {
        const goldSilver = data.members.filter(member =>
          member.membershipLevel === "Gold" || member.membershipLevel === "Silver"
        );
        const randomMembers = goldSilver.sort(() => Math.random() - 0.5).slice(0, 3);
        const spotlightHTML = randomMembers.map(member => `
          <div class="spotlight">
            <img src="${member.logo}" alt="${member.name} logo" class="spotlight-image">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership-level">${member.membershipLevel} Member</p>
          </div>
        `).join('');
        spotlightContainer.innerHTML = spotlightHTML;
      })
      .catch(error => {
        console.error("Error loading spotlights:", error);
        spotlightContainer.innerHTML = "<p>Could not load spotlight data.</p>";
      });
  }
});

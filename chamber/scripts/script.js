document.addEventListener("DOMContentLoaded", () => {
  // Update the year in the footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Update last modification date
  document.getElementById("last-modified").textContent = document.lastModified;

  const directory = document.getElementById("member-directory");
  const gridViewBtn = document.getElementById("grid-view");
  const listViewBtn = document.getElementById("list-view");

  // Fetch member data
  async function fetchMembers() {
    try {
      const response = await fetch("data/members.json");
      const members = await response.json();
      displayMembers(members);
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  }

  // Display members in the chosen layout
  function displayMembers(members) {
    directory.innerHTML = ""; // Clear existing content
    members.forEach(member => {
      const memberElement = document.createElement("div");
      memberElement.classList.add("member-card");
      memberElement.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      `;
      directory.appendChild(memberElement);
    });
  }

  // Toggle view
  gridViewBtn.addEventListener("click", () => {
    directory.classList.remove("list-view");
    directory.classList.add("grid-view");
  });

  listViewBtn.addEventListener("click", () => {
    directory.classList.remove("grid-view");
    directory.classList.add("list-view");
  });

  // Fetch and display current weather (for demonstration purposes)
  fetch('https://api.openweathermap.org/data/2.5/weather?q=San Miguel&units=imperial&appid=your_api_key')
    .then(response => response.json())
    .then(data => {
      const weatherElement = document.getElementById('weather-info');
      const temp = data.main.temp;
      const weatherDescription = data.weather[0].description;
      weatherElement.innerHTML = `<p>Current Temperature: ${temp}°F</p><p>${weatherDescription}</p>`;
    })
    .catch(error => {
      document.getElementById('weather-info').innerHTML = `<p>Unable to fetch weather data.</p>`;
    });

  fetchMembers();
});

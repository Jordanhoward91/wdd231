// Fetch the data from members.json
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();

    const directoryContainer = document.getElementById('directory-container');

    // Loop through each member
    for (let member of members) {
      const memberCard = document.createElement('div');
      memberCard.classList.add('member-card');

      // Fetch random image from Unsplash
      const image = await getRandomImage();

      // Build member card
      memberCard.innerHTML = `
        <img src="${image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membership)}</p>
      `;
      directoryContainer.appendChild(memberCard);
    }
  } catch (error) {
    console.error('Error loading member data:', error);
  }
}

// Fetch a random image from Unsplash
async function getRandomImage() {
  const apiKey = '_MLxzbiw1ZhAHHLKA2yOVApMuPuGvEDT5yyQx_ifZEA';  // Replace with your actual Unsplash Access Key
  const url = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=1&query=business,office&orientation=landscape`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Return the URL of the random image
    return data[0]?.urls?.small || 'images/default.jpg'; // Fallback to a default image if not found
  } catch (error) {
    console.error('Error fetching random image from Unsplash:', error);
    return 'images/default.jpg'; // Fallback image in case of error
  }
}

// Return membership level based on the value
function getMembershipLevel(level) {
  switch (level) {
    case 1:
      return 'Member';
    case 2:
      return 'Silver';
    case 3:
      return 'Gold';
    default:
      return 'Unknown';
  }
}

// Toggle between grid and list views
document.getElementById('grid-view').addEventListener('click', () => {
  document.getElementById('directory-container').classList.remove('list-view');
  document.getElementById('directory-container').classList.add('grid-view');
});

document.getElementById('list-view').addEventListener('click', () => {
  document.getElementById('directory-container').classList.remove('grid-view');
  document.getElementById('directory-container').classList.add('list-view');
});

// Set year and last modified date in the footer
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Load members when page is ready
window.onload = loadMembers;

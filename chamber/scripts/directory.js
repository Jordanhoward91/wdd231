// Fetch the data from members.json
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();

    const directoryContainer = document.getElementById('directory-container');

    members.forEach(member => {
      const memberCard = document.createElement('div');
      memberCard.classList.add('member-card');
      
      // Build member card
      memberCard.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membership)}</p>
      `;
      directoryContainer.appendChild(memberCard);
    });
  } catch (error) {
    console.error('Error loading member data:', error);
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

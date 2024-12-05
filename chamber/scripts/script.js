// Set the current year dynamically
document.getElementById('year').textContent = new Date().getFullYear();

// Set last modified date
document.getElementById('last-modified').textContent = document.lastModified;

// Set the timestamp value in the hidden field
document.getElementById('timestamp').value = new Date().toLocaleString();

// Modal functionality for opening and closing modals
document.querySelectorAll('.open-modal').forEach(button => {
  button.addEventListener('click', (e) => {
    const targetModal = document.querySelector(e.target.getAttribute('data-target'));
    targetModal.style.display = 'flex';
  });
});

document.querySelectorAll('.close-modal').forEach(button => {
  button.addEventListener('click', (e) => {
    e.target.closest('.modal').style.display = 'none';
  });
});

// Set the current year dynamically
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Set last modified date
const lastModifiedElement = document.getElementById('last-modified');
if (lastModifiedElement) {
  lastModifiedElement.textContent = document.lastModified;
}

// Set the timestamp value in the hidden field
const timestampElement = document.getElementById('timestamp');
if (timestampElement) {
  timestampElement.value = new Date().toLocaleString();
}

// Modal functionality for opening and closing modals
const modalOpenButtons = document.querySelectorAll('.open-modal');
const modalCloseButtons = document.querySelectorAll('.close-modal');

// Check if buttons exist before adding event listeners
if (modalOpenButtons.length > 0) {
  modalOpenButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const targetModal = document.querySelector(e.target.getAttribute('data-target'));
      if (targetModal) {
        targetModal.style.display = 'flex';
      }
    });
  });
}

if (modalCloseButtons.length > 0) {
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });
}

// Handle Last Visit Message
const visitMessage = document.getElementById('visit-message');

// Check if we have a stored last visit date
const lastVisit = localStorage.getItem('lastVisit');
const currentDate = new Date();
const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 day in milliseconds

if (lastVisit) {
  const lastVisitDate = new Date(parseInt(lastVisit, 10));
  const daysSinceLastVisit = Math.floor((currentDate - lastVisitDate) / oneDayInMilliseconds);

  if (daysSinceLastVisit === 0) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else if (daysSinceLastVisit === 1) {
    visitMessage.textContent = "You last visited 1 day ago.";
  } else {
    visitMessage.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
  }
} else {
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
}

// Store the current visit timestamp in localStorage
localStorage.setItem('lastVisit', currentDate.getTime());

// Fetch images and captions for the gallery
async function loadGallery() {
  try {
    const galleryImages = document.querySelectorAll('.gallery-grid figure img');
    const galleryCaptions = document.querySelectorAll('.gallery-grid figure figcaption');

    // Loop through each gallery image and assign a random image from Unsplash
    for (let i = 0; i < galleryImages.length; i++) {
      const { image, caption } = await getRandomImage(); // Get random image and caption from Unsplash
      galleryImages[i].setAttribute('src', image); // Set the image source
      galleryCaptions[i].textContent = caption; // Set the caption text
    }
  } catch (error) {
    console.error('Error loading gallery images:', error);
  }
}

// Fetch a random image from Unsplash and generate a caption
async function getRandomImage() {
  const apiKey = '_MLxzbiw1ZhAHHLKA2yOVApMuPuGvEDT5yyQx_ifZEA';  // Replace with your actual Unsplash Access Key
  const url = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=1&query=local,community,landscape&orientation=landscape`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const image = data[0]?.urls?.small || 'images/default.jpg';  // Image URL
    const description = data[0]?.description || data[0]?.alt_description || "A stunning view.";  // Photo description or fallback
    const tags = data[0]?.tags?.map(tag => tag.title).join(', ') || "Nature, Community, Landscape";  // Tags from Unsplash

    // Generate a caption if no description is available
    const caption = description || `A beautiful photo of ${tags}.`;

    return { image, caption };  // Return both the image URL and the caption
  } catch (error) {
    console.error('Error fetching random image from Unsplash:', error);
    return { image: 'images/default.jpg', caption: 'Default Caption' }; // Fallback values
  }
}

// Lazy Load Images
document.querySelectorAll('img.lazy').forEach(img => {
  img.setAttribute('loading', 'lazy');
});

// Set year and last modified date in the footer
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Load gallery images when the page is ready
window.onload = loadGallery;

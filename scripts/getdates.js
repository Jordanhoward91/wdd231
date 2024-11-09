// getdates.js (Updated with hamburger menu toggle)

// Get the current year
var currentYear = new Date().getFullYear();

// Get the last modified date of the document
var lastModifiedDate = document.lastModified;

// Update the copyright year in the footer's first paragraph
document.querySelector("footer p:first-child span").textContent = currentYear;

// Update the last modified date in the footer's second paragraph
document.getElementById("lastModified").textContent = "Last Modified: " + lastModifiedDate;

// Handle hamburger menu toggle
document.getElementById("hamburger-menu").addEventListener("click", function() {
    document.querySelector("nav").classList.toggle("active");
});

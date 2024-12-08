// Import required modules
const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

// Create an Express app
const app = express();
const port = 3000; // The server will run on http://localhost:3000

// Access your Unsplash API key securely from the .env file
const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;

// Define an endpoint to fetch images from Unsplash
app.get('/api/photos', async (req, res) => {
  const url = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}&count=3&query=local,community,landscape&orientation=landscape`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Return the image data to the client
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Unsplash:', error);
    res.status(500).send('Error fetching data from Unsplash');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

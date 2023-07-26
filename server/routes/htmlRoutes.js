  // Import the 'path' module, which provides utilities for working with file and directory paths
const path = require('path');

// Export a function that takes an Express application as an argument
module.exports = (app) =>
  // Register a GET handler for the root URL ("/")
  app.get('/', (req, res) =>
    // Respond to the request by sending the 'index.html' file
    // Use the 'path.join' function to create a path to the 'index.html' file
    // '__dirname' is the directory where the current script resides, so we go up one level ('../') to get to its parent directory, then down into the 'client/dist' directory
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );

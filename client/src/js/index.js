
// Import the Workbox object from the 'workbox-window' module for service worker registration
import { Workbox } from 'workbox-window';

// Import the Editor class from the 'editor' module
import Editor from './editor';

// Import the 'database' module, which is assumed to be a script that sets up a database (no objects or functions are imported from it)
import './database';

// Import the 'style.css' stylesheet
import '../css/style.css';

// Select the 'main' element from the DOM
const main = document.querySelector('#main');
// Clear any existing HTML inside the 'main' element
main.innerHTML = '';

// Define a function to create and append a loading spinner to the 'main' element
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  // Append the spinner to the 'main' element
  main.appendChild(spinner);
};

// Create a new instance of the Editor class
const editor = new Editor();

// Check if the editor instance is 'undefined' and if it is then load the spinner
if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported in the current browser
if ('serviceWorker' in navigator) {
  // Create a new Workbox instance with the '/src-sw.js' service worker file
  const workboxSW = new Workbox('/src-sw.js');
  // Register the service worker
  workboxSW.register();
} else {
  // Log an error message to the console if service workers are not supported
  console.error('Service workers are not supported in this browser.');
}

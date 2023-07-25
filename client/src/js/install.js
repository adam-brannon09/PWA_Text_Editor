// Get a reference to the installation button by its id
const butInstall = document.getElementById('buttonInstall');

// Listen for the 'beforeinstallprompt' event which is fired by the browser when the app meets the criteria for installation
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Make the installation button visible by removing the 'hidden' class
    butInstall.classList.toggle('hidden', false);
});

// Add a click event handler for the installation button
butInstall.addEventListener('click', async () => {
    // Get the deferred beforeinstallprompt event
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    // Show the installation prompt to the user
    promptEvent.prompt();
    // Hide the installation button after the prompt is shown
    butInstall.classList.toggle('hidden', true);
});

// Listen for the 'appinstalled' event which is fired when the PWA is installed
window.addEventListener('appinstalled', (event) => {
    // Clear the deferredPrompt so it can be garbage collected
    window.deferredPrompt = null;
    // Log a message that the PWA was installed
    console.log('PWA was installed');
});

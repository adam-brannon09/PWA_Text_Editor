const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container
    butInstall.classList.toggle('hidden', false);
});

//Event handler for butInstall button
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
});
if (!promptEvent) {
    return;
}
// Show the install prompt
promptEvent.prompt();
butInstall.classList.toggle('hidden', true);

//Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clear the deferredPrompt so it can be garbage collected
    window.deferredPrompt = null;
    console.log('PWA was installed');
});

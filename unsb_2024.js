(async function iife() {
    var UNSUBSCRIBE_DELAY_TIME = 2000; // Delay to allow UI updates
    var CONFIRMATION_DELAY_TIME = 1000; // Additional delay for confirmation dialog

    var runAfterDelay = (fn, delay) => new Promise((resolve) => {
        setTimeout(() => {
            fn();
            resolve();
        }, delay);
    });

    var channels = Array.from(document.querySelectorAll('ytd-channel-renderer'));
    console.log(`${channels.length} channels found.`);

    for (let i = 0; i < channels.length; i++) {
        let channel = channels[i];
        // Click the dropdown button
        let dropdownButton = channel.querySelector('button[aria-label*="nastavené prispôsobené upozornenia"]');
        if (dropdownButton) {
            dropdownButton.click();
            await runAfterDelay(async () => {
                // Target the unsubscribe option by its text content directly
                let unsubscribeOptions = Array.from(document.querySelectorAll('yt-formatted-string.style-scope.ytd-menu-service-item-renderer'));
                let unsubscribeOption = unsubscribeOptions.find(option => option.textContent === 'Zrušiť odber');
                if (unsubscribeOption) {
                    unsubscribeOption.click();
                    // Handle confirmation dialog after unsubscribe is clicked
                    await runAfterDelay(async () => {
                        // Selecting the confirm button using its aria-label for better accuracy
                        let confirmButton = document.querySelector('yt-button-renderer#confirm-button button[aria-label="Zrušiť odber"]');
                        if (confirmButton) {
                            confirmButton.click();
                            console.log(`Confirmed unsubscribe from channel ${i + 1} of ${channels.length}`);
                        } else {
                            console.log(`No confirmation button found for channel ${i + 1}`);
                        }
                    }, CONFIRMATION_DELAY_TIME);
                } else {
                    console.log(`No unsubscribe option found for channel ${i + 1}`);
                }
            }, UNSUBSCRIBE_DELAY_TIME);
        } else {
            console.log(`Dropdown button not found for channel ${i + 1}`);
        }
    }
})();

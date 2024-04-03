chrome.tabs.onCreated.addListener(async (tab) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0].pendingUrl === "https://www.linkedin.com/my-items/saved-posts/") {
            const id = tabs[0].id;
            let message = { action: "execute" };
            setTimeout(() => {
                chrome.tabs.sendMessage(tabs[0].id, message);
            }, 4000)
        }
    });
});

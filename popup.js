let showSaved = document.getElementById("show-saved");
let showAudioInput = document.getElementById("show-audio-input");

chrome.storage.sync.get("buttonState1", function (data) {
    if (data.buttonState1) {
        showSaved.setAttribute("clicked", true);
        showSaved.children[0].classList.add("left");
        showSaved.style.backgroundColor = "rgb(255, 136, 136)";
        showSaved.children[0].style.backgroundColor = "white";
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var message = { action: "visible" };
            chrome.tabs.sendMessage(tabs[0].id, message);
        });
    }
});

showSaved.addEventListener("click", () => {
    if (!showSaved.hasAttribute("clicked")) {
        showSaved.setAttribute("clicked", true);
        showSaved.children[0].classList.add("toggle");
        showSaved.style.backgroundColor = "rgb(255, 136, 136)";
        showSaved.children[0].style.backgroundColor = "white";
        // Save the state of the button
        chrome.storage.sync.set({ buttonState1: true });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var message = { action: "visible" };
            chrome.tabs.sendMessage(tabs[0].id, message);
        });
    }
    else {
        showSaved.removeAttribute("clicked");
        showSaved.children[0].classList.remove("toggle");
        showSaved.children[0].classList.remove("left");
        showSaved.style.backgroundColor = "rgb(255, 255, 255)";
        showSaved.children[0].style.backgroundColor = "gray";
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var message = { action: "invisible" };
            chrome.tabs.sendMessage(tabs[0].id, message);
        });
        chrome.storage.sync.set({ buttonState1: false });
    }
});



chrome.storage.sync.get("buttonState2", function (data) {
    if (data.buttonState2) {
        showAudioInput.setAttribute("clicked", true);
        showAudioInput.children[0].classList.add("left");
        showAudioInput.style.backgroundColor = "rgb(255, 136, 136)";
        showAudioInput.children[0].style.backgroundColor = "white";
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var message = { action: "visible2" };
            chrome.tabs.sendMessage(tabs[0].id, message);
        });
    }
});

showAudioInput.addEventListener("click", () => {
    if (!showAudioInput.hasAttribute("clicked")) {
        showAudioInput.setAttribute("clicked", true);
        showAudioInput.children[0].classList.add("toggle");
        showAudioInput.style.backgroundColor = "rgb(255, 136, 136)";
        showAudioInput.children[0].style.backgroundColor = "white";
        chrome.storage.sync.set({ buttonState2: true });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var message = { action: "visible2" };
            chrome.tabs.sendMessage(tabs[0].id, message);
        });
    }
    else {
        showAudioInput.removeAttribute("clicked");
        showAudioInput.children[0].classList.remove("toggle");
        showAudioInput.children[0].classList.remove("left");
        showAudioInput.style.backgroundColor = "rgb(255, 255, 255)";
        showAudioInput.children[0].style.backgroundColor = "gray";
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var message = { action: "invisible2" };
            chrome.tabs.sendMessage(tabs[0].id, message);
        });
        chrome.storage.sync.set({ buttonState2: false });
    }
})

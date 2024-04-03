//creating 
var linksContainer = null;
var body = null;
let savedPostsLink = document.createElement("li");
let speakButton = document.createElement("button");
savedPostsLink.classList.add("global-nav__primary-item");

const SavePostImagePath = chrome.runtime.getURL("images/diskette.png");
savedPostsLink.innerHTML = `<a class="app-aware-link global-nav__primary-link global-nav__primary-link--inactive" 
target="_blank" href="https://www.linkedin.com/my-items/saved-posts/" id="anchor-tag">
<div class="ivm-image-view-model global-nav__icon-ivm">
<div class="ivm-view-attr__img-wrapper display-flex">
<li-icon aria-hidden="true" type="bookmark-fill" class="ivm-view-attr__icon" size="large">
<img src="${SavePostImagePath}" alt="saved">
</li-icon>
</div>
</div>
<span class="t-12 break-words block t-black--light t-normal global-nav__primary-link-text">Saved Posts</span>
</a> 
`


function run() {
    linksContainer = document.querySelector("ul.global-nav__primary-items");
    linksContainer.appendChild(savedPostsLink);
    body = document.querySelector("body");
    body.appendChild(speakButton);
}

try {
    run();
}
catch (err) {
    console.log(err);
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "visible") {
        savedPostsLink.style.display = "block";
    }
    else if (message.action === "invisible") {
        savedPostsLink.style.display = "none";
    }

    else if (message.action === "visible2") {
        speakButton.style.display = "flex";
    }
    else if (message.action === "invisible2") {
        speakButton.style.display = "none";
    }
    else if (message.action === "execute") {
        run();
    }
});



//Adding voice command button to the page



speakButton.setAttribute("id", "speak-button");
speakButton.classList.add("line");

const micImagePath = chrome.runtime.getURL("images/mic.png");
speakButton.innerHTML = `<img src="${micImagePath}" alt="mic" width="30px" height="28px"></img>`;


let speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;
speechRecognition.lang = "en-us";

// let anchorTag = document.getElementById("anchor-tag");
speechRecognition.onresult = (e) => {
    console.log(e);
    let savedPostCommand = e.results[e.resultIndex][0].transcript;
    console.log(savedPostCommand);
    let text = savedPostCommand.trim().toLowerCase();
    if (text.includes("open saved posts")) {
        // anchorTag.click();
        linksContainer.children[8].children[0].click();
        speakButton.click();
        return;
    }
    else if (text.includes("open home")) {
        linksContainer.children[0].children[0].click();
    }
    else if (text.includes("open my network")) {
        linksContainer.children[1].children[0].click();
    }
    else if (text.includes("open jobs")) {
        linksContainer.children[2].children[0].click();
    }
    else if (text.includes("open messag")) {
        linksContainer.children[3].children[0].click();
    }
    else if (text.includes("open notification")) {
        linksContainer.children[4].children[0].click();
    }
    else if (text.includes("open notification")) {
        linksContainer.children[5].children[0].click();
    }
}

speakButton.addEventListener("click", () => {
    if (!speakButton.hasAttribute("listening")) {
        speakButton.setAttribute("listening", true);
        speakButton.classList.remove("line");
        speechRecognition.start();
    }
    else {
        speakButton.removeAttribute("listening");
        speakButton.classList.add("line");
        speechRecognition.stop();
    }
})







//handling messages from popup.html





//showing saved posts link and speak buttons based on the state of buttons in popup.html
savedPostsLink.style.display = "none";
speakButton.style.display = "none";
chrome.storage.sync.get("buttonState1", function (data) {
    if (data.buttonState1) {
        savedPostsLink.style.display = "block";
    }
});

chrome.storage.sync.get("buttonState2", function (data) {
    if (data.buttonState2) {
        speakButton.style.display = "flex";
    }
});

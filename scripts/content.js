//adding saved post link to navbar
let linksContainer = document.querySelector("ul.global-nav__primary-items");
let savedPostsLink = document.createElement("li");

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
linksContainer.appendChild(savedPostsLink);







//Adding voice command button to the page
let body = document.querySelector("body");

let speakButton = document.createElement("button");
speakButton.setAttribute("id", "speak-button");
speakButton.classList.add("line");

const micImagePath = chrome.runtime.getURL("images/mic.png");
speakButton.innerHTML = ` <img src="${micImagePath}" alt="mic" width="30px" height="28px"></img>`


let speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;
speechRecognition.lang = "en-us";

let anchorTag = document.getElementById("anchor-tag");
let transcript = "";
speechRecognition.onresult = (e) => {
    console.log(e);
    transcript = "";
    let savedPostCommand = e.results[e.resultIndex][0].transcript;
    console.log(savedPostCommand);
    if (savedPostCommand.trim().toLowerCase().includes("open saved posts")) {
        anchorTag.click();
        speakButton.click();
        return;
    }
    for (let i = 0; i < e.results.length; ++i) {
        transcript += e.results[i][0].transcript;
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

body.appendChild(speakButton);
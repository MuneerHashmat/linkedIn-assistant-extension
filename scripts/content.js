var linksContainer = null;
var body = null;

//creating saved posts link and speak button
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



//creating chatbot open button
let chatBotToggle = document.createElement("button");
chatBotToggle.setAttribute("id", "chatbot-toggle");
chatBotToggle.innerHTML = `
<span class="img">🤖</span>
<span class="img">✖️</span>
`

//creating chatbot window
let chatBot = document.createElement("div");
chatBot.setAttribute("id", "chatbot");
chatBot.innerHTML = `
      <div class="header">
            <h2>LinkedIn Bot</h2>
        </div>


        <div class="chatbox">
            <div class="bot-text">
            <span class="chat-img">🤖</span>
                <div>Hi there 👋 I'm your linkedIn chatbot <br>How can I help you today</div>
            </div>
        </div>

       <hr>

        <div class="form">
            <textarea placeholder="Enter a prompt...." spellcheck="false" required></textarea>

            <button>▶️</button>
        </div>
`

let typing = document.createElement("div");
typing.classList.add("bot-text");
typing.innerHTML = `
     <span class="chat-img"></span>
    <div>Generating.....</div>
`



//function to append newly created ui elements to the page
function run() {
    linksContainer = document.querySelector("ul.global-nav__primary-items");
    linksContainer.appendChild(savedPostsLink);
    body = document.querySelector("body");
    body.appendChild(speakButton);
    body.appendChild(chatBotToggle);
    body.appendChild(chatBot);
}

try {
    run();
}
catch (err) {
    console.log(err);
}


//listening to messages from popup and background scripts
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
    else if (message.action === "visible3") {
        chatBotToggle.style.display = "flex";
    }
    else if (message.action === "invisible3") {
        chatBotToggle.style.display = "none";
    }
    else if (message.action === "execute") {
        run();
    }
    else if (message.action === "textSent") {
        const markdownText = message.data;
        const md = window.markdownit();
        const text = md.render(markdownText);
        chatBot.children[1].removeChild(typing);
        let botResponse = document.createElement("div");
        botResponse.classList.add("bot-text");
        botResponse.innerHTML = `
        <span class="chat-img">🤖</span>
        <div>${text}</div>`
        chatBot.children[1].appendChild(botResponse);
    }
});




speakButton.setAttribute("id", "speak-button");
speakButton.classList.add("line");

const micImagePath = chrome.runtime.getURL("images/mic.png");
speakButton.innerHTML = `
<img src="${micImagePath}" alt = "mic" width = "30px" height = "28px">
`

//speech to text
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



//showing saved posts link, speak button and bot button based on the state of buttons in popup.html
savedPostsLink.style.display = "none";
speakButton.style.display = "none";
chatBotToggle.style.display = "none";


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

chrome.storage.sync.get("buttonState3", function (data) {
    if (data.buttonState3) {
        chatBotToggle.style.display = "flex";
    }
});



//showing chatbot upon clicking chatbot toggle button
chatBotToggle.children[0].classList.add("visible");
chatBotToggle.addEventListener("click", () => {

    if (!chatBot.hasAttribute("visible")) {
        chatBot.style.display = "block";
        chatBot.setAttribute("visible", true);
    }
    else {
        chatBot.style.display = "none";
        chatBot.removeAttribute("visible");
    }

    if (!chatBotToggle.hasAttribute("click")) {
        chatBotToggle.setAttribute("click", true);
        chatBotToggle.children[0].classList.remove("visible");
        chatBotToggle.children[1].classList.add("visible");
    }
    else {
        chatBotToggle.removeAttribute("click");
        chatBotToggle.children[1].classList.remove("visible");
        chatBotToggle.children[0].classList.add("visible");
    }

})




function chatHandler() {
    let textInput = chatBot.children[3].children[0].value.trim();
    chatBot.children[3].children[0].value = "";
    if (!textInput) {
        return;
    }
    let newInput = document.createElement("div");
    newInput.classList.add("user-text");
    newInput.innerHTML = `
            <div> <span>${textInput}</span></div>
                <span class="chat-img2">💻</span>
        `
    chatBot.children[1].appendChild(newInput);


    //sending message to background script
    chrome.runtime.sendMessage({ action: 'sendText', data: textInput });
    chatBot.children[1].appendChild(typing);
}

chatBot.children[3].children[1].addEventListener("click", chatHandler);

chatBot.children[3].children[0].addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        chatHandler();
    }
});

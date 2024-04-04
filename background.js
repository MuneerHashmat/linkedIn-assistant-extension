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

const apiKey = "AIzaSyAEMelXC-Z12ddh6xBBAG-vWi1oK-bK9O4";
import { GoogleGenerativeAI } from "./scripts/index.mjs";
const genAI = new GoogleGenerativeAI(apiKey);


chrome.runtime.onMessage.addListener(async (message) => {
    if (message.action === 'sendText') {
        const prompt = message.data;
        sendResponse(prompt);
    }
});

async function sendResponse(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const markdownText = response.text();
    console.log(markdownText);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const id = tabs[0].id;
        let message = { action: "textSent", data: markdownText };
        setTimeout(() => {
            chrome.tabs.sendMessage(tabs[0].id, message);
        }, 3000)
    });

}


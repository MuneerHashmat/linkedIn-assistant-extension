chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(tab.url);

  if (changeInfo.status === "complete" && tab.url) {
    if (tab.url.includes("https://www.linkedin.com")) {
      let message = { action: "execute" };
      setTimeout(() => {
        chrome.tabs.sendMessage(tabId, message);
      }, 4000);
    }
  }
});

const apiKey = "AIzaSyAk540Dpw8zIrm-0lNvM1cR8dEMrueoysA";
import { GoogleGenerativeAI } from "./scripts/index.mjs";
const genAI = new GoogleGenerativeAI(apiKey);

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.action === "sendText") {
    const prompt = message.data;
    sendResponse(prompt);
  }
});

async function sendResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const markdownText = response.text();
  console.log(markdownText);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const id = tabs[0].id;
    let message = { action: "textSent", data: markdownText };
    setTimeout(() => {
      chrome.tabs.sendMessage(tabs[0].id, message);
    }, 3000);
  });
}

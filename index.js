// Load Gemini from CDN
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// ⚠️ Replace with your real Gemini API key
const ai = new GoogleGenerativeAI({});

const characters = [
  "Imagine you are Harry Potter and reply to this : ",
  "Imagine you are Greg Heffley from Diary of a Wimpy Kid and reply to this : ",
  "Imagine you are James Bond and reply to this : ",
  "Imagine you are Spider Man and reply to this : ",
  "Imagine you are Captain America and reply to this : ",
  "Imagine you are Iron Man and reply to this : ",
  "Imagine you are Wolverine and reply to this : ",
  "Imagine you are Black Panther and reply to this : ",
  "Imagine you are Thor and reply to this : "
]
const people = [
  "Harry - Harry Potter",
  "Greg Heffley - Diary of a Wimpy Kid",
  "Bond - James Bond",
  "Spider Man - Marvel",
  "Captain America - Marvel",
  "Iron Man - Marvel",
  "Wolverine - Marvel",
  "Black Panther - Marvel",
  "Thor - Marvel"
]
var stpr = characters[0];

var count = 0;
var pv = true;

// Expose sendUser globally
window.sendUser = async function () {
  if (pv == true && count == 3) {window.open("about:blank","_self")}
  const input = document.getElementById("message");
  const chat = document.getElementById("viewchat");
  const sendBtn = document.getElementById("sendBtn");
  const prompt = input.value.trim();
  if (!prompt) return;

  // Disable input and button
  input.disabled = true;
  sendBtn.disabled = true;

  // Add user message
  const user = document.createElement("div");
  user.className = "su";
  user.textContent = prompt;
  chat.appendChild(user);
  chat.appendChild(document.createElement("div")).style.clear = "both";
  input.value = "";

  // Add loading indicator
  const loading = document.createElement("div");
  loading.className = "sc loading";
  loading.textContent = "Thinking...";
  chat.appendChild(loading);
  chat.scrollTop = chat.scrollHeight;

  try {
    // Generate response from Gemini
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(stpr + prompt);
    const reply = await result.response.text();

    // Replace loading with actual AI message
    loading.classList.remove("loading");
    loading.textContent = reply;
  } catch (err) {
    console.error(err);
    loading.classList.remove("loading");
    // Surface a short, user-friendly error message (helps when debugging on GH Pages)
    const msg = (err && err.message) ? err.message : String(err);
    loading.textContent = "⚠️ Error generating response: " + msg;

    // Build a detailed error block for debugging (stack, response details)
    try {
      let details = '';
      if (err && err.stack) details += err.stack + '\n';
      // Some libraries attach a `response` or `status` on the error
      if (err && err.response) {
        const r = err.response;
        if (r.status) details += 'Response status: ' + r.status + '\n';
        try {
          details += 'Response body: ' + JSON.stringify(r, null, 2) + '\n';
        } catch (e) {
          details += 'Response body: (unserializable)\n';
        }
      }
      if (!details) details = msg;

      const pre = document.createElement('pre');
      pre.className = 'error-details';
      pre.textContent = details;
      pre.style.whiteSpace = 'pre-wrap';
      pre.style.background = '#111';
      pre.style.color = '#fff';
      pre.style.padding = '8px';
      pre.style.borderRadius = '6px';
      pre.style.marginTop = '6px';
      // Append the details after the loading/error message so the user can copy it
      chat.appendChild(pre);
      chat.scrollTop = chat.scrollHeight;
    } catch (e) {
      // If anything goes wrong building the debug block, still keep the primary message
      console.error('Failed to render error details', e);
    }
  } finally {
    // Re-enable input and focus
    input.disabled = false;
    sendBtn.disabled = false;
    input.focus();
    chat.scrollTop = chat.scrollHeight;
  }
  count += 1;
};

window.openS = async function  () {
  document.getElementById("settings").style.display = "flex";
}

window.closeS = async function () {
  document.getElementById("settings").style.display = "none";
}

window.closeMA = async function () {
  document.getElementById("mode-alert").style.display = "none";
}

window.change = async function () {
  stpr = characters[parseInt(document.querySelector('input[name="radio"]:checked').value)];
  document.getElementById("message").placeholder = people[parseInt(document.querySelector('input[name="radio"]:checked').value)];
  closeS();
}

window.unlock = async function () {pv = false}

function delay(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

window.load = async function () {
  document.getElementById("loadWin").style.display = "flex";
  document.getElementById("loginWin").style.display = "none";
  document.getElementById("badge").style.display = "none";
  await delay(7000)
  startAI()
}

function startAI() {
  document.getElementById("loadWin").style.display = "none";
  document.getElementById("ai").style.display = "block";
}

window.vali = async function () {
  if (document.getElementById("un").value === "the_witch" && document.getElementById("pw").value === "7177") {
    load();
  }
}






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
    loading.textContent = "⚠️ Error generating response.";
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
  document.getElementById("loadWin").style.display = "block";
  document.getElementById("loginWin").style.display = "none";
  document.getElementById("badge").style.display = "none";
  let loadCount = 0;
  while (loadCount < 3) {
  let frame = 1
  while (frame < 10) {
    await delay(1000)
    document.getElementById("load").setAttribute("src","./load/ezgif-frame-00"+String(frame)+".jpg")
    frame+=1;
  }
  await delay(1000)
  document.getElementById("load").setAttribute("src","./load/ezgif-frame-0"+String(frame)+".jpg")
  frame +=1
  loadCount+=1;
  }
  await delay(500)
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

const chatWindow = document.getElementById("chat-output");
const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

async function sendMessageToChatAPI(userMessage, onStream) {
  const response = await fetch("https://portfolio-chatbot-v2.vercel.app/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          parts: [{ type: "text", text: userMessage }],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Create a reader for the response stream
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // Split on newline to handle SSE "data: ..." chunks
    const lines = buffer.split("\n");
    buffer = lines.pop() || ""; // keep incomplete line for next read

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try {
          const json = JSON.parse(line.substring(6));

          // Only handle the parts you care about (e.g., text streaming)
          if (json.type === "text-delta" && json.delta) {
            onStream(json.delta); // callback to update UI in real-time
          }
        } catch (e) {
          console.warn("Bad JSON line:", line);
        }
      }
    }
  }
}

sendBtn.addEventListener("click", async () => {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  const userBubble = document.createElement("div");
  userBubble.className = "chat-bubble user";
  userBubble.textContent = userMessage;
  chatWindow.appendChild(userBubble);

  input.value = ""; // ⬅ clear input after sending

  const botBubble = document.createElement("div");
  botBubble.className = "chat-bubble bot";
  chatWindow.appendChild(botBubble);

  await sendMessageToChatAPI(userMessage, (delta) => {
    botBubble.textContent += delta;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });
});

document.getElementById("chatButton").addEventListener("click", () => {
  document.getElementById("chatPopup").classList.toggle("hidden");
});

document.getElementById("chatClose").addEventListener("click", () => {
  document.getElementById("chatPopup").classList.add("hidden");
});
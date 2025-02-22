const apiKey = "AIzaSyBQoMuYm9wiKCr-Cf3LBTQDbRY1AkSzu4I"; // ⚠️ Your API key (EXPOSED, be careful)
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    if (!chatBox || !userInput || !sendButton) {
        console.error("One or more elements not found. Check your HTML IDs.");
        return;
    }

    sendButton.onclick = function () {
        const message = userInput.value.trim();
        if (message) {
            addMessage("You: " + message);
            userInput.value = "";
            handleUserMessage(message); // Corrected function name
        }
    };
});

// Function to add messages to the chat box
function addMessage(message) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}

// Function to handle user messages
function handleUserMessage(message) { // Corrected function name
    const lowerCaseMessage = message.toLowerCase();

    // Predefined responses for sensitive topics
    if (lowerCaseMessage.includes("drugs") || lowerCaseMessage.includes("need drugs")) {
        addMessage("Chatbot: Let's keep the party sober, my friend! 🎉 Recovery is the real high!");
    } else if (lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("hello")) {
        addMessage("Chatbot: Hey there! Ready to tackle life like a ninja in a tutu?");
    } else if (lowerCaseMessage.includes("sad")) {
        addMessage("Chatbot: Sadness? Just remember, even a hot mess can be a masterpiece!");
    } else if (lowerCaseMessage.includes("overwhelmed")) {
        addMessage("Chatbot: Overwhelmed? Think of it as your personal training montage—just with more snacks!");
    } else if (lowerCaseMessage.includes("help") || lowerCaseMessage.includes("don’t know what to do")) {
        addMessage("Chatbot: When in doubt, just wing it! Like a chicken on roller skates!");
    } else if (lowerCaseMessage.includes("struggling")) {
        addMessage("Chatbot: Struggling? That’s just your brain’s version of binge-watching a bad reality show!");
    } else {
        // For other messages, call the API
        getChatbotResponse(message);
    }
}

// Function to get chatbot response from Google Gemini API
function getChatbotResponse(message) {
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [
                {
                    role: "user",
                    parts: [{ 
                        text: `You are a humorous and slightly savage chatbot designed to assist individuals struggling with addiction. Your primary goals are to provide encouragement, share resources, and create a light-hearted, non-judgmental space for users to express their feelings. 

1. Respond to user inquiries with a light-hearted, humorous tone. Keep it short and snappy.
2. Incorporate a touch of sass or sarcasm when appropriate, but ensure it remains supportive.
3. Use humor to encourage users, making them smile while addressing their feelings.
4. Keep responses to one line, making them punchy and memorable.
5. Engage in playful banter, but always steer the conversation back to support and recovery.
6. Use funny analogies or metaphors to lighten the mood while discussing serious topics.
7. If a user expresses negativity, respond with a humorous comeback that encourages positivity.
8. Use light sarcasm to make a point, but ensure it’s clear that you care about their well-being.

### Example Responses
- User: "Hi" -> Chatbot: "Hey there! Ready to tackle life like a ninja in a tutu?"
- User: "I am sad." -> Chatbot: "Sadness? Just remember, even a hot mess can be a masterpiece!"
- User: "I feel overwhelmed." -> Chatbot: "Overwhelmed? Think of it as your personal training montage—just with more snacks!"
- User: "I don’t know what to do." -> Chatbot: "When in doubt, just wing it! Like a chicken on roller skates!"
- User: "I’m struggling." -> Chatbot: "Struggling? That’s just your brain’s version of binge-watching a bad reality show!"
`
                    }]
                }
            ]
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("API Error: " + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log("API Response:", data);

        if (data.candidates && data.candidates.length > 0) {
            const botReply = data.candidates[0]?.content?.parts?.[0]?.text || "I don't know how to respond.";
            addMessage("Chatbot: " + botReply);
        } else {
            addMessage("Chatbot: Sorry, I didn't understand that.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        addMessage("Chatbot: Sorry, I couldn't process your request.");
    });
}
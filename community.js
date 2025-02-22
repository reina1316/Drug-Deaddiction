document.addEventListener("DOMContentLoaded", function () {
    const postButton = document.getElementById("post-button");
    const communityPostButton = document.getElementById("community-post-button");
    const messageInput = document.getElementById("message-input");
    const communityInput = document.getElementById("community-input");
    const messageBoard = document.getElementById("message-board");
    const communityBoard = document.getElementById("community-board");
    const chatTitle = document.getElementById("chat-title");

    let currentChat = "Community"; // Default chat is community
    let chatHistory = {}; // Store chat history for each friend

    // Event listener for posting private messages
    postButton.onclick = function () {
        const message = messageInput.value.trim();
        if (message) {
            addMessageToChatBoard(currentChat, message);
            messageInput.value = ""; // Clear input after posting
        } else {
            alert("Please enter a message before posting.");
        }
    };

    // Event listener for posting community messages
    communityPostButton.onclick = function () {
        const communityMessage = communityInput.value.trim();
        if (communityMessage) {
            addMessageToCommunityBoard(communityMessage);
            communityInput.value = ""; // Clear input after posting
        } else {
            alert("Please enter a community message before posting.");
        }
    };

    // Function to add a message to the community board
    function addMessageToCommunityBoard(message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("community-message");
        messageElement.textContent = Community: ${message};
        communityBoard.appendChild(messageElement);
    }

    // Function to add a message to the chat board
    function addMessageToChatBoard(friend, message) {
        if (!chatHistory[friend]) {
            chatHistory[friend] = []; // Initialize chat history for the friend
        }
        chatHistory[friend].push(message); // Store the message in chat history

        const messageElement = document.createElement("div");
        messageElement.classList.add("private-message");
        messageElement.textContent = ${friend}: ${message};
        messageBoard.appendChild(messageElement);
    }

    // Function to select a friend for private chat
    window.selectFriend = function(friend) {
        currentChat = friend;
        chatTitle.textContent = Chat with ${friend};
        messageBoard.innerHTML = ""; // Clear previous messages

        // Load chat history if it exists
        if (chatHistory[friend]) {
            chatHistory[friend].forEach(msg => {
                const messageElement = document.createElement("div");
                messageElement.classList.add("private-message");
                messageElement.textContent = ${friend}: ${msg};
                messageBoard.appendChild(messageElement);
            });
        }
    };
});
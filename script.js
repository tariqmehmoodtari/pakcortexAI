document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');

    chatForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const userMessage = chatInput.value;
        displayMessage(userMessage, 'user');
        chatInput.value = '';
        fetchChatGPTResponse(userMessage);
    });

    async function fetchChatGPTResponse(message) {
        try {
            const response = await fetch('/chatgpt-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });
            const data = await response.json();
            displayMessage(data.reply, 'chatgpt');
        } catch (error) {
            console.error('Error:', error);
            displayMessage('Sorry, something went wrong.', 'error');
        }
    }

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        if (sender === 'user') {
            messageElement.classList.add('user');
        } else if (sender === 'chatgpt') {
            messageElement.classList.add('chatgpt');
        } else if (sender === 'error') {
            messageElement.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
        }
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

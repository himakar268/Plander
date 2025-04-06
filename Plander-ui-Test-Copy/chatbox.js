let currentUser = {
    id: null,
    name: 'Guest' 
};


function setCurrentUser(user) {
    currentUser = user;
    console.log('Current user set:', currentUser);
}


let messages = [
    {
        id: 1,
        userId: 2,
        userName: 'John',
        content: 'Hello everyone!',
        timestamp: new Date(Date.now() - 300000)
    },
    {
        id: 2,
        userId: 3,
        userName: 'Sarah',
        content: 'Hi! How are you all doing?',
        timestamp: new Date(Date.now() - 240000)
    },
 {
        id: 3,
        userId: 4,
        userName: 'Himakar',
        content: 'Joining in 10 minutes',
        timestamp: new Date(Date.now() - 240000)
    },
 {
        id: 4,
        userId: 5,
        userName: 'priyanka',
        content: 'Cannot join Today !',
        timestamp: new Date(Date.now() - 240000)
    }

];

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const groupsList = document.getElementById('groupsList');

// Display a single message
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${message.userId === currentUser.id ? 'sent' : 'received'}`;

    messageElement.innerHTML = `
        ${message.userId !== currentUser.id ? `<div class="sender">${message.userName}</div>` : ''}
        <div class="content">${message.content}</div>
        <div class="time">${message.timestamp.toLocaleTimeString()}</div>
    `;

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Load all messages
function loadMessages() {
    chatMessages.innerHTML = '';
    messages.forEach(displayMessage);
}

// Handle message submission
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = messageInput.value.trim();

    if (content) {
        const newMessage = {
            id: messages.length + 1,
            userId: currentUser.id,
            userName: currentUser.name,
            content: content,
            timestamp: new Date()
        };

        messages.push(newMessage);
        displayMessage(newMessage);
        messageInput.value = '';
    }
});

// Handle group selection
groupsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('chat-group')) {
        // Remove active class from all groups
        document.querySelectorAll('.chat-group').forEach(group => {
            group.classList.remove('active');
        });

        // Add active class to clicked group
        e.target.classList.add('active');

        // Update header
        document.querySelector('.chat-header h2').textContent = e.target.textContent;

        // In a real application, you would load messages for the selected group here
        loadMessages();
    }
});

// Initial load
loadMessages();
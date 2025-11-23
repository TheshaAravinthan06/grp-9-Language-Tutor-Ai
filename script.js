// Shared utility functions
let currentTheme = 'light';
let currentUIStyle = 'glass';

// Theme management
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('fluentai-theme', currentTheme);
}

function setUIStyle(style) {
    currentUIStyle = style;
    
    // Remove existing style classes
    const cards = document.querySelectorAll('.glass-card, .neumorphism-card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('glass-card', 'neumorphism-card');
    }
    
    // Apply new style
    if (style === 'glass') {
        const elements = document.querySelectorAll('.language-selector, .chat-container, .topic-card, .card');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.add('glass-card');
        }
    } else {
        const elements = document.querySelectorAll('.language-selector, .chat-container, .topic-card, .card');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.add('neumorphism-card');
        }
    }
    
    localStorage.setItem('fluentai-ui-style', style);
}

function saveSettings() {
    alert('Settings saved successfully!');
}

// Home page functions
function showPage(pageId) {
    const homePage = document.getElementById('home-page');
    const settingsPage = document.getElementById('settings-page');
    
    if (pageId === 'settings') {
        homePage.style.display = 'none';
        settingsPage.style.display = 'block';
    } else {
        homePage.style.display = 'block';
        settingsPage.style.display = 'none';
    }
}

// Home page specific functionality
let selectedLanguage = 'Spanish';
let isRecording = false;

function updateChatWelcome() {
    const selectElement = document.getElementById('languageSelect');
    selectedLanguage = selectElement ? selectElement.value : 'Spanish';

    const welcomeMessageElement = document.getElementById('initial-welcome-message');
    if (welcomeMessageElement) {
        welcomeMessageElement.innerHTML = '<strong>Hello! I\'m your AI Language Tutor.</strong> You\'ve selected <strong>' + selectedLanguage + '</strong>. Choose a topic or send me a message to begin!<span class="message-time">Just now</span>';
    }

    const languageDisplay = document.getElementById('current-language-display');
    if (languageDisplay) {
        languageDisplay.textContent = 'You are learning ' + selectedLanguage + '!';
    }
}

function startTopic(topic) {
    const userMessage = 'Let\'s start practicing: ' + topic + '.';
    addMessage(userMessage, 'user');

    setTimeout(function() {
        const aiResponse = 'Excellent choice! Let\'s begin our conversation about <strong>' + topic + '</strong> in <strong>' + selectedLanguage + '</strong>. I\'ll start: "Where would you like to go to get a coffee?" (or related opening line).';
        addMessage(aiResponse, 'ai');
    }, 800);
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const userText = chatInput.value.trim();

    if (userText === '') return;

    addMessage(userText, 'user');
    chatInput.value = '';

    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('ai-message');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.innerHTML = '<div class="message-bubble"><i class="fas fa-ellipsis-h"></i> FluentAI is typing...</div>';
    document.getElementById('chat-box').appendChild(typingIndicator);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;

    // Simple AI logic simulation
    let aiResponse = 'That\'s an excellent attempt! To make that sentence perfect in <strong>' + selectedLanguage + '</strong>, you might say: "[corrected phrase]".';
    if (userText.toLowerCase().includes('hello') || userText.toLowerCase().includes('hi')) {
        aiResponse = '👋 Hello! In <strong>' + selectedLanguage + '</strong>, we greet each other by saying "[Greeting]!" What\'s your first question for me?';
    } else if (userText.toLowerCase().includes('how are you')) {
        aiResponse = 'I am well! We can respond to that in <strong>' + selectedLanguage + '</strong> with "[Good Response]". Now, answer me in ' + selectedLanguage + '!';
    } else if (userText.toLowerCase().includes('thank you')) {
         aiResponse = 'My pleasure! In <strong>' + selectedLanguage + '</strong>, you can also say "[Another way to say thank you]". What\'s next?';
    } 

    // Simulate AI response
    setTimeout(function() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        addMessage(aiResponse, 'ai');
    }, 1500);
}

function addMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');

    const messageContainer = document.createElement('div');
    messageContainer.classList.add(sender + '-message');

    const messageBubble = document.createElement('div');
    messageBubble.classList.add('message-bubble');
    messageBubble.innerHTML = text + '<span class="message-time">' + getCurrentTime() + '</span>';

    messageContainer.appendChild(messageBubble);
    chatBox.appendChild(messageContainer);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function getCurrentTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
}

function toggleVoiceRecording() {
    const voiceBtn = document.getElementById('voice-btn');
    const visualizer = document.getElementById('voice-visualizer');
    
    if (!isRecording) {
        // Start recording
        isRecording = true;
        voiceBtn.classList.add('recording');
        voiceBtn.innerHTML = '<i class="fas fa-square"></i>';
        visualizer.style.display = 'flex';
        
        // Simulate voice recognition
        setTimeout(function() {
            const phrases = [
                "Hello, how are you today?",
                "I would like to practice my pronunciation",
                "Can you help me with grammar?",
                "What is the weather like today?",
                "I need to improve my vocabulary"
            ];
            
            const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            document.getElementById('chat-input').value = randomPhrase;
            
            // Stop recording
            stopVoiceRecording();
            
            // Show success message
            addMessage('Voice input: "' + randomPhrase + '"', 'user');
            
            // Auto-send the message
            setTimeout(function() {
                sendMessage();
            }, 1000);
        }, 3000);
    } else {
        stopVoiceRecording();
    }
}

function stopVoiceRecording() {
    isRecording = false;
    const voiceBtn = document.getElementById('voice-btn');
    const visualizer = document.getElementById('voice-visualizer');
    
    voiceBtn.classList.remove('recording');
    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    visualizer.style.display = 'none';
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Add image to chat
            const chatBox = document.getElementById('chat-box');
            
            const messageContainer = document.createElement('div');
            messageContainer.classList.add('user-message');
            
            const messageBubble = document.createElement('div');
            messageBubble.classList.add('message-bubble');
            
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('uploaded-image');
            img.alt = 'Uploaded image';
            
            messageBubble.appendChild(img);
            messageBubble.innerHTML += '<span class="message-time">' + getCurrentTime() + '</span>';
            
            messageContainer.appendChild(messageBubble);
            chatBox.appendChild(messageContainer);
            
            chatBox.scrollTop = chatBox.scrollHeight;
            
            // Clear the file input
            event.target.value = '';
            
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('ai-message');
            typingIndicator.id = 'typing-indicator';
            typingIndicator.innerHTML = '<div class="message-bubble"><i class="fas fa-ellipsis-h"></i> FluentAI is analyzing your image...</div>';
            chatBox.appendChild(typingIndicator);
            chatBox.scrollTop = chatBox.scrollHeight;
            
            // Simulate AI response
            setTimeout(function() {
                const typingIndicator = document.getElementById('typing-indicator');
                if (typingIndicator) {
                    typingIndicator.remove();
                }
                
                const aiResponse = 'Thanks for sharing this image! In <strong>' + selectedLanguage + '</strong>, we would describe this as "[description in selected language]". Would you like to learn more vocabulary related to this image?';
                addMessage(aiResponse, 'ai');
            }, 2000);
        };
        reader.readAsDataURL(file);
    }
}

// Initialize theme and UI style
function initializeApp() {
    // Load saved theme
    const savedTheme = localStorage.getItem('fluentai-theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.body.setAttribute('data-theme', currentTheme);
    }
    
    // Load saved UI style
    const savedUIStyle = localStorage.getItem('fluentai-ui-style');
    if (savedUIStyle) {
        currentUIStyle = savedUIStyle;
        setUIStyle(currentUIStyle);
    }
    
    // Add enter key support for chat input
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
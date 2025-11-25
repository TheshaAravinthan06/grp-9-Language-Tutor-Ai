// --- State Management and Content Logic ---
let isLoggedIn = false;
let selectedLanguage = 'Spanish';
let isRecording = false;
let currentTheme = 'light';
let currentUIStyle = 'glass';

/**
 * Handles the login form submission.
 */
function handleLogin(event) {
    event.preventDefault(); 
    
    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value.trim();

    if (usernameInput && passwordInput) {
        // Add loading animation to button
        const loginBtn = document.querySelector('#loginForm button');
        const originalText = loginBtn.innerHTML;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Logging in...';
        loginBtn.disabled = true;
        
        // Simulate login process
        setTimeout(function() {
            isLoggedIn = true;
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
            window.location.href = 'home.html';
        }, 1500);
    } else {
        alert('Please enter a username and password.');
    }
}

/**
 * Handles social login
 */
function socialLogin(provider) {
    alert('Signing in with ' + provider.charAt(0).toUpperCase() + provider.slice(1));
    // In a real app, this would redirect to OAuth flow
    isLoggedIn = true;
    window.location.href = 'home.html';
}

/**
 * Updates the welcome message and state when a new language is selected.
 */
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

/**
 * Simulates selecting a starting topic.
 * @param {string} topic - The selected topic.
 */
function startTopic(topic) {
    const userMessage = 'Let\'s start practicing: ' + topic + '.';
    addMessage(userMessage, 'user');

    setTimeout(function() {
        const aiResponse = 'Excellent choice! Let\'s begin our conversation about <strong>' + topic + '</strong> in <strong>' + selectedLanguage + '</strong>. I\'ll start: "Where would you like to go to get a coffee?" (or related opening line).';
        addMessage(aiResponse, 'ai');
    }, 800);
}

/**
 * Simulates sending a user message and receiving an AI response.
 */
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

    // Simple AI logic simulation (using the selected language)
    let aiResponse = 'That\'s an excellent attempt! To make that sentence perfect in <strong>' + selectedLanguage + '</strong>, you might say: "[corrected phrase]".';
    if (userText.toLowerCase().includes('hello') || userText.toLowerCase().includes('hi')) {
        aiResponse = '👋 Hello! In <strong>' + selectedLanguage + '</strong>, we greet each other by saying "[Greeting]!" What\'s your first question for me?';
    } else if (userText.toLowerCase().includes('how are you')) {
        aiResponse = 'I am well! We can respond to that in <strong>' + selectedLanguage + '</strong> with "[Good Response]". Now, answer me in ' + selectedLanguage + '!';
    } else if (userText.toLowerCase().includes('thank you')) {
         aiResponse = 'My pleasure! In <strong>' + selectedLanguage + '</strong>, you can also say "[Another way to say thank you]". What\'s next?';
    } 

    // Simulate a small delay for the AI response
    setTimeout(function() {
        document.getElementById('typing-indicator').remove();
        addMessage(aiResponse, 'ai');
    }, 1500);
}

/**
 * Creates and adds a message bubble to the chat box.
 * @param {string} text - The message content.
 * @param {string} sender - 'user' or 'ai'.
 */
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

/**
 * Gets the current time in a readable format for messages.
 * @returns {string} - The formatted time.
 */
function getCurrentTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
}

/**
 * Toggles voice recording on/off
 */
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
            // Simulate successful voice recognition
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
            
            // Auto-send the message after a short delay
            setTimeout(function() {
                sendMessage();
            }, 1000);
        }, 3000);
    } else {
        stopVoiceRecording();
    }
}

/**
 * Stops voice recording
 */
function stopVoiceRecording() {
    isRecording = false;
    const voiceBtn = document.getElementById('voice-btn');
    const visualizer = document.getElementById('voice-visualizer');
    
    voiceBtn.classList.remove('recording');
    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    visualizer.style.display = 'none';
}

/**
 * Toggles between light and dark theme
 */
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('fluentai-theme', currentTheme);
}

/**
 * Sets the UI style (Glassmorphism or Neumorphism)
 */
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

/**
 * Saves user settings
 */
function saveSettings() {
    alert('Settings saved successfully!');
    // In a real app, this would send settings to a server
}

// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', function() {
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
});
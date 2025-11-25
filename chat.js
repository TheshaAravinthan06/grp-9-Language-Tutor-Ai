// Chat functionality
class ChatManager {
    constructor() {
        this.selectedLanguage = 'Spanish';
        this.isRecording = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateChatWelcome();
    }

    setupEventListeners() {
        // Language selection
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', () => this.updateChatWelcome());
        }

        // Topic cards
        const topicCards = document.querySelectorAll('.topic-card');
        topicCards.forEach(card => {
            card.addEventListener('click', () => {
                const topic = card.getAttribute('data-topic');
                this.startTopic(topic);
            });
        });

        // Send message button
        const sendBtn = document.getElementById('send-message-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        // Voice recording button
        const voiceBtn = document.getElementById('voice-btn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => this.toggleVoiceRecording());
        }

        // Enter key support for chat input
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }

    updateChatWelcome() {
        const selectElement = document.getElementById('languageSelect');
        this.selectedLanguage = selectElement ? selectElement.value : 'Spanish';

        const welcomeMessageElement = document.getElementById('initial-welcome-message');
        if (welcomeMessageElement) {
            welcomeMessageElement.innerHTML = 
                `<strong>Hello! I'm your AI Language Tutor.</strong> You've selected <strong>${this.selectedLanguage}</strong>. Choose a topic or send me a message to begin!
                <span class="message-time">Just now</span>`;
        }

        const languageDisplay = document.getElementById('current-language-display');
        if (languageDisplay) {
            languageDisplay.textContent = `You are learning ${this.selectedLanguage}!`;
        }
    }

    startTopic(topic) {
        const userMessage = `Let's start practicing: ${topic}.`;
        this.addMessage(userMessage, 'user');

        setTimeout(() => {
            const aiResponse = `Excellent choice! Let's begin our conversation about <strong>${topic}</strong> in <strong>${this.selectedLanguage}</strong>. I'll start: "Where would you like to go to get a coffee?" (or related opening line).`;
            this.addMessage(aiResponse, 'ai');
        }, 800);
    }

    sendMessage() {
        const chatInput = document.getElementById('chat-input');
        const userText = chatInput.value.trim();

        if (userText === '') return;

        this.addMessage(userText, 'user');
        chatInput.value = '';

        this.showTypingIndicator();

        // Generate AI response
        setTimeout(() => {
            this.hideTypingIndicator();
            const aiResponse = this.generateAIResponse(userText);
            this.addMessage(aiResponse, 'ai');
        }, 1500);
    }

    generateAIResponse(userText) {
        let response = `That's an excellent attempt! To make that sentence perfect in <strong>${this.selectedLanguage}</strong>, you might say: "[corrected phrase]".`;
        
        if (userText.toLowerCase().includes('hello') || userText.toLowerCase().includes('hi')) {
            response = `👋 Hello! In <strong>${this.selectedLanguage}</strong>, we greet each other by saying "[Greeting]!" What's your first question for me?`;
        } else if (userText.toLowerCase().includes('how are you')) {
            response = `I am well! We can respond to that in <strong>${this.selectedLanguage}</strong> with "[Good Response]". Now, answer me in ${this.selectedLanguage}!`;
        } else if (userText.toLowerCase().includes('thank you')) {
            response = `My pleasure! In <strong>${this.selectedLanguage}</strong>, you can also say "[Another way to say thank you]". What's next?`;
        }

        return response;
    }

    showTypingIndicator() {
        const chatBox = document.getElementById('chat-box');
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('ai-message');
        typingIndicator.id = 'typing-indicator';
        typingIndicator.innerHTML = '<div class="message-bubble"><i class="fas fa-ellipsis-h"></i> FluentAI is typing...</div>';
        chatBox.appendChild(typingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    addMessage(text, sender) {
        const chatBox = document.getElementById('chat-box');

        const messageContainer = document.createElement('div');
        messageContainer.classList.add(sender + '-message');

        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble');
        messageBubble.innerHTML = text + '<span class="message-time">' + this.getCurrentTime() + '</span>';

        messageContainer.appendChild(messageBubble);
        chatBox.appendChild(messageContainer);

        chatBox.scrollTop = chatBox.scrollHeight;
    }

    getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    }

    toggleVoiceRecording() {
        const voiceBtn = document.getElementById('voice-btn');
        const visualizer = document.getElementById('voice-visualizer');
        
        if (!this.isRecording) {
            this.startVoiceRecording(voiceBtn, visualizer);
        } else {
            this.stopVoiceRecording(voiceBtn, visualizer);
        }
    }

    startVoiceRecording(voiceBtn, visualizer) {
        this.isRecording = true;
        voiceBtn.classList.add('recording');
        voiceBtn.innerHTML = '<i class="fas fa-square"></i>';
        visualizer.style.display = 'flex';
        
        setTimeout(() => {
            const phrases = [
                "Hello, how are you today?",
                "I would like to practice my pronunciation",
                "Can you help me with grammar?",
                "What is the weather like today?",
                "I need to improve my vocabulary"
            ];
            
            const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            document.getElementById('chat-input').value = randomPhrase;
            
            this.stopVoiceRecording(voiceBtn, visualizer);
            this.addMessage('Voice input: "' + randomPhrase + '"', 'user');
            
            setTimeout(() => {
                this.sendMessage();
            }, 1000);
        }, 3000);
    }

    stopVoiceRecording(voiceBtn, visualizer) {
        this.isRecording = false;
        voiceBtn.classList.remove('recording');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        visualizer.style.display = 'none';
    }
}

// Initialize chat manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatManager();
});
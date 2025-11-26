// Theme and UI style management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('fluentai-theme') || 'light';
        this.currentUIStyle = localStorage.getItem('fluentai-ui-style') || 'glass';
        this.init();
    }

    init() {
        this.applySavedTheme();
        this.applySavedUIStyle();
        this.setupEventListeners();
    }

    applySavedTheme() {
        document.body.setAttribute('data-theme', this.currentTheme);
    }

    applySavedUIStyle() {
        this.setUIStyle(this.currentUIStyle);
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // UI style buttons
        const glassBtn = document.getElementById('glass-style-btn');
        const neoBtn = document.getElementById('neo-style-btn');
        
        if (glassBtn) glassBtn.addEventListener('click', () => this.setUIStyle('glass'));
        if (neoBtn) neoBtn.addEventListener('click', () => this.setUIStyle('neo'));

        // Save settings button
        const saveBtn = document.getElementById('save-settings-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveSettings());
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('fluentai-theme', this.currentTheme);
    }

    setUIStyle(style) {
        this.currentUIStyle = style;
        
        // Remove existing style classes
        const cards = document.querySelectorAll('.glass-card, .neumorphism-card');
        cards.forEach(card => {
            card.classList.remove('glass-card', 'neumorphism-card');
        });
        
        // Apply new style
        const elements = document.querySelectorAll('.language-selector, .chat-container, .topic-card, .card');
        elements.forEach(element => {
            element.classList.add(style === 'glass' ? 'glass-card' : 'neumorphism-card');
        });
        
        localStorage.setItem('fluentai-ui-style', style);
    }

    saveSettings() {
        // Save additional settings
        const showTranslations = document.getElementById('show-translations');
        const pronunciationHints = document.getElementById('pronunciation-hints');
        const dailyReminders = document.getElementById('daily-reminders');
        const weeklyReports = document.getElementById('weekly-reports');
        
        if (showTranslations) localStorage.setItem('show-translations', showTranslations.checked);
        if (pronunciationHints) localStorage.setItem('pronunciation-hints', pronunciationHints.checked);
        if (dailyReminders) localStorage.setItem('daily-reminders', dailyReminders.checked);
        if (weeklyReports) localStorage.setItem('weekly-reports', weeklyReports.checked);

        alert('Settings saved successfully!');
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
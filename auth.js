// Authentication functionality
class AuthManager {
    constructor() {
        this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        this.init();
    }

    init() {
        // Check if user is logged in and redirect if necessary
        this.checkAuthStatus();
        
        // Setup event listeners
        this.setupEventListeners();
    }

    checkAuthStatus() {
        const currentPage = window.location.pathname.split('/').pop();
        
        if (this.isLoggedIn && currentPage === 'login.html') {
            window.location.href = 'home.html';
        } else if (!this.isLoggedIn && currentPage !== 'login.html' && currentPage !== 'index.html') {
            window.location.href = 'login.html';
        }
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Social login buttons
        const googleBtn = document.getElementById('google-login');
        const facebookBtn = document.getElementById('facebook-login');
        const appleBtn = document.getElementById('apple-login');
        
        if (googleBtn) googleBtn.addEventListener('click', () => this.socialLogin('google'));
        if (facebookBtn) facebookBtn.addEventListener('click', () => this.socialLogin('facebook'));
        if (appleBtn) appleBtn.addEventListener('click', () => this.socialLogin('apple'));

        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }
    }

    handleLogin(event) {
        event.preventDefault();
        
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        if (usernameInput && passwordInput) {
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (username && password) {
                this.showLoading();
                
                // Simulate login process
                setTimeout(() => {
                    this.isLoggedIn = true;
                    localStorage.setItem('isLoggedIn', 'true');
                    window.location.href = 'home.html';
                }, 1500);
            } else {
                alert('Please enter a username and password.');
            }
        }
    }

    socialLogin(provider) {
        this.showLoading();
        
        setTimeout(() => {
            this.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            alert(`Signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`);
            window.location.href = 'home.html';
        }, 1000);
    }

    handleLogout() {
        this.isLoggedIn = false;
        localStorage.setItem('isLoggedIn', 'false');
        window.location.href = 'login.html';
    }

    showLoading() {
        const loginBtn = document.querySelector('#loginForm button');
        if (loginBtn) {
            const originalText = loginBtn.innerHTML;
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Logging in...';
            loginBtn.disabled = true;
            
            setTimeout(() => {
                loginBtn.innerHTML = originalText;
                loginBtn.disabled = false;
            }, 1500);
        }
    }
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});
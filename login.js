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
            // Redirect to home page after successful login
            window.location.href = 'index.html';
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
    window.location.href = 'index.html';
}
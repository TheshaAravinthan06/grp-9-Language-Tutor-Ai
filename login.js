// Login page specific functionality
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
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
            
            // Redirect to home page after successful login
            window.location.href = 'index.html';
        }, 1500);
    } else {
        alert('Please enter a username and password.');
    }
}

function socialLogin(provider) {
    alert('Signing in with ' + provider.charAt(0).toUpperCase() + provider.slice(1));
    
    // Simulate social login process
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 1000);
}

// Add form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});
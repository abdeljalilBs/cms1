if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = '/home/index.html';
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();


    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    // Basic validation
    if (email && password) {
        // Save user data to localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', email.split('@')[0]);
        
        // Redirect to home page
        window.location.href = '../home/index.html';
    }
});
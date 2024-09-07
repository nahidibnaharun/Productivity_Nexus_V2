// Simulated user database 
let users = JSON.parse(localStorage.getItem('users')) || [];

function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registrationForm').style.display = 'none';
}

function showRegistration() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registrationForm').style.display = 'block';
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert('Login successful!');
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid username or password');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
}

function register() {
    const name = document.getElementById('regName').value;
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    if (!validatePassword(password)) {
        alert('Password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter');
        return;
    }

    if (users.some(u => u.username === username)) {
        alert('Username already exists');
        return;
    }

    users.push({ name, username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Please login.');
    showLogin();
}

// Initialize with login form shown
showLogin();

// Event listener for Enter key press
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        if (document.getElementById('loginForm').style.display === 'block') {
            login(); 
        } else if (document.getElementById('registrationForm').style.display === 'block') {
            register();
        }
    }
}); 
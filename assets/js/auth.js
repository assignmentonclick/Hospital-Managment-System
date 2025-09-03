// Simple authentication script using localStorage
const form = document.getElementById('login-form');
const errorEl = document.getElementById('login-error');

const USER = { username: 'admin', password: 'admin123' };

form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (username === USER.username && password === USER.password) {
        localStorage.setItem('hmsUser', JSON.stringify({ username }));
        window.location.href = 'dashboard.html';
    } else {
        errorEl.textContent = 'Invalid credentials';
    }
});

// Redirect to dashboard if already logged in
if (localStorage.getItem('hmsUser')) {
    window.location.href = 'dashboard.html';
}

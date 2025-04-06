const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const toggleDarkModeBtn = document.getElementById('toggleDarkMode');

// Handle login
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        try {
            const response = await fetch('http://localhost:8085/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) throw new Error('Login failed');
            
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.userName);
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Invalid credentials. Try again.');
        }
    });
}

// Handle signup
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const firstName = signupForm.querySelector('input[name="firstName"]').value;
        const lastName = signupForm.querySelector('input[name="lastName"]').value;
        const email = signupForm.querySelector('input[name="email"]').value;
        const password = signupForm.querySelector('input[name="password"]').value;
        const confirmPassword = signupForm.querySelector('input[name="confirmPassword"]').value;
        const gender = signupForm.querySelector('select[name="gender"]').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8085/users/login/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password, gender })
            });

            if (!response.ok) throw new Error('Signup failed');
            
            const data = await response.json();
            alert('Signup successful! Please login.');
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Signup failed. Please try again.');
        }
    });
}

// Dark Mode Toggle
if (toggleDarkModeBtn) {
    toggleDarkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        updateDarkModeButton();
    });

    function updateDarkModeButton() {
        if (document.body.classList.contains('dark-mode')) {
            toggleDarkModeBtn.textContent = '☀️';
        } else {
            toggleDarkModeBtn.textContent = '🌙';
        }
    }

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        updateDarkModeButton();
    }
}
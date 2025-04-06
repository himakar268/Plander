
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const resetPasswordForm = document.getElementById('resetPasswordForm');
const resetPasswordSection = document.getElementById('resetPasswordSection');
const emailInput = document.getElementById('email');
const genderInput = document.getElementById('gender');
const toggleDarkModeBtn = document.getElementById('toggleDarkMode');

// Handle forgot password form submission
forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const gender = genderInput.value;

    try {
        const response = await fetch('http://localhost:8085/users/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, gender })
        });

        if (!response.ok) throw new Error('Failed to verify email and gender');

        forgotPasswordForm.style.display = 'none';
        resetPasswordSection.style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        alert('Invalid email or gender. Please try again.');
    }
});

// Handle reset password form submission
resetPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    try {
        const response = await fetch('http://localhost:8085/users/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailInput.value, newPassword })
        });

        if (!response.ok) throw new Error('Failed to reset password');

        alert('Password reset successfully!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to reset password. Please try again.');
    }
});

// Dark Mode Toggle
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
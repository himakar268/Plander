const logoutBtn = document.getElementById('logoutBtn');
const gamesContainer = document.getElementById('gamesContainer');
const greetingElement = document.getElementById('greeting');
const myBookingsBtn = document.getElementById('myBookingsBtn');
const toggleDarkModeBtn = document.getElementById('toggleDarkMode');

// Function to check authentication status
function checkAuth() {
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = 'login.html';
    }
}

// Handle logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    alert('Logged out successfully!');
    window.location.href = 'login.html';
});

// Function to update the greeting message
function updateGreeting() {
    const username = localStorage.getItem('username');
    greetingElement.textContent = username ? `Hello, ${username}` : '';
}

// Function to toggle login/logout buttons
function toggleAuthButtons() {
    logoutBtn.style.display = localStorage.getItem('username') ? 'block' : 'none';
}

// Redirect to my-bookings.html
myBookingsBtn.addEventListener('click', () => {
    window.location.href = 'my-bookings.html';
});

// Call authentication check and update UI on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    updateGreeting();
    toggleAuthButtons();
});

// Fetch and render games
async function fetchGames() {
    try {
        const response = await fetch('http://localhost:8085/api/games');
        if (!response.ok) throw new Error('Failed to fetch games');
        return await response.json();
    } catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
}

function createGameCard(game) {
    return `
        <div class="game-card animate__animated animate__fadeIn" data-game-id="${game.id}">
            <img src="${game.image}" alt="${game.name}">
            <div class="game-card-content">
                <h3>${game.name}</h3>
                <button class="btn btn-primary book-now-btn">Book Now</button>
            </div>
        </div>`;
}

async function renderGames() {
    const games = await fetchGames();
    gamesContainer.innerHTML = games.map(createGameCard).join('');

    document.querySelectorAll('.book-now-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const gameCard = e.target.closest('.game-card');
            const gameId = gameCard.getAttribute('data-game-id');
            const selectedGame = games.find(game => game.id == gameId);
            localStorage.setItem('selectedGame', JSON.stringify(selectedGame));
            window.location.href = 'booking.html';
        });
    });
}

document.addEventListener('DOMContentLoaded', renderGames);

// Dark Mode Toggle
toggleDarkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    updateDarkModeButton();
});

function updateDarkModeButton() {
    toggleDarkModeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    updateDarkModeButton();
}

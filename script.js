// Mock database for users
const users = [
    { email: "adminlogin@advancitize.org", password: "adminExpertia" },
];

// Toggle Sign Up and Sign In sections
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const container = document.getElementById('container');

// When the "Sign Up" button is clicked, show the Sign Up section
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

// When the "Sign In" button is clicked, show the Sign In section
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// References to form inputs (Sign-In)
const signInEmail = document.getElementById("signInEmail");
const signInPassword = document.getElementById("signInPassword");
const signInBtn = document.getElementById("signInBtn");

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle sign-in process
signInBtn.addEventListener("click", () => {
    const email = signInEmail.value.trim();
    const password = signInPassword.value.trim();

    // Check if email is valid
    if (!isValidEmail(email)) {
        alert("Please enter a valid email.");
        return;
    }

    // Check if user exists in the mock database
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Redirect to another HTML file (dashboard.html for example)
        window.location.href = "site.html";
    } else {
        // Trigger SweetAlert2 popup for incorrect credentials
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid email or password. Please try again.'
        });
    }
});

// References for the Sign-Up form
const signUpEmail = document.getElementById("signUpEmail");
const signUpPassword = document.getElementById("signUpPassword");
const signUpBtn = document.getElementById("signUpBtn");

// Handle sign-up process and trigger popup when "Sign Up" button is clicked
signUpBtn.addEventListener("click", () => {
    Swal.fire({
        icon: 'info',
        title: 'Contact Us',
        text: 'For access to this site, please contact junkmail5.22.2012@gmail.com.'
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const gameCards = document.querySelectorAll(".game-card");
    const randomGameBtn = document.getElementById("randomGameBtn");

    // Search Functionality
    searchBar.addEventListener("input", (e) => {
        const searchText = e.target.value.toLowerCase();
        gameCards.forEach(card => {
            const gameName = card.dataset.name.toLowerCase();
            card.style.display = gameName.includes(searchText) ? "block" : "none";
        });
    });

    // Click to Open Game
    gameCards.forEach(card => {
        card.addEventListener("click", () => {
            const gameLink = card.dataset.link;
            window.location.href = gameLink;
        });
    });

    // Random Game Function
    randomGameBtn.addEventListener("click", () => {
        const visibleCards = Array.from(gameCards).filter(card => card.style.display !== "none");
        if (visibleCards.length > 0) {
            const randomCard = visibleCards[Math.floor(Math.random() * visibleCards.length)];
            window.location.href = randomCard.dataset.link;
        } else {
            alert("No games found to pick from!");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const gameCards = document.querySelectorAll(".game-card");

    // Search Functionality
    searchBar.addEventListener("input", (e) => {
        const searchText = e.target.value.toLowerCase(); // Get lowercase input for case-insensitive search

        gameCards.forEach(card => {
            const gameName = card.dataset.name.toLowerCase(); // Game name from data-name attribute
            if (gameName.includes(searchText)) {
                card.style.display = "block"; // Show matching game
            } else {
                card.style.display = "none"; // Hide non-matching game
            }
        });
    });
});

// Mock database for users
const users = [
    { email: "adminlogin@advancitize.org", password: "adminExpertia" },
];

// Toggle Sign Up and Sign In sections
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const container = document.getElementById('container');

if (registerBtn && loginBtn && container) {
    registerBtn.addEventListener('click', () => container.classList.add("active"));
    loginBtn.addEventListener('click', () => container.classList.remove("active"));
}

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
if (signInBtn) {
    signInBtn.addEventListener("click", () => {
        const email = signInEmail.value.trim();
        const password = signInPassword.value.trim();

        if (!isValidEmail(email)) {
            alert("Please enter a valid email.");
            return;
        }

        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            window.location.href = "site.html";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid email or password. Please try again.'
            });
        }
    });
}

// References for the Sign-Up form
const signUpEmail = document.getElementById("signUpEmail");
const signUpPassword = document.getElementById("signUpPassword");
const signUpBtn = document.getElementById("signUpBtn");

// Handle sign-up process and trigger popup when "Sign Up" button is clicked
if (signUpBtn) {
    signUpBtn.addEventListener("click", () => {
        Swal.fire({
            icon: 'info',
            title: 'Contact Us',
            text: 'For access to this site, please contact junkmail5.22.2012@gmail.com.'
        });
    });
}

// Game Launcher Functionality
document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const gameCards = document.querySelectorAll(".game-card");
    const randomGameBtn = document.getElementById("randomGameBtn");

    // ✅ Search Functionality (Fixed)
    if (searchBar) {
        searchBar.addEventListener("input", (e) => {
            const searchText = e.target.value.toLowerCase().trim();

            gameCards.forEach(card => {
                const gameName = card.dataset.name.toLowerCase();
                card.style.display = gameName.includes(searchText) ? "block" : "none";
            });
        });
    }

    // ✅ Make Game Cards Clickable
    gameCards.forEach(card => {
        card.addEventListener("click", () => {
            const gameLink = card.dataset.link;
            if (gameLink) {
                window.location.href = gameLink; // Redirect to the game file
            }
        });
    });

    // ✅ Random Game Button Function
    if (randomGameBtn) {
        randomGameBtn.addEventListener("click", () => {
            const visibleCards = Array.from(gameCards).filter(card => card.style.display !== "none");

            if (visibleCards.length > 0) {
                const randomCard = visibleCards[Math.floor(Math.random() * visibleCards.length)];

                // Scroll to the random card
                randomCard.scrollIntoView({
                    behavior: "smooth",
                    inline: "center"
                });

                // Open the game after scrolling (optional)
                setTimeout(() => {
                    const gameLink = randomCard.dataset.link;
                    if (gameLink) {
                        window.location.href = gameLink;
                    }
                }, 800);
            } else {
                alert("No games found to pick from!");
            }
        });
    }
});

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
    const gameGrid = document.getElementById("gameGrid"); // Reference to the game grid for scrolling
    const cards = document.querySelectorAll(".card"); // ✅ Target all game cards

    // ✅ Search Functionality
    if (searchBar) {
        searchBar.addEventListener("input", (e) => {
            const searchText = e.target.value.toLowerCase().trim();

            gameCards.forEach(card => {
                const gameName = card.dataset.name.toLowerCase();
                card.style.display = gameName.includes(searchText) ? "block" : "none";
            });
        });
    }

    // ✅ Make Entire Card Clickable (Updated Logic)
    cards.forEach(card => {
        card.addEventListener("click", (event) => {
            // Prevent double-clicking if clicking directly on an existing link
            const link = card.querySelector("a");

            if (link && event.target !== link) {
                window.location.href = link.href; // Redirect to the game's link
            }
        });
    });

    // ✅ Random Game Picker with Centered Landing Scroll
    if (randomGameBtn) {
        randomGameBtn.addEventListener("click", () => {
            const visibleCards = Array.from(gameCards).filter(card => card.style.display !== "none");

            if (visibleCards.length > 0) {
                // 🎯 Randomly pick a game card
                const randomCard = visibleCards[Math.floor(Math.random() * visibleCards.length)];

                // Scroll the selected card into the center of the viewport
                randomCard.scrollIntoView({
                    behavior: "smooth",
                    inline: "center"
                });

                // Highlight the centered card briefly before opening
                setTimeout(() => {
                    randomCard.style.transition = "transform 0.3s";
                    randomCard.style.transform = "scale(1.1)"; // Brief zoom effect

                    setTimeout(() => {
                        randomCard.style.transform = "scale(1)"; // Reset zoom
                        const gameLink = randomCard.dataset.link;
                        if (gameLink) {
                            window.location.href = gameLink; // Redirect to the selected game
                        }
                    }, 1000); // Wait before redirecting

                }, 1500); // Allow time for the scroll animation to finish
            } else {
                alert("No games found to pick from!");
            }
        });
    }

    // ✅ Smooth, Jitter-Free Horizontal Scrolling with Mouse Wheel
    if (gameGrid) {
        let isScrolling = false; // Flag to prevent scroll stacking

        gameGrid.addEventListener("wheel", (event) => {
            event.preventDefault();

            if (!isScrolling) {
                isScrolling = true;

                // Scroll speed control
                const scrollAmount = event.deltaY * 1.5;

                gameGrid.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth"
                });

                // Throttle the scroll to prevent jitter
                setTimeout(() => {
                    isScrolling = false;
                }, 150); // Adjust this value for smoother/faster throttling
            }
        });
    }
});

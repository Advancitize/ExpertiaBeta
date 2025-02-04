// Mock database for users
const users = [
    { email: "adminlogin@advancitize.org", password: "adminExpertia" },
];

// ✅ User Authentication Logic
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const container = document.getElementById('container');

if (registerBtn && loginBtn && container) {
    registerBtn.addEventListener('click', () => container.classList.add("active"));
    loginBtn.addEventListener('click', () => container.classList.remove("active"));
}

// ✅ Sign-In Process
const signInEmail = document.getElementById("signInEmail");
const signInPassword = document.getElementById("signInPassword");
const signInBtn = document.getElementById("signInBtn");

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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

// ✅ Sign-Up Process
const signUpBtn = document.getElementById("signUpBtn");

if (signUpBtn) {
    signUpBtn.addEventListener("click", () => {
        Swal.fire({
            icon: 'info',
            title: 'Contact Us',
            text: 'For access to this site, please contact junkmail5.22.2012@gmail.com.'
        });
    });
}

// ✅ Game Launcher Functionality
document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const gameCards = document.querySelectorAll(".card");
    const randomGameBtn = document.getElementById("randomGameBtn");
    const gameGrid = document.getElementById("gameGrid");

    // 🔍 Search Functionality
    if (searchBar) {
        searchBar.addEventListener("input", (e) => {
            const searchText = e.target.value.toLowerCase().trim();
            gameCards.forEach(card => {
                const gameTitle = card.querySelector(".gamelogo").textContent.toLowerCase();
                card.style.display = gameTitle.includes(searchText) ? "block" : "none";
            });
        });
    }

    // 🖱️ Make Entire Card Clickable
    gameCards.forEach(card => {
        card.addEventListener("click", (event) => {
            if (!event.target.closest("a")) { // Avoid double navigation when clicking links
                const gameLink = card.dataset.link || card.querySelector("a")?.href;
                if (gameLink) {
                    window.location.href = gameLink;
                }
            }
        });
    });

    // 🎯 Random Game Picker with Centered Scroll
    if (randomGameBtn) {
        randomGameBtn.addEventListener("click", () => {
            const visibleCards = Array.from(gameCards).filter(card => card.style.display !== "none");

            if (visibleCards.length > 0) {
                const randomCard = visibleCards[Math.floor(Math.random() * visibleCards.length)];

                randomCard.scrollIntoView({
                    behavior: "smooth",
                    inline: "center"
                });

                setTimeout(() => {
                    randomCard.style.transition = "transform 0.3s";
                    randomCard.style.transform = "scale(1.1)";

                    setTimeout(() => {
                        randomCard.style.transform = "scale(1)";
                        const gameLink = randomCard.dataset.link || randomCard.querySelector("a")?.href;
                        if (gameLink) {
                            window.location.href = gameLink;
                        }
                    }, 1000);

                }, 1500);
            } else {
                alert("No games found to pick from!");
            }
        });
    }

    // 🖱️ Smooth Horizontal Scrolling with Mouse Wheel
    if (gameGrid) {
        let isScrolling = false;

        gameGrid.addEventListener("wheel", (event) => {
            event.preventDefault();

            if (!isScrolling) {
                isScrolling = true;

                const scrollAmount = event.deltaY * 1.5;

                gameGrid.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth"
                });

                setTimeout(() => {
                    isScrolling = false;
                }, 150);
            }
        });
    }

    // 🔊 Click Sound Effect
    const clickSound = document.getElementById("clickSound");
    if (clickSound) {
        document.body.addEventListener("pointerdown", function enableSound() {
            clickSound.muted = false;
            document.body.removeEventListener("pointerdown", enableSound);
        });

        const clickableElements = document.querySelectorAll("a, button, input[type='submit']");
        clickableElements.forEach(element => {
            element.addEventListener("pointerdown", () => {
                clickSound.currentTime = 0;
                clickSound.play().catch(err => console.warn("Playback prevented:", err));
            });
        });
    }
});

// 🔍 Fixed Search Functionality
if (searchBar) {
    searchBar.addEventListener("input", (e) => {
        const searchText = e.target.value.toLowerCase().trim();
        
        gameCards.forEach(card => {
            const gameTitle = card.querySelector(".gamelogo").textContent.toLowerCase();
            
            if (gameTitle.includes(searchText)) {
                card.style.display = "";  // ✅ Restores default CSS display
            } else {
                card.style.display = "none";
            }
        });
    });
}

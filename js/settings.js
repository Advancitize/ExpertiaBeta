document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("theme");
    const clickSound = document.getElementById("clickSound");

    // ✅ Apply the saved theme on page load
    if (currentTheme === "light") {
        document.body.classList.add("light-theme");
    }

    // 🎨 Theme Toggle Functionality
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-theme");

            // Save the current theme to localStorage
            if (document.body.classList.contains("light-theme")) {
                localStorage.setItem("theme", "light");
            } else {
                localStorage.setItem("theme", "dark");
            }

            // Play click sound when toggling theme
            playClickSound();
        });
    }

    // 🔊 Click Sound Integration
    function playClickSound() {
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(err => console.warn("Playback prevented:", err));
        }
    }

    // Enable click sound after first interaction (fix for browser autoplay restrictions)
    document.body.addEventListener("pointerdown", function enableSound() {
        if (clickSound) clickSound.muted = false;
        document.body.removeEventListener("pointerdown", enableSound);
    });

    // Add click sound to all buttons and links
    const clickableElements = document.querySelectorAll("a, button, input[type='submit']");
    clickableElements.forEach(element => {
        element.addEventListener("pointerdown", playClickSound);
    });
});

// Mock database for users
const users = [
    { email: "dhsnv34kfds@hehe.sigma", password: "Kenjiisthebestbrawler" },
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

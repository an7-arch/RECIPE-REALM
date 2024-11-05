// Select elements
const loginSection = document.getElementById("loginSection");
const createAccountSection = document.getElementById("createAccountSection");
const profileSection = document.getElementById("profileSection");
const loginForm = document.getElementById("loginForm");
const createAccountForm = document.getElementById("createAccountForm");
const updateProfileForm = document.getElementById("updateProfileForm");
const displayName = document.getElementById("displayName");
const profileUsername = document.getElementById("profileUsername");
const profileEmail = document.getElementById("profileEmail");
const logoutButton = document.getElementById("logoutButton");
const createAccountButton = document.getElementById("createAccountButton");
const loginMessage = document.getElementById("loginMessage");
const createAccountMessage = document.getElementById("createAccountMessage");
const profileMessage = document.getElementById("profileMessage");

// Simulate user data storage
let userData = {};

// Check if user is logged in
if (localStorage.getItem("isLoggedIn") === "true") {
  showProfile();
}

// Show create account section
createAccountButton.addEventListener("click", function () {
  loginSection.style.display = "none";
  createAccountSection.style.display = "block";
});

// Handle account creation
createAccountForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newUsername = document.getElementById("newUsername").value;
  const newEmail = document.getElementById("newEmail").value;
  const newPassword = document.getElementById("newPassword").value;

  // Save new user data
  userData.username = newUsername;
  userData.password = newPassword;
  userData.email = newEmail;

  createAccountMessage.textContent = "Account created successfully!";
  setTimeout(() => {
    createAccountSection.style.display = "none";
    loginSection.style.display = "block";
  }, 1000); // Delay for showing message before redirecting
});

// Login form submit event
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const loginUsername = document.getElementById("loginUsername").value;
  const loginPassword = document.getElementById("loginPassword").value;

  if (
    loginUsername === userData.username &&
    loginPassword === userData.password
  ) {
    localStorage.setItem("isLoggedIn", "true");
    loginMessage.textContent = "Login successful!";
    showProfile();
  } else {
    loginMessage.textContent = "Incorrect username or password.";
  }
});

// Update profile form submit event
updateProfileForm.addEventListener("submit", function (event) {
  event.preventDefault();

  userData.username = profileUsername.value;
  userData.email = profileEmail.value;

  displayName.textContent = userData.username;
  profileMessage.textContent = "Profile updated successfully!";
});

// Logout button event
logoutButton.addEventListener("click", function () {
  localStorage.setItem("isLoggedIn", "false");
  showLogin();
});

// Show profile section
function showProfile() {
  displayName.textContent = userData.username;
  profileUsername.value = userData.username;
  profileEmail.value = userData.email;
  loginSection.style.display = "none";
  profileSection.style.display = "block";
}

// Show login section
function showLogin() {
  loginForm.reset();
  loginMessage.textContent = "";
  createAccountMessage.textContent = "";
  profileMessage.textContent = "";
  loginSection.style.display = "block";
  createAccountSection.style.display = "none";
  profileSection.style.display = "none";
}

const rateUsSection = document.getElementById("rateUsSection");
const rateUsMessage = document.getElementById("rateUsMessage");
const ratingStars = document.querySelectorAll(".rating span");

ratingStars.forEach((star) => {
  star.addEventListener("click", function () {
    const selectedRating = this.getAttribute("data-rating");

    // Clear previous selections
    ratingStars.forEach((star) => star.classList.remove("selected"));

    // Highlight selected rating
    for (let i = 0; i < ratingStars.length; i++) {
      if (ratingStars[i].getAttribute("data-rating") <= selectedRating) {
        ratingStars[i].classList.add("selected");
      }
    }

    rateUsMessage.textContent = `Thank you for rating us ${selectedRating} stars!`;
  });
});

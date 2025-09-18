// Signup validation
document.getElementById("signupForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  alert("Account created successfully!");
});

// Login validation
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Logged in successfully!");
  window.location.href = "./index.html";

});

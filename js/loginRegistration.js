$(document).ready(function () {
  // Show login form and hide registration form by default
  $("#loginForm").show();
  $("#registerForm").hide();

  // Toggle between login and registration forms
  $("#showLoginForm").click(function () {
    $("#loginForm").show();
    $("#registerForm").hide();
  });

  $("#showRegisterForm").click(function () {
    $("#loginForm").hide();
    $("#registerForm").show();
  });

  // Function to handle registration
  function register(event) {
    event.preventDefault();

    // Get registration form values
    const fullname = document.getElementById("registerFullname").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById(
      "registerConfirmPassword"
    ).value;
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (existingUsers.some((user) => user.name === email)) {
      alert("Email already exists, try another one");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Create new user object
    const newUser = {
      id: existingUsers.length + 1, // Generate unique ID
      fullname: fullname,
      name: email,
      password: password,
      purchases: [], // Initialize with an empty array for purchases
    };

    // Add new user to existing users array
    existingUsers.push(newUser);

    // Save updated users array back to local storage
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Redirect to profile page after registration
    window.location.href = "../index.html";
  }

  // Function to handle login
  function login(event) {
    event.preventDefault();

    // Get login form values
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const existingSellers = JSON.parse(localStorage.getItem("sellers")) || [];
    const existingAdmin = JSON.parse(localStorage.getItem("admins")) || [];

    const user = existingUsers.find(
      (user) => user.Email === email && user.password === password
    );
    const seller = existingSellers.find(
      (seller) => seller.Email === email && seller.password === password
    );
    const admin = existingAdmin.find(
      (admin) => admin.Email === email && admin.password === password
    );

    if (user) {
      alert("Login successful!");
      sessionStorage.removeItem("userLogged");
      sessionStorage.removeItem("sellerLogged");
      sessionStorage.removeItem("adminLogged");
      sessionStorage.setItem("userLogged", JSON.stringify(user));
      // You can redirect to a specific page or perform any other action here
      window.location.href = "../index.html";
    } else if (seller) {
      sessionStorage.removeItem("userLogged");
      sessionStorage.removeItem("sellerLogged");
      sessionStorage.removeItem("adminLogged");
      alert("Login successful!");
      sessionStorage.setItem("sellerLogged", JSON.stringify(seller));
      // You can redirect to a specific page or perform any other action here
      window.location.href = "../admin/sallerPage.html";
    } else if (admin) {
      sessionStorage.removeItem("userLogged");
      sessionStorage.removeItem("sellerLogged");
      sessionStorage.removeItem("adminLogged");
      alert("Login successful!");
      sessionStorage.setItem("adminLogged", JSON.stringify(admin));
      // You can redirect to a specific page or perform any other action here
      window.location.href = "../admin/dashboard.html";
    } else {
      alert("Invalid email or password");
    }
  }

  // Event listener for registration form submission
  document.getElementById("registerForm").addEventListener("submit", register);

  // Event listener for login form submission
  document.getElementById("loginForm").addEventListener("submit", login);
});

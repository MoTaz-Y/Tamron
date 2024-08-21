$(function () {
  $("#register-form").submit(function (event) {
    event.preventDefault();
    var name = $("#name").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirm-password").val();

    if (password === confirmPassword) {
      var newUser = confirm("Registered as " + name + " (" + email + ")");
      if (newUser) {
        function addUserToLocalStorage(username, password) {
          // Retrieve the existing users
          let users = localStorage.getItem("users");

          // Parse the existing data if it exists, otherwise initialize as an empty object
          users = users ? JSON.parse(users) : {};

          // Add the new user and password
          users[username] = password;

          // Stringify the updated data
          const updatedUsers = JSON.stringify(users);

          // Save the updated data back to local storage
          localStorage.setItem("users", updatedUsers);
        }
        addUserToLocalStorage(name, password);
        window.location.href = "./user-dashboard.html";
      }
    } else {
      alert("Passwords do not match");
    }
  });
});

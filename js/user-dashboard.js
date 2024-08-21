import { updateUserUI, redirectToLogin, cartSidebar } from "./main.js";
let adminID = JSON.parse(sessionStorage.getItem("adminLogged")) || 0;
let userID = JSON.parse(sessionStorage.getItem("userLogged")) || 0;
$(function () {
  if (adminID !== 0 || sellerID !== 0) {
    //navbar
    updateUserUI();
    // small navigator
    $("#sideNavButton").on("click", function () {
      console.log("hi there");
      $("#naveSideBar").toggleClass("active");
      console.log($("#naveSideBar"));
    });
    $("#closeSmallNav").on("click", function () {
      console.log("lknkjbfkjmbdsfakj");
      $("#naveSideBar").removeClass("active");
    });
    // cart
    $("#buyNow").on("click", function () {
      cartSidebar();
    });
    //login form
    $("#login-link").on("click", function () {
      redirectToLogin();
    });
    // handle closing the sidebar
    $(document).on("click", "#closeNav", function () {
      $("#cartDisplay").removeClass("active");
      $("#sideBarContainer").removeClass("active");
      $("body").removeClass("no-scroll");
    });
    const userSession = JSON.parse(sessionStorage.getItem("userLogged"));
    const users = JSON.parse(localStorage.getItem("usersData"))
      ? JSON.parse(localStorage.getItem("usersData"))
      : JSON.parse(localStorage.getItem("users"));

    function updateUserInLocalStorage(updatedUser) {
      const userIndex = users.findIndex((user) => user.id === updatedUser.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem("users", JSON.stringify(users));
      }
    }

    function updateUserInSessionStorage(updatedUser) {
      sessionStorage.setItem("userLogged", JSON.stringify(updatedUser));
    }

    // Populate order history
    var total = 0;
    userSession.purchases.forEach((purchase) => {
      var itemTotal = parseInt(purchase.price) * purchase.quantity;
      total += itemTotal;
      $("#order-history").append(`
        <div class="order-history-item mb-3 p-2 border rounded">
          <p><strong>${purchase.product_Name}</strong></p>
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <p>Price: $${purchase.price.toFixed(2)}</p>
          <p>Quantity: ${purchase.quantity}</p>
          <p>Total: $${itemTotal.toFixed(2)}</p>
          <p>Status: Shipped</p>
        </div>
      `);
    });
    $("#order-history").append(`
      <div class="order-history-item mb-3 p-2 border rounded">
        <h2>Total Price</h2>
        <p>Total: $${total.toFixed(2)}</p>
      </div>
    `);

    // Populate account settings
    $("#username").val(userSession.name);
    $("#email").val("bob@example.com"); // Placeholder email
    $("#password").val(userSession.password);

    // Populate profile picture and other info
    $("#profile-image").attr("src", userSession.image);
    $("#location").text(`Location: ${userSession.location}`);
    $("#phone-number").text(`Phone: ${userSession.phone_number}`);

    // Handle form submission
    $("#account-settings-form").on("submit", function (event) {
      event.preventDefault();
      userSession.name = $("#username").val();
      userSession.email = $("#email").val();
      userSession.password = $("#password").val();
      userSession.location = $("#location").val();
      userSession.phone_number = $("#phone-number").val();

      updateUserInLocalStorage(userSession);
      updateUserInSessionStorage(userSession);

      alert("Account settings updated!");
    });

    // Update user UI
    updateUserUI();
  }
});
if (adminID == 0 && sellerID == 0) {
  document.getElementsByTagName(
    "body"
  )[0].innerHTML = `<div class="alert alert-danger" role="alert">
  you are not allowed to see this page <a href="../index.html" class="alert-link">Home Page</a>please retutn home
</div>`;
}

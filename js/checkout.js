import {
  updateUserUI,
  redirectToLogin,
  cartSidebar,
  getProducts,
} from "./main.js";

$(function () {
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

  // Get the logged-in user's cart from sessionStorage
  var user = JSON.parse(sessionStorage.getItem("userLogged"));
  var cart = user.purchases || [];
  getProductsToCheckOut(mainProducts);
  function getProductsToCheckOut(products) {
    var orderSummary = "";
    var total = 0;

    cart.forEach(function (cartItem) {
      var product = products.find((p) => p.id == cartItem.id);
      if (product) {
        var itemTotal = product.price * cartItem.quantity;
        total += itemTotal;

        orderSummary += `
          <div class="singleProductToBuy">
          <div class="productImgToBuy">
              <div class="quantity">${cartItem.quantity}</div>
              <img src="${product.image}" alt="">
          </div>
          <h6>${product.product_Name}</h6>
          <p>$${itemTotal.toFixed(2)}</p>
          </div>
        `;
      }
    });

    $("#order-summary").html(orderSummary);
    $("#order-total").html(`<h6>Total</h6> <p> $${total.toFixed(2)}</p>`);
  }

  $("#checkoutFormSubmit").click(function (event) {
    event.preventDefault();
    alert("Order placed successfully!");

    // Clear the cart in sessionStorage and update localStorage
    user.purchases = [];
    sessionStorage.setItem("userLogged", JSON.stringify(user));

    var localUsers = JSON.parse(localStorage.getItem("users"));
    localUsers = localUsers.map((localUser) =>
      localUser.id === user.id ? user : localUser
    );
    localStorage.setItem("users", JSON.stringify(localUsers));
    updateProductInLocalStorage(cart);
    alert("Order placed successfully!");
    window.location.href = "index.html";
  });
});

function updateProductInLocalStorage(cart, mainProducts) {
  let localProducts = mainProducts;
  console.log(localProducts);

  cart.forEach((cartItem) => {
    localProducts.forEach((product) => {
      if (product.id === cartItem.id) {
        if (cartItem.quantity > product.stock) {
          let confirmation;
          if (product.stock) {
            confirmation = confirm(
              `there is only ${product.stock} left. do you want to proceed to buy ${product.stock}`
            );
          } else {
            confirmation = confirm(`this product is no longer exist`);
          }
          if (confirmation) {
            product.stock = 0;
          } else {
            return;
          }
        } else {
          product.stock -= cartItem.quantity;
        }
      }
    });
  });

  console.log(localProducts);
  localStorage.setItem("products", JSON.stringify(localProducts));
}

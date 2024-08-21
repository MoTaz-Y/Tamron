import { updateUserUI, cartSidebar, getProducts, getSeller } from "./main.js";

$(document).ready(function () {
  //navbar
  updateUserUI();
  let mainProducts = getProducts();

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
  let user = JSON.parse(sessionStorage.getItem("userLogged"));
  let cart = user.purchases || [];
  assignProducts(cart, mainProducts);
  function assignProducts(cart, products) {
    renderCartItems(cart, products);

    $(".change-quantity").click(function () {
      let productId = $(this).data("id");
      let action = $(this).data("action");
      let cartItem = cart.find((item) => item.id == productId);

      if (cartItem) {
        if (action === "increase" && cartItem.quantity < cartItem.stock) {
          cartItem.quantity += 1;
        } else if (action === "decrease" && cartItem.quantity > 1) {
          cartItem.quantity -= 1;
        }

        updateCartDisplay(cart, products);
        updateStorage(cart);
      }
    });

    $(".remove-item").click(function () {
      var productId = $(this).data("id");
      cart = cart.filter((item) => item.id != productId);
      updateCartDisplay(cart, products);
      updateStorage(cart);
      window.location.reload();
    });
  }

  $("#checkout-btn").click(function () {
    window.location.href = "checkout.html";
  });

  function renderCartItems(cart, products) {
    let cartItems = "";
    let total = 0;

    cart.forEach(function (cartItem) {
      let product = products.find((p) => p.id == cartItem.id);
      if (product) {
        let itemTotal = parseFloat(product.price) * cartItem.quantity;
        total += itemTotal;

        cartItems += `
          <div class="cart-item m-3" style="min-height:400px;width:250px" data-id="${
            product.id
          }">
            <img src="${product.image}" class="img-fluid" alt="${
          product.name
        }" style="height:250px">
            <div>
              <h5>${product.product_Name}</h5>
              <div class="d-flex align-items-center">
                <button class="btn btn-secondary change-quantity" data-id="${
                  product.id
                }" data-action="decrease">-</button>
                <input type="number" class="form-control mx-2 quantity" data-id="${
                  product.id
                }" value="${cartItem.quantity}" style="width: 60px;" readonly>
                <button class="btn btn-secondary change-quantity" data-id="${
                  product.id
                }" data-action="increase">+</button>
              </div>
              <p>Price: $${product.price.toFixed(2)}</p>
              <p class="item-total">Total: $${itemTotal.toFixed(2)}</p>
              <button class="btn btn-danger remove-item" data-id="${
                product.id
              }">Remove</button>
            </div>
          </div>
        `;
      }
    });

    $("#cart-items").html(cartItems);
    $("#cart-total").html(`<h3>Total: $${total.toFixed(2)}</h3>`);
  }

  function updateCartDisplay(cart, products) {
    let total = 0;

    cart.forEach(function (cartItem) {
      let productElement = $(`.cart-item[data-id=${cartItem.id}]`);
      let product = products.find((p) => p.id == cartItem.id);

      if (productElement.length) {
        if (product) {
          let itemTotal = parseFloat(product.price) * cartItem.quantity;
          productElement.find(".quantity").val(cartItem.quantity);
          productElement
            .find(".item-total")
            .text(`Total: $${itemTotal.toFixed(2)}`);
          total += itemTotal;
        }
      }
    });

    $("#cart-total").html(`<h3>Total: $${total.toFixed(2)}</h3>`);
  }

  function updateStorage(cart) {
    user.purchases = cart;
    sessionStorage.setItem("userLogged", JSON.stringify(user));

    let localUsers = JSON.parse(localStorage.getItem("users"));
    localUsers = localUsers.map((localUser) =>
      localUser.id === user.id ? user : localUser
    );
    localStorage.setItem("users", JSON.stringify(localUsers));
  }
});

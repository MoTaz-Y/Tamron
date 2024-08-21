import {
  updateUserUI,
  redirectToLogin,
  cartSidebar,
  getProducts,
} from "./main.js";

$(document).ready(function () {
  //navbar
  updateUserUI();
  let mainProducts = getProducts();
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
  const productId = getProductIdFromUrl();
  loadProductDetails(mainProducts, productId);
});

function getProductIdFromUrl() {
  return new URLSearchParams(window.location.search).get("id");
}

function loadProductDetails(mainProducts, productId) {
  const product = mainProducts.find((p) => p.id == productId);
  console.log(mainProducts);
  console.log(product);
  if (product) {
    let stockFlag;
    if (product.stock == 0) {
      displayProductDetails(product, (stockFlag = 0));
    } else {
      displayProductDetails(product, (stockFlag = 1));
      setupAddToCartButton(product, productId);
    }
  } else {
    $("#product-details").html("<p>Product not found.</p>");
  }
}

function displayProductDetails(product, stockFlag) {
  let Flag = stockFlag;
  let stock = "";
  if ((Flag = 1)) {
    stock = "active";
  }
  const productDetails = `
    <div class="proimg">
            <img src="${product.image}" alt="${product.product_Name}">
        </div>
        <div class="productDes">
          <h3>${product.product_Name}</h3>
          <div class="discount">
                <p>$${product.price.toFixed(2)} </p>
          </div>
          <p class="discription">${product.description}</p>
            <p class="stockPro"><span>stock :</span> ${product.stock}</p>
            <div class="buyBtn">
        <button class="btn btn-primary ${stock}" id="add-to-cart-btn">Add to Cart</button>
                </button>
            </div>
            
            
        </div>

  `;
  $("#product-details").html(productDetails);
  displayReviews(product.reviews);
}

function displayReviews(reviews) {
  let reviewsHtml = "";
  reviews.forEach(function (review) {
    reviewsHtml += `
          <div class="order-item m-3">
            <h5>User: ${review.user}</h5>
            <p>rating: ${review.rating}</p>
            <p>comment: $${review.comment}</p>
          </div>
    `;
  });
  $("#reviews").html(reviewsHtml);
}

function setupAddToCartButton(product, productId) {
  $("#add-to-cart-btn").click(function () {
    const user = JSON.parse(sessionStorage.getItem("userLogged"));
    if (!user) {
      redirectToLogin();
      return;
    }

    const userPurchases = user.purchases || [];
    const existingItem = userPurchases.find((item) => item.id == productId);

    if (existingItem) {
      existingItem.quantity = existingItem.quantity
        ? existingItem.quantity + 1
        : 1;
    } else {
      product.quantity = 1;
      userPurchases.push(product);
    }

    user.purchases = userPurchases;
    sessionStorage.setItem("userLogged", JSON.stringify(user));
    console.log(user.id);
    let localUsers = JSON.parse(localStorage.getItem("users"));
    localUsers = localUsers.map((localUser) =>
      localUser.id === user.id ? user : localUser
    );
    localStorage.setItem("users", JSON.stringify(localUsers));
    console.log(JSON.parse(localStorage.getItem("users")));
    alert("Product added to cart");
  });
}

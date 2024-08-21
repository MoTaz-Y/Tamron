import {
  updateUserUI,
  redirectToLogin,
  cartSidebar,
  getProducts,
} from "./main.js";

$(function () {
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
  //cart
  let mainProducts = getProducts();
  $("#buyNow").on("click", function () {
    cartSidebar();
  });
  //login form
  $("#login-link").on("click", function () {
    redirectToLogin();
  });
  // handle closing the sidebar
  $(document).on("click", "#closeNav", function () {
    console.log("sjsfh");
    $("#cartDisplay").removeClass("active");
    $("#sideBarContainer").removeClass("active");
    $("body").removeClass("no-scroll");
  });
  $("#moreDetails").on("click", function () {
    window.location.href = "./product-catalog.html";
  });
  getProductsFromSellers(mainProducts);
  function getProductsFromSellers(products) {
    var featuredProducts = "";
    var featuredProducts_1 = "";
    var utility = "";
    products.forEach(function (product, index) {
      if (index < 4 || (index > 17 && index < 22)) {
        // new update
        // Display only first 8 products as featured products
        featuredProducts += `
          <div class="col-12 col-md-6 col-lg-3  mb-4">
            <div class="card" style="height:400px">
              <img src="${product.image}" class="card-img-top" alt="${
          product.product_Name
        }" style="height:250px">
              <div class="card-body">
                <h5 class="card-title">${product.product_Name}</h5>
                <p class="card-text">$${product.price.toFixed(2)}</p>
                <a href="product-details.html?id=${
                  product.id
                }" class="btn custom-btn">View Details</a>
              </div>
            </div>
          </div>
        `;
      }
    });
    let key = Math.floor(Math.random() * products.length - 1) + 1;

    featuredProducts_1 += `  <div class="type" >      <div class="typeImg">
    <img src="${products[key].image}" alt="" />
  </div>
  <div class="typeText">
    <h3>${products[key].product_Name}</h3>
    <p>${products[key].about}</p>
    <a href="product-details.html?id=${products[key].id}" class="btn custom-btn">View Details</a>
  </div></div>`;
    featuredProducts_1 += ` <div class="type" >       
        <div class="typeImg">
          <img src="${products[key + 1].image}" alt="" />
        </div>
        <div class="typeText">
            <h3>${products[key + 1].product_Name}</h3>
            <p>${products[key + 1].about}</p>
            <a href="product-details.html?id=${
              products[key + 1].id
            }" class="btn custom-btn">View Details</a>
        </div>
      </div>`;

    utility = `      <img src="${products[key - 1].image}" alt="utility" />
      <div class="utilityText">
        <h3>${products[key - 1].product_Name}</h3>
        <p>
        ${products[key - 1].about}
        </p>
        <a href="product-details.html?id=${
          products[key - 1].id
        }" class="btn custom-btn">View Details</a>
      </div>`;
    $("#productHomeCard").append(featuredProducts_1);
    $("#utility").append(utility);
    $("#featured-products").html(featuredProducts);
  }

  // Update category value on change
  $("#catgory").change(function () {
    category = $(this).val();
  });

  // Update price value on change
  $("#price").change(function () {
    price = $(this).val();
  });

  $("#shop-now-link").on("click", function () {
    window.location.href = `product-catalog.html?category=${category}&price=${price}`;
  });
});

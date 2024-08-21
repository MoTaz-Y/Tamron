import {
  updateUserUI,
  redirectToLogin,
  cartSidebar,
  getProducts,
} from "./main.js";

window.addToCard = function (productId, seller_Id) {
  window.location.href = `product-details.html?id=${productId}&sellerId=${seller_Id}`;
};
window.openPage = function (productId) {
  window.location.href = `product-details.html?id=${productId}`;
};
function getQueryParams(name) {
  let urlParam = new URLSearchParams(window.location.search);
  return urlParam.get(name);
}
function openPages(id) {
  console.log("id");
  // window.location.href = `product-details.html?id=${id}`;
}
$(document).ready(function () {
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
  updateUserUI();
  let mainProducts = getProducts();
  assignProducts(mainProducts);

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
  $("#moreDetails").on("click", function () {
    window.location.href = "../about.html";
  });
  // Load products and render them
  function assignProducts(products) {
    renderProducts(products);

    // Add event listeners for category and price filters
    $('input[name="category"]').on("change", function () {
      console.log(products);
      filterProducts(products);
    });
    $('input[name="brand"]').on("change", function () {
      filterProducts(products);
    });
    $("#price").on("input", function () {
      filterProducts(products);
    });
  }

  // Render products function
  function renderProducts(products) {
    var productCatalog = "";
    console.log("product");
    console.log(products);
    console.log("product");
    products.forEach(function (product) {
      productCatalog += `<div class="product">
      <div class="card">
          <div class="imageCard">
              <img src="${product.image}" class="card-img-top" onClick="openPage(${product.id})"   alt="${
product.name
}">

              <button onClick="addToCard(${product.id},${
product.seller_id
})"><i class="fa-solid fa-plus"></i> add to cart</button>
          </div>
          <p id="outOfStock">out of stock</p>
          <div class="card-body">
              <h5 class="card-title">${product.product_Name}</h5>
              <p class="card-text">$${product.price.toFixed(2)}</p>
          </div>
      </div>
  </div>`;
product.stock == 0
? $("#outOfStock").addClass("active")
: $("#outOfStock").removeClass("active");
});
    $("#product-catalog").html(productCatalog);
  }
  let homeCategory = getQueryParams("category");
  let homePrice = getQueryParams("price");
  // Filter products function
  var filterProducts = function (products) {
    var selectedCategory = $('input[name="category"]:checked').val();
    console.log(selectedCategory);
    var selectedBrand = $('input[name="brand"]:checked').val();
    console.log(selectedBrand);
    var selectedPrice = $("#price").val();
    console.log(selectedPrice);

    // if (homeCategory && homePrice) {
    //   var filteredProducts = products.filter(function (product) {
    //     var matchCategory =
    //       product.category.toLowerCase() === homeCategory.toLowerCase();
    //     var matchBrand = selectedBrand === "allBrands";
    //     var matchPrice = product.price <= homePrice;
    //     return matchCategory && matchBrand && matchPrice;
    //   });
    // } else {
    //   var filteredProducts = products.filter(function (product) {
    //     var matchCategory =
    //       selectedCategory === "allCategories" ||
    //       product.category.toLowerCase() === selectedCategory.toLowerCase();
    //     var matchBrand =
    //       selectedBrand === "allBrands" ||
    //       product.brand.toLowerCase() === selectedBrand.toLowerCase();
    //     var matchPrice = product.price <= selectedPrice;
    //     return matchCategory && matchBrand && matchPrice;
    //   });
    // }
    var filteredProducts = products.filter(function (product) {
      var matchCategory =
        selectedCategory === "allCategories" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();
      var matchBrand =
        selectedBrand === "allBrands" ||
        product.brand.toLowerCase() === selectedBrand.toLowerCase();
      var matchPrice = product.price <= selectedPrice;
      return matchCategory && matchBrand && matchPrice;
    });
    console.log("filteredProducts");
    console.log(filteredProducts);
    console.log("filteredProducts");

    renderProducts(filteredProducts);
  };
  // let allImgs= document.getElementsByClassName("card-img-top");
  // for(let i=0 ; i< allImgs.length;i++){
  //   allImgs[i].addEventListener('click',function(e){
  //     console.log(product.id)
  //   })
  // }

  //filtered due to the home page
});

import { updateUserUI } from "./main.js";

$(function () {
  updateUserUI();
  // starting
  const users = JSON.parse(localStorage.getItem("usersData"))
    ? JSON.parse(localStorage.getItem("usersData"))
    : JSON.parse(localStorage.getItem("users"));

  // Populate product list
  function populateProductList() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const productList = $("#product-list");
    productList.empty();
    products.forEach((product, index) => {
      productList.append(`
        <div class="product-item mb-3 p-2 border rounded">
          <p><strong>${product.name}</strong></p>
          <button class="btn btn-secondary edit-product" data-index="${index}">Edit</button>
          <button class="btn btn-danger delete-product" data-index="${index}">Delete</button>
        </div>
      `);
    });
  }

  // Populate order list
  function populateOrderList() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const orderList = $("#order-list");
    orderList.empty();
    orders.forEach((order, index) => {
      orderList.append(`
        <div class="order-item mb-3 p-2 border rounded">
          <p><strong>Order #${order.id}</strong></p>
          <button class="btn btn-secondary view-order" data-index="${index}">View</button>
        </div>
      `);
    });
  }

  // Populate customer list
  function populateCustomerList() {
    const customerList = $("#customer-list");
    customerList.empty();
    users.forEach((user, index) => {
      customerList.append(`
        <div class="customer-item mb-3 p-2 border rounded">
          <p><strong>${user.name}</strong></p>
          <button class="btn btn-secondary view-customer" data-index="${index}">View</button>
        </div>
      `);
    });
  }

  // Initialize dashboard
  populateProductList();
  populateOrderList();
  populateCustomerList();

  // Handle delete product
  $("#product-list").on("click", ".delete-product", function () {
    const index = $(this).data("index");
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    populateProductList();
    alert("Product deleted");
  });

  // Handle view order
  $("#order-list").on("click", ".view-order", function () {
    const index = $(this).data("index");
    // Handle order view logic
    alert("View Order clicked for index " + index);
  });

  // Handle view customer
  $("#customer-list").on("click", ".view-customer", function () {
    const index = $(this).data("index");
    // Handle customer view logic
    alert("View Customer clicked for index " + index);
  });

  // Sales chart
  var ctx = document.getElementById("salesChart").getContext("2d");
  var salesChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Sales",
          data: [10, 20, 30, 40, 50, 60],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

import { searchTable, fetchData, showAddForm } from "../js/main.js";
let adminID = JSON.parse(sessionStorage.getItem("adminLogged")) || 0;
let sellerID = JSON.parse(sessionStorage.getItem("sellerLogged")) || 0;
/**Selection of elements**/
document.addEventListener("DOMContentLoaded", () => {
  if (adminID !== 0 || sellerID !== 0) {
    function updateUserUI() {
      let htmlContent;
      htmlContent = `
            <li class="dropdown">
              <a href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <p class="user" ><i class="fa-solid fa-user" ></i></p>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><a class="dropdown-item" href="#" id="logout">Logout</a></li>
              </ul>
            </li>`;
      $("#login-register").html(htmlContent);
      $("#logout").on("click", function () {
        // Perform logout logic here (e.g., clearing session storage)
        sessionStorage.removeItem("sellerLogged");
        // Redirect to the logout page
        window.location.href = "../index.html";
      });
    }
    updateUserUI();
    const search_Input = document.getElementById("searchInput");
    const add_Seller = document.getElementById("addNewRowButton");
    const add_Product = document.getElementById("addNewProductButton");
    const sellersData = "../data/sellers.json";
    localStorage.setItem("requested_Products", []);

    /**Fetch all users from users.json**/
    fetchData(sellersData);

    if (search_Input) {
      search_Input.addEventListener("input", searchTable);
    }

    if (add_Seller) {
      add_Seller.addEventListener("click", showAddForm);
    }
    if (add_Product) {
      add_Product.addEventListener("click", showAddProduct);
    }
    /** Fetch seller data by ID from localStorage **/

    function getDataById(id) {
      let loginSeller = JSON.parse(localStorage.getItem("sellers")).find(
        (item) => +item.id === id
      );
      return loginSeller;
    }
    let seller = JSON.parse(sessionStorage.getItem("sellerLogged"));

    let logSeller = getDataById(seller.id);

    function renderPage(logSeller) {
      const ProfileImage = document.getElementById("profile");
      const productsContainer = document.getElementById("pro_cont");
      ProfileImage.src = logSeller.seller_Image;
      const Name = document.getElementById("name");
      Name.innerText = logSeller.seller_Name;
      productsContainer.innerHTML = "";
      logSeller.products.map(
        (item, index) =>
          (productsContainer.innerHTML += `<div class="card_Product shadow-sm rounded">
        <img class='pro_img' src=${item.image} alt="" />
        <div class="card_content ">
        <h4>${item.product_Name}</h4>
        <p>${item.description}</p>
        <p>$ ${item.price}</p>
        <p>${item.rating}</p>
        </div>
        <div class='btns_cont'>
        <button class='btn btn-success' id='update' data-bs-toggle='modal' data-bs-target='#staticBackdrop' onclick='updateProduct(${item.id})'>update</button>
        <button class='btn btn-danger' onclick='deleteRow(${index})'>Delete</button>
        </div>
        `)
      );
    }

    /** Render the page **/
    renderPage(logSeller);

    let proToUpdate;

    /** Update product **/
    function updateProduct(id) {
      proToUpdate = logSeller.products.find((item) => +item.id === id);
      showUpdateForm(proToUpdate);
    }
    window.updateProduct = updateProduct;

    /** Show update product form **/
    function showUpdateForm(product) {
      const form = $("#updateForm").empty();

      $.each(product, function (key) {
        let label = $("<label>", {
          for: key,
          text: key.charAt(0).toUpperCase() + key.slice(1),
          class: "form-label text-primary mb-1",
        });

        let input = $("<input>", {
          type: `${key === "id" || key === "phone" ? "number" : "text"}`,
          name: key,
          value: product[key],
          class: "form-control mb-3",
        });
        form.append(label);
        form.append(input);
      });

      let submitInput = $("<button>", {
        type: "submit",
        class: "btn btn-primary",
        id: "update",
        "data-bs-dismiss": "modal",
        text: "Submit",
      });
      form.append(submitInput);
    }

    /** Submit updates **/
    function submitUpdates(proToUpdate) {
      const data = JSON.parse(localStorage.getItem("sellers"));

      const formData = new FormData($("#updateForm")[0]);
      const updatedProduct = {};

      formData.forEach((value, key) => {
        updatedProduct[key] = value;
      });

      const seller = data.find((seller) =>
        seller.products.some((product) => product.id === proToUpdate.id)
      );

      if (seller) {
        const productIndex = seller.products.findIndex(
          (product) => product.id === proToUpdate.id
        );
        if (productIndex > -1) {
          Object.assign(seller.products[productIndex], updatedProduct);
        }
      }

      localStorage.setItem("sellers", JSON.stringify(data));
      renderPage(seller);
    }

    /** Attach the submit event handler to the form **/
    $("#updateForm").on("submit", function (e) {
      e.preventDefault();
      submitUpdates(proToUpdate);
    });

    /** Delete row **/
    function deleteRow(index) {
      logSeller.products.splice(index, 1);
      localStorage.setItem("sellers", JSON.stringify(logSeller));
      renderPage(logSeller);
    }
    window.deleteRow = deleteRow;
    /*****Add Product*****/
    const product = {
      id: "",
      product_Name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      quantity: "",
      rating: "",
    };
    function showAddProduct() {
      const form = $("#addProductForm").text(""); //wmptying the form from any old data

      $.each(product, function (key) {
        // for each key make an input which type will be text name is the key and value is the key value
        let input;
        let label;
        if (key === "id") {
          label = $("<label>", {
            for: key,
            text: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter of the key for better readability
            class: "form-label text-success mb-1",
          });
          //
          input = $("<input>", {
            type: "text",
            name: key,
            value: `${Date.now()}+${logSeller.seller_Name}`,
            disabled: true,
            class: "form-control mb-3  inputRowAdd",
          });
        } else {
          label = $("<label>", {
            for: key,
            text: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter of the key for better readability
            class: "form-label text-success mb-1",
          });
          const inputOption = {
            type: key === "id" || key === "quantity" ? "number" : "text",
            name: key,
            placeholder: key,
            required: true,
            class: "form-control mb-3  inputRowAdd",
          };

          input = $("<input>", inputOption);
        }
        form.append(label);
        form.append(input);
      });
      const submitInput = $("<input>", {
        //make input it is submit button to submit the data updated
        type: "submit",
        value: "submit",
        id: "addingRow",
        class: "btn btn-primary mt-3 w-50",
      });
      form.append(submitInput); // append it to the form
      $("#addRowForm").removeClass("hidden");
    }

    let requestedArr = [];
    function submitAddProduct() {
      // const data = JSON.parse(localStorage.getItem('seller'))[0].produ; //getting the data from local storage
      const newRow = {}; // making a new object to add the keys and values of the form inputs

      // Enable the id field before reading the form data
      $("#addProductForm").find("input[name='id']").prop("disabled", false);

      const formData = new FormData($("#addProductForm")[0]);
      // ########### added new to assure that if the key is product then there is more to do

      //making the form data object
      formData.forEach((value, key) => {
        newRow[key] = value;

        // Disable the id field again after reading the data
        $("#addProductForm").find("input[name='id']").prop("disabled", true);
      }); // then push the whole object to data array
      // const seller = getDataById(1);
      requestedArr.push(newRow);
      // seller.products.push(newRow);
      // localStorage.setItem("sellers", JSON.stringify(seller));
      localStorage.setItem("requested_Products", JSON.stringify(requestedArr));
      requestedArr = JSON.parse(localStorage.getItem("requested_Products"));
      const data = JSON.parse(localStorage.getItem("sellers"))[+logSeller.id];
      renderPage(data);
    }
    $("#addProductForm").on("submit", function (e) {
      e.preventDefault(); //to prevent reloading the page when submitting the form
      submitAddProduct(); // function of submitting the new row will be created

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("staticBackdropAdd")
      );
      modal.hide();
    });
  }
});
if (adminID == 0 && sellerID == 0) {
  document.getElementsByTagName(
    "body"
  )[0].innerHTML = `<div class="alert alert-danger" role="alert">
  you are not allowed to see this page <a href="../index.html" class="alert-link">Home Page</a>please retutn home
</div>`;
}

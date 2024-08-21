/**helpers Function**/
//--18-- checking for logged in in user
export function updateUserUI() {
  try {
    let user = JSON.parse(sessionStorage.getItem("userLogged"));
    let htmlContent;
    if (user) {
      htmlContent = `
        <li class="dropdown">
          <a href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <p class="user"><i class="fa-solid fa-user"></i></p>
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li><a class="dropdown-item" href="user-dashboard.html">Profile</a></li>
            <li><a class="dropdown-item" href="shopping-cart.html">Orders</a></li>
            <li><a class="dropdown-item" href="#" id="logout">Logout</a></li>
          </ul>
        </li>`;
    } else {
      htmlContent = `
        <li class="container" >
        <a id="login-link">
        <i class="fa-solid fa-unlock" ></i> login/register </a>
        </li>`;
    }
    htmlContent += `<li ><a id="buyNow"><i class="fa-solid fa-cart-shopping"></i> </a></li>`;
    $("#login-register").html(htmlContent);

    if (user) {
      $("#logout").on("click", function () {
        // Perform logout logic here (e.g., clearing session storage)
        sessionStorage.removeItem("userLogged");
        // Redirect to the logout page
        window.location.href = "./index.html";
      });
    }
    $("#login-link").on("click", function () {
      redirectToLogin();
    });
    // $("#sideNavButton").on("click", function () {
    //   console.log("hi there");
    //   $("#naveSideBar").toggleClass("active");
    //   console.log($("#naveSideBar"));
    // });
  } catch (error) {
    console.error("Error updating user UI:", error);
  }
}

export function getSeller(sellerId) {
  let sellers = JSON.parse(localStorage.getItem("sellers"));
  console.log(sellers);
  let seller = sellers.filter((seller) => seller.id == sellerId);
  return console.log(seller);
}
export function getUserFromLocalStorage(userId) {
  return users.find((user) => user.id === userId);
}

export function getProducts() {
  let products = [];
  let sellersProducts = JSON.parse(localStorage.getItem("sellers"));
  sellersProducts.forEach((sellersProduct) =>
    sellersProduct.products.forEach((product) => products.push(product))
  );
  return products;
}

export function redirectToLogin() {
  $("#loginRegisterModal").modal("show");
}

export function updatesellerLocalStorage() {}
//function for all pages to open sidebar
export function cartSidebar() {
  let userSession = JSON.parse(sessionStorage.getItem("userLogged"));
  if (userSession) {
    console.log("jedkje");
    $("#sideBarContainer").toggleClass("active");
    $("#cartDisplay").toggleClass("active");
    $("body").toggleClass("no-scroll");
  } else {
    alert("need to login first");
    $("#loginRegisterModal").modal("show");
  }
}

//--1-- local storage getting data if it does exist if not fetch it from API
$(function () {
  // let storageData = localStorage.getItem("userData");
  ////////////////////////////////////
  // if (storageData) {
  //   displayTable(JSON.parse(storageData)); //if the storage has data just display the table this is a function will be created after awhile
  // } else
  // {
  /////////////////
  fetchData(); // if not just fetch the data from the API this is a function will be created after awhile
  // }
  //--2-- update table data from submitting the form of updating
  $("#updateForm").on("submit", function (e) {
    e.preventDefault(); //to prevent reloading the page when submitting the form
    submitUpdate(); // function of submitting the updates will be created
  });

  //--3-- adding new row to the table by submitting the form of adding new row
  $("#addForm").on("submit", function (e) {
    e.preventDefault(); //to prevent reloading the page when submitting the form
    submitAdd(); // function of submitting the new row will be created
  });
});
/**whose Data Table do operations on**/
let whoDataTableWorkOn = "";
//--4-- fetchimg data from the api
export function fetchData(path) {
  $.getJSON(path, function (data) {
    /**get the key forward to the table**/

    const dynamicKey = Object.keys(data);
    // let keystoRemove = ["image", "purchases"];
    let dataJson = data[dynamicKey];
    whoDataTableWorkOn = dynamicKey;
    // let newData = removeKeys(dataJson, keystoRemove);
    //################### datajson ####################
    console.log(dataJson);
    let oldData =
      JSON.parse(localStorage.getItem(dynamicKey, JSON.stringify(dataJson))) ||
      dataJson;

    localStorage.setItem(dynamicKey, JSON.stringify(oldData)); // put the strignify json object to the local storage
    console.log(oldData);
    displayTable(oldData); // display the table with the new data
  });
}

//--5-- display table function
function displayTable(data) {
  $("#tableHeader").text("");
  $("#tableBody").text(""); // the last two lines means that if the tabke has data that just make it clear for the new data
  if (data.length === 0) return;
  //################# this is because of usersData but its okay to delete now ###############
  let actualData = data.users && data.users.length > 0 ? data.users : data;
  let newArr = actualData.map((item) => {
    let newItem = { ...item };
    // Delete the properties from the new item
    delete newItem["image"];
    delete newItem["seller_Image"];
    delete newItem["purchases"];
    return newItem;
  });
  if (newArr.length === 0) return;
  const headers = Object.keys(newArr[0]); // getting the headers of the table  from any object keys
  const headerRow = $("<tr>"); //creating a row
  headers.forEach((header) => {
    // for every element in the headers make a header cell and put the data in it
    // if(header !=="image" && header !=="purchases" ){

    let th = $("<th>")
      .text(header)
      .addClass("cursor-pointer th")
      .click(() => sortTable(header)); // when clicking on any header cell you will sort the table accoriding that cell
    headerRow.append(th);
    // }
  });
  const action = $("<th>").text("Actions").addClass("th"); // action part for delete and update column
  headerRow.append(action);
  $("#tableHeader").append(headerRow);
  console.log(newArr);
  newArr.slice(1).forEach((row, index) => {
    // console.log(row, index);
    const tr = $("<tr>");
    const div = $("<div>");
    //############ enhanced
    Object.values(row).forEach((val) => {
      const td = $("<td>")
        .html(
          typeof val === "object"
            ? val
                .map(
                  (item) =>
                    (div.innerHTML = `
                  <div class='d-flex justify-content-between px-3'>
                  <p class='m-0'>${item.product_Name}</p>
                  <p class='m-0'>$ ${item.price}</p>
                  </div>
                  `)
                )
                .join("<br />")
            : val
        )
        .addClass("td");
      tr.append(td);
    });

    //adding the action commited to that row update or delete
    const td = $("<td>");
    const cont = $(
      "<div class='d-flex align-items-center justify-content-center gap-3'>"
    );
    let updateButton = $(
      "<button id='update'  data-bs-toggle='modal' data-bs-target='#staticBackdrop'>"
    )
      .addClass("btn btn-success btn-sm mr-2")
      .text("Update")
      .on("click", () => showUpdateForm(index + 1));
    //at clicking the update button it will show the form to update and this clicking will carry the index of the row that i clicked on to get the data from that row and to update the table at that row
    let delButton = $("<button >")
      .addClass("btn btn-danger btn-sm")
      .text("Delete")
      .on("click", () => deleteRow(index + 1));
    //at clicking the delete button it will apply deleteRow function and carry the index to delete that row
    cont.append(updateButton, delButton);
    td.append(cont);
    tr.append(td);
    $("#tableBody").append(tr);
  });
}

//--6-- the searching from the table function
export function searchTable() {
  console.log("from main.js");
  const input = $("#searchInput").val().toLowerCase();
  const data = JSON.parse(localStorage.getItem(`${whoDataTableWorkOn}`));
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().startsWith(input)
    )
  );
  displayTable(filteredData);
}

//--7-- sorting table function
function sortTable(column) {
  const data = JSON.parse(localStorage.getItem(whoDataTableWorkOn)); // gettign the data from localstorage
  const sortedData = data.sort((a, b) => (a[column] > b[column] ? 1 : -1)); //srting the table according to the column which the client clicked on by using the comparison function
  localStorage.setItem(whoDataTableWorkOn, JSON.stringify(sortedData)); // updating the local storage
  displayTable(sortedData); // rerendering the table with the new sorted data
}

//--8-- delete row function
function deleteRow(index) {
  let data = JSON.parse(localStorage.getItem(`${whoDataTableWorkOn}`));
  // gettign the data from localstorage
  data.splice(index, 1); //removing the row of index index
  localStorage.setItem(`${whoDataTableWorkOn}`, JSON.stringify(data)); // updating the local storage
  data.forEach((item, index) => (item.id = index + 1));
  displayTable(data); // rerendering the table with the new data
}

//--9-- show update form
// ########## some changes here need to be discussed
function showUpdateForm(index) {
  const form = $("#updateForm").text(""); //wmptying the form from any old data
  const data = JSON.parse(localStorage.getItem(whoDataTableWorkOn))[index]; // get the data from that row to put it in the values of the inputs to make sure that if the client did not update a field from that form which represents the row it will take the previous value
  let input = "";

  if (data.products) {
    // Generate keys from the first product (assuming all products have the same structure)
    const keys = Object.keys(data.products[0]);

    // Iterate over each product
    data.products.forEach((product) => {
      // Iterate over each key and create input elements
      keys.forEach((key) => {
        let label = $("<label>", {
          for: key,
          text: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter of the key for better readability
          class: "form-label  text-primary mb-1",
        });
        input = $("<input>", {
          type: `${
            key === "id" ||
            key === "price" ||
            key === "quantity" ||
            key === "rating"
              ? "number"
              : "text"
          }`,

          name: key,
          value: product[key],
          // disabled: true,
          class: "form-control mb-3",
        });
        form.append(label);
        form.append(input);
      });
    });
  } else {
    // ################ if something went worng with the code just apply the next code alone ################
    $.each(data, function (key) {
      let label = $("<label>", {
        for: key,
        text: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter of the key for better readability
        class: "form-label text-primary mb-1",
      });
      input = $("<input>", {
        type: `${key === "id" || key === "phone" ? "number" : "text"}`,
        name: key,
        value: data[key],
        // disabled: true,
        class: "form-control mb-3",
      });
      form.append(label);
      form.append(input); // Append the input to the form before looping
    });
  }
  const submitInput = $("<input>", {
    //make input it is submit button to submit the data updated
    type: "submit",
    value: "submit",
    id: "addingRow",
    class: "btn btn-primary mb-3 ",
  });
  form.append(submitInput); // append it to the form
  form.attr("dataIndex", index); // addign an attribute of the index of the form which represents the index of row in table which is being manipulated
  $("#updateRowForm").removeClass("hidden"); // remove the hidden class and in submitting will add it again
}

//--10-- hide Update Form
function hideUpdateForm() {
  $("#updateRowForm").addClass("hidden");
}
// this not used as we emptying the form at the first place but leave it for another time
//but only used at submitting the values as we call it in the sub,it upadtes function
//#######################################

//--11-- submitting the updates to the table
function submitUpdate() {
  const index = $("#updateForm").attr("dataIndex"); //index of the form which we added when clicking on update button
  const data = JSON.parse(localStorage.getItem(`${whoDataTableWorkOn}`));
  const formData = new FormData($("#updateForm")[0]); //making a new form of data from the form
  if (data[index].products) {
    let objArray = [];
    let obj = {};
    let keyMap = new Map();
    formData.forEach((value, key) => {
      if (keyMap.has(key)) {
        // Key is repeated, push the current object to array and start a new object
        objArray.push(obj);
        obj = {};
        keyMap.clear();
      }
      obj[key] = value;
      keyMap.set(key, true);
    });
    // Push the last object to the array
    if (Object.keys(obj).length > 0) {
      objArray.push(obj);
    }
    // Update data[index].products with the new array of objects
    data[index].products = objArray;
  } else {
    // ################ if something went worng with the code just apply the next code alone ################+
    formData.forEach((value, key) => {
      data[index][key] = value; //looping ober the form data and updating the old data of the data array
    });
  }
  localStorage.setItem(`${whoDataTableWorkOn}`, JSON.stringify(data));
  displayTable(data);
  hideUpdateForm(); // hide the update form agter finishing
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("staticBackdrop")
  );
  modal.hide(); //in bootstrab
}

//--12-- show add form function
export function showAddForm() {
  const form = $("#addForm").text(""); //wmptying the form from any old data
  const data = JSON.parse(localStorage.getItem(`${whoDataTableWorkOn}`))[0];
  $.each(data, function (key) {
    // for each key make an input which type will be text name is the key and value is the key value
    let input;
    let label;
    if (key === "id") {
      label = $("<label>", {
        for: key,
        text: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter of the key for better readability
        class: "form-label text-success mb-1",
      });
      input = $("<input>", {
        type: "text",
        name: key,
        value: JSON.parse(localStorage.getItem(whoDataTableWorkOn)).length,
        disabled: true,
        class: "form-control mb-3  inputRowAdd",
      });
      //################### this else if is new because of product key is object
    } else if (key === "products") {
      const keys = Object.keys(data.products[0]);
      let product = $("<h3>", {
        text: "product",
        class: "text-center text-success text-capitalize fw-bold",
      });
      form.append(product);
      keys.map((item, index) => {
        if (item === "id") {
          label = $("<label>", {
            for: key,
            text: item.charAt(0).toUpperCase() + item.slice(1), // Capitalize the first letter of the key for better readability
            class: "form-label text-success mb-1",
          });
          input = $("<input>", {
            type: "text",
            name: key,
            value: index + 1,
            placeholder: [item],
            disabled: true,
            class: "form-control mb-3",
          });
        } else {
          label = $("<label>", {
            for: key,
            text: item.charAt(0).toUpperCase() + item.slice(1), // Capitalize the first letter of the key for better readability
            class: "form-label text-success mb-1",
          });
          const inputOptions = {
            type: item === "id" || item === "quantity" ? "number" : "text",
            name: key,
            value: product[key],
            class: "form-control mb-3",
          };
          if (item === "price" || item === "rating") {
            inputOptions.pattern = "[0-9]+(\\.[0-9][0-9]?)?";
          }
          input = $("<input>", inputOptions);
        }
        form.append(label);
        form.append(input);
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
      if (key === "phone_number") {
        inputOption.pattern = "\\d{10}";
      }
      input = $("<input>", inputOption);
    }
    form.append(label);
    form.append(input); // append that input to the form before looping
  });
  const submitInput = $("<input>", {
    //make input it is submit button to submit the data updated
    type: "submit",
    value: "submit",
    id: "addingRow",
    class: "btn btn-primary mt-3 w-50",
  });
  form.append(submitInput); // append it to the form
  $("#addRowForm").removeClass("hidden"); // remove the hidden class and in submitting will add it again
}

//--13-- toggle the form
// export function toggleAddForm() {
//   if ($("#addRowForm").hasClass("hidden")) {
//     showAddForm(); // if the add row form has the hidden then show it and change the content of button to done editing
//     $("#addNewRowButton").text("Done Adding");
//   } else {
//     hideAddForm();
//     $("#addNewRowButton").text("Add New Row");
//   }
// }

//--14-- hide the add form function
function hideAddForm() {
  $("#addRowForm").addClass("hidden");
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("staticBackdropAdd")
  );
  modal.hide();
}

//--15-- submitting the new row to the table
function submitAdd() {
  const data = JSON.parse(localStorage.getItem(`${whoDataTableWorkOn}`)); //getting the data from local storage
  const newRow = {}; // making a new object to add the keys and values of the form inputs

  // Enable the id field before reading the form data
  $("#addForm").find("input[name='id']").prop("disabled", false);

  const formData = new FormData($("#addForm")[0]);
  // ########### added new to assure that if the key is product then there is more to do
  let objArray = [];
  let x = {};
  let flag = false;
  let values = [];
  //making the form data object
  formData.forEach((value, key) => {
    if (key === "products") {
      flag = true;
      values.push(value);
    } else {
      key === "id" ? (newRow[key] = +value) : (newRow[key] = value); // For every form data element add the value to the new row
    }
  });
  if (flag) {
    let keys = Object.keys(data[0].products[0]);
    //#######new
    values.unshift(1);
    keys.map((k, i) => {
      k === "id" || k === "price" || k === "quantity"
        ? (x[k] = +values[i])
        : (x[k] = values[i]);
    });
    objArray.push(x);
  }
  //########################### new
  if (objArray.length > 0) {
    newRow.products = objArray;
  }
  // Disable the id field again after reading the data
  $("#addForm").find("input[name='id']").prop("disabled", true);
  const names = data.slice(1).map((item) => item.name || item.seller_Name);
  console.log(names);
  const nameExists = names.some(
    (item) => item === newRow.name || item === newRow.seller_Name
  );
  console.log(newRow.name);
  if (nameExists) {
    alert("This name is found, please change it");
  } else {
    data.push(newRow);
  } // then push the whole object to data array
  localStorage.setItem(`${whoDataTableWorkOn}`, JSON.stringify(data));
  displayTable(data);
  hideAddForm();
}

//--16-- reloading data from API
function reloadData() {
  // if we want to start again just press the reload button
  localStorage.removeItem(`${whoDataTableWorkOn}`); //removing local storage data
  fetchData(); // fetching from api again
  let data = JSON.parse(localStorage.getItem(`${whoDataTableWorkOn}`));
  displayTable(data);
}

//--17-- removing not nessasry data from users

export function removeKeys(dynamicData, keys) {
  return dynamicData.map((user) => {
    let newUser = { ...user };
    keys.forEach((key) => {
      delete newUser[key];
    });

    return newUser;
  });
}
/*****Add Function*/

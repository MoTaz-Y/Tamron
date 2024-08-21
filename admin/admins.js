import { searchTable, fetchData, showAddForm } from "../js/main.js";

/**Selectionds of elements**/
const search_Input = document.getElementById("searchInput");
const add_Seller = document.getElementById("addNewRowButton");
const sellerssData = "../data/admins.json";

// console.log(productsData);
/**Actions**/
/**featch all users from users.json**/
fetchData(sellerssData);
search_Input.addEventListener("input", searchTable);
add_Seller.addEventListener("click", showAddForm);

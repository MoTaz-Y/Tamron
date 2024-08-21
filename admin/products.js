import { searchTable, fetchData, toggleAddForm } from "../main.js";

/**Selectionds of elements**/
const search_Input = document.getElementById("searchInput");
const add_ProductBtn = document.getElementById("addNewRowButton");
const productsData = "../data/productsData.json";
console.log(productsData);
/**Actions**/
/**featch all users from users.json**/
fetchData(productsData);
search_Input.addEventListener("input", searchTable);
add_ProductBtn.addEventListener("click", toggleAddForm);

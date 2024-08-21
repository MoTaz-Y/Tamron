import { searchTable, fetchData, showAddForm } from "../js/main.js";

/**Selectionds of elements**/
const search_Input = document.getElementById("searchInput");
const addUserBtn = document.getElementById("addNewRowButton");
const usersData = "../data/users.json";
/**Actions**/
/**featch all users from users.json**/
// const localStorageData = JSON.parse(localStorage.getItem("users"));
// if (localStorageData) fetchData(localStorageData)
// } else {
//   fetchData(usersData);
// }
fetchData(usersData);
search_Input.addEventListener("input", searchTable);
addUserBtn.addEventListener("click", showAddForm);

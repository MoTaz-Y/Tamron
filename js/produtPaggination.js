window.addEventListener("load", function () {

    let filterBtn = this.document.getElementsByClassName("filterBtn")[0];
    let displayNavSmall = this.document.getElementById("categorySide");
    console.log(displayNavSmall);
  // let closeNav=this.document.getElementById("closeNav");
    let closeCategory = this.document.querySelector("#categorySide #closeNav ");
    let overlay = this.document.getElementsByClassName("overlay")[0];
    filterBtn.addEventListener("click", function () {
    displayNavSmall.style.display = "block";
    overlay.style.display = "block";
    });
    closeCategory.addEventListener("click", function () {
    displayNavSmall.style.display = "none";
    overlay.style.display = "none";
    });

  //pagination
  let pageChangeBtnContainer =this.document.getElementsByClassName("pageChangeBtnContainer")[0]
let pageNumber=Math.ceil(products.length / itemPerPage);
    for(let i=0 ;i<pageNumber ;i++){
        let btn = this.document.createElement("button");
        btn.classList.add("pageChangeBtn");
        btn.textContent=i+1;
        pageChangeBtnContainer.append(btn)
    }
  console.log(pageChangeBtnContainer);
  this.document
    .getElementsByClassName("nextPrevBtn")[0]
    .addEventListener("click", goPrev);
  this.document
    .getElementsByClassName("nextPrevBtn")[1]
    .addEventListener("click", goNext);
  pageChangeBtn = this.document.getElementsByClassName("pageChangeBtn");

  pageChangeBtn[0].classList.add("activeBtn");
  for (let ele of pageChangeBtn) {
    ele.addEventListener("click", () => {
      for (let eles of pageChangeBtn) {
        if (eles.classList.contains("activeBtn")) {
          eles.classList.remove("activeBtn");
        }
      }
      pagge = parseInt(ele.innerText);
      console.log(ele.innerText);
      goToPage(pagge);
      ele.classList.add("activeBtn");
    });
  }

  displayitems(products, currentPage);
}); //end of load
const itemPerPage = 6;
let currentPage = 1;
const products = this.document.getElementsByClassName("product");

function displayitems(data, page) {
  const startIndex = (page - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;

  const pageItems = Array.from(data).slice(startIndex, endIndex);

  //clear previous content
  const container = document.getElementsByClassName("paginationContainer")[0];
  for (const ele of products) {
    ele.style.display = "none";
  }
  // display current page item
  pageItems.forEach((ele) => {
    ele.style.display = "block";
  });

  //display pageNumber
  const pageContainer = document.getElementById("pageNumber");
  pageContainer.innerText = `Page ${page} of ${Math.ceil(
    data.length / itemPerPage
  )}`;
}
// go to next
function goNext() {
  for (let eles of pageChangeBtn) {
    if (eles.classList.contains("activeBtn")) {
      console.log("ok");
      eles.classList.remove("activeBtn");
    }
  }
  if (currentPage < Math.ceil(products.length / itemPerPage)) {
    currentPage++;
    displayitems(products, currentPage);
  } else {
    currentPage = 1;
    displayitems(products, currentPage);
  }
  for (let eles of pageChangeBtn) {
    if (eles.innerHTML == currentPage) {
      console.log("ok");

      eles.classList.add("activeBtn");
    }
  }
}

// go to previoue
function goPrev() {
  for (let eles of pageChangeBtn) {
    if (eles.classList.contains("activeBtn")) {
      console.log("ok");
      eles.classList.remove("activeBtn");
    }
  }
  if (currentPage > 1) {
    currentPage--;
    displayitems(products, currentPage);
  } else {
    currentPage = Math.ceil(products.length / itemPerPage);
    console.log(currentPage);
    displayitems(products, currentPage);
  }
  for (let eles of pageChangeBtn) {
    if (eles.innerHTML == currentPage) {
      console.log("ok");
      eles.classList.add("activeBtn");
    }
  }
}
//go to page
function goToPage(page) {
  if (page >= 1 && page <= Math.ceil(products.length / itemPerPage)) {
    currentPage = page;
    //   console.log("page")
    displayitems(products, currentPage);
  }
}

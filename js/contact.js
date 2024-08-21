import { updateUserUI, redirectToLogin, cartSidebar } from "./main.js";
window.addEventListener("load", function () {
  //navbar
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
  let map = this.document.getElementsByClassName("map")[0];
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPos, errormsg);
  } else {
    map.innerHtml = "sorry , update this browser to use it ";
  }

  let contactForm = this.document.getElementById("contactForm");
  let contactFormFullName = this.document.querySelector(
    "#contactForm input[type=text]"
  );
  let contactFormEmail = this.document.querySelector(
    "#contactForm input[type=email]"
  );
  let contactFormmess = this.document.querySelector("#contactForm textarea");

  contactFormFullName.addEventListener("blur", function () {
    if (userNameValid(contactFormFullName)) {
      contactFormFullName.focus();
      inValidStyle(contactFormFullName, "invalid user name");
    } else {
      validStyle(contactFormFullName);
    }
  });
  contactFormEmail.addEventListener("blur", function () {
    if (emailvalid(contactFormEmail)) {
      validStyle(contactFormEmail);
    } else {
      contactFormEmail.focus();
      inValidStyle(contactFormEmail, "invalid email");
    }
  });
  contactFormmess.addEventListener("blur", function () {
    if (validMsg(contactFormmess)) {
      contactFormmess.focus();
      inValidStyle(contactFormmess, "invalid msg");
    } else {
      validStyle(contactFormmess);
    }
  });

  $("#contactForm").on("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    event.stopPropagation();
    alert("hit the road jack");
    let userMessage = {};
    let username = $("#contactForm input[type=text]").val();
    alert(username);
    let email = $("#contactForm input[type=email]").val();
    let message = $("#contactForm textarea").val();
    alert(email);
    let userId = 0;
    if (JSON.parse(sessionStorage.getItem("userLogged"))) {
      userId = JSON.parse(sessionStorage.getItem("userLogged")).id;
    }
    userMessage.username = username;
    userMessage.email = email;
    userMessage.message = message;
    userMessage.userId = userId ? userId : Date().now;

    let userMessages = JSON.parse(localStorage.getItem("userMessages")) || [];
    userMessages.push(userMessage);
    localStorage.setItem("userMessages", JSON.stringify(userMessages));
    // Optionally, show a success message or reset the form
    alert("Message sent successfully!");
    $("#contactForm")[0].reset();
  });

  // });
}); //load
function getPos(position) {
  let map = document.getElementsByClassName("map")[0];
  let lats = position.coords.latitude;
  let lon = position.coords.longitude;
  let location = new google.maps.LatLng(lats, lon);
  let specs = { zoom: 17, center: location };
  new google.maps.Map(map, specs);
}
function errormsg() {
  alert("error");
}

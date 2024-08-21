window.addEventListener("load", function () {
  // checkout validation
  let checkoutForm = this.document.getElementById("checkoutForm");
  let fullNameCheckout = this.document.getElementById("fullNameCheckout");
  let phonecheckout = this.document.getElementById("phonecheckout");
  let countryCheckout = this.document.getElementById("countryCheckout");
  let governorateCheckout = this.document.getElementById("governorateCheckout");
  let cityCheckout = this.document.getElementById("cityCheckout");
  let appartmentCheckout = this.document.getElementById("appartmentCheckout");
  let buildingCheckout = this.document.getElementById("buildingCheckout");
  let streetCheckout = this.document.getElementById("streetCheckout");
  let postalCodeCheckout = this.document.getElementById("postalCodeCheckout");
  phonecheckout.addEventListener("blur", function () {
    if (phoneValid(phonecheckout)) {
      validStyle(phonecheckout);
    } else {
      phonecheckout.focus();
      inValidStyle(phonecheckout, "invalid phone number");
    }
  });
  fullNameCheckout.addEventListener("blur", function () {
    if (userNameValid(fullNameCheckout)) {
      fullNameCheckout.focus();
      inValidStyle(fullNameCheckout, "invalid user name");
    } else {
      validStyle(fullNameCheckout);
    }
  });
  appartmentCheckout.addEventListener("blur", function () {
    if (placeNumValidate(appartmentCheckout)) {
      validStyle(appartmentCheckout);
    } else {
      appartmentCheckout.focus();
      inValidStyle(appartmentCheckout, "invalid appartment num");
    }
  });
  buildingCheckout.addEventListener("blur", function () {
    if (placeNumValidate(buildingCheckout)) {
      validStyle(buildingCheckout);
    } else {
      buildingCheckout.focus();
      inValidStyle(buildingCheckout, "invalid building num");
    }
  });
  streetCheckout.addEventListener("blur", function () {
    if (placeValidate(streetCheckout)) {
      streetCheckout.focus();
      inValidStyle(streetCheckout, "invalid street name");
    } else {
      validStyle(streetCheckout);
    }
  });
  countryCheckout.addEventListener("blur", function () {
    if (placeValidate(countryCheckout)) {
      countryCheckout.focus();
      inValidStyle(countryCheckout, "invalid country name");
    } else {
      validStyle(countryCheckout, this, 5);
    }
  });
  governorateCheckout.addEventListener("blur", function () {
    if (placeValidate(governorateCheckout)) {
      governorateCheckout.focus();
      inValidStyle(governorateCheckout, "invalid governorate name");
    } else {
      validStyle(governorateCheckout);
    }
  });
  cityCheckout.addEventListener("blur", function () {
    if (placeValidate(cityCheckout)) {
      cityCheckout.focus();
      inValidStyle(cityCheckout, "invalid city name");
    } else {
      validStyle(cityCheckout);
    }
  });
  postalCodeCheckout.addEventListener("blur", function () {
    if (postalCode(postalCodeCheckout)) {
      validStyle(postalCodeCheckout);
    } else {
      postalCodeCheckout.focus();
      inValidStyle(postalCodeCheckout, "invalid postal code");
    }
  });
  // checkoutForm.addEventListener('click',function(e){
  //     if(!phoneValid(phonecheckout) || userNameValid(fullNameCheckout)|| !placeNumValidate(appartmentCheckout) ||  !placeNumValidate(buildingCheckout) ||  placeValidate(streetCheckout) || placeValidate(countryCheckout) || placeValidate(governorateCheckout) ||placeValidate(cityCheckout) || !postalCode(postalCodeCheckout)){

  //         e.preventDefault()
  //     }
  //     // e.preventDefault();
  //     console.log("out")
  // })
});

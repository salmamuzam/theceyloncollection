//Validation for the payment form to prevent users from clicking confirm without filling the card number, card holder, expiration date and CVV.
//Also, ensures users have input accurate data before clicking the confirm button.

//Validates the payment form upon clicking the confirm button.
document.getElementById("open_modal").addEventListener("click", function () {
  if (validateForm()) {
  }
});

function validateForm() {
  const cardNumber = document.getElementById("card-number").value;
  const nameText = document.getElementById("name-text").value;
  const validThruText = document.getElementById("valid-thru-text").value;
  const cvvText = document.getElementById("cvv-text").value;
  resetErrorStyles();

  const isValid = true;

  //Error messages for card number, card holder, expiration date and CVV to alert users.

  if (cardNumber.length !== 19) {
    showError("cardError", "Invalid card number");
    isValid = false;
  }

  if (nameText.trim() === "") {
    showError("nameError", "Name is required");
    isValid = false;
  }

  const validThruRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!validThruRegex.test(validThruText)) {
    showError("expirationError", "Invalid expiration date");
    isValid = false;
  }

  const cvvRegex = /^\d{3}$/;
  if (!cvvRegex.test(cvvText)) {
    showError("cvvError", "Invalid CVV");
    isValid = false;
  }

  return isValid;
}

function showError(errorId, errorMessage) {
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = errorMessage;
  errorElement.style.color = "red";
  errorElement.style.marginTop = "-10px";
}

function resetErrorStyles() {
  const errorElements = document.querySelectorAll(".error");
  errorElements.forEach(function (errorElement) {
    errorElement.textContent = "";
    errorElement.style.color = "";
    errorElement.style.marginTop = "";
  });
}

//Validation for the guest, room, adventure booking form to ensure users have input accurate data before clicking the book now button.

//Displays error messages to users if there is an invalid input.
function printError(id, message) {
  document.getElementById(id).innerHTML = message;
}

//Error messages to alert users to enter accurate input and to ensure mandatory fields are filled.
function validateNameInput(value, id, label) {
  if (value.trim() === "") {
    printError(id, `Please enter your ${label} name`);
    setInputErrorStyle(id);
    return true;
  }

  const regex = /^[a-zA-Z\s]+$/;
  if (!regex.test(value)) {
    printError(id, `Please enter a valid ${label} name`);
    setInputErrorStyle(id);
    return true;
  }

  clearError(id);
  return false;
}

function validateEmailInput(value, id) {
  if (value.trim() === "") {
    printError(id, "Please enter your email address");
    setInputErrorStyle(id);
    return true;
  }

  const regex = /^\S+@\S+\.\S+$/;
  if (!regex.test(value)) {
    printError(id, "Please enter a valid email address");
    setInputErrorStyle(id);
    return true;
  }

  clearError(id);
  return false;
}

function validateContactNumberInput(value, id) {
  if (value.trim() === "") {
    printError(id, "Please enter your contact number");
    setInputErrorStyle(id);
    return true;
  }

  const regex = /^[0-9]{10}$/;
  if (!regex.test(value)) {
    printError(id, "Please enter a valid contact number");
    setInputErrorStyle(id);
    return true;
  }

  clearError(id);
  return false;
}

function validateNonEmptyInput(value, id, label) {
  if (value.trim() === "") {
    printError(id, `Please enter your ${label}`);
    setInputErrorStyle(id);
    return true;
  }

  clearError(id);
  return false;
}

function setInputErrorStyle(id) {
  document.getElementById(id).classList.add("input-2");
  document.getElementById(id).classList.remove("input-1");
}

function clearError(id) {
  printError(id, "");
  document.getElementById(id).classList.add("input-1");
  document.getElementById(id).classList.remove("input-2");
}

//Validates the fields in the guest form.

function validateGuestDetailsForm() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const contactNumber = document.getElementById("contactNumber").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const checkIn = document.getElementById("checkIn").value;
  const checkOut = document.getElementById("checkOut").value;

  const firstNameError = validateNameInput(
    firstName,
    "firstNameError",
    "first"
  );
  const lastNameError = validateNameInput(lastName, "lastNameError", "last");
  const emailError = validateEmailInput(email, "emailError");
  const contactError = validateContactNumberInput(
    contactNumber,
    "contactError"
  );
  const addressError = validateNonEmptyInput(
    address,
    "addressError",
    "address"
  );
  const cityError = validateNonEmptyInput(city, "cityError", "city");
  const checkInError = validateNonEmptyInput(
    checkIn,
    "checkInError",
    "check-in date"
  );
  const checkOutError = validateNonEmptyInput(
    checkOut,
    "checkOutError",
    "check-out date"
  );

  return !(
    firstNameError ||
    lastNameError ||
    emailError ||
    contactError ||
    addressError ||
    cityError ||
    checkInError ||
    checkOutError
  );
}

nextBtnFirst.addEventListener("click", function (event) {
  event.preventDefault();

  const isGuestDetailsValid = validateGuestDetailsForm();

  //Enables users to navigate to the next page if all mandatory fields are accurately filled.

  if (isGuestDetailsValid) {
    slidePage.style.marginLeft = "-20%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
  }
});

function validateNumberRangeInput(value, id, label, minValue, maxValue) {
  if (
    value.trim() === "" ||
    isNaN(value) ||
    value < minValue ||
    value > maxValue
  ) {
    printError(
      id,
      `Please enter a valid number for ${label} (${minValue}-${maxValue})`
    );
    setInputErrorStyle(id);
    return true;
  }
  clearError(id);
  return false;
}

//Validates all fields from the room form.

function validateRoomDetailsForm() {
  const selectBranch = document.getElementById("selectBranch").value;
  const selectRoom = document.getElementById("selectRoom").value;
  const noOfRooms = document.getElementById("noOfRooms").value;
  const extraBed = document.getElementById("extraBed").value;
  const noOfAdults = document.getElementById("noOfAdults").value;
  const noOfChildren = document.getElementById("noOfChildren").value;
  const kidsMeal = document.getElementById("kidsMeal").value;
  const duration = document.getElementById("duration").value;

  const branchError = validateNonEmptyInput(
    selectBranch,
    "branchError",
    "branch"
  );
  const roomChoiceError = validateNonEmptyInput(
    selectRoom,
    "roomChoiceError",
    "room choice"
  );
  const roomNoError = validateNumberRangeInput(
    noOfRooms,
    "roomNoError",
    "number of rooms",
    1,
    10
  );
  const extraBedError = validateNumberRangeInput(
    extraBed,
    "extraBedError",
    "number of extra beds",
    0,
    10
  );
  const noOfAdultsError = validateNumberRangeInput(
    noOfAdults,
    "noOfAdultsError",
    "number of adults",
    1,
    20
  );
  const noOfChildrenError = validateNumberRangeInput(
    noOfChildren,
    "noOfChildrenError",
    "number of children",
    0,
    10
  );
  const kidsMealError = validateNumberRangeInput(
    kidsMeal,
    "kidsMealError",
    "number of kids meals",
    0,
    10
  );
  const durationError = validateNumberRangeInput(
    duration,
    "durationError",
    "duration of stay",
    1,
    Infinity
  );

  return !(
    branchError ||
    roomChoiceError ||
    roomNoError ||
    extraBedError ||
    noOfAdultsError ||
    noOfChildrenError ||
    kidsMealError ||
    durationError
  );
}

nextBtnSec.addEventListener("click", function (event) {
  event.preventDefault();
  const isRoomDetailsValid = validateRoomDetailsForm();
  //Enables users to navigate to the next step if only all the fields are correctly filled.
  if (isRoomDetailsValid) {
    slidePage.style.marginLeft = "-40%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
  }
});

//Validate the fields in the adventure form.

function validateAdventureForm(event) {
  event.preventDefault();

  const selectAdventure = document.getElementById("selectAdventure").value;
  const localAdults = document.getElementById("localAdults").value;
  const localKids = document.getElementById("localKids").value;
  const foreignAdults = document.getElementById("foreignAdults").value;
  const foreignKids = document.getElementById("foreignKids").value;

  const adventureSelectError = validateNonEmptyInput(
    selectAdventure,
    "adventureSelectError",
    "adventure choice"
  );
  const localAdultsError = validateNumberRangeInput(
    localAdults,
    "localAdultsError",
    "number of local adults",
    0,
    10
  );
  const localKidsError = validateNumberRangeInput(
    localKids,
    "localKidsError",
    "number of local kids",
    0,
    10
  );
  const foreignAdultsError = validateNumberRangeInput(
    foreignAdults,
    "foreignAdultsError",
    "number of foreign adults",
    0,
    10
  );
  const foreignKidsError = validateNumberRangeInput(
    foreignKids,
    "foreignKidsError",
    "number of foreign kids",
    0,
    10
  );

  //Checks whether all fields are accurately filled when clicking the book now button.

  if (
    adventureSelectError ||
    localAdultsError ||
    localKidsError ||
    foreignAdultsError ||
    foreignKidsError
  ) {
  }
}

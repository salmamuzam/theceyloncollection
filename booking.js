//Multi step form which includes the guest, room and adventure forms.

const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

nextBtnFirst.addEventListener("click", function (event) {
  event.preventDefault();

  if (validateForm(event)) {
    slidePage.style.marginLeft = "-20%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
  }
});

nextBtnSec.addEventListener("click", function (event) {
  event.preventDefault();
  if (validateForm1(event)) {
    slidePage.style.marginLeft = "-40%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
  } else {
    console.error("Validation failed for room details.");
  }
});

prevBtnSec.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "0%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});

prevBtnThird.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-20%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});

//Multi step form to display the overall booking, fill the payment details and display a thank you message popup to the users.

const steps = Array.from(document.querySelectorAll(".multi"));
const nextBtn = document.querySelectorAll(".btn-continue");
const prevBtn = document.querySelectorAll(".btn-back");

nextBtn.forEach((button) => {
  button.addEventListener("click", () => {
    changeStep("next");
  });
});

prevBtn.forEach((button) => {
  button.addEventListener("click", () => {
    changeStep("prev");
  });
});

function changeStep(btn) {
  let index = 0;
  const active = document.querySelector(
    ".step-one.active, .step-two.active, .step-three.active"
  );
  index = steps.indexOf(active);

  if (btn === "next") {
    index++;
  } else if (btn === "prev") {
    index--;
  }

  index = Math.max(0, Math.min(index, steps.length - 1));

  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });
}

//Modal Popup to thank users for booking. This displays after clicking the confirm button.

let open_modal = document.getElementById("open_modal");
let modal_container = document.getElementById("modal-container2");
let close_modal = document.getElementById("close_modal");
let close_icon = document.getElementById("close-icon");

open_modal.addEventListener("click", function () {
  if (validateForm()) {
    modal_container.classList.add("show");
  }
});

close_modal.addEventListener("click", function () {
  modal_container.classList.remove("show");
});

close_icon.addEventListener("click", function () {
  modal_container.classList.remove("show");
});

function validateForm() {
  const cardNumber = document.getElementById("card-number").value;
  const nameText = document.getElementById("name-text").value;
  const validThruText = document.getElementById("valid-thru-text").value;
  const cvvText = document.getElementById("cvv-text").value;
  if (
    cardNumber.length !== 19 ||
    nameText.trim() === "" ||
    validThruText.trim() === "" ||
    cvvText.trim() === ""
  ) {
    alert("Form validation failed. Please check your inputs.");
    return false;
  }

  return true;
}

//Payment form for users to enter card details to complete the booking process.

const form1 = document.querySelector("#credit-card");

const cardNumber = document.querySelector("#card-number");
const cardHolder = document.querySelector("#name-text");
const cardExpiration = document.querySelector("#valid-thru-text");
const cardCVV = document.querySelector("#cvv-text");
const credit = document.querySelector("#credit-card");
const payBtn = document.querySelector("#pay");
const cardNumberText = document.querySelector(".number-vl");
const cardHolderText = document.querySelector(".name-vl");
const cardExpirationText = document.querySelector(".expiration-vl");
const cardCVVText = document.querySelector(".cvv-vl");

cardNumber.addEventListener("keyup", (e) => {
  if (!e.target.value) {
    cardNumberText.innerText = "1234 5678 9101 1121";
  } else {
    const valuesOfInput = e.target.value.replaceAll(" ", "");

    if (e.target.value.length > 14) {
      e.target.value = valuesOfInput.replace(
        /(\d{4})(\d{4})(\d{4})(\d{0,4})/,
        "$1 $2 $3 $4"
      );
      cardNumberText.innerHTML = valuesOfInput.replace(
        /(\d{4})(\d{4})(\d{4})(\d{0,4})/,
        "$1 $2 $3 $4"
      );
    } else if (e.target.value.length > 9) {
      e.target.value = valuesOfInput.replace(
        /(\d{4})(\d{4})(\d{0,4})/,
        "$1 $2 $3"
      );
      cardNumberText.innerHTML = valuesOfInput.replace(
        /(\d{4})(\d{4})(\d{0,4})/,
        "$1 $2 $3"
      );
    } else if (e.target.value.length > 4) {
      e.target.value = valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
      cardNumberText.innerHTML = valuesOfInput.replace(
        /(\d{4})(\d{0,4})/,
        "$1 $2"
      );
    } else {
      cardNumberText.innerHTML = valuesOfInput;
    }
  }
});

cardHolder.addEventListener("keyup", (e) => {
  if (!e.target.value) {
    cardHolderText.innerHTML = "AALIYAH SHIAM";
  } else {
    cardHolderText.innerHTML = e.target.value.toUpperCase();
  }
});

cardExpiration.addEventListener("keyup", (e) => {
  if (!e.target.value) {
    cardExpirationText.innerHTML = "02/40";
  } else {
    const valuesOfInput = e.target.value.replace("/", "");

    if (e.target.value.length > 2) {
      e.target.value = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
      cardExpirationText.innerHTML = valuesOfInput.replace(
        /^(\d{2})(\d{0,2})/,
        "$1/$2"
      );
    } else {
      cardExpirationText.innerHTML = valuesOfInput;
    }
  }
});

cardCVV.addEventListener("keyup", (e) => {
  if (!e.target.value) {
    cardCVVText.innerHTML = "123";
  } else {
    cardCVVText.innerHTML = e.target.value;
  }
});

credit.addEventListener(payBtn, (e) => {
  e.preventDefault();

  alert("Credit Card Added!");
});

//Tabbed Interface to display current booking details which includes the current guest, room and adventure details.

document.addEventListener("DOMContentLoaded", function () {
  const allIndicator = document.querySelectorAll(".indicator li");
  const allContent = document.querySelectorAll(".current_content li");

  allIndicator[0].classList.add("active");
  allContent[0].classList.add("active");

  allIndicator.forEach((item) => {
    item.addEventListener("click", function () {
      const content = document.querySelector(this.dataset.target);

      allIndicator.forEach((i) => {
        i.classList.remove("active");
      });

      allContent.forEach((i) => {
        i.classList.remove("active");
      });

      content.classList.add("active");
      this.classList.add("active");
    });
  });
});

//Accordion to display overall booking details in a table and this includes the overall guest, room and adventure information.
document.addEventListener("DOMContentLoaded", function () {
  const accordionContent = document.querySelectorAll(".accordion-content");

  accordionContent.forEach((item, index) => {
    let header = item.querySelector("header");
    let description = item.querySelector(".table");

    header.addEventListener("click", () => {
      item.classList.toggle("open");

      if (item.classList.contains("open")) {
        description.style.display = "table";
        item.querySelector("i").classList.replace("fa-plus", "fa-minus");
      } else {
        description.style.display = "none";
        item.querySelector("i").classList.replace("fa-minus", "fa-plus");
      }

      removeOpen(index);
    });
  });

  function removeOpen(index1) {
    accordionContent.forEach((item2, index2) => {
      if (index1 !== index2) {
        item2.classList.remove("open");
        let des = item2.querySelector(".table");
        des.style.display = "none";
        item2.querySelector("i").classList.replace("fa-minus", "fa-plus");
      }
    });
  }
});

//Modal Popup to thank users for booking adventures and to display the adventure details with the total.

let popup = document.getElementById("popup");

function openPopup() {
  popup.classList.add("open-popup");
  backdrop.style.display = "block";
}

function closePopup() {
  popup.classList.remove("open-popup");
  backdrop.style.display = "none";
}

//Ensures users cannot select past dates in the Check Out and Check In fields.

function updateCheckOutMin() {
  const checkInInput = document.getElementById("checkIn");
  const checkOutInput = document.getElementById("checkOut");
  checkOutInput.min = checkInInput.value;
  if (checkOutInput.value < checkInInput.value) {
    checkOutInput.value = checkInInput.value;
  }
}

function updateCheckInMax() {
  const checkInInput = document.getElementById("checkIn");
  const checkOutInput = document.getElementById("checkOut");
  checkInInput.max = checkOutInput.value;
}

const currentDate = new Date().toISOString().split("T")[0];
document.getElementById("checkIn").min = currentDate;
document.getElementById("checkOut").min = currentDate;
document.getElementById("checkIn").min = new Date().toISOString().split("T")[0];

//Provide a button effect when clicking the add favourites button.

const button = document.querySelector(".fav_btn");
button.addEventListener("click", (e) => {
  e.preventDefault;
  button.classList.add("animate");
  setTimeout(() => {
    button.classList.remove("animate");
  }, 600);
});

//Toast Notification which makes users aware that the booking is added to favourites. This means when the add to favourites button is clicked, the booking details are stored in the local storage.

let x;
let toast = document.getElementById("toast");
function showToast() {
  clearTimeout(x);
  toast.style.transform = "translateX(0)";
  x = setTimeout(() => {
    toast.style.transform = "translateX(400px)";
  }, 4000);
}
function closeToast() {
  toast.style.transform = "translateX(400px)";
}

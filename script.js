//When users click on the Check Loyalty Points button, the function calculates the loyalty points and displays it to the user according to the number of rooms booked.
document.getElementById("loyaltyBtn").addEventListener("click", function () {
  calculateLoyaltyPoints();
});

function calculateLoyaltyPoints() {
  const noOfRooms = parseInt(document.getElementById("noOfRooms").value);
  const loyaltyPoints = noOfRooms > 3 ? Math.floor(noOfRooms / 3) * 20 : 0;

  localStorage.setItem("loyaltyPoints", loyaltyPoints.toString());

  document.getElementById(
    "loyaltyPoints"
  ).value = `You have earned ${loyaltyPoints} loyalty points!`;
}

let currentBooking = {
  guest: {},
  room: {},
  adventure: {},
  totalCost: 0,
};

let overallBooking = {
  rooms: [],
  adventures: [],
  totalCost: 0,
};

//References for guest information form

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const city = document.getElementById("city");
const contactNumber = document.getElementById("contactNumber");
const address = document.getElementById("address");
const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");

//References for room information form

const branchSelect = document.getElementById("selectBranch");
const roomChoiceSelect = document.getElementById("selectRoom");
const noOfRooms = document.getElementById("noOfRooms");
const extraBed = document.getElementById("extraBed");
const noOfAdults = document.getElementById("noOfAdults");
const noOfChildren = document.getElementById("noOfChildren");
const kidsMeal = document.getElementById("kidsMeal");
const duration = document.getElementById("duration");
const wifiCheckbox = document.getElementById("wifi");
const poolCheckbox = document.getElementById("pool");
const gardenCheckbox = document.getElementById("garden");

//References for adventure information form

const adventureSelect = document.getElementById("selectAdventure");
const localAdults = document.getElementById("localAdults");
const localKids = document.getElementById("localKids");
const foreignAdults = document.getElementById("foreignAdults");
const foreignKids = document.getElementById("foreignKids");
const adultGuide = document.getElementById("adultGuide");
const kidGuide = document.getElementById("kidGuide");

//Reference for promo code

const promoCode = document.getElementById("promoCode");

//References for book now, book adventure, add to favourites and loyalty buttons.

const bookNowButton = document.getElementById("bookNow");
const bookAdventureButton = document.getElementById("bookAdventure");
const addFavouritesButton = document.getElementById("addFavourites");
const loyaltyBtn = document.getElementById("loyaltyBtn");

//References to display overall guest, room and adventure information.

const overallGuestTable = document
  .getElementById("overallGuestTable")
  .getElementsByTagName("tbody")[0];
const overallRoomTable = document
  .getElementById("overallRoomTable")
  .getElementsByTagName("tbody")[0];
const overallAdventureTable = document
  .getElementById("overallAdventureTable")
  .getElementsByTagName("tbody")[0];

//Reference to display the cost and loyalty points.

const overallTotalCost = document.getElementById("overallTotalCost");
const currentRoomCost = document.getElementById("currentRoomCost");
const currentAdventureCost = document.getElementById("currentAdventureCost");
const totalCurrentCost = document.getElementById("totalCurrentCost");
const loyaltyPointsDisplay = document.getElementById("loyaltyPoints");

//Event listeners for buttons.

bookNowButton.addEventListener("click", bookNowHandler);
bookAdventureButton.addEventListener("click", bookAdventureHandler);
// loyaltyBtn.addEventListener('click', checkLoyaltyPoints);
addFavouritesButton.addEventListener("click", addToFavoritesHandler);

//Function to handle book now button

function bookNowHandler() {
  const guest = {
    firstName: firstName.value || "-",
    lastName: lastName.value || "-",
    email: email.value || "-",
    city: city.value || "-",
    contactNumber: contactNumber.value || "-",
    address: address.value || "-",
    checkIn: checkIn.value || "-",
    checkOut: checkOut.value || "-",
  };

  const room = {
    branchSelect:
      branchSelect.value !== "Select Branch" ? branchSelect.value : "-",
    roomChoiceSelect:
      roomChoiceSelect.value !== "Room Choice" ? roomChoiceSelect.value : "-",
    noOfRooms: parseInt(noOfRooms.value, 10) || 0,
    extraBed: parseInt(extraBed.value, 10) || 0,
    noOfAdults: parseInt(noOfAdults.value, 10) || 0,
    noOfChildren: parseInt(noOfChildren.value, 10) || 0,
    kidsMeal: parseInt(kidsMeal.value, 10) || 0,
    duration: parseInt(duration.value, 10) || 0,
    wifi: wifiCheckbox.checked,
    pool: poolCheckbox.checked,
    garden: gardenCheckbox.checked,
    roomCost: calculateRoomCost(
      roomChoiceSelect.value,
      noOfRooms.value,
      extraBed.value,
      kidsMeal.value
    ),
  };

  const adventure = {
    adventureSelect:
      adventureSelect.value !== "Choose Adventure"
        ? adventureSelect.value
        : "-",
    localAdults: parseInt(localAdults.value, 10) || 0,
    localKids: parseInt(localKids.value, 10) || 0,
    foreignAdults: parseInt(foreignAdults.value, 10) || 0,
    foreignKids: parseInt(foreignKids.value, 10) || 0,
    adultGuide: adultGuide.checked,
    kidGuide: kidGuide.checked,
    adventureCost: calculateAdventureCost(
      adventureSelect.value,
      parseInt(localAdults.value, 10) || 0,
      parseInt(localKids.value, 10) || 0,
      parseInt(foreignAdults.value, 10) || 0,
      parseInt(foreignKids.value, 10) || 0,
      adultGuide.checked,
      kidGuide.checked
    ),
  };

  let discountAmount;

  // Calculate total cost without discount first
  totalCost = (room.roomCost || 0) + (adventure.adventureCost || 0);

  resetCurrentBooking();

  //Display current booking details in a tabbed interface.

  const currentGuestDetails = document.getElementById("currentGuestDetails");
  const currentRoomDetails = document.getElementById("currentRoomDetails");
  const currentAdventureDetails = document.getElementById(
    "currentAdventureDetails"
  );

  currentGuestDetails.innerHTML = `
        <p> &#8226; First Name: ${guest.firstName || "-"}</p>
        <p> &#8226; Last Name: ${guest.lastName || "-"}</p>
        <p> &#8226; Email: ${guest.email || "-"}</p>
        <p> &#8226; Contact Number: ${guest.contactNumber || "-"}</p>
        <p> &#8226; Address: ${guest.address || "-"}</p>
        <p> &#8226; Check In: ${guest.checkIn || "-"}</p>
        <p> &#8226; Check Out: ${guest.checkOut || "-"}</p>
    `;

  currentRoomDetails.innerHTML = `
        <p> &#8226;  Branch Name : ${
          room.branchSelect !== "Select Branch" ? room.branchSelect : "-"
        }</p>
        <p> &#8226; Room Choice : ${
          room.roomChoiceSelect !== "Room Choice" ? room.roomChoiceSelect : "-"
        }</p>
        <p> &#8226; No of Rooms : ${
          room.noOfRooms !== 0 ? room.noOfRooms : "0"
        }</p>
        <p> &#8226; Extra Bed : ${room.extraBed !== 0 ? room.extraBed : "0"}</p>
        <p> &#8226; No of Adults : ${
          room.noOfAdults !== 0 ? room.noOfAdults : "0"
        }</p>
        <p> &#8226; No of Children : ${
          room.noOfChildren !== 0 ? room.noOfChildren : "0"
        }</p>
        <p> &#8226; Kids Meal : ${room.kidsMeal !== 0 ? room.kidsMeal : "0"}</p>
        <p> &#8226; Duration of Stay : ${
          room.duration !== 0 ? room.duration : "0"
        }</p>
        <p> &#8226; WiFi : ${room.wifi ? "Yes" : "No"}</p>
        <p> &#8226; Pool View : ${room.pool ? "Yes" : "No"}</p>
        <p> &#8226; Garden View : ${room.garden ? "Yes" : "No"}</p>
    `;

  currentAdventureDetails.innerHTML = `
        <p> &#8226; Adventure Name : ${
          adventure.adventureSelect !== "Choose Adventure"
            ? adventure.adventureSelect
            : "-"
        }</p>
        <p> &#8226; Local Adult : ${
          adventure.localAdults !== 0 ? adventure.localAdults : "0"
        }</p>
        <p> &#8226; Local Kid : ${
          adventure.localKids !== 0 ? adventure.localKids : "0"
        }</p>
        <p> &#8226; Foreign Adult : ${
          adventure.foreignAdults !== 0 ? adventure.foreignAdults : "0"
        }</p>
        <p> &#8226; Foreign Kid : ${
          adventure.foreignKids !== 0 ? adventure.foreignKids : "0"
        }</p>
        <p> &#8226; Adult Guide : ${adventure.adultGuide ? "Yes" : "No"}</p>
        <p> &#8226; Kid Guide : ${adventure.kidGuide ? "Yes" : "No"}</p>
    `;

  currentBooking = { guest, room, adventure, totalCost };
  currentBooking.currentRoomCost = room.roomCost || 0;
  currentBooking.currentAdventureCost = adventure.adventureCost || 0;

  discountAmount = applyPromoCode();
  totalCost -= discountAmount;

  overallTotalCost.innerHTML = `LKR ${totalCost}`;
  overallTotalCost.style.fontSize = "16px";
  overallTotalCost.style.textAlign = "left";

  currentRoomCost.innerText = `Room Cost : LKR ${currentBooking.currentRoomCost}`;
  currentRoomCost.style.fontSize = "16px";
  currentRoomCost.style.textAlign = "left";

  currentAdventureCost.innerText = `Adventure Cost : LKR ${currentBooking.currentAdventureCost}`;
  currentAdventureCost.style.fontSize = "16px";
  currentAdventureCost.style.textAlign = "left";

  totalCurrentCost.innerText = `Total Cost : LKR ${totalCost}`;
  totalCurrentCost.style.fontSize = "16px";
  totalCurrentCost.style.textAlign = "left";

  updateOverallBookingTable(guest, room, adventure);
}

//Function to calculate the room cost

function calculateRoomCost(roomType, noOfRooms, extraBed, kidsMeal) {
  let roomCost = 0;

  switch (roomType) {
    case "Single":
      roomCost = 25000.0;
      break;
    case "Double":
      roomCost = 35000.0;
      break;
    case "Triple":
      roomCost = 40000.0;
      break;
    default:
      break;
  }

  const kidsMealCost = 5000.0 * parseInt(kidsMeal, 10);
  const extraBedCost = 8000.0 * parseInt(extraBed, 10);
  roomCost += kidsMealCost + extraBedCost;

  roomCost *= parseInt(noOfRooms, 10);

  return roomCost;
}

//Function to calculate the adventure cost

function calculateAdventureCost(
  adventureType,
  localAdults,
  localKids,
  foreignAdults,
  foreignKids,
  adultGuide,
  kidGuide
) {
  let adventureCost = 0;
  adventureCost += 5000.0 * localAdults;
  adventureCost += 2000.0 * localKids;
  adventureCost += 10000.0 * foreignAdults;
  adventureCost += 5000.0 * foreignKids;

  if (adultGuide) {
    adventureCost += 1000.0 * localAdults;
  }

  if (kidGuide) {
    adventureCost += 500.0 * localKids;
  }

  return adventureCost;
}

//Function to handle promo code

function applyPromoCode() {
  const promoCodeValue = promoCode.value.trim();
  let discountAmount = 0;

  if (promoCodeValue === "Promo123") {
    const discountPercentage = 5;
    discountAmount = (totalCost * discountPercentage) / 100;
  }

  // Update the total cost in the UI
  overallTotalCost.innerText = `LKR ${totalCost - discountAmount}`;

  return discountAmount;
}

//Function to update the overall booking details in a table.

function updateOverallBookingTable(guest, room, adventure) {
  const guestRow = overallGuestTable.insertRow();
  const guestCell1 = guestRow.insertCell(0);
  const guestCell2 = guestRow.insertCell(1);
  const guestCell3 = guestRow.insertCell(2);
  const guestCell4 = guestRow.insertCell(3);
  const guestCell5 = guestRow.insertCell(4);
  const guestCell6 = guestRow.insertCell(5);
  const guestCell7 = guestRow.insertCell(6);

  guestCell1.textContent = guest.firstName;
  guestCell2.textContent = guest.lastName;
  guestCell3.textContent = guest.email;
  guestCell4.textContent = guest.contactNumber;
  guestCell5.textContent = guest.address;
  guestCell6.textContent = guest.checkIn;
  guestCell7.textContent = guest.checkOut;

  const roomRow = overallRoomTable.insertRow();
  const roomCell1 = roomRow.insertCell(0);
  const roomCell2 = roomRow.insertCell(1);
  const roomCell3 = roomRow.insertCell(2);
  const roomCell4 = roomRow.insertCell(3);
  const roomCell5 = roomRow.insertCell(4);
  const roomCell6 = roomRow.insertCell(5);
  const roomCell7 = roomRow.insertCell(6);
  const roomCell8 = roomRow.insertCell(7);
  const roomCell9 = roomRow.insertCell(8);
  const roomCell10 = roomRow.insertCell(9);
  const roomCell11 = roomRow.insertCell(10);

  roomCell1.textContent = room.branchSelect;
  roomCell2.textContent = room.roomChoiceSelect;
  roomCell3.textContent = room.noOfRooms;
  roomCell4.textContent = room.extraBed;
  roomCell5.textContent = room.noOfAdults;
  roomCell6.textContent = room.noOfChildren;
  roomCell7.textContent = room.kidsMeal;
  roomCell8.textContent = room.duration;
  roomCell9.textContent = room.wifi ? " ✔" : "✖";
  roomCell10.textContent = room.pool ? "✔" : "✖";
  roomCell11.textContent = room.garden ? "✔" : "✖";

  const adventureRow = overallAdventureTable.insertRow();
  const adventureCell1 = adventureRow.insertCell(0);
  const adventureCell2 = adventureRow.insertCell(1);
  const adventureCell3 = adventureRow.insertCell(2);
  const adventureCell4 = adventureRow.insertCell(3);
  const adventureCell5 = adventureRow.insertCell(4);
  const adventureCell6 = adventureRow.insertCell(5);
  const adventureCell7 = adventureRow.insertCell(6);

  adventureCell1.textContent = adventure.adventureSelect;
  adventureCell2.textContent = adventure.localAdults;
  adventureCell3.textContent = adventure.localKids;
  adventureCell4.textContent = adventure.foreignAdults;
  adventureCell5.textContent = adventure.foreignKids;
  adventureCell6.textContent = adventure.adultGuide ? "Yes" : "No";
  adventureCell7.textContent = adventure.kidGuide ? "Yes" : "No";

  overallBooking.rooms.push(room);
  overallBooking.adventures.push(adventure);
  overallBooking.totalCost += totalCost;

  overallTotalCost.innerText = `LKR ${overallBooking.totalCost} `;
}

//Function to reset the booking details to blank or 0.

function resetCurrentBooking() {
  currentBooking = {
    guest: {},
    room: {},
    adventure: {},
    totalCost: 0,
  };

  firstName.value = "";
  lastName.value = "";
  email.value = "";
  city.value = "";
  contactNumber.value = "";
  address.value = "";
  checkIn.value = "";
  checkOut.value = "";
  branchSelect.value = "Select Branch";
  roomChoiceSelect.value = "Room Choice";
  noOfRooms.value = "";
  extraBed.value = "";
  noOfAdults.value = "";
  noOfChildren.value = "";
  kidsMeal.value = "";
  duration.value = "";
  wifiCheckbox.checked = false;
  poolCheckbox.checked = false;
  gardenCheckbox.checked = false;
  adventureSelect.value = "Choose Adventure";
  localAdults.value = "";
  localKids.value = "";
  foreignAdults.value = "";
  foreignKids.value = "";
  adultGuide.checked = false;
  kidGuide.checked = false;
  promoCode.value = "";
}

//Function to generate booking id to store booking information in local storage.

function generateUniqueId() {
  return new Date().getTime().toString() + Math.floor(Math.random() * 1000);
}

//Function to handle add to favourites button.

function addToFavoritesHandler() {
  const totalCost =
    currentBooking.currentRoomCost + currentBooking.currentAdventureCost;
  const bookingId = generateUniqueId();
  const favouriteBooking = {
    bookingId: bookingId,
    guest: {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      contactNumber: contactNumber.value,
      address: address.value,
      checkIn: checkIn.value,
      checkOut: checkOut.value,
    },
    room: {
      branchSelect: branchSelect.value,
      roomChoiceSelect: roomChoiceSelect.value,
      noOfRooms: noOfRooms.value,
      extraBed: extraBed.value,
      noOfAdults: noOfAdults.value,
      noOfChildren: noOfChildren.value,
      kidsMeal: kidsMeal.value,
      duration: duration.value,
      wifi: wifiCheckbox.checked,
      pool: poolCheckbox.checked,
      garden: gardenCheckbox.checked,
      roomCost: calculateRoomCost(
        roomChoiceSelect.value,
        noOfRooms.value,
        extraBed.value,
        kidsMeal.value
      ),
    },
    adventure: {
      adventureSelect: adventureSelect.value,
      localAdults: localAdults.value,
      localKids: localKids.value,
      foreignAdults: foreignAdults.value,
      foreignKids: foreignKids.value,
      adultGuide: adultGuide.checked,
      kidGuide: kidGuide.checked,
      adventureCost: calculateAdventureCost(
        localAdults.value,
        localKids.value,
        foreignAdults.value,
        foreignKids.value,
        adultGuide.checked,
        kidGuide.checked
      ),
    },
  };
  console.log("Favorite Booking:", favouriteBooking);
  const existingFavourites =
    JSON.parse(localStorage.getItem("favouriteBookings")) || [];
  console.log("Existing Favorites:", existingFavourites);
  const existingIndex = existingFavourites.findIndex(
    (booking) => booking.bookingId === bookingId
  );

  if (existingIndex !== -1) {
    existingFavourites[existingIndex] = favouriteBooking;
    console.log("Existing Favorite Found and Updated!");
  } else {
    existingFavourites.push(favouriteBooking);
    console.log("New Booking Added to Favorites!");
  }
  localStorage.setItem("favouriteBookings", JSON.stringify(existingFavourites));
}

//The bookAdventureHandler function handles the book adventure button.
//Popup to display adventure details after clicking book adventure button.

function bookAdventureHandler(event) {
  event.preventDefault();

  const adventure = getAdventureDetails();

  bookAdventurePopup.innerHTML = `
        <p> Thank you for booking ${
          adventure.adventureSelect !== "Choose Adventure"
            ? adventure.adventureSelect
            : "-"
        }</p>
        <p> The following are your booking details: </p>
        <p> &#8226; Local Adult: ${
          adventure.localAdults !== 0 ? adventure.localAdults : "0"
        }</p>
        <p> &#8226; Local Kid: ${
          adventure.localKids !== 0 ? adventure.localKids : "0"
        }</p>
        <p> &#8226; Foreign Adult: ${
          adventure.foreignAdults !== 0 ? adventure.foreignAdults : "0"
        }</p>
        <p> &#8226; Foreign Kid: ${
          adventure.foreignKids !== 0 ? adventure.foreignKids : "0"
        }</p>
        <p> &#8226; Adult Guide: ${adventure.adultGuide ? "Yes" : "No"}</p>
        <p> &#8226; Kid Guide: ${adventure.kidGuide ? "Yes" : "No"}</p>
        <hr>
        <p> Total:   ${currentBooking.currentAdventureCost} </p>
    `;

  document.getElementById("popup").style.display = "block";
}

if (bookAdventureButton) {
  bookAdventureButton.addEventListener("click", bookAdventureHandler);
}

function closePopup() {
  document.getElementById("popup").style.display = "none";

  resetCurrentBooking();
}

function getAdventureDetails() {
  const adventureSelect = document.getElementById("selectAdventure").value;
  const localAdults = document.getElementById("localAdults").value;
  const localKids = document.getElementById("localKids").value;
  const foreignAdults = document.getElementById("foreignAdults").value;
  const foreignKids = document.getElementById("foreignKids").value;
  const adultGuide = document.getElementById("adultGuide").checked;
  const kidGuide = document.getElementById("kidGuide").checked;

  return {
    adventureSelect,
    localAdults,
    localKids,
    foreignAdults,
    foreignKids,
    adultGuide,
    kidGuide,
  };
}

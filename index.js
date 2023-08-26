// Initial button states
document.getElementById("makeP").disabled = true;
document.getElementById("apply").disabled = true;

// Function to update the "Make Purchase" button state
function updateMakePurchaseButton() {
    const total_price = getInputFieldValueById("total_price");
    const makePButton = document.getElementById("makeP");

    makePButton.disabled = !(total_price > 0);
}

// Function to update the "Apply" button state
function updateApplyButton() {
    const total_price = getInputFieldValueById("total_price");
    const applyButton = document.getElementById("apply");
    const coupon = document.getElementById("coupon").value;

    applyButton.disabled = !(total_price >= 200 && coupon === "SELL200");
}

let couponApplied = false; // Variable to track if the coupon has been applied

// Function to apply a discount
function applyDiscount() {
    const total_price = getInputFieldValueById("total_price");
    if (!couponApplied && total_price >= 200) {
        const discount = total_price * 0.2;
        const newTotal = total_price - discount;
        setTextElementValueById("discount", discount.toFixed(2));
        setTextElementValueById("initialTotal", newTotal.toFixed(2));
        couponApplied = true; // Set couponApplied to true after applying the coupon
    }
}

// Function to get the input field value by ID
function getInputFieldValueById(inputFieldId) {
    const inputField = document.getElementById(inputFieldId);
    const inputFieldValueString = inputField.innerText;
    const inputFieldValue = parseFloat(inputFieldValueString);
    return inputFieldValue;
}

// Function to set the text element value by ID
function setTextElementValueById(elementId, newValue) {
    const textElement = document.getElementById(elementId);
    textElement.innerText = newValue;
}


// Initialize an empty array to store order list items
const orderList = [];

// Function to add an item to the order list and update the display
function addItemToOrderList(item) {
    orderList.push(item);
    updateOrderListDisplay();
}

// Function to remove an item from the order list by its index


// Function to update the order list display
function updateOrderListDisplay() {
    const totalItemsList = document.getElementById("total-items");
    totalItemsList.innerHTML = ""; // Clear the total items list first

    // Loop through the order list and create list items
    for (let i = 0; i < orderList.length; i++) {
        const listItem = document.createElement("li");
        listItem.innerText = orderList[i];

        // Add a button to remove the item from the order list
        const addLi= document.createElement("button");


        listItem.appendChild(addLi);
        totalItemsList.appendChild(listItem);
    }
}

// Event listeners

// Handle card clicks
const allCards = document.querySelectorAll(".Alada");

for (let i = 0; i < allCards.length; i++) {
    allCards[i].addEventListener('click', function () {
        const itemText = document.getElementById(`idLi${i + 1}`).innerText;
        addItemToOrderList(itemText);
        const taka = getInputFieldValueById(`taka${i + 1}`);
        const preTotal = getInputFieldValueById("total_price");
        const newTotal = preTotal + taka;
        setTextElementValueById("total_price", newTotal);

        updateMakePurchaseButton();
        updateApplyButton();
    });
}

// Handle coupon input
document.getElementById("coupon").addEventListener('input', function () {
    updateApplyButton();
});

// Handle Apply button click
document.getElementById("apply").addEventListener('click', function () {
    const coupon = document.getElementById("coupon").value;
    if (coupon === "SELL200") {
        applyDiscount();
        updateApplyButton();
    }
});

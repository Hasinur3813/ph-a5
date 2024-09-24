const mainBalanceElement = document.getElementById("main_balance");

const donation_btn = document.getElementById("donation_btn");
const history_btn = document.getElementById("history_btn");

const donation_page = document.getElementById("donation_page");
const history_page = document.getElementById("history_page");
const modal_box = document.getElementById("modal_box");
const close_modal_btn = document.getElementById("close_modal_btn");
const modal = document.getElementById("modal");

const donationBtn = document.querySelectorAll(".donation_btn");

const trackDonationBtn = {
  donation_submit_btn: [
    "flood_donation_balance",
    "flood_donation_title",
    "donation_input_amount",
  ],
  relief_submit_btn: [
    "relief_donation_balance",
    "relief_donation_title",
    "relief_input_amount",
  ],
  quota_movement_submit_btn: [
    "quoto_movement_balance",
    "quota_movement_title",
    "quota_input_amount",
  ],
};

// loop through the donation button to add an event

for (let i = 0; i < donationBtn.length; i++) {
  // get each elements id
  const id = donationBtn[i].id;

  // match the id with trackDonationBtn object
  const matchedId = trackDonationBtn[id];

  // add an click event in each donation button
  document.getElementById(id).addEventListener("click", function () {
    // call the addAmount function and pass the matchedId array as parameter
    addAmount(matchedId);
  });
}

donation_btn.addEventListener("click", function () {
  donation_btn.classList.add("bg-primary");
  history_btn.classList.remove("bg-primary");
  donation_page.classList.remove("hidden");
  history_page.classList.add("hidden");
});
history_btn.addEventListener("click", function () {
  donation_btn.classList.remove("bg-primary");
  history_btn.classList.add("bg-primary");
  history_page.classList.remove("hidden");
  donation_page.classList.add("hidden");
});

function addAmount(arrayOfId) {
  // existingBalance, title, input;
  const existingBalance = arrayOfId[0];
  const title = arrayOfId[1];
  const input = arrayOfId[2];

  // get value or innerText from the elements
  const values = valueProvider(existingBalance, title, input);
  const mainBalence = parseFloat(mainBalanceElement.innerText);

  let donatedAmount = parseFloat(values.balance);
  let inputValue;

  // check the value is nan or not
  const isNanInput = isNaN(values.inputValue);

  // set a valud input in the inputValue or show an alert
  if (isNanInput) {
    return alert("Your input can't be added!");
  } else {
    inputValue = parseFloat(values.inputValue);
  }

  // ensure the input value is grater than 0
  if (inputValue > 0) {
    // check the main balance is grater than input value otherwise show an alert
    const isSuffientBalance = mainBalence >= inputValue;

    if (isSuffientBalance) {
      const amount = donatedAmount + inputValue;

      // insert the amount to the DOM
      insertToDOM(
        existingBalance,
        mainBalence,
        amount,
        inputValue,
        values.title
      );

      // empty the input field after adding the amount
      values.inputElement.value = "";

      // show a successfull notification after successfully adding the amount
      openModal();
    } else {
      alert("You have insufficient balance");
    }
  } else {
    alert("Your input can't be added!");
  }
}

// function for insert the amount to the DOM
function insertToDOM(existingBalance, mainBalence, amount, inputValue, title) {
  // adding amount for the donation
  document.getElementById(existingBalance).innerText = amount.toFixed(2);

  // decrease the added amount from the main balance
  const finalBanalce = mainBalence - inputValue;

  // adding the remaining amount the main balamce
  mainBalanceElement.innerText = finalBanalce.toFixed(2);

  // insert a transaction history to the History page
  pushTransactionHitory(inputValue, title);
}

function valueProvider(existingBalance, title, input) {
  const flood_donation_balance = document.getElementById(existingBalance);
  const flood_donation_title = document.getElementById(title);
  const donation_input_amount = document.getElementById(input);

  // return an object of the elements value or text
  return {
    balance: flood_donation_balance.innerText,
    title: flood_donation_title.innerText,
    inputValue: donation_input_amount.value,
    inputElement: donation_input_amount,
  };
}

function pushTransactionHitory(inputValue, title) {
  // UI for the transaction
  const historyUI = `<div class="p-8 rounded-2xl border border-gray-400">
            <h3 class="text-lg lg:text-xl font-bold mb-4">
              ${inputValue} Taka is
              ${title}
            </h3>
            <p class="text-base font-light text-gray-500">
              Date: ${new Date()}
            </p>
          </div>`;

  history_page.innerHTML += historyUI;
}

// open a modal for a successfull transaction
function openModal() {
  modal_box.classList.add("opacity-100", "pointer-events-auto", "z-40");
  modal.classList.add("scale-100");
  document.body.style.overflow = "hidden";
}

// close the modal
close_modal_btn.onclick = function () {
  modal_box.classList.remove("opacity-100", "pointer-events-auto", "z-40");

  modal.classList.remove("scale-100");
  document.body.style.overflow = "auto";
};

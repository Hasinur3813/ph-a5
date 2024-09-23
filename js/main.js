const mainBalanceElement = document.getElementById("main_balance");

const donation_btn = document.getElementById("donation_btn");
const history_btn = document.getElementById("history_btn");

const donation_page = document.getElementById("donation_page");
const history_page = document.getElementById("history_page");

const donation_submit_btn = document.getElementById("donation_submit_btn");

// const relief_donation_balance = document.getElementById("relief_donation_balance");
// const relief_donation_title = document.getElementById("relief_donation_title");
// const relief_input_amount = document.getElementById("relief_input_amount");
// const relief_submit_btn = document.getElementById("relief_submit_btn");

// const quoto_movement_balance = document.getElementById(
//   "quoto_movement_balance"
// );
// const quota_movement_title = document.getElementById("quota_movement_title");
// const quota_input_amount = document.getElementById("quota_input_amount");
// const quota_movement_submit_btn = document.getElementById(
//   "quota_movement_submit_btn"
// );

donation_submit_btn.addEventListener("click", function () {
  addAmount(
    "flood_donation_balance",
    "flood_donation_title",
    "donation_input_amount"
  );
});

function addAmount(existingBalance, title, input) {
  const values = valueProvider(existingBalance, title, input);
  const mainBalence = parseFloat(mainBalanceElement.innerText);

  let donatedAmount = parseFloat(values.balance);
  const inputValue = parseFloat(values.inputValue);

  console.log(inputValue);

  const isValidInput = inputValue > 0 && !isNaN(inputValue);
  const isSuffientBalance = mainBalence >= inputValue;

  if (isValidInput) {
    if (isSuffientBalance) {
      const amount = donatedAmount + inputValue;
      insertToDOM(
        existingBalance,
        mainBalence,
        amount,
        inputValue,
        values.title
      );
    } else {
      alert("You have insufficient balance");
    }
  } else {
    alert("Wrong input");
  }
}

function insertToDOM(existingBalance, mainBalence, amount, inputValue, title) {
  document.getElementById(existingBalance).innerText = amount.toFixed(2);
  const finalBanalce = mainBalence - inputValue;
  mainBalanceElement.innerText = finalBanalce.toFixed(2);
  console.log(mainBalanceElement.innerText);

  pushTransactionHitory(inputValue, title);
}

function valueProvider(existingBalance, title, input) {
  const flood_donation_balance = document.getElementById(existingBalance);
  const flood_donation_title = document.getElementById(title);
  const donation_input_amount = document.getElementById(input);

  return {
    balance: flood_donation_balance.innerText,
    title: flood_donation_title.innerText,
    inputValue: donation_input_amount.value,
  };
}

function pushTransactionHitory(inputValue, title) {
  const historyUI = `<div class="p-8 rounded-2xl border border-gray-400">
            <h3 class="text-lg lg:text-xl font-bold mb-4">
              <span id="added_amount">${inputValue}</span> Taka is
              <span id="history_title">${title}</span
              >
            </h3>
            <p class="text-base font-light text-gray-500">
              Date:
              <span id="date"
                >${new Date()}</span
              >
            </p>
          </div>`;

  history_page.innerHTML += historyUI;
}

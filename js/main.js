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

let mainBalence = mainBalanceElement.innerText;

donation_submit_btn.addEventListener("click", function () {
  addAmount(
    "flood_donation_balance",
    "flood_donation_title",
    "donation_input_amount"
  );
});

function addAmount(existingBalance, title, input) {
  const values = valueProvider(existingBalance, title, input);
  console.log(values.inputValue);

  let balance = parseFloat(values.balance);

  if (values.inputValue > 0 && !isNaN(values.inputValue)) {
    console.log(values.inputValue);
    balance += parseFloat(values.inputValue);
    console.log(balance);
  } else {
    console.log("wrong input");
  }
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

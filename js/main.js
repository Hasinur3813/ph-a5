const mainBalanceElement = document.getElementById("main_balance");

const donation_btn = document.getElementById("donation_btn");
const history_btn = document.getElementById("history_btn");

const donation_page = document.getElementById("donation_page");
const history_page = document.getElementById("history_page");
const modal_box = document.getElementById("modal_box");
const close_modal_btn = document.getElementById("close_modal_btn");
const modal = document.getElementById("modal");

const donation_submit_btn = document.getElementById("donation_submit_btn");
const relief_submit_btn = document.getElementById("relief_submit_btn");
const quota_movement_submit_btn = document.getElementById(
  "quota_movement_submit_btn"
);

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

donation_submit_btn.addEventListener("click", function () {
  addAmount(
    "flood_donation_balance",
    "flood_donation_title",
    "donation_input_amount"
  );
});

relief_submit_btn.addEventListener("click", function () {
  addAmount(
    "relief_donation_balance",
    "relief_donation_title",
    "relief_input_amount"
  );
});
quota_movement_submit_btn.addEventListener("click", function () {
  addAmount(
    "quoto_movement_balance",
    "quota_movement_title",
    "quota_input_amount"
  );
});

function addAmount(existingBalance, title, input) {
  const values = valueProvider(existingBalance, title, input);
  const mainBalence = parseFloat(mainBalanceElement.innerText);

  let donatedAmount = parseFloat(values.balance);
  let inputValue;

  const isNanInput = isNaN(values.inputValue);

  if (isNanInput) {
    return alert("wrong input");
  } else {
    inputValue = parseFloat(values.inputValue);
  }

  if (inputValue > 0) {
    const isSuffientBalance = mainBalence >= inputValue;
    if (isSuffientBalance) {
      const amount = donatedAmount + inputValue;
      insertToDOM(
        existingBalance,
        mainBalence,
        amount,
        inputValue,
        values.title
      );
      values.inputElement.value = "";
      modal_box.classList.add("opacity-100", "pointer-events-auto", "z-40");
      modal.classList.add("scale-100");
      document.body.style.overflow = "hidden";
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
    inputElement: donation_input_amount,
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

const numberButtons = document.querySelectorAll("[data-number");
const operationButtons = document.querySelectorAll("[data-operator");
const clearButton = document.getElementById("clearBtn");
const deleteButton = document.getElementById("deleteBtn");
const equalButton = document.getElementById("equal");
const lastOpScrText = document.getElementById("lastOpScr");
const currOpScrText = document.getElementById("currOpScr");

let currentOperand = "";
let previousOperand = "";
let currentOperator = null;

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});

deleteButton.addEventListener("click", () => {
  currentOperand = currentOperand.slice(0, -1);
  updateDisplay();
});

function appendNumber(number) {
  if (number === "0" && currentOperand === "0") return;
  if (number === "." && currentOperand.includes(".")) return;
  if (number === "." && currentOperand === "") {
    currentOperand = "0" + number;
  } else {
    currentOperand += number;
  }
}
function chooseOperation(operator) {
  if (currentOperand === "") return;
  if (currentOperator) {
    return;
  }
  currentOperator = operator;
  previousOperand = currentOperand;
  currentOperand = "";
}

function compute() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (currentOperator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        result = "Błąd: Dzielenie przez zero";
      } else {
        result = prev / current;
      }
      break;
    default:
      return;
  }

  if (result % 1 !== 0) {
    result = result.toFixed(5);
  } else {
    result = result.toString();
  }

  currentOperand = result;
  previousOperand = "";
  currentOperator = null;
}
function clear() {
  currentOperand = "";
  previousOperand = "";
  currentOperator = null;
}

function updateDisplay() {
  currOpScrText.innerText = currentOperand;
  lastOpScrText.innerText =
    previousOperand + (currentOperator ? " " + currentOperator : "");

  if (currentOperand === "Błąd") {
    currOpScrText.innerText = currentOperand;
    previousOperand = "";
    currentOperator = null;
  }
}

equalButton.addEventListener("click", () => {
  if (currentOperator === "/" && currentOperand === "0") {
    currentOperand = "Błąd";
    previousOperand = "";
    currentOperator = null;
    updateDisplay();
  } else {
    compute();
    updateDisplay();
  }
});

clearButton.addEventListener("click", () => {
  clear();
  updateDisplay();
});
